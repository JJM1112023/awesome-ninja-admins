---
name: skill-generator
description: Meta-skill — generate a new .claude/skills/ entry from any pasted video description, article, or doc. Extracts tool names, URLs, chapter structure, and key concepts, then writes the SKILL.md, adds README entries, commits, and pushes. Formalizes the hermes-learn pattern.
argument-hint: "[paste video/article description here]"
user-invocable: true
---

# Skill Generator

## What it does

Takes any pasted content (YouTube description, article, course outline, doc) and:
1. Parses it for tools, URLs, concepts, and structure
2. Generates a `.claude/skills/<name>/SKILL.md`
3. Adds README entries for new tools mentioned
4. Commits and pushes to the current branch

## Input format

Paste any of:
- YouTube video description (title + description + links + timestamps)
- Article or blog post excerpt
- Course syllabus or chapter outline
- Documentation page
- Pasted notes or meeting summary

---

## Step 1: Parse the input

Extract the following before writing anything:

### A. Skill identity
```
Video/article title  → skill name (kebab-case, max 3 words)
One-line summary     → description field in frontmatter
```

Naming rules:
- Use the core concept, not the creator's name or brand
- Prefer verb-noun (`skill-generator`, `premium-website`, `human-validation`)
- Avoid dates, version numbers, or "advanced/pro/ultimate" modifiers

### B. Tools and URLs
Scan for every named tool or resource with a URL. Build a table:
```
| Tool name | URL (canonical, not affiliate/tracking) | Section to add in README |
```

URL rules:
- If the URL is truncated (ends in `...`), reconstruct the canonical base URL from the tool name
- Strip referral/tracking parameters
- Use `https://` always
- Never invent a URL — if uncertain, omit it and flag it

README placement rules:
```
AI coding / agents / LLM tools  → AI Tools & Agents (under Manuals)
Design inspiration / resources  → Other
Hosting / deployment            → Other
Marketing / CRM / automation    → Other
Security / networking           → most specific existing subcategory
```

### C. Chapter structure → skill sections
Timestamps or numbered chapters map directly to H2 sections in the skill:
```
00:00 Intro          → skip (no content)
02:19 Setup          → ## Setup
06:02 Adding Skills  → ## Installing design skills
09:24 The Build      → ## Build workflow
21:46 Deploy         → ## Deployment
```

### D. Key concepts and checklists
Pull out:
- Numbered lists → convert to tables or numbered steps
- "Before you do X, do Y" patterns → ordered workflow
- Comparisons ("X vs Y") → comparison table
- Named frameworks or checklists → preserve as named sections

---

## Step 2: Generate the SKILL.md

### Template
```markdown
---
name: <kebab-case-name>
description: <one-sentence summary of what this skill covers and why it's useful>
user-invocable: true
---

# <Title Case Name>

## The core insight
<1-2 sentences: the non-obvious thing this skill teaches. Not what the video is about — what you walk away knowing that you didn't before.>

## <Section from Chapter 2>
<content>

## <Section from Chapter 3>
<content>

## <Comparison or checklist if present>
| Column A | Column B |
|----------|----------|

## <Workflow if present>
1. Step one
2. Step two

## Key principle
> "<One-sentence distillation of the entire skill — the thing you'd put on a poster.>"
```

### Quality rules
- **No filler.** Every line must be actionable or informational. Cut "In this video..." openers.
- **Tables over prose** for comparisons, tool lists, decision criteria.
- **Code blocks** for any config, command, prompt template, or JSON.
- **Bold the non-obvious.** If a step is counterintuitive or commonly skipped, bold it.
- **One key principle at the end.** Always close with a blockquote summary.
- **Length:** 80–200 lines. Under 80 is too thin. Over 200 and you're including noise.

---

## Step 3: Add README entries

For each new tool found in Step 1B, add an entry in the correct section.

### Entry format (exact)
```html
<p>
&nbsp;&nbsp;:small_orange_diamond: <a href="URL"><b>Tool Name</b></a> - one-line description of what it does.<br>
</p>
```

When adding to an existing `<p>` block, append inside the block — do not create a new `<p>` per entry.

**Description rules:**
- One line only
- Active voice: "does X" not "a tool that does X"
- Include the key differentiator, not just the category

**Duplicate check:** before inserting, grep README.md for the tool name. Skip if already present.

---

## Step 4: Commit and push

```bash
git add README.md .claude/skills/<name>/
git commit -m "add <name> skill and README entries - signed-off-by: John Maguire <johnmaguire357@gmail.com>"
git push -u origin <current-branch>
```

Commit message format: `add <skill-name> skill and [N] README entries`

---

## Examples from this session

| Input | Skill generated | Key insight captured |
|-------|----------------|---------------------|
| Hermes /learn video | `hermes-learn` | Five-step learn loop: trigger→distill→verify→save→register |
| Nick Saraev Claude Code course | `advanced-claude-md`, `agent-teams`, `autoresearch`, `browser-automation`, `workspace-org`, `claude-security` | One video → 6 skills, one per chapter cluster |
| Jordan Urbs agentic harness video | `agentic-harness` | Model = rented brain, harness = owned body |
| "Build $10K website" video | `premium-website` | The 8-pillar checklist + brief-first prompting |
| "Build 10x Faster" video | `human-validation`, `buildpartner`, `wispr-flow` | One video → 3 skills (concept + 2 tools) |

---

## When one video produces multiple skills

Split when:
- The video has distinct chapters covering unrelated tools
- A concept deserves its own skill (e.g., `human-validation` is a standalone pattern, not just a section in another skill)
- A tool is referenced enough to be invoked independently

Keep as one skill when:
- All chapters build toward one workflow
- The tool list is incidental (mentioned but not the focus)

---

## Meta-note

This skill is itself generated by the pattern it describes. Every skill in `.claude/skills/` was distilled from source content using these same steps — brief extracted, structure mapped, noise cut, key principle identified.

The pattern is: **source → distill → structure → verify → save**.
