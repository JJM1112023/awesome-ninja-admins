---
name: buildpartner
description: BuildPartner — AI-accelerated product development tool built on Claude Code. Covers the 10x speed methodology, how it pairs with Claude Code, and when to use it vs. building directly with the CLI.
user-invocable: true
---

# BuildPartner

## What it is
BuildPartner is an AI-accelerated development platform built on top of Claude Code — designed to help solo founders and small teams build products 10x faster without hiring engineering staff.

URL: https://buildpartner.ai/

## The 10x speed claim (where it actually comes from)

Not magic — three concrete sources of speed:

### 1. Eliminate the blank-page problem
Traditional start: set up repo, scaffold, configure tooling, write boilerplate.
With BuildPartner + Claude Code: describe what you want → working scaffold in minutes.

### 2. Skip the "how do I do X" loop
Normal dev cycle: encounter problem → search → StackOverflow → docs → implement.
AI-assisted cycle: encounter problem → ask in context → implement immediately.

### 3. Run in parallel instead of sequentially
One person can now direct multiple work streams simultaneously:
- Agent 1: writing tests
- Agent 2: implementing the feature
- You: reviewing and steering both

## How it pairs with Claude Code

```
BuildPartner            Claude Code
(opinionated layer)     (raw engine)
       │                      │
       ▼                      ▼
  templates +          full code access +
  guided prompts +     custom CLAUDE.md +
  project structure    hooks + skills
```

Use BuildPartner as the fast lane for standard SaaS patterns.
Drop into raw Claude Code when you need full control.

## The "build without a CTO" workflow

1. **Describe the product** — what it does, who uses it, core user journey
2. **Scaffold** — BuildPartner/Claude generates initial architecture
3. **Iterate in sprints** — feature by feature, each in a separate agent session
4. **Human-validation zones** — you review at each phase boundary (see /human-validation)
5. **Ship** — deploy to Vercel/Railway/Fly.io; agent handles config

## What it handles well
- CRUD SaaS apps with auth, payments, subscriptions
- Marketing sites with CMS
- Internal tools and dashboards
- API integrations
- Standard B2B product patterns

## What still needs a human
- Product strategy and market decisions
- UX that requires deep user empathy
- Novel architecture (nothing like it exists to draw patterns from)
- Security audits before launch
- Pricing and positioning

## Cost vs. hiring
- No CTO salary (~$200K+/year)
- No senior engineer (~$150K+/year)
- Claude API costs: ~$50–500/month depending on session volume
- Your time: 10–20 hrs/week directing instead of implementing

## Getting started
1. Try free at https://buildpartner.ai/
2. Define your product in one paragraph (the clearer, the faster)
3. Start with the core user journey, not the full feature set
4. Add CLAUDE.md with your tech stack preferences before the first session
