---
name: obsidian-memory
description: Persistent memory layer using Obsidian + NotebookLM MCP — store, retrieve, and cross-reference knowledge across AI sessions so context is never lost between conversations.
user-invocable: true
---

# Obsidian + NotebookLM Memory Layer

## What it solves
AI agents lose context between sessions. This memory layer gives Hermes (or Claude) persistent, searchable memory by storing knowledge in Obsidian notes and querying them via MCP.

## Architecture
```
AI Session
    ↓ writes notes / summaries
Obsidian Vault (local markdown files)
    ↓ indexed and queryable via MCP
NotebookLM MCP (semantic search over vault)
    ↓ retrieves relevant context
AI Session (next conversation)
    → loads relevant past notes automatically
```

## Setup checklist

### Obsidian
- [ ] Install Obsidian with a vault in a known local path
- [ ] Install the **Local REST API** plugin (enables MCP access)
- [ ] Configure vault path in Hermes / Claude Code settings

### NotebookLM MCP
- [ ] Install NotebookLM MCP server (`claude mcp add notebooklm`)
- [ ] Point it at your Obsidian vault or Google Drive folder
- [ ] Test with: `search my notes for [topic]`

### Hermes integration
- [ ] Enable the `memory` toolset in Hermes
- [ ] Set Obsidian as the memory backend in Hermes config
- [ ] Configure auto-save: Hermes writes session summaries to vault after each task

## Memory write patterns

### After a task
```
Save to memory: 
- What was done
- Key decisions made
- Files modified
- Outstanding items
Format: Obsidian note in /memories/YYYY-MM-DD-<task>.md
```

### After a research session
```
Save to memory:
- Topic researched
- Key findings (bullet points)
- Sources consulted
- Open questions
Format: Obsidian note in /research/<topic>.md
```

## Memory read patterns

### At session start
```
Load memory context for: [current project name]
Search vault for notes tagged #<project> created in last 30 days
Summarize findings in under 200 words
```

### On demand
```
"What do I know about [topic]?"
→ NotebookLM MCP searches vault
→ Returns relevant notes
→ AI loads them as context
```

## Learning system with Anki
Extend the memory layer to flashcard-based learning:
1. Hermes identifies key facts from a research session
2. Exports them as Anki-compatible flashcards (Q&A format)
3. Import to Anki for spaced-repetition review
4. Use for mastering tools, APIs, workflows, or new domains

## Key rules
- Keep memory notes atomic — one idea per note
- Tag consistently: `#project-name`, `#skill`, `#decision`, `#research`
- Review and prune old notes monthly — stale memory misleads the AI
- Never store credentials in Obsidian notes that sync to cloud
