---
name: n8n-vs-mcp
description: n8n vs MCP decision guide — when to use visual workflow automation (n8n) vs native AI tool connections (MCP), and how Claude/Hermes fit as no-code workflow builders.
user-invocable: true
---

# n8n vs MCP: Which to Use

## Quick decision guide

| Situation | Use |
|-----------|-----|
| Visual drag-and-drop workflow builder | **n8n** |
| Connecting legacy tools (Zapier replacements) | **n8n** |
| Real-time AI tool connections inside Claude/Hermes | **MCP** |
| No-code workflow building with an AI assistant | **Claude / Hermes** |
| Webhook triggers and scheduled automations | **n8n** |
| Giving Claude access to external APIs mid-session | **MCP** |
| Complex branching logic with many conditions | **n8n** |
| Simple tool calls (search, read file, query DB) | **MCP** |

## n8n strengths
- Visual canvas — see the whole workflow at once
- 400+ pre-built integrations (Slack, Sheets, HubSpot, etc.)
- Webhook triggers, cron schedules, event-driven flows
- Self-hostable (open source)
- Good for non-developers who think in flowcharts

## MCP strengths
- Native integration with Claude Code and Hermes Agent
- No UI required — Claude calls tools directly in conversation
- Dynamic — Claude decides which tools to use based on context
- Faster iteration — add a new tool in minutes with no visual workflow
- Works inside agentic loops (Claude can chain tool calls autonomously)

## Claude / Hermes as no-code builders
Claude and Hermes can **build n8n workflows for you**:
```
"Create an n8n workflow that:
1. Triggers on new Gmail with subject containing 'lead'
2. Extracts name and email
3. Adds to a Google Sheet
4. Sends a Slack notification"
```
Claude generates the n8n JSON export. Import it and you're done.

## Recommended stack
```
n8n          → scheduled triggers, webhook intake, legacy app glue
MCP          → real-time tool use inside Claude/Hermes sessions
Claude Code  → complex logic, coding tasks, agent orchestration
Hermes       → unified runtime connecting all of the above
```

## Stop tool hopping
The video's key advice: **master one tool before adding another.**

1. Start with Claude / Hermes for most tasks
2. Add n8n only when you need scheduled triggers or visual logic
3. Add MCP servers one at a time as genuine needs arise
4. Resist every shiny new tool until your current stack is solid

Common trap: spending more time configuring tools than using them. A simple Hermes skill often replaces an elaborate n8n workflow.
