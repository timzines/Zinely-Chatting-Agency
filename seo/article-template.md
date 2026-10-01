# Zinely article design and editorial standard

Use [templates/article.html](templates/article.html) for every new guide. Keep drafts in `seo/drafts/`, outside the public website. The current published reference is `Zinely/blog/onlyfans-chatting-agency-guide/index.html`. Shared presentation lives in `Zinely/assets/editorial.css` and the optional contents enhancement in `Zinely/assets/editorial.js`; do not copy a separate stylesheet into each article.

## Drafting and release

1. Copy the template to the draft's folder. Replace every `__TOKEN__`. Keep `noindex` during drafting. Never put unresolved tokens or draft pages inside `Zinely/`.
2. Write for one audience and one search intent. Record the base revision, supporting service page, sources, claims and intended URL alongside the draft, as required by the runbook.
3. Set the title, description, canonical, OG URL, Article JSON-LD and breadcrumbs together. HTML-escape attributes and JSON-escape schema values. Publication dates are assigned on publication, never in anticipation. Preserve the original publication date when revising an article; update the modified date only for a substantive revision. Keep visible dates and schema consistent.
4. Give the draft a concrete, subject-specific illustration. Replace both asset tokens with actual repository paths and meaningful alt text. Set dimensions to the actual aspect ratio. The current workflow illustration is an example for handovers, not default art for unrelated subjects. Use the logo as the safe social preview unless a suitable share image has been prepared.
5. Before release, remove `noindex` and the draft comment, confirm no `__TOKEN__` remains, reconcile nav/footer and any current shared head includes with the published site, and place the finished page at `Zinely/blog/<slug>/index.html`. Add a matching card to the blog index. Link only to existing articles; no fake forthcoming posts.
6. Run `python scripts/seo.py build` and `python scripts/seo.py check`. Check desktop and 320/390/768px layouts, anchor destinations, keyboard navigation, image loads, FAQ controls and the estimate destination. Ensure the design still reads well with reduced motion and without JavaScript. Publishing and scheduling remain governed by the user's authorization and the runbook.

## The reading experience

- **Hero:** category, one H1, a short deck, honest byline/date/read time, and a useful illustration with a caption. Keep the heading in sentence case. Accenting a phrase is optional; don't force a line break to fit one screen.
- **Contents:** four to seven descriptive links that match the article's section IDs. The shared layout makes this sticky on desktop and compact on mobile. Every section has a stable anchor and small section label.
- **Body:** one concrete opening scenario, then a direct answer. Short paragraphs, descriptive H2s and occasional H3s. Use lists only where readers compare options or follow steps. No wall of small cards.
- **Visual rhythm:** use two or three explanatory visuals per long guide. A workflow, annotated evidence, comparison, or worked calculation should explain something the prose cannot explain as quickly. Use a caption to distinguish real evidence from an illustrative example. Avoid decorative dashboard screenshots that pretend to be real results.
- **Decision support:** include an actionable question, comparison or checklist specific to the topic. A `.ed-callout` is a useful reading pause, not another sales pitch.
- **End:** related links and one clear estimate offer that says what the reader receives. Keep the top navigation label **Message us**. Describe 24/7 human chatting separately from the usual 24-hour onboarding target.

## Copy that sounds like an operator

Use concrete situations: a fan repeats a question after a shift change; a creator has no approved offer ready; two teams overlap during a takeover. Explain who does what and why it matters. Delete filler introductions, exaggerated competitor attacks, sales clichés, invented ratios and claims that fans can never notice a different chatter.

Use `facts.json` for commercial terms. Separate gross from net, cumulative from monthly, and platform fees from agency commission. State assumptions beside hypothetical calculations. Case evidence needs its platform, period and revenue basis. Never turn an account result into a forecast for everyone.

24/7 means ongoing human coverage across shifts. 24-hour onboarding is the current target, subject to preparation and agreed access. An estimate request is not consent to begin managing an account.

FAQs should answer genuine remaining questions. If adding FAQPage JSON-LD, derive it from the final visible questions and answers so the two match. Do not add schema for content the reader cannot see.

## Available shared components

Use the class names below rather than one-off inline styles. Copy markup from the published reference and adapt the content, keeping the semantic elements intact.

| Component | Classes / markup | Best use |
| --- | --- | --- |
| Illustrated hero | `.ed-hero`, `.ed-deck`, `.ed-byline`, `figure` | One idea and one purposeful visual |
| Reading layout | `.ed-layout`, `nav.ed-toc`, `article.ed-body` | Responsive contents and comfortable line length |
| Numbered section | `section.ed-section[id]`, `.ed-section-num`, `h2` | Scannable chapters and stable anchors |
| Diagram | `figure.ed-figure`, `.ed-label`, `figcaption` | Workflow or evidence with source/context |
| Handover | `.ed-handoff`, `.ed-shift`, `.ed-shift-next` | Before/after steps, with text alternatives |
| Comparison | `.ed-split` | Two actual alternatives, stacked on mobile |
| Table | `.ed-table > table`, `caption`, scoped `th` | Compact comparisons; local horizontal scroll on small screens |
| Worked fee | `.ed-fee-total`, `.ed-fee-bar`, `.ed-fee-legend` | Labelled illustrative allocation; text carries every figure |
| Questions | `ol.ed-questions` | Specific review questions with a short explanation |
| FAQ | `.ed-faq > details > summary` | Native keyboard-accessible disclosure; never auto-copy |
| Related reading | `.ed-next`, `.ed-related` | Existing contextual links |
| Closing offer | `.ed-cta`, `.ed-cta-action` | Clear next action linking to `/contact#estimate` |

Motion should clarify state changes and remain brief. Use restrained entrance, hover and disclosure movement; no constant motion beside long passages. All decorative animation must respect `prefers-reduced-motion`. Body text and anchor links must remain usable without JavaScript.
