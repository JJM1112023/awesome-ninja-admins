---
name: paperclip-teams
description: Paperclip-orchestrated agent teams — run a lead orchestrator that coordinates multiple specialized sub-agents using local or free Claude Code instances for complex multi-step work.
user-invocable: true
---

# Paperclip Agent Teams

## What it is
Paperclip is an orchestration layer that coordinates a team of specialized AI agents. The lead agent (Paperclip) breaks work into tasks, assigns them to sub-agents, collects results, and assembles the final output — similar to a project manager directing a team.

## Architecture
```
Paperclip (Orchestrator)
├── Research Agent    → gathers information
├── Writer Agent      → produces content
├── SEO Agent         → optimizes content
├── Publisher Agent   → posts to platform
└── Outreach Agent    → distributes and promotes
```

## Local / free Claude Code setup
Paperclip can coordinate sub-agents running on free or local Claude Code instances:
- Use `claude -p "task"` in non-interactive mode per sub-agent
- Run multiple instances in parallel with shell scripting
- No paid API required if using local models via Ollama/vLLM as backends

```bash
# Example: Paperclip-style fan-out with local Claude Code
echo "Research AI trends for 2026" | claude -p - > research.txt &
echo "Research top AI tools for SMBs" | claude -p - > tools.txt &
wait
# Orchestrator combines results
cat research.txt tools.txt | claude -p "Synthesize these into one SEO post"
```

## Omni-channel CRM variant (community build)
A multi-layer system demonstrated by a community member:
```
Layer 1: Data ingestion (leads from multiple sources)
Layer 2: Enrichment (research each lead)
Layer 3: Segmentation (categorize by intent/niche)
Layer 4: Outreach (personalized messages per channel)
Layer 5: Follow-up (timed sequences per response)
```
Built for travel sites and app-based businesses. Each layer is a separate agent.

## Automated image + blog SEO workflow (community build)
```
Trigger: new trending topic detected
→ Image generation agent: create featured image
→ Blog writer agent: write SEO post
→ Optimizer agent: add meta, tags, internal links
→ Publisher agent: post to WordPress with image
→ Social agent: tweet + schedule follow-ups
```

## Key rules
- Orchestrator should never do the actual work — only delegate and assemble
- Each sub-agent gets a clean context scoped to its single task
- Pass outputs explicitly — sub-agents don't share memory
- Use structured output tokens: `DONE`, `FAIL: reason`, `OUTPUT: <result>`
- Log every sub-agent result before the orchestrator proceeds to the next step
