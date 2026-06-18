---
name: add-entry
description: Add a new tool or resource entry to README.md in the correct format
argument-hint: "<Tool Name> <URL> [category]"
user-invocable: true
---

Add a new entry to README.md following the project's HTML-in-Markdown format.

Steps:
1. Read @README.md to find the right category for: $ARGUMENTS
2. Check for duplicates — search for the tool name before adding
3. Insert the entry using this exact format:

```html
<p>
&nbsp;&nbsp;:small_orange_diamond: <a href="URL"><b>Tool Name</b></a> - one-line description of what it does.<br>
</p>
```

Rules:
- Descriptions must be concise — one line only
- Place in the most specific matching subcategory
- If no subcategory fits, use the closest parent category
- Never create a new category unless nothing existing fits
- After inserting, verify the surrounding `<p>` block is still valid HTML

4. Commit with: `add <Tool Name> to README.md - signed-off-by: Name <email>`
