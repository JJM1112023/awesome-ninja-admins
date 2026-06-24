---
name: autoresearch
description: Karpathy-style auto-research loop — Claude autonomously researches a topic, generates hypotheses, tests them, and iteratively improves its own knowledge base.
user-invocable: true
---

# Auto-Research (Karpathy Approach)

## What it is
A self-improving research loop where Claude researches a topic, produces findings, critiques its own findings, and iterates — getting progressively better output without constant human input.

## Core loop
```
1. Research      → gather information on the topic
2. Synthesize    → produce structured findings / hypothesis
3. Critique      → find weaknesses, gaps, counterexamples
4. Improve       → refine findings based on critique
5. Verify        → check findings against source or tests
6. Save          → write a skill.md or doc with stable knowledge
7. Repeat        → loop until no new improvements found
```

## Setup

### Step 1 — Define the research target
```text
Research target: "best practices for rate limiting HTTP APIs in Node.js"
Sources: web search, official docs, GitHub examples
Output format: structured markdown with code examples
```

### Step 2 — Run the research agent
```text
Use a subagent to research: <target>
Search the web, read docs, collect 3-5 authoritative sources.
Produce a structured summary with: key findings, code patterns, gotchas.
```

### Step 3 — Run the critique agent (fresh context)
```text
Use a subagent to critique this research summary: @research-draft.md
Find: gaps, outdated info, missing edge cases, unverified claims.
Return a numbered list of improvements.
```

### Step 4 — Incorporate and save
```text
Update @research-draft.md based on the critique findings.
When no new improvements are found in a critique pass, save as a finalized skill.
```

## Key components
- **Research agent** — searches, reads, collects raw material
- **Synthesis agent** — structures raw material into findings
- **Critique agent** — adversarial review from a clean context
- **Judge** — decides when the loop has converged (no new improvements)

## Applications
- Build a knowledge base about a new codebase you're inheriting
- Research competitor products and summarize differences
- Stay current on a fast-moving technology (run weekly)
- Generate reference docs from underdocumented internal systems
- Pre-research before starting a complex feature

## Convergence signal
Stop the loop when the critique agent returns fewer than 2 meaningful improvements, or when the same improvements appear twice in a row.

## Output
Save stable knowledge as `.claude/skills/<topic>/SKILL.md` so it auto-loads in future sessions.
