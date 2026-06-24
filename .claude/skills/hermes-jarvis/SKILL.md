---
name: hermes-jarvis
description: Hermes Jarvis — voice-activated AI control using ChatGPT real-time audio API. Open websites, apps, and trigger Hermes workflows hands-free. Includes Auto vs Agent mode configuration.
user-invocable: true
---

# Hermes Jarvis (Voice Control)

## What it does
Hermes Jarvis connects ChatGPT's real-time audio API to Hermes Agent, giving you hands-free voice control. Say a command and Jarvis opens websites, launches apps, triggers Hermes workflows, or sends messages.

## How it works
```
Voice input (mic)
    → ChatGPT real-time audio API (speech-to-text + intent)
    → Hermes Agent (task routing)
    → Tool execution (browser, apps, messaging, etc.)
    → Voice response (text-to-speech back to you)
```

## Setup checklist
- [ ] OpenAI API key with real-time audio access
- [ ] Hermes Agent running locally or on server
- [ ] Jarvis bridge configured (connects audio API to Hermes)
- [ ] Permissions set for which actions Jarvis can take
- [ ] Wake word or push-to-talk configured

## Auto vs Agent mode for Jarvis

### Auto mode (fast)
Jarvis executes immediately without confirmation.
```
You: "Open my email and draft a reply to the last message from John"
Jarvis: [opens email, drafts reply, reads it back] "Done. Reply drafted."
```
Use for: routine tasks, navigation, quick lookups.

### Agent mode (controlled)
Jarvis pauses and confirms before acting.
```
You: "Send that email"
Jarvis: "Confirm: Send draft to john@example.com with subject 'Re: Meeting'?"
You: "Yes"
Jarvis: [sends]
```
Use for: sending messages, publishing, any irreversible action.

## Speed fixes (if Jarvis feels slow)
1. Switch to a smaller/faster model for intent parsing (Haiku vs Opus)
2. Reduce tool set — only enable tools Jarvis actually needs
3. Use local TTS instead of API-based voice synthesis
4. Pre-warm the connection — keep Hermes running in background

## Example voice commands
- "Open YouTube and search for [topic]"
- "Send a Slack message to the team saying standup in 5 minutes"
- "What's on my calendar today?"
- "Draft a tweet about [topic] and show me before posting"
- "Run my morning brief"

## Permission recommendations
| Action | Recommended mode |
|--------|-----------------|
| Open websites / apps | Auto |
| Read emails / messages | Auto |
| Draft content | Auto |
| Send messages | Agent (confirm first) |
| Post to social media | Agent (confirm first) |
| Delete or modify files | Agent (confirm first) |
