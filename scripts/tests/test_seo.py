import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
import xml.etree.ElementTree as ET

SPEC = importlib.util.spec_from_file_location("seo", Path(__file__).parents[1] / "seo.py")
seo = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(seo)


class SeoTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.original = seo.ROOT, seo.SITE, seo.STATE
        seo.ROOT = Path(self.temp.name)
        seo.SITE = seo.ROOT / "Zinely"
        seo.STATE = seo.ROOT / "seo" / "content-state.json"
        seo.SITE.mkdir()
        (seo.SITE / "robots.txt").write_text("User-agent: *\nAllow: /\nSitemap: " + seo.ORIGIN + "/sitemap.xml\n")

    def tearDown(self):
        seo.ROOT, seo.SITE, seo.STATE = self.original
        self.temp.cleanup()

    def page(self, body="", extra="", title="Test &amp; useful"):
        p = seo.SITE / "index.html"
        p.write_text('<html><head><title>' + title + '</title><meta name="description" content="A useful description">'
                     '<link rel="canonical" href="https://zinelyagency.com/">'
                     '<meta property="og:url" content="https://zinelyagency.com/">' + extra +
                     '</head><body><h1>Test</h1>' + body + '</body></html>', encoding="utf-8")
        return seo.Page(p)

    def test_detects_missing_files_and_fragments(self):
        p = self.page('<a href="/missing">Broken</a><a href="#absent">Broken anchor</a>')
        errors, _ = seo.audit([p])
        self.assertTrue(any("missing local destination" in e for e in errors))
        self.assertTrue(any("missing anchor" in e for e in errors))

    def test_catches_duplicate_canonical_and_noindex(self):
        p = self.page(extra='<link rel="canonical" href="https://zinelyagency.com/other"><meta name="robots" content="noindex, follow">')
        errors, _ = seo.audit([p])
        self.assertTrue(any("one absolute production canonical" in e for e in errors))
        self.assertTrue(any("noindex" in e for e in errors))

    def test_does_not_mask_subdirectory_robots_block_as_root(self):
        p = self.page('<a href="https://example.com/anything">External</a><a href="mailto:test@example.com">Email</a>')
        with (seo.SITE / "robots.txt").open("a") as f:
            f.write("Disallow: /private/\n")
        self.assertEqual(seo.audit([p])[0], [])

    def test_dates_preserved_on_noop_and_new_pages_dated(self):
        p = self.page()
        first = seo.build([p])
        state = json.loads(first[seo.STATE])
        self.assertEqual(state[p.canonical]["lastmod"], seo.date.today().isoformat())
        state[p.canonical]["lastmod"] = "2026-07-31"
        seo.STATE.parent.mkdir()
        seo.STATE.write_text(json.dumps(state))
        second = seo.build([p])
        self.assertEqual(json.loads(second[seo.STATE])[p.canonical]["lastmod"], "2026-07-31")
        updated = self.page('<p>Substantive new information.</p>')
        third = seo.build([updated])
        self.assertEqual(json.loads(third[seo.STATE])[p.canonical]["lastmod"], seo.date.today().isoformat())

    def test_feed_escapes_text_and_keeps_publication_date(self):
        data = {"@type": "Article", "headline": "Fees & <examples>", "datePublished": "2026-07-31", "dateModified": "2026-10-01"}
        p = self.page(extra='<script type="application/ld+json">' + json.dumps(data) + '</script>')
        feed = ET.fromstring(seo.build([p])[seo.SITE / "blog/rss.xml"])
        self.assertEqual(feed.findtext("channel/item/title"), "Fees & <examples>")
        self.assertIn("31 Jul 2026", feed.findtext("channel/item/pubDate"))
        self.assertEqual(feed.findtext("channel/item/guid"), p.canonical)


if __name__ == "__main__":
    unittest.main()
