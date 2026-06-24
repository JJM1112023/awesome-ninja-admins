---
name: browser-automation
description: Browser automation with Claude Code — choosing between Playwright, Browser Use, Computer Use, and browser-cdp based on the task type.
user-invocable: true
---

# Browser Automation

## Tool selection guide

| Tool | Best for | Requires |
|------|----------|----------|
| **Playwright / Puppeteer** | Structured scraping, form fill, predictable flows | Known DOM selectors |
| **Browser Use** | LLM-driven navigation, unknown pages, adaptive flows | Python, LLM API key |
| **Computer Use** | Desktop apps, anything without a browser API | Claude claude-sonnet-4-6+ |
| **browser-cdp** | Low-level Chrome DevTools control within Claude Code | Chrome running locally |

## When to use each

### Playwright (structured automation)
```python
# Use when you know the selectors and the flow is deterministic
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    page.fill("#email", "user@example.com")
    page.click("button[type=submit]")
```
Best for: CI testing, form automation, scraping known sites.

### Browser Use (LLM-driven)
```python
# Use when the page structure is unknown or changes frequently
from browser_use import Agent
agent = Agent(task="Go to example.com, find the pricing page, extract all plan names and prices")
result = agent.run()
```
Best for: research automation, competitive intelligence, adaptive scraping.

### Computer Use (desktop control)
Tell Claude: `"Use computer use to open the desktop app and complete this form: ..."`
Best for: legacy desktop apps, apps with no API, visual workflows.

### browser-cdp (within Claude Code)
Available as a toolset when the browser-cdp plugin is installed.
Best for: screenshots, DOM inspection, JavaScript injection within a Claude session.

## Advanced techniques

### Handling dynamic content
```python
# Wait for network idle before scraping
page.wait_for_load_state("networkidle")
# Or wait for a specific element
page.wait_for_selector(".results-loaded")
```

### Anti-bot evasion (ethical use — your own sites only)
- Use realistic viewport and user-agent
- Add random delays between actions
- Use stealth mode plugins

### Chaining automation with Claude
```text
1. Claude writes the Playwright script
2. Claude runs it via Bash
3. Claude reads the output and decides next steps
4. Loop until task complete
```

## Key rules
- Always check `robots.txt` before scraping external sites
- Store credentials in environment variables, never hardcoded
- Use headless mode in CI; headed mode for debugging
- Screenshot on failure to capture what went wrong
