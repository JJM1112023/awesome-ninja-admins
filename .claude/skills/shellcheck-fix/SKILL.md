---
name: shellcheck-fix
description: This skill should be used when the user asks to "fix shellcheck errors", "lint bash scripts", "validate scripts", or "check src/ files". Runs shellcheck and resolves flagged issues.
---

1. Run: `shellcheck -s bash -e 1072,1094 -x <file>`
2. Fix real errors; suppress false positives (e.g. SC2154) inline with:
   ```bash
   # shellcheck disable=SC2154
   ```
3. Re-run until clean before committing
4. Applies to files under `src/`, `lib/`, and `bin/` only
