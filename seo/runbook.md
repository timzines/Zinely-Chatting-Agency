# Daily runbook

Owner: this Codex task. Default mode: prepare for review. Daily schedule: 09:00 Europe/Bratislava unless the user changes it. Notification rule: stay quiet if nothing meaningful changed; report a ready improvement, actionable failure, meaningful performance change or new required user action. Keep detailed records in this directory.

## Start and state

1. Work in `C:/Users/timzi/Documents/Zinely-Chatting-Agency`. Read this file, `facts.json`, `backlog.json`, the current `strategy.md`, the latest report, and the current user instructions. User decisions take precedence over this runbook.
2. Read `git status --short` and the relevant diff. Check for a run report already completed on today's local date; do not repeat the content action on rerun. Acquire an exclusive `seo/.run-lock` directory before writing. If it exists, inspect its timestamp/owner record; do not delete another active run's lock. Release your own lock in a finally step.
3. Protect other tasks' changes. Read-only checks can proceed on a dirty checkout. Put new prose/proposals in `seo/drafts/` with the base revision and intended URL; do not edit the live website, commit or deploy from a scheduled run in the default mode. No git reset/clean, automatic stashing, force pushing or unrelated commits.

## The daily actions

1. Run `python scripts/seo.py check`. If discovery files are stale, record the required rebuild; do not rewrite them during someone else's edit. Run `python scripts/seo.py live --output seo/reports/live-latest.json` once. The missing-page probe should return 404/410. Local pages awaiting release may be absent live. A 403 is not proof Googlebot is blocked; use verified bot logs/Search Console if accessible. Do not retry blocked probes in a loop.
2. Read Search Console/Bing/analytics only if connected or supplied. Record source, retrieval date and reporting window. Compare complete periods, keeping brand queries separate. Without access, record unavailable and continue to a useful task. Never infer search rank, visits, leads or indexing from HTTP 200 alone.
3. Select one unfinished queue item for today's focus and audience priority. Search current official sources for platform/policy claims. Research actual buyer language and distinguish observed results from estimates. Only one primary search intent per URL. Prefer improving the existing owner page when it already answers the question.
4. Complete one bounded output: a researched brief, a useful article draft, a proposed internal-link/metadata change, an evidence correction, or a short distribution opportunity list. At most two new full article drafts in a calendar week, at most three pending drafts/proposals at once. If the pending queue is full, improve evidence in an existing draft or do measurement/technical research; do not add filler. Existing pages can be assessed every day; they do not require daily edits.
5. For every article draft, use `templates/article.html` and follow `article-template.md` for the shared layout, illustrations and editorial rules. For an article, include the actual outline/content, target audience, primary intent, existing page it supports, source links with checked dates, approved claims, internal-link destinations, CTA and a distinctive example/checklist. Mark hypothetical figures as illustrative. Do not set `datePublished` or add a draft to the public sitemap/RSS. Never fabricate author qualifications, reviews, results, fans, screenshots or competitor prices.
6. For distribution research, identify at most three genuinely relevant destinations and cite their rules/fit. Prepare copy only. Do not post, message, email, submit forms or create profiles without explicit channel-specific user authorization.
7. Check the deliverable against `facts.json` and the source pages. Reconcile differences rather than selecting the most flattering value. Flag sensitive case-study evidence for owner approval before publishing. No passwords or raw fan records in reports.
8. Update the queue status and save `seo/reports/YYYY-MM-DD.json`: date, base commit, selected item, checks, source URLs, output path, changes, evidence limitations, blocking dependencies and next action. Include whether the work is proposed, locally implemented, deployed or verified indexed. Those are four different statuses.
9. If a new result needs attention, report the concrete deliverable and next decision briefly. Do not repeat unchanged warnings or missing-access requests every day. Release your run lock.

## Release when authorized

Review the intended file diff, factual sources and actual wording. Resolve pending claims. Move the approved page into `Zinely/`, preserve article publication dates, add contextual links and a blog index card, and run the build/check commands plus relevant tests. Inspect desktop/mobile rendering and CTA destinations. Verify only the intended files are included in the release. Use the known production pipeline and confirm live HTML/canonicals/404s after deployment. Record deployed URLs and release revision. Do not mark indexing complete until search-console evidence supports it.

Publishing authorization does not authorize buying backlinks, sending outreach, changing security settings or exposing client data. Those are separate actions with separate destinations.

## Weekly review

On Friday, summarize outputs, production releases, actual performance evidence and qualified leads by audience. Compare the selected reporting periods; explain small-sample uncertainty. Select the next three priorities. On the first Friday of a month, optionally sample a consistent small set of assistant/search questions and log date, exact prompt, visible cited URLs and context. Label it a sample, never a guaranteed ranking or share of recommendations.
