---
name: agent-harness
description: Build larger projects using agent harnesses — orchestrator + worker patterns, task queues, and structured handoffs between Claude instances.
user-invocable: true
---

# Agent Harnesses

## What it is
An agent harness is a coordination layer that routes tasks to Claude instances, tracks state, and collects results. The orchestrator never does the work — it delegates.

## Core pattern
```
Orchestrator Claude
    ├── Worker A (isolated context, specific task)
    ├── Worker B (isolated context, specific task)
    └── Worker C (isolated context, specific task)
         └── Results → Orchestrator → next step
```

## When to use
- Task has 3+ independent subtasks that can run in parallel
- Subtasks require different tool permissions
- One subtask's output is another's input (pipeline)
- You want workers to have clean context uncontaminated by earlier steps

## Building a harness

### 1. Define the task boundary
Break the goal into atomic subtasks each worker can complete independently.

### 2. Write worker subagents
Place in `.claude/agents/<name>.md`:
```markdown
---
name: code-writer
description: Implements a single feature from a spec
tools: Read, Edit, Write, Bash
---
You receive a spec. Implement it. Return: DONE or FAIL + reason.
```

### 3. Write the orchestrator prompt
```text
Use subagents to complete these tasks in parallel:
1. subagent(code-writer): implement auth module per @specs/auth.md
2. subagent(code-writer): implement payment module per @specs/payment.md
Collect results. If any FAIL, report which and why.
```

### 4. Structured handoffs
Workers signal completion with a standard token: `DONE`, `FAIL: <reason>`, or `BLOCKED: <what's needed>`.
Orchestrator reads the token and routes accordingly.

## Pipeline variant
Chain workers where each passes output to the next:
```text
fetch-data → clean-data → analyze → report
```
Each step is a subagent invocation; the orchestrator threads the output through.

## Key rules
- Workers should not read each other's context — pass data explicitly
- Keep worker context windows small — scope their file reads tightly
- Use `--allowedTools` when running non-interactively to limit blast radius
- Log each worker's result before moving to the next step
