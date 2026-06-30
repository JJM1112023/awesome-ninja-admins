---
name: hermes-jarvis
description: Hermes-Jarvis voice interface — the orb UI inside localhost:3737/hermes. Covers Neural Link controls (Realtime, Live, Wake word, Auto mode, Briefing, Ash persona) and how to interact.
user-invocable: true
---

# Hermes-Jarvis

## Access
Inside the Hermes web UI: `localhost:3737/hermes` → select **Hermes** in sidebar → click **Hermes-Jarvis** tab.

## The interface
A large circular orb (teal glowing core) with a HUD-style ring around it.
- Status: **NEURAL LINK · ONLINE** with live timestamp
- Prompt: *"Tap the core and speak — or enable the wake word."*
- Text fallback: type at any time and press Enter

## Bottom control bar

| Control | States | What it does |
|---------|--------|-------------|
| **Realtime** | ON / OFF | Uses real-time streaming audio API for lower latency |
| **Live** | ON / OFF | Keeps the mic open continuously (always listening) |
| **Wake word** | ON / OFF | Activates on a trigger word (hands-free start) |
| **Auto** | ON (green) / OFF | Auto mode — executes without confirmation prompts |
| **Briefing** | Button | Delivers a prepared brief (morning summary, status update) |
| **Ash (JARVIS butler)** | Persona selector | Sets Jarvis's personality/voice persona |

## Operating modes

### Auto mode (green — recommended for routine tasks)
Jarvis acts immediately. No confirmation step.
```
You: "Open my email"
Jarvis: [opens email] "Done, sir."
```

### Manual mode (Auto OFF)
Jarvis describes what it will do and waits for confirmation before acting.
```
You: "Send the draft"
Jarvis: "Send to john@example.com, subject 'Re: Meeting'?"
You: "Yes"
```

## Ash — JARVIS butler persona
Ash is the default voice persona — formal, capable, slightly British-butler in tone. The persona dropdown lets you switch to other styles. Ash responds as "JARVIS" in the chat thread.

## Interaction methods (in order of speed)
1. **Wake word** — say the wake word, then speak (fully hands-free)
2. **Tap core** — tap the orb to start a voice turn
3. **Talk tab** — push-to-talk without the orb UI
4. **Text input** — type in the bar at the bottom anytime

## Speed fixes if Jarvis feels slow
1. Turn on **Realtime** mode for lower latency streaming
2. Reduce active toolsets — fewer tools = faster routing
3. Use **Auto** mode — skipping confirmation saves a full round-trip
4. Switch to a faster model (Haiku vs Opus) for simple commands

## Example commands
- *"What's on my calendar today?"*
- *"Open YouTube and search for [topic]"*
- *"Run my morning brief"*
- *"Draft a tweet about [topic] and show me first"*
- *"Send a Slack message to the team: standup in 5"*
- *"Open the Mission Control workspace"*
