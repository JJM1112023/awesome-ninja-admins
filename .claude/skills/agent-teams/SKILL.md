---
name: agent-teams
description: Parallelization techniques — agent teams, stochastic consensus, debate patterns, and multi-agent problem solving with Claude Code.
user-invocable: true
---

# Agent Teams & Parallelization

## Core idea
Multiple Claude instances working simultaneously on different parts of a problem, or independently on the same problem to improve quality through consensus.

## Parallelization patterns

### 1. Fan-out (independent tasks)
All workers start at the same time; no dependencies between them.
```bash
for task in task1 task2 task3; do
  claude -p "complete $task" --allowedTools "Edit,Bash" &
done
wait
```
Use for: large migrations, batch analysis, multi-file refactors.

### 2. Pipeline (sequential dependency)
Output of step N becomes input of step N+1.
```text
Researcher → Writer → Reviewer → Publisher
```
Use for: research-then-implement, write-then-review, generate-then-validate.

### 3. Writer / Reviewer
Two sessions, opposing roles. Writer implements, Reviewer critiques from a clean context.
```text
Session A: "implement rate limiter for /api/auth"
Session B: "review @src/middleware/rateLimiter.ts — find edge cases and race conditions"
Session A: "address these findings: [Session B output]"
```
Use for: code quality, security review, spec compliance.

### 4. Stochastic consensus
Run the same task N times with independent Claude instances. Treat the majority answer as the best one.
```text
Run 5 instances of: "analyze @data.csv and identify the top 3 anomalies"
Collect all outputs. Pick the answer that appears most frequently.
```
Use for: data analysis, classification, ambiguous decisions.

### 5. Debate
Two agents argue opposing positions; a judge picks the winner.
```text
Agent A: argue FOR this architectural approach
Agent B: argue AGAINST it
Judge: read both arguments, pick the stronger one and explain why
```
Use for: architecture decisions, tradeoff analysis, risk assessment.

## Practical setup

### Worktrees (no file collisions)
```bash
git worktree add ../feature-a origin/main
git worktree add ../feature-b origin/main
# Run Claude in each worktree independently
```

### Token for coordination
Workers write results to a shared file or use structured stdout:
```text
RESULT: <worker-id> | STATUS: DONE | OUTPUT: <summary>
```

## When to parallelize
- Task is clearly decomposable into independent pieces
- You have a repeatable operation across many files
- You want a second opinion without sharing context
- Throughput matters more than cost
