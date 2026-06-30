---
name: claude-seo
description: Claude SEO — 12 open-source Claude Code skills that replace a $5–10K/month SEO agency stack. Covers parallel SEO audits, health scores, PDF reports, schema markup, GEO (AI search optimization), sitemap, hreflang, and competitor analysis. One install command.
user-invocable: true
---

# Claude SEO: 12-Skill SEO Stack

## The core insight

SEO agencies charge $5–10K/month for audits, schema, content, and reporting. Claude SEO is 12 Claude Code skills that do the same work — open source, no subscriptions, no dashboards. Five agents run your entire audit in parallel and hand you a PDF report you can send to clients.

The most important skill in the set is **GEO** (Generative Engine Optimization) — optimizing your content so ChatGPT, Gemini, and Perplexity cite you instead of your competitors. Traditional SEO gets you on Google. GEO gets you into AI answers.

**Install:** https://claude-seo.md  
**GitHub:** https://github.com/AgriciDaniel/

## Install (one command)

```bash
# Claude SEO (12 skills)
# Run the install command from the GitHub repo:
# https://github.com/AgriciDaniel/

# Claude Code + VS Code (one command setup):
# https://github.com/AgriciDaniel/
```

After install, all 12 skills are available as slash commands in your Claude Code session.

## The 12 skills (overview)

| Skill | What it does |
|-------|-------------|
| `/seo-audit` | Full website audit — 5 parallel agents, health score |
| `/seo-report` | Generates a PDF report from audit results |
| `/schema` | Analyzes and generates JSON-LD schema markup |
| `/geo` | GEO analysis — optimizes for AI search citation |
| `/content` | Content optimization for target keywords |
| `/images` | Image alt text audit and optimization |
| `/sitemap` | Sitemap generation and validation |
| `/hreflang` | International SEO hreflang tag analysis |
| `/competitor` | Competitor page analysis and gap identification |
| *(3 more)* | *(see GitHub repo for full list)* |

## The parallel SEO audit (5 agents)

Traditional SEO audits run checks sequentially — slow and serial. Claude SEO runs 5 agents simultaneously:

```
Agent 1: Technical audit (crawlability, indexation, speed signals)
Agent 2: On-page analysis (titles, metas, headings, keyword density)
Agent 3: Content quality (thin content, duplication, readability)
Agent 4: Schema markup check (missing, invalid, or incomplete)
Agent 5: GEO readiness (AI citation signals, E-E-A-T, structured answers)
         ↓
All 5 reports → merged into single SEO Health Score
```

**Output:** A scored breakdown by category (Technical / On-Page / Content / Schema / GEO) with prioritized action items.

## SEO Health Score

The audit produces a 0–100 score per category and an overall site health score:

```
Technical SEO:     82/100  ✅ Core Web Vitals passing
On-Page SEO:       64/100  ⚠️  3 pages missing meta descriptions
Content Quality:   71/100  ⚠️  2 thin content pages found
Schema Markup:     45/100  ❌ Missing LocalBusiness schema on 8 pages
GEO Readiness:     38/100  ❌ No FAQ schema, no expert attribution
──────────────────────────
Overall Score:     60/100
```

Use the score as a client deliverable ("here's where your site stands") and as a before/after benchmark.

## PDF report generation

After the audit, `/seo-report` converts results into a formatted PDF:

```
/seo-report --site https://clientsite.com --output client-report.pdf
```

The PDF includes: executive summary, health score chart, category breakdowns, prioritized recommendations, and quick wins. Designed to hand directly to clients — no additional formatting needed.

## Schema markup analysis

`/schema` crawls a URL, identifies missing or malformed schema, and generates the correct JSON-LD:

```
/schema https://clientsite.com
```

Output example:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Client Business Name",
  "address": { ... },
  "telephone": "...",
  "openingHours": "Mo-Fr 08:00-18:00",
  "priceRange": "$$"
}
```

Paste directly into the site's `<head>`. Claude validates syntax and checks for required fields before generating.

## GEO — Generative Engine Optimization

**The most important skill in the set.** Traditional SEO targets Google's crawlers. GEO targets AI answer engines: ChatGPT, Gemini, Perplexity, Claude.

When someone asks an AI "best [service] in [city]?" — the AI cites a source. GEO makes that source yours.

### What GEO optimizes for

| Signal | What it means | How to implement |
|--------|--------------|-----------------|
| **Structured answers** | Content in Q&A format AI can lift directly | Add FAQ schema, use H2 questions |
| **Expert attribution** | Named authors with credentials | Author bio + `Person` schema with credentials |
| **E-E-A-T signals** | Experience, Expertise, Authority, Trust | Case studies, testimonials, certifications |
| **Cited sources** | Links to authoritative external sources | Add citations in content |
| **Direct answers** | Lead paragraphs that answer the question immediately | Invert pyramid: answer first, detail after |
| **Entity coverage** | Thorough topical coverage, not keyword stuffing | Cover related entities, not just the target keyword |

### GEO audit output

```
/geo https://clientsite.com --query "best roofing company in Austin"

GEO Readiness: 38/100

✅ Has LocalBusiness schema
❌ No FAQ schema (AI engines can't extract Q&A)
❌ No named author with credentials on service pages  
❌ Content doesn't lead with direct answer
❌ Zero external citations on key pages
⚠️  Thin topical coverage — only 1 page on "roof repair"

Recommended fixes:
1. Add FAQ schema to top 5 service pages (highest impact)
2. Add author bio with credentials to all service pages
3. Rewrite intro paragraphs to lead with direct answers
4. Add 2–3 credible external citations per page
```

## Quality gates and safeguards

Built-in checks prevent common errors before changes are applied:

- **Schema validation** — JSON-LD is checked for syntax errors and required fields before output
- **Duplicate detection** — flags existing schema so you don't double-add
- **Crawl limit** — audit respects `robots.txt` and rate limits
- **Dry run mode** — shows changes before applying them
- **Human validation zone** — high-impact changes (schema injection, sitemap replacement) require explicit confirmation

## VS Code + Claude Code setup

The one-command VS Code + Claude Code installer (from the GitHub repo) sets up:
- VS Code with Claude Code extension pre-configured
- All 12 SEO skills installed
- A starter CLAUDE.md for SEO projects

Recommended CLAUDE.md addition for SEO work:
```markdown
# SEO context
Target market: [city / region / niche]
Primary keyword clusters: [list]
Competitors: [site1.com, site2.com, site3.com]
Schema types needed: LocalBusiness, Service, FAQ, Article
GEO priority: [ChatGPT / Gemini / Perplexity]
```

## Key principle

> Traditional SEO gets you ranked on Google. GEO gets you cited by AI. Agencies charge $5–10K/month for both. Claude SEO does it in one command for free.
