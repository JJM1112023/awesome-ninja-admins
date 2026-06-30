---
name: advanced-claude-md
description: Advanced CLAUDE.md and system prompt optimization — structure, imports, rules hierarchy, and quality improvement patterns from the Claude Code Advanced Course.
user-invocable: true
---

# Advanced CLAUDE.md & System Prompts

## Core principle
CLAUDE.md quality > quantity. A tight 30-line file beats a bloated 300-line one that Claude ignores.

## Structure hierarchy
1. `~/.claude/CLAUDE.md` — global rules (applies to all projects)
2. `./CLAUDE.md` — project rules (commit to git, share with team)
3. `./CLAUDE.local.md` — personal overrides (gitignore, never commit)
4. `.claude/rules/<topic>.md` — domain-specific rules loaded on demand
5. `@path/to/file` — inline imports inside any CLAUDE.md

## What to include
- Bash commands Claude can't guess (custom build, lint, deploy steps)
- Code style that differs from language defaults
- Testing instructions and preferred test runners
- Repo etiquette: branch naming, PR conventions, sign-off requirements
- Architectural decisions specific to this project
- Common gotchas and non-obvious behaviors
- Environment variables required to run the project

## What to exclude
- Anything Claude can infer from reading the code
- Standard language conventions Claude already knows
- Detailed API docs (link to them instead)
- Information that changes frequently
- Self-evident practices like "write clean code"
- File-by-file descriptions of the codebase

## Quality loop (Karpathy-style)
1. Write CLAUDE.md
2. Run a session — observe where Claude makes mistakes
3. Add a rule that would have prevented that mistake
4. Prune any rule Claude follows correctly without needing it
5. Repeat — the file improves progressively over time

## Emphasis syntax
Add `IMPORTANT:` or `YOU MUST` to rules Claude keeps ignoring.
If a rule is still ignored, the file is too long — prune first.

## Import syntax
```markdown
See @README.md for project overview.
See @docs/git-instructions.md for commit conventions.
```

## Checklist before committing CLAUDE.md
- [ ] Under 200 lines total
- [ ] Every line passes the "would removing this cause a mistake?" test
- [ ] Checked into git so the team benefits
- [ ] Personal overrides moved to CLAUDE.local.md (gitignored)
