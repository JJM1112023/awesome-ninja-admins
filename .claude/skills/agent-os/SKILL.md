---
name: agent-os
description: Agentic OS — the full Agent Operating System running at localhost:3737/hermes. Covers the sidebar layout, agent roster, orchestration tools, and navigation tabs inside the Hermes web UI.
user-invocable: true
---

# Agentic OS (localhost:3737/hermes)

## What it is
A locally-hosted web UI for the full Agent Operating System, built on Hermes (Nous Research agent). Runs at `localhost:3737/hermes`.

## Sidebar structure

### WORKSPACE
- **Mission Control** — top-level dashboard and overview

### AGENT ORCHESTRATION
- **Paperclip** — lead orchestrator for multi-agent task delegation
- **AI Agent Mastermind** — strategic planning and direction
- **Pipeline** — sequential task chains and workflow routing
- **Agent Kanban** — task board for tracking agent work across stages

### AGENTS
- **Claude** — Anthropic's Claude (coding, writing, reasoning)
- **OpenClaw** — open-source agent variant
- **Hermes** — Nous Research agent; the core runtime (sessions, skills, kanban, chat)
- **Antigravity** — specialized agent (extended capabilities)

## Hermes agent tabs
When you select Hermes in the sidebar, the top nav shows:

| Tab | What it does |
|-----|-------------|
| **Chat** | Text conversation with Hermes |
| **Talk** | Voice input (push-to-talk) |
| **Hermes-Jarvis** | Full voice interface with orb UI and wake word |
| **Hermes Oracle** | SEO content + WordPress publishing |
| **Studio** | Build and test with Hermes-Jarvis (95+ creations) |
| **Sessions** | Browse and resume past conversations |
| **Workspace** | File and project management |
| **MCPs** | Manage connected MCP servers |
| **Manage** | Agent settings and configuration |
| **Control Room** | System status and tool permissions |
| **Goal Mode** | Set persistent goals Claude pursues across sessions |

## Hermes-Jarvis Studio
Shows a gallery of 95 creations built with Hermes-Jarvis, including:
- Keyword Gap Tool Dashboard
- Agent Rush Browser Delegation
- Prompt Heist Stealth Prompt Engineering
- Pulse Habit Tracker
- Stillness Meditation
- Animated Sudoku Solver, Snake Game, Text Diffusion demos
- Speed Race comparisons, model-switching tools, and more

## Quick start
```
1. Start Hermes: run the Hermes Agent server
2. Open browser → localhost:3737/hermes
3. Select agent from sidebar (Hermes for most tasks)
4. Pick tab: Chat, Jarvis, Oracle, or Goal Mode
```
