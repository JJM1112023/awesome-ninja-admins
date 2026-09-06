---
name: add-readme-entry
description: This skill should be used when the user asks to "add a tool", "add an entry to the list", "insert a new resource", or "update README with a new link". Enforces the HTML-in-Markdown format and correct category placement.
---

1. Read README.md first — check for duplicates (same URL or tool name)
2. Identify correct existing category (CLI/Web/Manuals/Blogs/Systems/Lists/Other)
3. Format entry:
   ```html
   <p>
   &nbsp;&nbsp;:small_orange_diamond: <a href="URL"><b>Tool Name</b></a> - one-line description.<br>
   </p>
   ```
4. Insert alphabetically within the subcategory
5. Never create a new category unless nothing existing fits
6. Verify the surrounding `<p>` block is still valid HTML
7. Commit with signed-off-by line, PR to `testing`
