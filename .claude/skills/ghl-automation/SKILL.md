---
name: ghl-automation
description: Automate GoHighLevel with Claude Code via the GHL CLI — build triggers, conditions, and email sequences in plain English without ever opening the GHL dashboard. Full workflow automation through prompts.
user-invocable: true
---

# GoHighLevel Automation with Claude Code

## The core insight

GoHighLevel's UI is powerful but slow to operate — clicking through workflows, conditions, and email builders takes hours of manual work. The GHL CLI exposes all of that via the command line, which means Claude Code can build entire automations from a plain-English description.

```
Before: you → GHL dashboard → click 40 things → workflow done (45 min)
After:  you → one prompt → Claude + GHL CLI → workflow done (3 min)
```

## Prerequisites

**Install the GHL CLI** (free from Lead Gen Jay):
```
https://leadgenjay.com/
```

The CLI authenticates to your GoHighLevel account and exposes workflow, contact, pipeline, and email operations as terminal commands — Claude Code can call these directly.

## What Claude can build for you

| GHL Object | What Claude generates |
|------------|----------------------|
| Workflow triggers | "When contact submits form X, start workflow" |
| Conditions | "If tag = lead AND source = Google, branch A; else branch B" |
| Wait steps | "Wait 24 hours, then send SMS" |
| Email sequences | Full HTML emails with merge fields |
| Pipeline stages | Move contact on trigger |
| Tags | Apply/remove on any condition |
| SMS messages | Personalized with {{contact.name}} etc. |

## The prompt pattern

Give Claude the automation goal in plain English. Include:
- **Trigger** — what event starts it
- **Goal** — what outcome you want
- **Branches** — any if/else conditions
- **Timing** — delays between steps
- **Content** — what the messages should say

### Example prompt:
```
Build a GoHighLevel nurture sequence for a roofing company.

TRIGGER: Contact submits "Free Roof Inspection" form
GOAL: Book an inspection call within 48 hours

SEQUENCE:
1. Immediately: send confirmation email (friendly, professional, includes calendar link)
2. After 2 hours: send SMS "Hi {{contact.firstName}}, this is [Company]. 
   Just confirming we received your inspection request. Reply YES to confirm 
   or call us at [number]."
3. If no reply after 24 hours: send follow-up email with a testimonial
4. After 48 hours with no booking: apply tag "needs-call", notify rep via email

Use the GHL CLI to create this workflow in my account.
```

Claude translates this into CLI commands, runs them sequentially, and the workflow appears in your GHL account — no clicking required.

## Email generation in Claude

Claude writes GHL-compatible emails with:
- Correct merge field syntax: `{{contact.firstName}}`, `{{contact.email}}`
- HTML structure that renders correctly in GHL's email builder
- Mobile-responsive inline CSS
- Clear CTA buttons with tracked links

### Prompt for email-only tasks:
```
Write a 3-email welcome sequence for a [business type] in GoHighLevel format.
- Email 1 (immediate): welcome + what to expect
- Email 2 (day 3): value-add tip relevant to [topic]
- Email 3 (day 7): soft CTA to book a call

Use GHL merge fields. Format as HTML I can paste into the GHL email builder.
```

## Workflow structure Claude understands

GoHighLevel workflows follow this pattern — brief Claude on it once in CLAUDE.md:

```markdown
# GHL Workflow structure
Triggers → Actions → Conditions → Wait steps → End actions

Trigger types: form submit, tag applied, appointment booked, 
  pipeline stage change, inbound call, custom webhook

Action types: send email, send SMS, apply tag, remove tag, 
  add to pipeline, remove from pipeline, notify user, 
  create task, wait X hours/days, webhook

Condition operators: equals, contains, is empty, tag exists,
  custom field value
```

With this in CLAUDE.md, Claude builds valid GHL logic without needing to be re-briefed every session.

## Full agency workflow

For agencies managing multiple client GHL sub-accounts:

1. **Per-client CLAUDE.local.md** — store the client's GHL sub-account ID, main pipeline names, form names, and rep email
2. **Template prompts** — reuse the same sequence prompt with client variables swapped in
3. **Snapshot export** — after Claude builds a workflow, export it as a GHL snapshot for reuse across clients

```markdown
# CLAUDE.local.md (per-client)
GHL_SUBACCOUNT: abc123
PIPELINE_NAME: "Inspection Pipeline"
MAIN_FORM: "Free Inspection Request"
REP_EMAIL: john@clientbusiness.com
BOOKING_LINK: https://calendly.com/...
```

Pass this as context at the start of each session and Claude uses the right names in every CLI command.

## What the GHL CLI covers

Based on the Lead Gen Jay CLI:
- `ghl workflow create` — build a new workflow from JSON spec
- `ghl workflow trigger add` — append a trigger to existing workflow
- `ghl email create` — create email template
- `ghl contact tag` — apply tags to contacts
- `ghl pipeline stage` — manage pipeline stage transitions
- (Full command list in CLI docs at leadgenjay.com)

## Key principle

> The dashboard is for humans who have no other option. The CLI is for builders who do. Every hour spent clicking through GHL is an hour Claude could have done it in 3 minutes.
