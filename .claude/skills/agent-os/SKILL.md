---
name: agent-os
description: Hermes Agent Operating System — the full stack of agents, skills, and tools that work together as a personal AI operating system. Entry point for understanding how all Hermes components fit together.
user-invocable: true
---

# Agent Operating System (Agent OS)

## What it is
A personal AI operating system built on top of Hermes Agent. Rather than a single agent doing everything, Agent OS is a coordinated team of specialized agents, skills, and integrations that operate together — like apps on a phone, but each app is an AI agent.

## Core components

| Component | Role |
|-----------|------|
| **Hermes Agent** | The runtime — routes tasks, manages memory, connects platforms |
| **Hermes Oracle** | SEO + content publishing agent (Twitter trends → WordPress posts) |
| **Hermes Jarvis** | Voice interface — hands-free control via ChatGPT real-time audio |
| **Skills (.md files)** | Reusable workflows loaded on demand |
| **Memory layer** | Persistent context across sessions (Obsidian / NotebookLM MCP) |
| **Paperclip** | Orchestrates teams of sub-agents for complex multi-step work |
| **MCP integrations** | External tool connections (Obsidian, NotebookLM, browsers, etc.) |

## Two operating modes

### Auto mode
- Faster execution
- Hermes acts without asking for confirmation
- Use for trusted, repeatable workflows (posting, sending, scheduling)

### Agent mode
- More control — Hermes confirms before acting
- Use for high-stakes or one-off tasks (sending outreach, publishing new content)

## Adjusting permissions
Permissions are set per toolset in Hermes config. Tighten permissions for:
- External API calls (emails, social posts)
- File writes outside the project
- Any destructive or irreversible actions

## Learning path
1. Start with one tool — master it before adding more (avoid tool hopping)
2. n8n → good for visual workflow builders and legacy integrations
3. MCP → good for Claude/Hermes native tool connections (no-code, more powerful)
4. Claude Code → good for local dev, coding tasks, complex agent orchestration
5. Hermes Agent OS → brings all of the above together under one runtime

## Getting updates
The Agent OS zip (latest agents, skills, configs) is distributed via the AI Profit Boardroom community. Updates include new agents, model switches, and community-built workflows.
