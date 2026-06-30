---
name: claude-managed-agents
description: Claude Managed Agents — Anthropic-hosted agent runtime. Covers the three core concepts (agent/environment/session), production checklist, four build steps, secrets management, scheduling, and cost breakdown.
user-invocable: true
---

# Claude Managed Agents

## Why most AI agents fail (the two reasons)
1. **No reliable runtime** — agents die when your laptop closes or your script crashes
2. **No safe secrets handling** — credentials get hardcoded or exposed

Claude Managed Agents fixes both: Anthropic hosts the runtime (the "landlord") and manages secrets in an isolated environment.

## Three core concepts

| Word | What it means |
|------|--------------|
| **Agent** | The AI that performs the task — given a goal and tools, it decides how to act |
| **Environment** | The configured runtime: which tools, which credentials, which model |
| **Session** | One execution run of the agent — has a start, runs the task, ends |

## Production checklist (two boxes)

### Box 1: Runs on a schedule
The agent must be triggerable without a human present:
- Cron schedule (daily, hourly, on event)
- Webhook trigger (on new email, new Slack message, etc.)
- Manual trigger (on-demand via API call)

### Box 2: Secrets held safely
Credentials are stored in the Anthropic console environment — **never in the prompt or code**:
- Gmail OAuth token → stored as environment secret
- Slack API key → stored as environment secret
- Any API key → referenced by name, injected at runtime

## Four steps to build an agent

### Step 1: Describe in plain English
Write what the agent should do as if briefing a new employee:
```
"Every morning at 7am, check my Gmail for unread emails from the last 12 hours.
Summarize each one in 2 sentences. Send the summary to the #daily-brief Slack channel."
```

### Step 2: Configure the environment
In the Anthropic console:
- Select model (Sonnet for speed/cost, Opus for complexity)
- Choose tools to enable (Gmail read, Slack post, web search, etc.)
- Set resource limits (max tokens per session, timeout)

### Step 3: Connect credentials
- Add Gmail credentials via OAuth flow in the console
- Add Slack bot token as an environment secret
- Credentials are scoped to this agent only — not shared

### Step 4: Deploy
- Set the trigger: cron schedule, webhook, or manual
- Test with a live session run first
- Promote to production deployment once verified

## Morning email brief agent (worked example)
```
Agent description:
"Check Gmail for emails received in the last 24 hours.
Ignore newsletters and automated notifications.
For each real email: extract sender, subject, and a 1-sentence summary.
Format as a Slack message with bullet points.
Post to #morning-brief channel."

Environment:
- Tools: Gmail (read), Slack (post)
- Model: claude-sonnet-4-6
- Schedule: 0 7 * * 1-5 (weekdays at 7am)
- Secrets: GMAIL_TOKEN, SLACK_BOT_TOKEN
```

## Touring the Anthropic console
Key sections:
- **Agents** — create, edit, and manage agent definitions
- **Environments** — configure runtime settings and secrets
- **Sessions** — view live and past execution logs
- **Deployments** — schedule and trigger management
- **Costs** — per-session token usage and billing

## Production readiness (honest take)
As of mid-2026:
- ✅ Reliable for scheduled, well-scoped tasks (email brief, daily report)
- ✅ Secrets management is production-grade
- ⚠️ Complex multi-step reasoning still benefits from human review
- ⚠️ Cost can grow fast if agents run too frequently or on large inboxes
- ❌ Not yet ideal for open-ended autonomous agents without guardrails

## How to actually use it today
Best fit: **replace a recurring task you currently do manually**
- Morning email triage → Slack summary
- Weekly metrics pull → Google Sheets update
- New lead notification → CRM entry + follow-up draft
- Daily SEO rank check → Slack alert on changes

## Cost breakdown
- Charged per session: input tokens (context + tools) + output tokens
- Schedule wisely: a daily agent costs ~30× less than an hourly one
- Use Sonnet (not Opus) for routine tasks — 5× cheaper, fast enough
- Set max-token limits per session to cap runaway costs
- Monitor in the console: Costs tab shows per-agent breakdown
