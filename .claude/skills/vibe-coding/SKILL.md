---
name: vibe-coding
description: Vibe Coding Incubator — AI-first developer training. Build real apps with LLMs, prompting patterns, and agentic workflows from idea to deployed product. Covers the core methodology and how it pairs with Claude Code.
user-invocable: true
---

# Vibe Coding Incubator

## What it is
An AI-first development training program — teaching how to build real, deployed applications using LLMs as the primary coding engine.

URL: https://vcinc.ai/

## Core methodology: vibe coding

Traditional coding: you write every line.
Vibe coding: you direct the AI, review the output, and steer — the AI writes.

```
You (director)     AI (implementer)
     │                    │
     ▼                    ▼
  describe → [LLM] → code → review → ship
     ↑                                 │
     └──────── refine if needed ───────┘
```

## The three skills vibe coding trains

### 1. Prompting precision
Translating intent into instructions the model can execute without ambiguity.

Bad: "Make it better"
Good: "Refactor the auth flow to use JWT tokens instead of sessions. Keep the existing user model schema."

### 2. Output evaluation
Knowing whether the generated code is correct without reading every line.
- Does it run?
- Does it do what I asked?
- Are there obvious security holes?
- Is the structure extensible?

### 3. Steering under uncertainty
When the AI goes off-track: how to redirect, not restart.
- Undo the last change, re-prompt with more constraints
- Break the task smaller
- Provide an example of the pattern you want

## How it pairs with Claude Code

Vibe Coding Incubator teaches the methodology. Claude Code is the primary execution environment.

| Vibe Coding Skill | Claude Code Feature |
|-------------------|-------------------|
| Prompting patterns | CLAUDE.md standing orders |
| Context management | `@file` imports, session state |
| Multi-step tasks | Agent harnesses + loops |
| Quality checks | Hooks (PostToolUse lint/test) |
| Parallel work | Worktrees + agent teams |

## The build loop (applied)

```
1. CLAUDE.md → define project identity and conventions
2. Scaffold → "Build [feature] following these conventions"
3. Review → read the diff, not every line
4. Test → run it, not just read it
5. Refine → targeted follow-up prompts
6. Ship → commit, push, deploy
```

## Common anti-patterns (what the incubator teaches you to avoid)

| Anti-pattern | Fix |
|-------------|-----|
| Mega-prompt (one giant instruction) | Break into sequential steps |
| Accepting output without running | Always run before committing |
| Prompting for style, not behavior | Describe what it should DO |
| Starting over when AI goes wrong | Undo + re-prompt with constraints |
| No CLAUDE.md | Define conventions up front |

## Stack the incubator typically covers
- Claude Code / Cursor / Windsurf as the IDE agent
- Lovable / Replit for rapid prototyping
- Supabase for backend
- Vercel / Netlify for deployment
- GitHub for version control + CI

## Key principle

> Vibe coding is not about typing less. It is about thinking more precisely — turning intent into instructions the AI can execute reliably.

The bottleneck shifts from typing to thinking. That is the skill.
