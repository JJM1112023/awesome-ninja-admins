---
name: premium-website
description: Build a $10,000-quality website with Claude Code — the 8-pillar checklist, design skills setup, reference-based prompting, imagery, polish passes, and live deployment. No coding, no templates, no generic AI look.
user-invocable: true
---

# Premium Website with Claude Code

## The core insight

The difference between a $200 AI website and a $10,000 one is not the tool — it is the **brief, the references, and the passes**.

Claude Code can produce premium output. It produces generic output when given generic input.

## Setup (zero developer setup)

1. Install **Claude Code desktop app** — no terminal, no Node, no configuration
2. Open a new project folder
3. Install two design skills (see below)
4. That's it — you're building

## Design skills to install first

Install these before writing a single line of prompt. They give Claude professional design vocabulary.

### Frontend Design skill (by Anthropic)
Search GitHub: `anthropic frontend-design claude skill`
- Teaches Claude modern CSS, layout patterns, component hierarchy
- Gives access to Anthropic's own UI conventions

### UI/UX Pro Max skill
Search GitHub: `UI/UX Pro Max claude skill`
- Extends Claude's design reasoning with premium UX patterns
- Covers spacing, typographic hierarchy, visual weight, contrast ratios

**Install method:** add each skill's SKILL.md to `.claude/skills/` in your project.

## The 8-pillar checklist (what separates $10K from $200)

A $10,000 website delivers all eight. Check each before calling the site done.

| # | Pillar | What it means |
|---|--------|--------------|
| 1 | **Clear value proposition** | Above the fold: who it's for, what they get, why now |
| 2 | **Visual hierarchy** | Eyes follow a path; nothing competes equally for attention |
| 3 | **Typography** | 2-font max, correct weights, proper line-height and spacing |
| 4 | **Color discipline** | Brand palette + one accent; backgrounds are not pure white |
| 5 | **Motion & micro-interactions** | Subtle on-scroll animations, hover states, smooth transitions |
| 6 | **Premium imagery** | Custom hero visuals, not stock; generated or art-directed |
| 7 | **Conversion flow** | Every section moves toward a single CTA; no dead ends |
| 8 | **Mobile-first perfection** | Not "it works on mobile" — pixel-perfect on mobile |

## The build workflow

### Phase 1: Brief + references (the most important step)

Never prompt from a blank slate. Assemble:

**The brief (answer these before prompting):**
```
Client: [industry, company name, target customer]
Goal: [primary conversion — book call, buy, subscribe, contact]
Tone: [3 adjectives: e.g., "confident, minimal, editorial"]
Budget signal: [what price point should the site feel like]
Competitor sites: [2-3 examples of what NOT to look like]
```

**Design references (find 3–5 on these sites):**
- **Dribbble** (https://dribbble.com) — UI inspiration, hero layouts
- **Awwwards** (https://www.awwwards.com) — award-winning sites, motion, innovation
- **Pinterest** (https://pinterest.com) — mood boards, color palettes, typography combos

Save screenshots of the reference sites and include them in your Claude Code session.

### Phase 2: The build prompt

Structure it in this order:

```
You are building a premium [type] website for [client/industry].

TONE: [3 adjectives]
TARGET CUSTOMER: [1 sentence]
PRIMARY CTA: [one action]

DESIGN REFERENCES: [describe or attach screenshots]
- Reference 1: [what to borrow — layout/color/type style]
- Reference 2: [what to borrow]

STRUCTURE:
1. Hero — [headline concept, visual direction]
2. Problem/Solution — [key pain point and resolution]
3. [Section 3]
4. [Section 4]
5. CTA — [conversion section]

REQUIREMENTS:
- Mobile-first
- Smooth scroll animations (Intersection Observer)
- No generic stock photos — use [color fills / gradients / generated imagery]
- Typography: [font pairing or aesthetic]
- Color palette: [primary, secondary, accent, background]
```

### Phase 3: Imagery + components

**Hero imagery (two paths):**
- ChatGPT (DALL-E) or Midjourney: generate brand-specific hero visuals
- ElevenLabs (https://elevenlabs.io/): generate voiceover or audio for motion sections

**Premade components:**
- **21st.dev** (https://21st.dev) — copy-paste premium React/Tailwind components: cards, navbars, hero sections, pricing tables, testimonials
- Add components to your build prompt: "Use a component similar to [21st.dev example]"

### Phase 4: Polish passes (2–3 passes minimum)

Never ship after the first generation. Run these passes:

**Pass 1 — Spacing audit**
```
Review every section. Increase padding between sections. 
Increase line-height on body text. Add more breathing room — 
premium sites have more whitespace than you think you need.
```

**Pass 2 — Typography tightening**
```
Check heading hierarchy. H1 should be significantly larger than H2. 
Body text at 16–18px minimum. Font weights should contrast clearly 
(light body, bold headings).
```

**Pass 3 — Motion layer**
```
Add subtle fade-in-up animations on scroll for each section.
Add hover state transitions on all interactive elements (0.2s ease).
Add a smooth scroll behavior.
```

**Pass 4 — Mobile audit**
```
Check the site at 375px width. Fix any overflow, font sizes that are 
too large, CTAs that are too small to tap, images that don't scale.
```

**Re-evaluate the checklist:** run through all 8 pillars after each pass.

### Phase 5: Deploy live

**Hostinger** (https://www.hostinger.com) — recommended for Claude-generated static sites:
1. Export the built files (HTML/CSS/JS)
2. Buy domain + hosting on Hostinger
3. Upload files via File Manager or FTP
4. Point DNS — live in minutes

## Prompting for "expensive" vs "generic"

| Generic AI look | Premium look prompt additions |
|----------------|------------------------------|
| Pure white background | "Use off-white (#F8F6F2) or very dark (#0D0D0D) background" |
| System fonts | "Use [Instrument Serif / PP Neue Montreal / Sohne] or a Google Fonts pairing" |
| Flat sections | "Add subtle grain texture overlay, 2% opacity" |
| Box-shadow cards | "Cards with border: 1px solid rgba(0,0,0,0.08) and no shadow" |
| Centered everything | "Left-aligned hero text, asymmetric layout" |
| Stock-photo feel | "No photos — use [abstract shapes / gradient blobs / typographic art]" |

## Key principle

> The brief is the product. A precise brief with 5 reference screenshots produces a premium site. A vague brief produces generic output — and that is never Claude's fault.

The AI is the builder. You are the creative director. Invest time in the brief.
