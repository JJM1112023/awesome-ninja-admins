---
name: human-validation
description: Human-validation zones — structured checkpoints in agentic workflows where a human must review before the AI continues. The pattern that makes autonomous agents safe to run on real work.
user-invocable: true
---

# Human-Validation Zones

## The problem with fully autonomous agents

An agent running unattended will make mistakes. The question is not IF it makes a mistake — it is WHERE the mistake happens and how expensive it is to fix.

Human-validation zones are the answer: **pre-defined points in an agentic workflow where the agent stops, surfaces its work, and waits for human approval before continuing.**

## The core pattern

```
[Agent works] → [VALIDATION ZONE] → human reviews → approve/reject → [Agent continues]
```

Without zones:
```
Start → [Agent runs everything] → Done (or disaster)
```

With zones:
```
Start → [Agent phase 1] → STOP: review output → ✓ → [Agent phase 2] → STOP: review output → ✓ → Done
```

## Where to place validation zones

Place a zone at any step where:

| Condition | Zone? |
|-----------|-------|
| Output is irreversible (send email, push code, post publicly) | YES — always |
| Output affects external systems or people | YES |
| Agent is making a judgment call with significant impact | YES |
| Output feeds into a later phase that's hard to undo | YES |
| Output is pure analysis/research with no side effects | Optional |
| Routine, repeatable, low-stakes action | No |

## The three zone types

### 1. Gate zone (hard stop)
Agent cannot proceed without explicit approval.
```
Agent: "Here is the draft email to 500 customers. Approve to send."
Human: [reviews] → APPROVE or REJECT
```
Use for: sends, publishes, deploys, deletes, financial actions.

### 2. Review zone (soft stop with timeout)
Agent pauses for N minutes. If no response, continues with default action.
```
Agent: "Proposed DB schema change. Approve within 30 min or I'll proceed with Option A."
```
Use for: async workflows where blocking is worse than proceeding.

### 3. Audit zone (async, non-blocking)
Agent logs output for later human review without stopping.
```
Agent: [completes task] → writes summary to /log/audit.md → continues
Human: reviews audit log at leisure
```
Use for: monitoring, reporting, non-critical outputs.

## Implementing zones in Claude Code

### In CLAUDE.md (standing order):
```markdown
# Validation zones
Before sending any external communication: STOP and show me a preview.
Before committing to main: STOP and show the diff.
Before deleting any file: STOP and confirm the path.
After each major phase: summarize what you did and what comes next.
```

### In a task prompt:
```
Phase 1: Research and draft the proposal. STOP — show me the draft.
Phase 2 (after approval): Send the proposal. STOP — confirm sent.
Phase 3 (after confirmation): Log the outcome and update the tracker.
```

### As a hook (PreToolUse):
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "echo 'About to run bash command — review above before approving'"
      }]
    }]
  }
}
```

## The 10x speed insight

Validation zones do NOT slow you down. They do the opposite:

- Without zones: agent completes wrong work → you fix it → rework takes longer than the original task
- With zones: agent stops at the right moment → you approve → agent continues → no rework

**Speed comes from catching mistakes at phase boundaries, not after full completion.**

The zone is not a permission prompt — it is an inspection window at the lowest-cost moment to catch an error.

## Zone placement in a real workflow

Example: automated blog publishing pipeline

```
1. [Research phase] → AUDIT ZONE: log sources found
2. [Outline phase] → GATE ZONE: approve outline before writing
3. [Draft phase] → GATE ZONE: approve draft before SEO/images
4. [SEO + images] → REVIEW ZONE: 15-min window to override
5. [Publish] → GATE ZONE: final approval before going live
```

Phases 1, 3 are automated. Phases 2, 4, 5 require you. The agent does 80% of the work; you spend 5 minutes on the 20% that matters.

## Key rule

> Every irreversible action needs a gate zone. Every phase boundary is a candidate for a review zone. Audit zones are free — use them everywhere.

If your agent is making mistakes you could have caught earlier, you need more zones. If your agent keeps stopping for things that don't matter, remove those zones and tighten the gates.
