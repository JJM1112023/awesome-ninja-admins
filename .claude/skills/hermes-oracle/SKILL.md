---
name: hermes-oracle
description: Hermes Oracle — one-click SEO blog post publishing. Pulls trending news from Twitter/X, generates SEO-optimized content, and publishes to WordPress automatically.
user-invocable: true
---

# Hermes Oracle

## What it does
Hermes Oracle is a specialized agent that watches Twitter/X for trending topics in your niche, writes SEO-optimized blog posts about them, and publishes directly to WordPress — all in one click.

## Workflow

```
1. Pull trending topics  →  Twitter/X search via x_search tool
2. Select relevant news  →  Filter by niche/keywords
3. Generate SEO content  →  Write optimized post (title, body, meta, tags)
4. Add images           →  Generate or source relevant visuals
5. Publish to WordPress →  Post via WordPress REST API
6. Outreach (optional)  →  Share to social, email list, or DM
```

## Setup checklist
- [ ] Hermes Agent running with `x_search` toolset enabled
- [ ] WordPress API credentials configured (site URL + application password)
- [ ] Niche keywords / topic filters defined
- [ ] Image generation tool connected (optional: image_gen toolset)
- [ ] Posting schedule set (daily, weekly, or trigger-based)

## Trigger command
```
/oracle [niche keywords]
Example: /oracle "AI automation tools for small business"
```

## SEO post structure Hermes generates
1. **Title** — keyword-rich, under 60 chars
2. **Meta description** — 150–160 chars with primary keyword
3. **H1 / H2 headings** — keyword hierarchy
4. **Body** — 800–1500 words, natural keyword density
5. **Internal links** — links to 2–3 existing posts
6. **Tags & categories** — auto-assigned from keywords
7. **Featured image** — generated or sourced

## Lead generation extension
Oracle can also run outreach after publishing:
- Tweet the post with relevant hashtags
- DM targeted Twitter accounts with the post link
- Add post to email newsletter queue

## Key rules
- Always review generated content before publishing in Agent mode
- Use Auto mode only for trusted niches you've already validated
- Check for factual accuracy — LLMs can hallucinate trending news details
- Publish frequency: 1–3 posts/day max to avoid Google spam flags
