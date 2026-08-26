---
name: as-os-build-guard
description: Automatically protect this AS-OS second-brain build from material changes in MCP, Claude/OpenAI APIs and models, Copilot, GitHub Actions, Replit, Android tooling, authentication, pricing, limits, and automation. Use whenever planning, changing, testing, deploying, reviewing, or resuming those surfaces.
user-invocable: true
---

# AS-OS Build Guard

Keep this repository compatible, isolated, reversible, and least-privilege.

## Automatic workflow

1. Lock scope to this repository. Do not import MAG Forge, client, personal-vault, browser-profile, or unrelated project data.
2. Inspect Git state, instructions, manifests, workflows, model IDs, MCP/plugin configuration, permissions, and deployment assumptions before editing.
3. Treat model availability, SDK versions, API behavior, pricing, limits, authentication, MCP specifications, GitHub behavior, Replit deployment, and Android compatibility as volatile. Verify consequential changes against current official primary sources.
4. Separate verified facts, inferred impact, and unknowns.
5. Make the smallest reversible change on a branch. Preserve prior configuration and never rewrite history.
6. Run the repository's real checks, inspect the diff, and keep merge, publish, external messaging, spending, production writes, and private-memory synchronization approval-gated.

## Required checks

- Search exact retired model IDs, beta headers, legacy endpoints, deprecated SDK parameters, and unpinned provider dependencies.
- Keep MCP transport, authentication, tool discovery, application logic, user identity, agent identity, delegated authority, and audit identity separate.
- Review every `plugin.json`, `.mcp.json`, project skill, agent, and hook as one executable trust bundle.
- Pin third-party GitHub Actions to immutable commits; minimize `GITHUB_TOKEN` permissions and inspect fork-controlled inputs before checkout or secrets.
- Keep scheduled work idempotent, observable, retry-bounded, budget-bounded, and quiet when nothing material changed.
- Keep the known-good Android matrix—AGP, Gradle, JDK, Kotlin, Build Tools, compile SDK, and plugins—pinned and tested together.
- If JAR push restrictions affect Android, exempt only the required Gradle wrapper path and verify JARs remain blocked elsewhere.
- Keep provider keys distinct by application and environment; never print, copy, rotate, or revoke a value without explicit need and authorization.

## AS-OS boundaries

- Treat `vault/` and `zero-brain/brain.*` as generated outputs; edit their sources and regenerate them.
- Do not expose personal memory or vault data to remote MCP, cloud indexing, or a provider by default.
- Prefer a phone-viewable PWA checkpoint before expanding native Android tooling.
- Keep experimental agent memory synchronization local-first, reversible, and synthetic-data-only until recovery and audit logs are verified.

## Verification

Run the relevant subset, then the full gate when practical:

```bash
python3 scripts/gen_secondbrain.py --check
bash scripts/check-all.sh
git diff --check
git status --short
```

Report `GREEN`, `YELLOW`, or `RED`, including what changed, affected workflow, risk, verification status, rollback, and smallest safe next action.
