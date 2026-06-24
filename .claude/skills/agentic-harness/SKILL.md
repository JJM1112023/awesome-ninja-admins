---
name: agentic-harness
description: Agentic harness engineering — the model is the brain (rented), the harness is the body (owned). Covers the agent loop, harness anatomy, content forge pattern, voice-reviewer agent, handoff prompts, and the build-with-frontier/execute-with-open-source strategy.
user-invocable: true
---

# Agentic Harness Engineering

## The core equation
```
AI Agent = Model + Harness

Model  = the brain  (intelligence you rent — swappable, replaceable)
Harness = the body  (context, tools, checks, memory — the part you own)
```

When Fable 5 got pulled overnight, builders who owned their harness lost nothing. The brain swapped out; the body kept running.

## The agent loop
```
READ → PICK A TOOL → RUN → CHECK → DONE?
  ↑                                    |
  └────────────────────────────────────┘ (if not done, loop)
```

1. **Read** — understand current state, goal, and available context
2. **Pick a tool** — select the best tool for the next action
3. **Run** — execute it
4. **Check** — verify the output meets the criteria
5. **Done?** — if yes, stop and deliver; if no, loop back to Read

## Harness anatomy

```
project/
├── CLAUDE.md                    ← instructions, rules, identity
├── .claude/
│   ├── agents/                  ← specialized sub-agents
│   │   ├── researcher.md
│   │   ├── writer.md
│   │   └── voice-reviewer.md
│   ├── skills/                  ← reusable workflows (this file is one)
│   ├── hooks/                   ← automated triggers (lint, checks, alerts)
│   └── settings.json            ← permissions, tool allowlists
└── knowledge/                   ← domain knowledge base
    ├── brand-voice.md
    ├── style-guide.md
    └── source-rules.md
```

### Knowledge base
The domain-specific context that makes the harness yours:
- Brand voice and tone guidelines
- Style rules and formatting standards
- Source requirements (what counts as a credible citation)
- Business-specific terminology and constraints

### CLAUDE.md
The harness identity and standing orders. See `/advanced-claude-md` for full detail.
Key harness-specific additions:
```markdown
# Identity
You are a content forge. Your job is to produce publish-ready drafts, not to chat.

# Loop behavior
After each step, state: DONE or NEXT STEP: <what>.
Do not stop until all steps are complete or you hit a blocker.

# Quality gate
Every factual claim must have a source. Flag unsourced claims with [UNSOURCED].
```

### Agents folder
Sub-agents scoped to specific roles:
```markdown
# .claude/agents/voice-reviewer.md
---
name: voice-reviewer
description: Reviews drafts for brand voice, sourced claims, and style compliance
tools: Read, Grep
---
Read the draft at @drafts/current.md.
Check every factual claim — flag any without a cited source as [UNSOURCED].
Check tone against @knowledge/brand-voice.md.
Return: APPROVED or REWRITE: <specific issues>.
```

### Hooks
Automated quality gates that fire without being asked:
```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": ".claude/hooks/check-sources.sh"
      }]
    }]
  }
}
```

## The content forge (live example)
A harness that ran ~35 minutes unattended and produced a full content batch:

```
Harness goal: produce 5 publish-ready blog posts on [topic]

Loop:
1. Researcher agent → pulls sources, saves to knowledge/session-sources.md
2. Outline agent → creates 5 outlines from sources
3. Writer agent → drafts each post (loops per post)
4. Voice-reviewer agent → checks each draft
   → APPROVED: move to /publish-queue/
   → REWRITE: writer loops again with specific notes
5. SEO agent → adds meta, title tags, slug
6. Done: all 5 posts in /publish-queue/ ready to ship
```

## The voice-reviewer agent
Catches problems the main agent misses because it's in the same context:
- Runs in a **fresh sub-agent context** — no bias toward what it just wrote
- Flags `[UNSOURCED]` claims and forces a rewrite loop
- Checks against brand voice doc
- Returns binary: `APPROVED` or `REWRITE: <issues>`

This is the quality gate that makes unattended runs trustworthy.

## The handoff prompt
How to restart a harness in a fresh session without re-explaining everything:
```
Load context: @CLAUDE.md @knowledge/ @.claude/agents/
Current state: [describe where the previous session left off]
Continue from: [specific next step]
Goal: [end state]
```
Keep the handoff prompt in a file (e.g., `handoff.md`) and update it at the end of each session.

## Build with frontier, execute with open source
```
Design & architect  →  Frontier models (Opus, Sonnet, GPT-4, Gemini)
Routine execution   →  Open source (local Ollama, vLLM, Venice AI)
```

Swap the brain, keep the body. The harness runs the same regardless of which model is inside it. This makes you resilient to:
- Model price increases
- Model deprecations (like Fable 5)
- API outages
- Cost blowouts on high-volume runs

## Your job moved up
You're no longer writing the code or the content. You're:
1. **Designing** the loop (what steps, in what order)
2. **Writing** the quality criteria (what counts as done)
3. **Curating** the knowledge base (what context the harness uses)
4. **Directing** the agents (approving, redirecting, iterating on the harness itself)

## Getting started: steal a good one
Don't build from scratch. Find a harness that's close to your use case and adapt it:
- SAFe Agentic Workflow: https://github.com/bybdesign/safe-agentic-workflow
- This repo's `.claude/` folder is itself a harness
- The AEO audit rig (10-agent pipeline) is a good template for multi-step research tasks

## Tools used in the video
- **Opencode** (https://opencode.ai) — open-source coding agent
- **VSCodium** (https://vscodium.com) — open-source VS Code without telemetry
- **Venice AI** (https://venice.ai) — private, uncensored model hosting
- **Claude Code** — the harness runner used for the content forge and directory builds

## Key principle
> "The future belongs to builders who can create their own solutions.
> Stop depending on others' platforms and start building your own digital empire."

A harness is a durable asset. You don't need to be a developer to own one.
