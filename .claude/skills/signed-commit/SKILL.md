---
name: signed-commit
description: This skill should be used when the user asks to "commit", "push changes", "make a commit", or "submit work". Ensures signed-off-by line is always present.
---

1. Verify git hook installed: `bash bin/git-template-full` (one-time per clone)
2. Commit message format: `<description> - signed-off-by: Name <email>`
3. Never commit to `master` directly — branch or PR to `testing`
4. Before finishing, confirm the last commit contains "signed-off-by":
   ```bash
   git log -1 --pretty=%B | grep -q "signed-off-by" || echo "MISSING signed-off-by — fix before pushing"
   ```
