"""Dependency-free SEO checks and discovery-file build. Run from any directory."""
import argparse
import concurrent.futures
from datetime import date, datetime, timezone
from email.utils import format_datetime
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "Zinely"
ORIGIN = "https://zinelyagency.com"
STATE = ROOT / "seo" / "content-state.json"
SM = "http://www.sitemaps.org/schemas/sitemap/0.9"
ATOM = "http://www.w3.org/2005/Atom"


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.raw = path.read_text(encoding="utf-8")
        self.canonicals, self.links, self.assets, self.ids = [], [], [], set()
        self.title, self.h1, self.description = "", [], ""
        self.og_url, self.noindex = None, False
        self._title, self._h1 = False, False
        self.feed(self.raw)
        self.schemas = []
        for value in re.findall(r'<script\b[^>]*type=[\"\']application/ld\+json[\"\'][^>]*>(.*?)</script>', self.raw, re.S):
            data = json.loads(value)
            self.schemas.extend(data if isinstance(data, list) else data.get("@graph", [data]))
        self.canonical = self.canonicals[0] if len(self.canonicals) == 1 else ""

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "title":
            self._title = True
        if tag == "h1":
            self._h1 = True
            self.h1.append("")
        if tag == "link" and "canonical" in attrs.get("rel", "").split():
            self.canonicals.append(attrs.get("href", ""))
        if tag == "meta":
            if attrs.get("name") == "description":
                self.description = attrs.get("content", "")
            if attrs.get("property") == "og:url":
                self.og_url = attrs.get("content")
            if attrs.get("name", "").lower() in ("robots", "googlebot"):
                directives = re.split(r"[\s,]+", attrs.get("content", "").lower())
                self.noindex = self.noindex or bool({"noindex", "none"} & set(directives))
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag in ("img", "script") and attrs.get("src"):
            self.assets.append(attrs["src"])
        if tag == "link" and attrs.get("rel") in ("stylesheet", "icon"):
            self.assets.append(attrs.get("href", ""))

    def handle_endtag(self, tag):
        if tag == "title":
            self._title = False
        if tag == "h1":
            self._h1 = False

    def handle_data(self, text):
        if self._title:
            self.title += text
        if self._h1:
            self.h1[-1] += text


def local_file(url):
    parts = urllib.parse.urlsplit(url)
    if parts.netloc and parts.netloc != "zinelyagency.com":
        return None
    path = SITE / urllib.parse.unquote(parts.path).lstrip("/")
    if not path.resolve().is_relative_to(SITE.resolve()):
        return None
    if path.is_dir():
        return path / "index.html"
    if not path.suffix:
        return path.with_suffix(".html")
    return path


def read_pages():
    # uploads are assets, never publishable article sources.
    return [Page(p) for p in sorted(SITE.rglob("*.html")) if "uploads" not in p.relative_to(SITE).parts]


def audit(pages):
    errors, warnings = [], []
    by_file = {p.path.resolve(): p for p in pages}
    titles, urls = set(), set()
    for p in pages:
        label = p.path.relative_to(SITE).as_posix()
        def error(message):
            errors.append(f"{label}: {message}")
        if len(p.canonicals) != 1 or not p.canonical.startswith(ORIGIN + "/"):
            error("requires one absolute production canonical")
        elif local_file(p.canonical) != p.path:
            error("canonical does not resolve to this file")
        if p.canonical in urls:
            error("duplicate canonical")
        urls.add(p.canonical)
        if not p.title.strip() or p.title in titles:
            error("missing or duplicate title")
        titles.add(p.title)
        if not p.description.strip():
            error("missing description")
        if len(p.h1) != 1:
            error(f"expected one H1, found {len(p.h1)}")
        if p.og_url != p.canonical:
            error("Open Graph URL differs from canonical")
        if p.noindex:
            error("public page has noindex")
        if not any(s.get("@type") == "Organization" for s in p.schemas):
            warnings.append(f"{label}: no Organization schema")
        templated = 0
        for link in p.links + p.assets:
            if "{{" in link:
                templated += 1
                continue
            full = urllib.parse.urljoin(p.canonical, link)
            parts = urllib.parse.urlsplit(full)
            if parts.scheme not in ("https", "http") or parts.netloc != "zinelyagency.com":
                continue
            target = local_file(full)
            if not target or not target.is_file():
                error(f"missing local destination: {link}")
            elif parts.fragment and target.resolve() in by_file:
                if urllib.parse.unquote(parts.fragment) not in by_file[target.resolve()].ids:
                    error(f"missing anchor: {link}")
        if templated:
            warnings.append(f"{label}: {templated} runtime-bound links need browser verification")
        if "<x-dc>" in p.raw:
            warnings.append(f"{label}: template runtime remains; inspect rendered HTML with Search Console")
    robots = (SITE / "robots.txt").read_text(encoding="utf-8")
    if f"Sitemap: {ORIGIN}/sitemap.xml" not in robots:
        errors.append("robots.txt: missing sitemap declaration")
    if re.search(r"(?mi)^Disallow:\s*/\s*$", robots):
        errors.append("robots.txt: root crawl block needs review")
    return errors, warnings


def xml_bytes(element):
    ET.indent(element, space="  ")
    return ET.tostring(element, encoding="utf-8", xml_declaration=True) + b"\n"


def build(pages):
    previous = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}
    existing = {}
    sitemap_path = SITE / "sitemap.xml"
    if sitemap_path.exists():
        for node in ET.parse(sitemap_path).getroot():
            existing[node.findtext(f"{{{SM}}}loc")] = node.findtext(f"{{{SM}}}lastmod")
    current = {}
    ET.register_namespace("", SM)
    sitemap = ET.Element(f"{{{SM}}}urlset")
    for p in sorted(pages, key=lambda p: p.canonical):
        digest = hashlib.sha256(p.raw.encode("utf-8")).hexdigest()
        old = previous.get(p.canonical, {})
        if old.get("sha256") == digest:
            modified = old.get("lastmod")
        elif old:
            modified = date.today().isoformat()
        else:
            # First build preserves known dates; never invent one for an unchanged page.
            modified = existing.get(p.canonical) if p.canonical in existing else date.today().isoformat()
        current[p.canonical] = {"sha256": digest, "lastmod": modified}
        node = ET.SubElement(sitemap, f"{{{SM}}}url")
        ET.SubElement(node, f"{{{SM}}}loc").text = p.canonical
        if modified:
            ET.SubElement(node, f"{{{SM}}}lastmod").text = modified
    ET.register_namespace("atom", ATOM)
    rss = ET.Element("rss", {"version": "2.0"})
    channel = ET.SubElement(rss, "channel")
    for tag, value in [("title", "Zinely Blog"), ("link", ORIGIN + "/blog/"), ("description", "Chatting operations for agencies, established creators and Fanvue AI-model operators."), ("language", "en-us")]:
        ET.SubElement(channel, tag).text = value
    ET.SubElement(channel, f"{{{ATOM}}}link", {"href": ORIGIN + "/blog/rss.xml", "rel": "self", "type": "application/rss+xml"})
    articles = []
    for p in pages:
        for schema in p.schemas:
            if schema.get("@type") in ("Article", "BlogPosting"):
                articles.append((schema["datePublished"], p, schema))
    for published, p, schema in sorted(articles, key=lambda a: a[0], reverse=True):
        item = ET.SubElement(channel, "item")
        for tag, value in [("title", schema["headline"]), ("link", p.canonical), ("description", p.description)]:
            ET.SubElement(item, tag).text = value
        ET.SubElement(item, "guid", {"isPermaLink": "true"}).text = p.canonical
        timestamp = datetime.fromisoformat(published.replace("Z", "+00:00"))
        if timestamp.tzinfo is None:
            timestamp = timestamp.replace(tzinfo=timezone.utc)
        ET.SubElement(item, "pubDate").text = format_datetime(timestamp.astimezone(timezone.utc), usegmt=True)
    return {
        SITE / "sitemap.xml": xml_bytes(sitemap),
        SITE / "blog/rss.xml": xml_bytes(rss),
        STATE: (json.dumps(current, indent=2, ensure_ascii=False) + "\n").encode("utf-8"),
    }


def probe(url):
    request = urllib.request.Request(url, headers={"User-Agent": "ZinelySEOAudit/1.0 (+https://zinelyagency.com/)"})
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            body = response.read(2_000_000).decode("utf-8", errors="replace")
            canonical = re.search(r'<link\b[^>]*rel=[\"\']canonical[\"\'][^>]*href=[\"\']([^\"\']+)', body)
            return {"url": url, "status": response.status, "final_url": response.url,
                    "canonical": canonical.group(1) if canonical else None,
                    "x_robots_tag": response.headers.get("X-Robots-Tag"),
                    "content_type": response.headers.get("Content-Type")}
    except urllib.error.HTTPError as exc:
        return {"url": url, "status": exc.code, "error": str(exc)}
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        return {"url": url, "status": None, "error": str(exc)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("check", "build", "live"))
    parser.add_argument("--output", type=Path, help="Optional JSON report destination (outside the public site)")
    args = parser.parse_args()
    pages = read_pages()
    errors, warnings = audit(pages)
    report = {"checked_at": datetime.now(timezone.utc).isoformat(), "pages": len(pages), "errors": errors, "warnings": warnings}
    if args.command in ("build", "check") and not errors:
        outputs = build(pages)
        if args.command == "build":
            for path, content in outputs.items():
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_bytes(content)
            report["generated"] = [str(p.relative_to(ROOT)) for p in outputs]
        else:
            for path, content in outputs.items():
                if not path.exists() or path.read_bytes().replace(b"\r\n", b"\n") != content:
                    errors.append(f"{path.relative_to(ROOT)} is stale; run python scripts/seo.py build")
    if args.command == "live":
        urls = [p.canonical for p in pages] + [ORIGIN + "/robots.txt", ORIGIN + "/sitemap.xml", ORIGIN + "/blog/rss.xml", ORIGIN + "/seo-probe-missing-page-20261001"]
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            report["live"] = list(pool.map(probe, urls))
        report["live_note"] = "An audit-agent 403 does not prove Googlebot is blocked. Verify via Search Console and Cloudflare events. Local pages may be awaiting deployment."
        for result in report["live"]:
            missing = result["url"].endswith("/seo-probe-missing-page-20261001")
            expected = (404, 410) if missing else (200,)
            if result["status"] not in expected:
                errors.append(f"Live response needs review: {result['url']} -> {result['status']}")
            elif not missing and result["url"] in {p.canonical for p in pages}:
                if result.get("canonical") != result["url"]:
                    errors.append(f"Live canonical needs review: {result['url']}")
                if re.search(r"\b(noindex|none)\b", result.get("x_robots_tag") or "", re.I):
                    errors.append(f"Live X-Robots-Tag blocks indexing: {result['url']}")
    if args.output:
        output = args.output.resolve()
        if output.is_relative_to(SITE.resolve()):
            parser.error("reports must stay outside the public Zinely directory")
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
