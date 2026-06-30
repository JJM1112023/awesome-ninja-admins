# CLAUDE.md

This file provides guidance for AI assistants working with the **awesome-ninja-admins** repository.

## Project Type

This is an **awesome-list** repository. Keep entries alphabetized within categories, ensure all links point to valid `http://` or `https://` URLs, and follow the HTML-in-Markdown entry format documented below. When adding entries, always read `README.md` first to avoid duplicates and place items in the correct existing category.

## Project Overview

This is a curated "Awesome" list repository — a collection of tools, manuals, blogs, hacks, and resources for system administrators (Ninja Admins). It is primarily a documentation project with the content living in `README.md`, but it also ships a set of Bash admin scripts in `src/` (backed by shared helpers in `lib/common.sh`).

**Tech stack:** Markdown (content), Bash (scripts), ShellCheck (linting), Travis CI (CI/CD)

## Repository Structure

```
.
├── README.md            # Main curated list (the actual deliverable)
├── CLAUDE.md            # This file — AI assistant guidance
├── CLAUDE.local.md      # Personal/local overrides (gitignored, do not commit)
├── CONTRIBUTING.md      # Contribution standards
├── CODE_OF_CONDUCT.md
├── LICENSE.md           # GNU license
├── .travis.yml          # CI configuration
├── .gitignore           # Ignores log/ directory
├── .claude/
│   ├── skills/          # Reusable workflow skills (SKILL.md files)
│   └── agents/          # Custom subagent definitions
├── doc/
│   └── img/             # Project images (awesome_ninja_admins.png)
├── src/                 # Bash source scripts (syshealth, diskusage, logclean, netdiag, sslcheck)
├── lib/                 # Bash library files (common.sh — shared helpers)
└── skel/                # Skeleton/template files (currently placeholder)
```

## Development Workflow

### Branches

- `master` — stable, production branch
- `testing` — integration branch; **all pull requests target this branch first**
- Feature branches are named descriptively (e.g., `claude/claude-md-docs-7aqmmy`)

### Making Changes

1. Base changes on the latest `master`
2. **IMPORTANT: Submit pull requests to the `testing` branch, NOT `master`**
3. Every commit **must** include a signed-off-by line (see below)

### Git Hooks

The repo uses a `prepare-commit-msg` git hook to enforce signed-off-by on every commit. After cloning, run the **one-time manual setup**:

```bash
bash bin/git-template-full
```

Without this step, commits will be missing the required signed-off-by line.

### Commit Signatures

**IMPORTANT: All commits require a signed-off-by line. Never commit without it.**

Install the git hook to add it automatically:

```bash
# Add to .git/hooks/prepare-commit-msg
SOB=$(git var GIT_AUTHOR_IDENT | sed -n 's/^\(.*>\).*$/- signed-off-by: \1/p')
grep -qs "^$SOB" "$1" || echo "$SOB" >> "$1"
```

Commit messages follow this pattern:
```
<short description> - signed-off-by: Name <email>
```

## Linting and Validation

### ShellCheck

All Bash scripts in `src/`, `lib/`, and `bin/` must pass ShellCheck before merging.

**Run locally:**
```bash
shellcheck --version
shellcheck -s bash -e 1072,1094 -x src/* -x lib/* bin/git-template-full
```

Flags:
- `-s bash` — treat files as bash scripts
- `-e 1072,1094` — suppress these false-positive error codes
- `-x` — follow sourced files

If a non-critical warning like SC2154 appears and cannot be fixed, suppress it inline:
```bash
# shellcheck disable=SC2154
```

### CI (Travis CI)

CI runs ShellCheck on `master` and `testing` branches only. It installs shellcheck from the Debian unstable repository to get a recent version. There is no GitHub Actions workflow — only `.travis.yml`.

## Content Conventions (README.md)

The curated list uses a specific HTML-in-Markdown format. **Follow these patterns exactly** when adding entries.

### Section headers

```markdown
#### Category Name

##### :black_small_square: Subcategory

<p>
&nbsp;&nbsp;:small_orange_diamond: <a href="URL"><b>Tool Name</b></a> - brief description.<br>
</p>
```

### Entry format

Each entry is a `<p>` block with `&nbsp;&nbsp;:small_orange_diamond:` prefix, a bold linked name, an em dash, a short description, and a `<br>` at the end. Keep descriptions concise — one line.

Example:
```html
<p>
&nbsp;&nbsp;:small_orange_diamond: <a href="https://example.com/"><b>Tool Name</b></a> - one-line description of what it does.<br>
</p>
```

### Existing categories in README.md

- CLI Tools → Shells, Managers, Network, Databases
- Web Tools → SSL, HTTP Headers, DNS, Mail, Mass scanners, Net-tools, Performance, Passwords
- Manuals/Howtos/Tutorials → Bash, Unix tutorials, Hacking
- Blogs
- Systems/Services → Systems, HTTP(s) Services, Security/hardening
- One-liners
- Lists
- Other

When adding entries, place them in the most appropriate existing category before creating a new one.

## Bash Script Standards

When writing scripts for `src/`, `lib/`, `bin/`, or the repo root, follow these references:
- [Bash Hackers Wiki](http://wiki.bash-hackers.org/)
- [Google Shell Style Guide](https://google.github.io/styleguide/shell.xml)
- [bashstyle](https://github.com/progrium/bashstyle)

Key conventions:
- Use `#!/usr/bin/env bash` (not `#!/bin/bash`)
- Use `set -euo pipefail` at the top of every script for safe error handling
- Use `su -` for root login (not `su`)
- All scripts must pass `shellcheck -s bash -e 1072,1094 -x`
- Anchor `.env` key lookups with `^KEY=` and use `cut -d= -f2-` to preserve values containing `=`
- Never rely on `|| fallback` at the end of a pipeline — check emptiness explicitly with `[ -z "$VAR" ]`

## Code Review

**IMPORTANT: Before requesting human review or committing any shell script, run a self-review pass:**

1. Re-read the script top-to-bottom and ask: what input, state, or environment makes each line wrong?
2. Check all grep patterns are anchored and won't match unintended substrings
3. Check all pipeline fallbacks (`|| default`) actually fire when expected (they don't when the last command in the pipe exits 0)
4. Verify every exit code that matters is captured, not silently swallowed with `&>/dev/null`
5. Confirm all relative paths are guarded with a CWD check or `cd "$(dirname "$0")"`

## Claude Code Features Available

### Importing other files

CLAUDE.md can import additional context files using `@path/to/file` syntax:
```markdown
See @README.md for the current list content.
See @CONTRIBUTING.md for contribution rules.
```

### CLAUDE.local.md

Create `CLAUDE.local.md` in the project root for personal session overrides (e.g., your name/email for signed commits). **Add it to `.gitignore` — do not commit it.**

### Hooks

Use `.claude/settings.json` to define hooks that run automatically on events:
- **PostToolUse** after file edits — e.g., auto-run shellcheck on edited Bash files
- **Stop** — run a check before Claude ends a turn

### Skills

Place `SKILL.md` files in `.claude/skills/<name>/` for reusable workflows specific to this repo (e.g., a skill for adding a new README entry in the correct format).

### Subagents

Define custom subagents in `.claude/agents/` for specialized tasks like reviewing README entries for formatting consistency.

## What AI Assistants Should Know

- **This is primarily a docs repo.** Most contributions are new entries in `README.md`, not code changes.
- **No build step.** There is no `npm install`, `make`, or compile step. Changes are immediately ready.
- **No tests to run** beyond ShellCheck (which only applies to Bash scripts, not Markdown).
- **IMPORTANT: Signed commits are required.** Never commit without the signed-off-by line.
- **IMPORTANT: PR target is `testing`**, not `master`.
- **`src/` and `lib/` hold real admin scripts** (`src/*.sh` + `lib/common.sh`); **`skel/` is still empty** (contains only `.gitkeep`). Do not delete the `.gitkeep` placeholders in empty directories.
- **`log/` is gitignored** — do not commit anything to that directory.
- **When compacting context**, preserve: the signed-off-by requirement, the PR target branch, and any list of modified files.
- **Explore before editing README.md** — read the current file first to avoid duplicate entries and ensure correct category placement.
