---
name: claude-cms
description: Build a client-handoff website with a built-in CMS using Claude Code — blueprint extractor, one-shot build, safety layer, MongoDB Atlas backend, Vercel deployment. Clients edit their own site without touching code or touching you.
user-invocable: true
---

# Claude CMS: Client-Handoff Websites

## The problem solved

Clients want to edit their website. When you give them code access, they break it. When you do every edit for them, you become their IT department forever.

The solution: build the site with Claude Code, then build a **separate CMS admin panel** backed by MongoDB. The client gets one URL for the public site, one for their editor. They can change text, images, and content — the design is untouchable.

```
Public site URL  →  https://clientsite.com       (locked design)
CMS admin URL    →  https://clientsite.com/admin (editable content)
```

## The full workflow (8 chapters)

### Chapter 1: Pick a design reference

Use **Dribbble** or **Awwwards** to find a site in the right style. Screenshot it. This is your design brief.

### Chapter 2: Blueprint Extractor (Firecrawl)

Instead of describing a design reference by hand, use **Firecrawl** to extract the structure of any live website:

```
"Use Firecrawl to crawl [reference URL] and extract the layout structure, 
color palette, font choices, and section hierarchy. Save it as blueprint.md."
```

Firecrawl (https://firecrawl.dev/) returns clean markdown from any URL — Claude uses it as a structured design brief rather than a screenshot description.

**Why this matters:** a screenshot tells Claude what it looks like. A blueprint tells Claude how it's built. The output is more accurate.

### Chapter 3: One-shot website build prompt

With the blueprint extracted, build the full site in one prompt:

```
You are building a responsive website for [client/industry].

DESIGN REFERENCE: [attach blueprint.md]
TONE: [3 adjectives]
PRIMARY CTA: [the one action]
COLOR PALETTE: [extracted from blueprint]
TYPOGRAPHY: [extracted from blueprint]

BUILD:
1. Hero section with headline, subhead, CTA button
2. [Section 2]
3. [Section 3]
4. Footer

REQUIREMENTS:
- Pure HTML/CSS/JS (no frameworks — Vercel static deploy)
- Mobile responsive
- All text content stored in a JavaScript content object at the top
  of the file (this is how the CMS will edit it)
- Smooth scroll animations

IMPORTANT: Store ALL editable content (headlines, body text, button 
labels, image URLs) in a single `const CONTENT = { }` object at the 
top of the script. Do not hardcode text inside HTML elements.
```

The `CONTENT` object is what makes the CMS possible — all editable content lives in one place.

### Chapter 4: Add logos and polish

```
"Add the client logo to the hero and footer. 
Source a relevant hero image from Kie.ai [https://kie.ai/].
Add subtle fade-in animations on scroll."
```

Use **OpenRouter** (https://openrouter.ai/) to swap models mid-session — Opus for architecture, Haiku for polish passes, cheapest available for repetitive tasks.

### Chapter 5: Deploy the public site (free)

**GitHub + Vercel = free static hosting:**

1. `git init && git add . && git commit -m "initial site"`
2. Push to GitHub repo
3. Connect repo to Vercel (https://vercel.com/) — one click
4. Vercel auto-deploys on every push
5. Add custom domain in Vercel settings

Client gets: `https://their-domain.com` — live, free, auto-updating.

### Chapter 6: Build the CMS in Claude

Now build the admin panel as a separate route:

```
"Build a CMS admin panel at /admin that:
- Reads all content from MongoDB Atlas
- Displays editable fields for every key in the CONTENT object
- Has a Save button that writes back to MongoDB
- Requires a password to access (simple session token)
- Is completely separate from the public site styling"
```

The CMS reads/writes to the same `CONTENT` keys the public site displays. Change a headline in the CMS → public site updates on next load.

### Chapter 7: Add the safety layer

This is what separates "client-safe" from "client-destructive":

```
"Add a safety layer to the CMS:
- Text fields: max character limits matching the design constraints
- Image fields: URL validation only (no file upload)
- No access to HTML, CSS, or JS — content fields only
- Confirmation modal before saving
- Change log showing last 10 edits with timestamps"
```

The safety layer means clients can't accidentally delete CSS, upload a 50MB image, or break the layout with a 500-word headline.

### Chapter 8: Connect MongoDB Atlas

**MongoDB Atlas** (https://www.mongodb.com/atlas) is the free-tier database that stores the CMS content:

1. Create a free cluster at mongodb.com/atlas
2. Get the connection string
3. Set it as an environment variable in Vercel: `MONGODB_URI=...`
4. Claude writes the connection code:

```
"Connect the CMS to MongoDB Atlas using the MONGODB_URI environment 
variable. Store content as a single document in a 'content' collection. 
Use upsert so the first save creates the document."
```

### Chapter 9: Publish the CMS live

1. Add the CMS route to the same Vercel project
2. Set `MONGODB_URI` and `CMS_PASSWORD` in Vercel environment variables
3. Deploy — both URLs go live simultaneously

**Two links, one system:**
- `https://clientsite.com` — public (read from MongoDB)
- `https://clientsite.com/admin` — editor (write to MongoDB, password-protected)

### Chapter 10: Scale to many clients

One repo pattern, many deployments:

```
client-sites/
├── template/          ← the base site + CMS template
├── client-a/          ← fork of template, their content
├── client-b/
└── client-c/
```

Each client gets their own Vercel project + MongoDB database. Setup time per new client: ~20 minutes (fork template, update CONTENT object, deploy, hand over admin URL + password).

## Tech stack summary

| Layer | Tool | Cost |
|-------|------|------|
| Build | Claude Code | Usage-based |
| Hosting | Vercel | Free (static) |
| Database | MongoDB Atlas | Free (512MB) |
| Repo | GitHub | Free |
| Images | Kie.ai | Usage-based |
| Blueprint extraction | Firecrawl | Free tier available |
| Voice input | Glaido | Free tier |

## The CONTENT object pattern (critical)

Every site built with this method must follow this structure:

```javascript
const CONTENT = {
  hero: {
    headline: "Your main headline here",
    subheadline: "Supporting text that explains the value",
    ctaText: "Get Started",
    ctaUrl: "#contact",
    backgroundImage: "https://..."
  },
  about: {
    title: "About Us",
    body: "Company description..."
  }
  // one key per editable section
};
```

The CMS admin reads this object structure and renders a form field per key. Save → writes back to MongoDB → public site reads from MongoDB on load.

## Key principle

> Give the client a key to the house, not the architect's drawings. They can move furniture — they cannot knock down walls.

The CMS is the key. The safety layer is the wall. Build both, and you exit the project cleanly.
