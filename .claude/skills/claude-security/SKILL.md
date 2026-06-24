---
name: claude-security
description: Security practices for Claude Code projects — auto-mode classifier, OAuth, permission scoping, secrets management, and protecting against prompt injection.
user-invocable: true
---

# Claude Code Security

## Permission modes

| Mode | What it does | When to use |
|------|-------------|-------------|
| **Default** | Prompts for approval on every risky action | New projects, unfamiliar codebases |
| **Auto** | Classifier reviews commands; blocks scope escalation | Trusted long-running tasks |
| **Plan** | No file writes; read-only exploration | Auditing, research phases |

```bash
# Run with auto mode (classifier gates risky actions)
claude --permission-mode auto -p "fix all lint errors"
```

## Auto-mode classifier
The classifier blocks:
- Scope escalation (writing outside the project directory)
- Unknown infrastructure changes (new cloud resources)
- Hostile-content-driven actions (prompt injection attempts)
- Force pushes to protected branches

It allows: routine file edits, test runs, git commits, known CLI tools.

## OAuth and credential safety
- **Never hardcode credentials** in source files or CLAUDE.md
- Store secrets in environment variables or a secrets manager
- Use `CLAUDE.local.md` (gitignored) for local dev credentials
- For CI: pass credentials as env vars, never in the prompt

```bash
# Safe pattern — env var reference
export DATABASE_URL="postgres://..."
claude -p "run migrations against $DATABASE_URL"

# Unsafe — never do this
claude -p "run migrations against postgres://user:password@host/db"
```

## Secrets management skill
Store secrets outside the repo and reference them by name:
```bash
# Use a secrets manager
export API_KEY=$(aws secretsmanager get-secret-value --secret-id my-key --query SecretString --output text)
```

## Prompt injection protection
Claude Code's auto-mode classifier detects hostile content in tool results that tries to redirect Claude's actions. Additional defenses:

- **Scope tool permissions** — use `--allowedTools` to limit what Claude can do
- **Sandbox untrusted input** — don't pipe unknown web content directly into Claude's context
- **Review diffs** — always review what Claude changed before accepting
- **Use subagents for external data** — isolate web/API results from the main session

## Permission allowlists
Allowlist only what you need. Avoid `*` wildcards on destructive tools:
```json
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm test)",
      "Bash(git commit *)",
      "Edit"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)"
    ]
  }
}
```

## Hooks as a security gate
Use `PreToolUse` hooks to block dangerous patterns deterministically:
```bash
#!/bin/bash
# .claude/hooks/block-dangerous.sh
COMMAND=$(echo "$1" | jq -r '.tool_input.command // ""')
if echo "$COMMAND" | grep -qE 'rm -rf|DROP TABLE|force-push'; then
  echo '{"decision":"block","reason":"Dangerous command pattern blocked"}' 
  exit 2
fi
```

## Security checklist
- [ ] `CLAUDE.local.md` in `.gitignore`
- [ ] No credentials in CLAUDE.md or source files
- [ ] Permission allowlist configured in `.claude/settings.json`
- [ ] Dangerous command hook in `.claude/hooks/`
- [ ] Auto-mode used for unattended runs
- [ ] Diffs reviewed before every merge
