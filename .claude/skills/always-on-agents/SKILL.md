---
name: always-on-agents
description: Always-on agentic OS — running 3 AI agents 24/7 for 30 days. Covers the complete stack: CLAUDE.md for persistent memory, MCP for tool connections, and a setup you can build in under 30 minutes.
user-invocable: true
---

# Always-On Agentic OS

## The experiment
3 AI agents, running around the clock, for 30 days.
Setup time: under 30 minutes.
Stack: Claude Code + CLAUDE.md + MCP servers.

## Why CLAUDE.md is the backbone

CLAUDE.md is not just instructions — it is the agent's **persistent memory and identity**.

```
Without CLAUDE.md:         With CLAUDE.md:
Each session = amnesia      Each session = picks up where it left off
Agent forgets context       Agent knows the project, the rules, the state
You re-explain every run    Agent acts on standing orders
```

For always-on agents, treat CLAUDE.md as the brain state that survives session restarts.

## The three-layer CLAUDE.md stack

```
~/.claude/CLAUDE.md          ← global agent identity (who this agent is)
./CLAUDE.md                  ← project context (what this project is)
./CLAUDE.local.md            ← runtime state (where we left off — gitignored)
```

**Global (~/.claude/CLAUDE.md)** — agent persona, default behaviors, tool preferences:
```markdown
# Identity
You are a continuous operations agent. You run unattended.
After each task, log your output to /log/session.md.
Never stop for clarification on routine tasks — use best judgment.
```

**Project (./CLAUDE.md)** — project rules, commit conventions, domain knowledge:
```markdown
# This project
Monitoring target: [system/API/workflow]
Alert threshold: [condition]
Output format: [format]
Escalation path: [where to route blockers]
```

**Local (./CLAUDE.local.md)** — current session state, handoff notes, temp context:
```markdown
# Session state
Last run: 2026-06-24 07:00
Last output: /log/2026-06-24.md
Pending: [any open items]
Next run: scheduled 08:00
```

## MCP: the tool layer

MCP servers connect the agent to real systems without custom code:

| MCP Server | What it gives the agent |
|------------|------------------------|
| Gmail | Read/send email |
| Slack | Post to channels, read threads |
| Google Calendar | Check schedule, create events |
| GitHub | Open PRs, read issues, push code |
| Notion | Read/write workspace |
| Filesystem | Read/write local files and logs |

**Add to your environment config** (not in code):
```json
{
  "mcpServers": {
    "gmail": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-gmail"] },
    "slack": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-slack"] },
    "filesystem": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "/workspace"] }
  }
}
```

## The 30-minute agentic OS setup

### Minute 0–5: Global CLAUDE.md
Write your agent's standing orders. Who it is, how it behaves when unattended, where it logs.

### Minute 5–10: Project CLAUDE.md
Describe the specific project: what to monitor, what to produce, what to ignore.

### Minute 10–15: MCP connections
Add the MCP servers your agent needs. Start with 2–3 — filesystem always, then one comms tool.

### Minute 15–20: First session test
Run a session manually. Watch what the agent does. Fix any CLAUDE.md gaps you observe.

### Minute 20–25: Trigger setup
Set the schedule (cron) or webhook. Use Claude Managed Agents or a cron job + Claude CLI.

### Minute 25–30: Log path
Confirm the agent writes a log each run. Logs are your only visibility into unattended runs.

## What 30 days of running 3 agents taught

**1. Log everything.** Unattended agents are invisible. The log is the only record of what happened.

**2. CLAUDE.md drifts.** Revisit it weekly. Add rules that would have caught mistakes. Prune rules it already follows.

**3. Fewer tools = more reliable.** Every MCP server is a failure point. Start minimal, add as needed.

**4. Escalation path is mandatory.** The agent needs to know: "If I hit a blocker I can't resolve, where do I send it?" Email, Slack, or a file — but define it before running unattended.

**5. Sessions do not share memory.** Each Claude Code session starts fresh unless you write state to disk and read it back. Use CLAUDE.local.md or a log file as the handoff.

## State persistence pattern

```markdown
# In CLAUDE.md (or agent loop instructions):
At the start of each session:
  1. Read CLAUDE.local.md for current state
  2. Read /log/latest.md for last output

At the end of each session:
  1. Write summary to /log/YYYY-MM-DD.md
  2. Update CLAUDE.local.md with: last run date, pending items, next step
```

## Running 3 agents in parallel

One machine, three agents, different roles:

| Agent | Role | Schedule |
|-------|------|----------|
| Agent 1 | Monitoring / alerting | Every 15 min |
| Agent 2 | Daily report generation | 7am daily |
| Agent 3 | Inbox triage + response drafts | 8am + 12pm + 5pm |

Use separate project directories with separate CLAUDE.md files. Each agent has its own identity and standing orders.

## Key principle

> CLAUDE.md is not documentation. It is the agent's operating system — the persistent layer that makes a stateless model behave like a continuous operator.

The agent changes. The sessions end. CLAUDE.md stays.
