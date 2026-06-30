---
name: hermes-learn
description: Teach Claude (or Hermes Agent) a new workflow from any source — URL, PDF, doc, code folder, or pasted notes — and save it as a reusable skill.md that auto-loads in future sessions.
argument-hint: "<source URL or description of what to learn>"
user-invocable: true
---

# Hermes Agent /learn Workflow

Learn from $ARGUMENTS and convert it into a reusable, verifiable skill.md file.

## What can be learned

- URLs (web pages, docs, blog posts, YouTube descriptions)
- PDFs or documents
- Folders of code
- Pasted notes or recent session context

## Five-Step Breakdown

1. **Trigger** — receive the source (`/learn <URL or content>`)
2. **Distill** — read and extract the core workflow, steps, and key concepts; strip filler
3. **Verify** — summarize back what was learned; confirm it matches the source intent
4. **Save** — write a clean `SKILL.md` to `.claude/skills/<topic-name>/SKILL.md`
5. **Register** — the skill auto-loads when related terms appear, or load manually with `/skill <name>`

## Output format (SKILL.md template)

```markdown
---
name: <slug>
description: <one-line description of what this skill does>
argument-hint: "<optional: describe expected args>"
user-invocable: true
---

# <Title>

## Summary
<2-3 sentence overview of the workflow>

## Steps
1. ...
2. ...
3. ...

## Key Rules
- ...

## Example
<short concrete example>
```

## Setup Checklist

- [ ] Source is readable (URL accessible, doc pasted, folder listed)
- [ ] Core workflow extracted and summarized
- [ ] Skill saved to `.claude/skills/<name>/SKILL.md`
- [ ] Skill tested with `/skill <name>` or by mentioning a related term
- [ ] Skill reviewed and corrected if output was wrong (`Fix bad skills` step)

## Fixing Bad Skills

If the generated skill produces wrong output:
1. Open `.claude/skills/<name>/SKILL.md`
2. Identify which step produced the wrong result
3. Rewrite that step with clearer, more specific instructions
4. Re-test with `/skill <name> <example input>`

## Key Takeaways (from Hermes Agent /learn video)

- Skills stop you re-explaining workflows every session
- One `/learn` call = permanent reusable recipe
- Skills are just markdown — editable, shareable, version-controlled
- Auto-load triggers on related keywords; no manual invocation needed
- Works across chat, terminal, voice (Hermes Jarvis), and messaging platforms
- Skill.md files can be committed to the repo and shared with the team
