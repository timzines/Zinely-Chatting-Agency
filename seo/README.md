# Zinely daily SEO operations

This directory is the working memory for the SEO routine. It is repository documentation, not public website content. Deploy only `Zinely/` through the existing hosting pipeline. Do not upload this directory, reports, drafts or credentials to the website.

The revised strategy is in [strategy.md](strategy.md). [backlog.json](backlog.json) owns the queue, [facts.json](facts.json) owns permitted business claims, and [runbook.md](runbook.md) defines each daily run. The first implementation was prepared October 1, 2026. It does not establish production deployment or search indexing.

From the repository root, using Python 3.12 or newer:

```powershell
python scripts/seo.py build
python scripts/seo.py check
python -m unittest discover -s scripts/tests
python scripts/seo.py live --output seo/reports/live-latest.json
```

`build` checks public HTML, then regenerates the sitemap, RSS and content hashes. `check` performs the checks without modifying those files and fails if they are stale. The script checks local links/assets, fragment destinations, H1 count, titles, descriptions, canonical destinations, Open Graph URLs, parseable JSON-LD and obvious indexing blocks. It deliberately reports legacy template links as warnings: a passing static check does not prove rendering, indexing, schema eligibility, page speed or deployment.

`live` makes bounded HTTP requests with an honest audit user agent. It reports redirects, canonicals and header indexing directives, and checks that a missing page returns 404/410. Treat a 403 as an access investigation, not proof of a search-engine block. Inspect Search Console's live URL test and Cloudflare's verified-bot events before drawing that conclusion. The script exits nonzero for responses needing review. Run once daily, not repeatedly to get around a block.

Sitemap `lastmod` is preserved when the HTML hash is unchanged. Review dates when changing only shared boilerplate; do not manufacture article freshness. An article's `datePublished` remains its original publication date, and `dateModified` changes only for a substantive editorial update. RSS comes from Article/BlogPosting JSON-LD, so every published article needs a headline, description and publication date. A draft belongs outside `Zinely/` and does not enter RSS or the sitemap.

Do not assume all changes in the checkout belong to SEO. Another task may be editing the website. Read the current diff before editing, coordinate ownership, and never commit, discard, overwrite or publish unrelated changes. For unattended runs, keep proposals in `seo/drafts/` and record the base revision. Move approved work into `Zinely/` only during an authorized implementation/release.

The scheduled routine initially prepares work for review. It does not buy tools, send outreach, post in communities, change Cloudflare security, or publish content. Once a publishing workflow is selected, explicitly record its branch, build command, deployment method and verification step here; do not guess a Cloudflare worker name or assume pushing a branch deploys it.

## Access still needed for measurement and release

- Search Console: existing property access or a recent export of queries, pages, countries and dates. The supplied July plan says the property is verified; access was not verified in this task.
- Bing Webmaster Tools: confirm the property and sitemap submission. Submission and indexing are separate.
- Cloudflare: inspect bot/WAF events and hosting configuration; no blanket disabling of bot protection.
- Conversion measurement: use the site's chosen analytics provider and the estimate/contact flow. No analytics destination was configured by this task.
- Deployment: confirm the existing production pipeline. Local changes and a successful check do not mean production changed.

Keep these limitations visible in reports. Never invent traffic, rankings, conversion rates, keyword volumes or qualified leads when the data is unavailable.
