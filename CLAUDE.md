# CLAUDE.md

This file provides guidance for AI assistants working with the **awesome-ninja-admins** repository.

## Project Type

This is an **awesome-list** repository. Keep entries alphabetized within categories, ensure all links point to valid `http://` or `https://` URLs, and follow the HTML-in-Markdown entry format documented below. When adding entries, always read `README.md` first to avoid duplicates and place items in the correct existing category.

## Project Overview

This is a curated "Awesome" list repository — a collection of tools, manuals, blogs, hacks, and resources for system administrators (Ninja Admins). It is primarily a documentation project with the content living in `README.md`, but it also scaffolds Bash scripts in `src/`, `lib/`, and `skel/` directories.

**Tech stack:** Markdown (content), Bash (scripts), ShellCheck (linting), Travis CI (CI/CD)

## Repository Structure

```
.
├── README.md            # Main curated list (the actual deliverable)
├── CLAUDE.md            # This file — AI assistant guidance
├── CLAUDE.local.md      # Personal/local overrides (gitignored, do not commit)
├── CONTRIBUTING.md      # Contribution standards
├── .travis.yml          # CI configuration (ShellCheck on master + testing only)
├── .claude/
│   ├── settings.json    # Hooks: PostToolUse shellcheck + link-check; Stop signed-off reminder
│   ├── skills/add-entry/SKILL.md  # /add-entry skill for README entries
│   ├── agents/readme-reviewer.md  # readme-reviewer subagent
│   └── hooks/check-readme-links.sh
├── bin/
│   └── git-template-full  # Run once after clone to install git hooks
├── doc/img/             # Project images
├── zero-brain/
│   └── index.html       # Z.E.R.O. AI Second Brain dashboard (standalone HTML)
├── src/                 # Bash source scripts (currently placeholder)
├── lib/                 # Bash library files (currently placeholder)
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

When writing scripts for `src/` or `lib/`, follow these references:
- [Bash Hackers Wiki](http://wiki.bash-hackers.org/)
- [Google Shell Style Guide](https://google.github.io/styleguide/shell.xml)
- [bashstyle](https://github.com/progrium/bashstyle)

Key conventions:
- Use `#!/usr/bin/env bash` (not `#!/bin/bash`)
- Use `su -` for root login (not `su`)
- All scripts must pass `shellcheck -s bash -e 1072,1094 -x`

## Claude Code Tooling

### Configured Hooks (`.claude/settings.json`)

**PostToolUse** (runs after every Edit/Write):
- ShellCheck — auto-lints any file edited under `src/`, `lib/`, or `bin/`
- Link checker — runs `.claude/hooks/check-readme-links.sh` to validate URLs in README.md

**Stop** (runs when Claude ends a turn):
- Warns if the last commit is missing a `signed-off-by` line

### Skills

- **`/add-entry <Tool Name> <URL> [category]`** — reads README.md, checks for duplicates, inserts a correctly formatted entry, and commits with the signed-off-by line.

### Subagents

- **`readme-reviewer`** — reviews README.md for format violations, duplicates, descriptions over 120 chars, and unclosed `<p>` blocks. Reports only; does not fix.

### CLAUDE.local.md

Create `CLAUDE.local.md` for personal session overrides (e.g., your name/email for signed commits). It is gitignored — do not commit it.

## What AI Assistants Should Know

- **This is primarily a docs repo.** Most contributions are new entries in `README.md`, not code changes.
- **No build step.** There is no `npm install`, `make`, or compile step. Changes are immediately ready.
- **No tests to run** beyond ShellCheck (which only applies to Bash scripts, not Markdown).
- **IMPORTANT: Signed commits are required.** Never commit without the signed-off-by line.
- **IMPORTANT: PR target is `testing`**, not `master`.
- **`src/`, `lib/`, `skel/` are currently empty** (contain only `.gitkeep`). Do not delete these directories.
- **`log/` is gitignored** — do not commit anything to that directory.
- **When compacting context**, preserve: the signed-off-by requirement, the PR target branch, and any list of modified files.
- **Explore before editing README.md** — read the current file first to avoid duplicate entries and ensure correct category placement.
