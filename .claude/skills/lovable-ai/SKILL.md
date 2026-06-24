---
name: lovable-ai
description: Lovable AI — prompt-to-app builder. Describe a web app in plain English, get a working full-stack app deployed in minutes. Covers the build loop, tech stack, GitHub sync, and when to use Lovable vs Claude Code.
user-invocable: true
---

# Lovable AI

## What it is
Lovable turns a plain-English description into a deployed, full-stack web app — no environment setup, no boilerplate, no deployment config.

URL: https://lovable.dev/

## The build loop

```
Describe → Generate → Preview → Refine → Deploy
    ↑                                        |
    └────────────────── iterate ─────────────┘
```

1. **Describe** — type what you want ("a task manager with auth and a Kanban board")
2. **Generate** — Lovable writes the full app (React + Supabase or similar stack)
3. **Preview** — live preview in the browser, immediately interactive
4. **Refine** — type follow-up changes in natural language ("add a dark mode toggle")
5. **Deploy** — one click to go live on a public URL

## Tech stack Lovable generates

| Layer | Default choice |
|-------|---------------|
| Frontend | React + Tailwind CSS + shadcn/ui |
| Backend | Supabase (auth, database, storage) |
| Hosting | Lovable CDN (instant deploy) |
| Code export | Full GitHub repo sync available |

## GitHub sync

Connect your GitHub account → Lovable pushes every change to a repo.
From there: clone it, open in Claude Code, extend it manually.

```
Lovable (rapid prototype) → GitHub → Claude Code (fine-grained control)
```

## Prompt patterns that work well

**Scaffold fast:**
```
Build a [type of app] with [auth/no auth], [key feature 1], [key feature 2].
Use a clean, modern UI. Mobile responsive.
```

**Targeted changes:**
```
Add a [feature] to the [page/component]. Keep everything else the same.
```

**Fix a bug:**
```
The [button/form/page] does [wrong thing]. It should [correct behavior].
```

**Style overrides:**
```
Change the color scheme to [dark/light/brand color]. Keep the layout.
```

## When to use Lovable vs Claude Code

| Task | Use |
|------|-----|
| Prototype in < 30 min | Lovable |
| Production app with custom logic | Claude Code |
| Full-stack CRUD with auth | Lovable (then export) |
| Complex integrations / APIs | Claude Code |
| Client demo or MVP | Lovable |
| Existing codebase changes | Claude Code |

## Export to Claude Code workflow

1. In Lovable: connect GitHub repo
2. Clone the repo locally
3. Open in Claude Code
4. Continue with full code access

```bash
git clone https://github.com/your-username/lovable-project
cd lovable-project
claude  # or: code . && open claude code
```

## Limitations
- Supabase-centric — switching databases requires manual work after export
- Complex business logic hits the limits of natural language prompting faster than Claude Code
- Free tier has project limits — check current pricing at lovable.dev
