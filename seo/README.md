# Zinely daily SEO operations

This directory is the working memory for the SEO routine. It is repository documentation, not public website content. Deploy only `Zinely/` through the existing hosting pipeline. Do not upload this directory, reports, drafts or credentials to the website.

The revised strategy is in [strategy.md](strategy.md). [backlog.json](backlog.json) owns the queue, [facts.json](facts.json) owns permitted business claims, and [runbook.md](runbook.md) defines each daily run. The first implementation was prepared October 1, 2026. It does not establish production deployment or search indexing.

From the repository root, using Python 3.12 or newer:

```powershell
python scripts/seo.py build
python scripts/seo.py check
python -m unittest discover -s scripts/tests
node --test scripts/tests/analytics.test.cjs
python scripts/seo.py live --output seo/reports/live-latest.json
```

`build` checks public HTML, then regenerates the sitemap, RSS and content hashes. `check` performs the checks without modifying those files and fails if they are stale. The script checks local links/assets, fragment destinations, H1 count, titles, descriptions, canonical destinations, Open Graph URLs, parseable JSON-LD and obvious indexing blocks. It deliberately reports legacy template links as warnings: a passing static check does not prove rendering, indexing, schema eligibility, page speed or deployment.

`live` makes bounded HTTP requests with an honest audit user agent. It reports redirects, canonicals and header indexing directives, and checks that a missing page returns 404/410. Treat a 403 as an access investigation, not proof of a search-engine block. Inspect Search Console's live URL test and Cloudflare's verified-bot events before drawing that conclusion. The script exits nonzero for responses needing review. Run once daily, not repeatedly to get around a block.

Sitemap `lastmod` is preserved when the HTML hash is unchanged. Review dates when changing only shared boilerplate; do not manufacture article freshness. An article's `datePublished` remains its original publication date, and `dateModified` changes only for a substantive editorial update. RSS comes from Article/BlogPosting JSON-LD, so every published article needs a headline, description and publication date. A draft belongs outside `Zinely/` and does not enter RSS or the sitemap.

Do not assume all changes in the checkout belong to SEO. Another task may be editing the website. Read the current diff before editing, coordinate ownership, and never commit, discard, overwrite or publish unrelated changes. For unattended runs, keep proposals in `seo/drafts/` and record the base revision. Move approved work into `Zinely/` only during an authorized implementation/release.

The scheduled routine initially prepares work for review. It does not buy tools, send outreach, post in communities, change Cloudflare security, or publish content. Once a publishing workflow is selected, explicitly record its branch, build command, deployment method and verification step here; do not guess a Cloudflare worker name or assume pushing a branch deploys it.

## Measurement access and production release

- Search Console: browser access to the zinelyagency.com domain property was verified on October 1, 2026. Use the signed-in browser session and the current Performance/Indexing reports; no new connection is needed while this session remains valid.
- Bing Webmaster Tools: browser access verified for zinelyagency.com. The current HTTPS sitemap was submitted October 1, 2026 and is processing; submission is not indexing.
- Cloudflare: inspect bot/WAF events and hosting configuration; no blanket disabling of bot protection.
- Conversion measurement: GA4 account 410488217, property 557105570, web stream 15939719890, measurement ID G-TRRHR6L9Z8 verified. Optional analytics was released in 38ce856. Consult the latest measurement report for actual Realtime receipt verification; an installed script does not establish collection.
- Deployment: pushing `main` to `timzines/Zinely-Chatting-Agency` triggers the existing Cloudflare Workers Build for `zinely-chatting`, publishing `Zinely/`. Check the build and live result before marking a release deployed.

Keep these limitations visible in reports. Never invent traffic, rankings, conversion rates, keyword volumes or qualified leads when the data is unavailable.

## Analytics interpretation

`assets/analytics.js` loads GA4 only after a visitor allows analytics. Both refusal and acceptance last 180 days; Analytics settings lets visitors change their choice. Local previews send no production events. Advertising features and GA4 enhanced measurement are off. Only standard page views and explicitly coded contact-intent events are collected. Page query strings, fragments, full referring URLs and Telegram message drafts are excluded.

`estimate_start` means a visitor clicked an internal link to `/contact#estimate` or its `.html` equivalent. `telegram_click` means a visitor clicked a Telegram link; `destination` separates the community group from the sales contact. `cta_type` identifies an estimate CTA. `audience` describes the source page's topic, not a verified visitor identity. Neither event proves that a message was sent, a lead was qualified, or a client signed. Maintain those outcomes separately from owner-confirmed sales records.

Analytics excludes people who decline or block tracking, and verification visits are not acquisition results. Use Search Console for Google search impressions/clicks, GA4 for consenting visitors' on-site actions, and actual enquiry records for business results. Signed-in dashboard access is browser access, not an API connection. The daily routine can read available sessions; an expired session should be reported once without stopping other useful work.
