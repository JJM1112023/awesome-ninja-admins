---
name: wispr-flow
description: Wispr Flow — system-wide voice-to-text for Mac. Dictate into any app including Claude Code, terminals, and chat interfaces. Covers setup, dictation patterns, and voice prompting for agentic workflows.
user-invocable: true
---

# Wispr Flow

## What it is
Wispr Flow is a system-wide voice dictation tool for Mac — it works in any text field, any app, including Claude Code's chat, terminal prompts, and CLAUDE.md files.

URL: https://wisprflow.com/

## Why it matters for agentic work

Typing long, precise prompts is slow. Voice is 3–4x faster than typing for most people.

For Claude Code specifically:
- Dictate multi-paragraph CLAUDE.md sections
- Voice-describe features for the agent to implement
- Narrate steering corrections without breaking flow
- Capture ideas immediately as they come, not after you've opened a terminal

## Setup

1. Install Wispr Flow on Mac
2. Set your activation shortcut (default: hold `fn` or a custom key)
3. Select any text field → activate → speak → Wispr transcribes and types for you
4. Works in: VS Code, terminal, browser, Slack, Claude.ai, Claude Code web

## Dictation patterns for Claude Code

### Feature description (voice-to-CLAUDE.md)
Hold shortcut, speak:
```
"Add to CLAUDE.md: when generating API routes, always include input validation 
with Zod schemas and return consistent error shapes with a code, message, and 
details field."
```

### Steering a running agent (voice correction)
```
"Actually, stop. Use a server component here instead of client. 
Re-do the data fetching on the server side and pass props down."
```

### New session kickoff
```
"Continue from yesterday. The auth flow is done. Today's goal is the 
billing integration — Stripe checkout, webhook handler, and the 
subscription status page. Start with the webhook handler."
```

### Bug description
```
"The form submits but the loading state never clears after success. 
The spinner keeps spinning. Investigate setLoading calls in the submit handler."
```

## Voice prompting tips

**Be direct, not conversational.** Claude Code works better with commands than with questions.

| Don't say | Say instead |
|-----------|------------|
| "Could you maybe try..." | "Refactor X to use Y" |
| "What do you think about..." | "Evaluate the tradeoffs of X vs Y for this case" |
| "I was wondering if you could..." | "Implement Z" |

**Dictate structure, not prose.** For CLAUDE.md additions, speak in the format you want written.

**Pause before committing.** After dictating a long prompt, read it before hitting Enter — voice-to-text occasionally mishears technical terms.

## Common mishears to watch for

| Spoken | May transcribe as |
|--------|------------------|
| "Zod schema" | "sod schema" |
| "Claude MD" | "Cloud MD" |
| "async await" | "a sync a weight" |
| "Tailwind" | "tail wind" |
| "Supabase" | "super base" |

Add these to Wispr's custom vocabulary or just scan before submitting.

## Pairing with Claude Code web
Wispr works in the Claude Code web UI text input — activate shortcut, dictate the full prompt, release. No copy-paste needed.
