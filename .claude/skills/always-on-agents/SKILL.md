---
name: always-on-agents
description: Design and operate bounded, observable, least-privilege background agents for AS-OS. Use for scheduled Claude Code work, MCP-connected automation, recurring monitoring, handoffs, retries, budgets, and approval gates.
user-invocable: true
---

# Always-On Agent Operations

Run background work as a controlled job system, not as an unrestricted assistant session.

## Separate the persistent layers

- `CLAUDE.md`: durable project facts and standing instructions. It is context, not memory or a security boundary.
- `.claude/skills/<name>/SKILL.md`: reusable procedures loaded when relevant.
- Claude auto memory: machine-local notes managed by Claude Code; inspect it with `/memory`.
- Project state: explicit, versioned checkpoint or handoff files containing no secrets.
- Job history: append-only execution metadata with timestamps, inputs, result status, and redacted errors.

Never store credentials, private vault contents, or production data in any instruction, skill, state, or log file.

## Bound every job

Define before enabling a schedule:

1. One project and one data boundary.
2. Exact inputs and allowed tools.
3. Read-only default behavior.
4. Maximum turns, runtime, retries, and spend.
5. Idempotency key or duplicate-detection rule.
6. Success, no-change, retryable-failure, and terminal-failure outcomes.
7. Human approval before merge, publish, outreach, paid action, account change, or production mutation.
8. Rollback and escalation path.

Quiet success is valid: if a monitoring job finds no material change, record the check internally and send no alert.

## MCP rules

- Start with no MCP servers and add only the smallest trusted set.
- Prefer OAuth, OIDC, or workload identity over pasted long-lived tokens.
- Keep experimental or credentialed servers local-scoped. Shared project definitions belong in project-root `.mcp.json` and must contain environment-variable references, never values.
- Review command, URL, transport type, package or binary provenance, tool catalog, write capability, timeout, and data destination before approval.
- Never grant a filesystem MCP server a broad workspace, home directory, personal vault, or unrelated project root.
- Treat plugin-bundled MCP servers as executable integrations, not passive documentation.
- Non-interactive, SDK, and cloud sessions cannot rely on an interactive project-server approval prompt. Omit or explicitly disable unneeded servers for unattended jobs.
- Verify with `claude mcp list`, `claude mcp get <name>`, or `/mcp`; configuration written to disk is not proof of a healthy authenticated connection.

## Permission modes

| Mode | Use |
|---|---|
| `plan` | Read-only investigation before a risky change |
| `default` | Sensitive or unfamiliar projects |
| `acceptEdits` | Local edits that will be reviewed immediately |
| `auto` | Eligible, trusted staging work only; still require review and hard deny rules |
| `dontAsk` | Locked-down CI with every required action pre-approved |
| `bypassPermissions` | Disposable isolated container or VM only; never a normal workstation |

Auto mode is a research preview and does not replace approval gates. A chat instruction can be lost during compaction; encode non-negotiable boundaries in permission rules and infrastructure controls.

## Safe recurring loop

1. Load the bounded job specification and last checkpoint.
2. Validate environment, dependency locks, authentication health, and budget.
3. Acquire an idempotency lock.
4. Read current state.
5. Compute a proposed change or report.
6. Stop at any configured approval boundary.
7. Verify the result with project checks.
8. Write a redacted checkpoint and audit record.
9. Release the lock and emit one outcome.

Use exponential backoff with a retry ceiling. Never retry an approval-held deployment as if it failed, and never repeat an external side effect without an idempotency guarantee.

## Minimum rollout

1. Run manually in `plan` mode with synthetic data.
2. Run once in staging with external writes disabled.
3. Enable a low-frequency schedule with strict budget and retry caps.
4. Review logs and diffs after several successful runs.
5. Enable one write capability at a time, retaining a human merge or publish gate.

## Verification checklist

- Project and protected paths are explicit.
- Secrets are outside the repository and logs.
- MCP servers are minimal, verified, and scoped.
- Schedules are idempotent, retry-bounded, and quiet on no change.
- Model IDs, SDKs, pricing, and limits are pinned or checked before execution.
- Merge, publish, outreach, spending, and production changes require approval.
- Every job has an observable result and rollback path.
