---
name: workspace-org
description: Workspace organization for personal, business, and client projects in Claude Code — session naming, worktrees, project separation, and context hygiene.
user-invocable: true
---

# Workspace Organization

## Three-tier structure

```
~/.claude/                     # Global (personal, applies everywhere)
├── CLAUDE.md                  # Your universal rules and preferences
├── settings.json              # Global permissions and hooks
├── skills/                    # Personal reusable skills
└── agents/                    # Personal subagent definitions

./CLAUDE.md                    # Project (shared with team via git)
./.claude/
├── settings.json              # Project permissions and hooks
├── skills/                    # Project-specific skills
├── agents/                    # Project-specific subagents
└── settings.local.json        # Personal project overrides (gitignored)
```

## Project separation patterns

### Personal projects
- One repo = one Claude project
- CLAUDE.md covers your personal conventions
- Commit `.claude/` to keep skills version-controlled

### Business projects
- Shared CLAUDE.md in git (team conventions)
- Personal `CLAUDE.local.md` for your own shortcuts
- Shared skills for team workflows (deploy, review, release)

### Client projects
- Separate git repo per client
- Client-specific CLAUDE.md with their conventions
- Never mix client context — use separate worktrees or terminals

## Session naming and management

```bash
# Name sessions for easy resuming
claude --session-name "oauth-migration"
claude --session-name "client-abc-api-v2"

# Resume a named session
claude --continue oauth-migration

# List all sessions
claude --resume
```

## Context hygiene rules
- `/clear` between unrelated tasks — don't let shopping list tasks contaminate each other
- `/rename` sessions before switching focus — treat sessions like git branches
- Use subagents for research — investigation consumes context; keep it out of the main session
- `/compact` before a long unattended run — give Claude a clean summary to work from

## Worktrees for parallel work
```bash
# Create isolated checkouts for parallel Claude instances
git worktree add ../project-feature-a origin/main
git worktree add ../project-feature-b origin/main

# Run Claude in each independently — no file conflicts
cd ../project-feature-a && claude
cd ../project-feature-b && claude
```

## Multi-client checklist
- [ ] Separate terminal profiles per client (different colors/titles)
- [ ] Separate git worktrees or repos — no shared Claude context
- [ ] Client CLAUDE.md in their repo (their conventions, not yours)
- [ ] Personal shortcuts in `~/.claude/CLAUDE.md` only
- [ ] Sensitive credentials only in env vars or `CLAUDE.local.md` (gitignored)
