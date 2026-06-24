---
name: morning-brief
description: Automated morning brief — aggregates news, calendar, tasks, emails, and market data into a single daily summary delivered via your preferred channel (voice, Slack, email, or Telegram).
user-invocable: true
---

# Morning Brief Automation

## What it does
Runs every morning on a schedule to pull data from multiple sources, synthesize it into a personalized brief, and deliver it to you before your day starts.

## Default brief sections

| Section | Source | What it includes |
|---------|--------|-----------------|
| **News** | Twitter/X x_search, RSS | Top stories in your niche |
| **Calendar** | Google Calendar MCP | Today's meetings and deadlines |
| **Tasks** | Todo toolset / Notion | Priority tasks for the day |
| **Email** | Gmail MCP | Flagged emails needing reply |
| **Leads/Outreach** | CRM / Sheets | Follow-ups due today |
| **Market/Metrics** | Web fetch | Key business metrics snapshot |

## Setup

### Schedule (cron hook)
```json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "startup",
      "hooks": [{
        "type": "command",
        "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/morning-brief.sh"
      }]
    }]
  }
}
```

Or use Hermes cron toolset:
```
/cron add "0 7 * * 1-5" "run morning brief and send to Telegram"
```

### Delivery options
- **Voice** — Hermes Jarvis reads it aloud
- **Telegram** — hermes-telegram toolset sends a formatted message
- **Slack** — hermes-slack posts to a personal channel
- **Email** — hermes-email sends to your inbox
- **Terminal** — prints to stdout at session start

## Sample prompt (run by the cron)
```
Generate my morning brief:
1. Search Twitter for top news in [niche] from last 24h — top 3 stories
2. Check Google Calendar for today's events
3. List my top 3 priority tasks from my todo list
4. Check Gmail for any flagged emails needing reply
5. Format as a clean, scannable brief under 300 words
6. Send via Telegram
```

## Customization
- Adjust sections based on your workflow (add/remove sources)
- Set niche keywords for news filtering
- Add a "win from yesterday" section for motivation
- Include a daily focus prompt: "What's the one thing that would make today a success?"

## Key rules
- Brief should be under 300 words — scannable in 90 seconds
- Schedule for 30 min before your workday starts
- Use Agent mode for delivery (confirm once, then auto the rest)
- Review and prune sections that you skip reading — less is more
