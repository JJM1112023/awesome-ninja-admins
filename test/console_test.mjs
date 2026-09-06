#!/usr/bin/env node
/**
 * console_test.mjs — behavioural tests for the Z.E.R.O. console.
 *
 * zero-brain/index.html is the largest and most stateful thing in the repo,
 * and `scripts/validate-pwa.sh` only checks its structure — that the manifest
 * is linked and the script tags balance. Nothing proved the app actually ran
 * until this file existed. These tests drive a real Chromium against a real
 * static server and assert on observable behaviour.
 *
 *   node test/console_test.mjs            # serves the repo on a free port
 *   node test/console_test.mjs --headed   # watch it run
 *
 * Playwright is optional: if it is not installed the suite SKIPS with exit 0,
 * matching how scripts/check-all.sh treats shellcheck/bats/Pillow. CI installs
 * it so the coverage is real there.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const HEADED = process.argv.includes('--headed');

// ── Locate Playwright without adding a package.json to the repo ────────────
async function loadChromium() {
  const require_ = createRequire(import.meta.url);
  const candidates = [
    'playwright',
    'playwright-core',
    '/opt/node22/lib/node_modules/playwright/index.mjs',
    '/usr/lib/node_modules/playwright/index.mjs',
  ];
  for (const spec of candidates) {
    try {
      const mod = await import(spec.startsWith('/') ? spec : require_.resolve(spec));
      if (mod.chromium) return mod.chromium;
    } catch { /* try the next candidate */ }
  }
  return null;
}

// ── Minimal static server (no dependency on http-server) ───────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.md': 'text/markdown; charset=utf-8',
};

function startServer() {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let file = path.join(ROOT, url);
    // Contain the server to the repo; a traversal attempt gets a 403.
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end('forbidden');
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, 'index.html');
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404).end('not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
      // The service worker must be allowed to update between reloads.
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () =>
      resolve({ server, base: `http://127.0.0.1:${server.address().port}` })
    );
  });
}

// ── Tiny assertion harness ─────────────────────────────────────────────────
const failures = [];
let passed = 0;
let group = '';

function section(name) {
  group = name;
  console.log(`\n— ${name} —`);
}

async function check(label, fn) {
  try {
    const value = await fn();
    if (value === false || value === undefined || value === null) {
      failures.push(`${group}: ${label}`);
      console.log(`  FAIL  ${label}`);
    } else {
      passed++;
      console.log(`  PASS  ${label}${value === true ? '' : ` → ${value}`}`);
    }
  } catch (err) {
    failures.push(`${group}: ${label} (${err.message})`);
    console.log(`  FAIL  ${label} — ${err.message}`);
  }
}

// ── The suite ──────────────────────────────────────────────────────────────
async function run(chromium, base) {
  const browser = await chromium.launch({ headless: !HEADED });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const pageErrors = [];
  const consoleErrors = [];
  page.on('pageerror', (e) => pageErrors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });

  const console_ = base + '/zero-brain/';
  const goto = (url = console_) => page.goto(url, { waitUntil: 'domcontentloaded' });

  // Selecting a node runs a camera easing animation; settle before asserting.
  const settle = (ms = 700) => page.waitForTimeout(ms);

  // The detail panel is tabbed and resets to INFO on every fresh selection,
  // so anything touching notes/tags/status has to open NOTES first.
  const openNotes = async () => {
    await page.click('[data-tab="notes"]');
    await page.waitForSelector('#d-note');
  };

  await goto();
  await settle(900);

  // ── boot ────────────────────────────────────────────────────────────────
  section('boot');
  await check('brain data is loaded', () => page.evaluate(() => !!window.__BRAIN__));
  await check('no error banner', async () => (await page.locator('.banner').count()) === 0);
  await check('skills metric matches the payload', () =>
    page.evaluate(() =>
      document.getElementById('m-skills').textContent === String(window.__BRAIN__.counts.skills)
        ? `${window.__BRAIN__.counts.skills} skills`
        : false
    ));
  await check('tools metric matches the payload', () =>
    page.evaluate(() =>
      document.getElementById('m-tools').textContent === String(window.__BRAIN__.counts.tools)
        ? `${window.__BRAIN__.counts.tools} tools`
        : false
    ));
  await check('graph nodes metric matches the payload', () =>
    page.evaluate(() =>
      document.getElementById('m-nodes').textContent === String(window.__BRAIN__.nodes.length)
        ? `${window.__BRAIN__.nodes.length} nodes`
        : false
    ));
  await check('one legend row per pillar', () =>
    page.evaluate(() =>
      document.querySelectorAll('.leg').length === window.__BRAIN__.pillars.length
        ? `${window.__BRAIN__.pillars.length} pillars`
        : false
    ));
  await check('roadmap renders every phase', () =>
    page.evaluate(() =>
      document.querySelectorAll('.road-item').length === window.__BRAIN__.roadmap.length
        ? `${window.__BRAIN__.roadmap.length} phases`
        : false
    ));
  await check('every edge endpoint resolves to a node', () =>
    page.evaluate(() => {
      const ids = new Set(window.__BRAIN__.nodes.map((n) => n.id));
      return window.__BRAIN__.edges.every((e) => ids.has(e.s) && ids.has(e.t));
    }));
  await check('canvas is actually painted', () =>
    page.evaluate(() => {
      const c = document.getElementById('c');
      const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
      let lit = 0;
      for (let i = 0; i < d.length; i += 4000) {
        if (d[i] + d[i + 1] + d[i + 2] > 40) lit++;
      }
      return lit > 20 ? `${lit} lit samples` : false;
    }));

  // ── search ──────────────────────────────────────────────────────────────
  section('search');
  await page.fill('#q', 'obsidian');
  await page.waitForTimeout(250);
  await check('a skill query returns results', async () => (await page.locator('.res').count()) > 0);
  await check('the best match is the skill itself', async () =>
    (await page.locator('.res-name').first().textContent()) === 'obsidian-memory');

  await page.fill('#q', 'nmap');
  await page.waitForTimeout(250);
  await check('tools are searchable, not just nodes', async () =>
    (await page.locator('.res-kind.tool').count()) > 0);

  await page.fill('#q', 'zzzznotathing');
  await page.waitForTimeout(250);
  await check('a miss reports no match', async () =>
    (await page.locator('.res-empty').count()) === 1);

  await page.fill('#q', 'skill');
  await page.waitForTimeout(250);
  await page.press('#q', 'ArrowDown');
  await page.press('#q', 'ArrowDown');
  await check('arrow keys move the result cursor', async () =>
    (await page.locator('.res.sel').count()) === 1);
  await page.press('#q', 'Enter');
  await settle();
  await check('Enter opens the highlighted result', async () =>
    (await page.locator('.d-name').count()) === 1);
  await check('opening a result clears the dropdown', async () =>
    (await page.locator('.results.on').count()) === 0);

  // ── selection and camera ────────────────────────────────────────────────
  section('selection and camera');
  await page.evaluate(() => { location.hash = ''; });
  await page.fill('#q', '');
  await page.click('#btn-reset');
  await settle();

  await page.locator('.leg').nth(2).click();
  await settle();
  await check('clicking a legend row selects that pillar', async () =>
    await page.locator('.d-name').textContent());
  await check('the status line names the selection', async () =>
    (await page.locator('#st-sel').textContent()) !== 'NO SELECTION');
  await check('connected neighbours are listed', async () =>
    (await page.locator('.chiplink').count()) > 0);

  const chip = await page.locator('.chiplink').first().textContent();
  await page.locator('.chiplink').first().click();
  await settle();
  await check('a neighbour chip navigates to that node', async () =>
    (await page.locator('.d-name').textContent()) === chip);

  // Regression for the inverted-sign camera bug: FOCUS must actually centre.
  await page.click('[data-act="focus"]');
  await settle(1400);
  await check('FOCUS centres the node on the stage', () =>
    page.evaluate(() => {
      const n = selected;
      const d = Math.hypot(n.sx - stage.cx, n.sy - stage.cy);
      return d < 12 ? `${d.toFixed(1)}px from centre` : false;
    }));
  await check('FOCUS brings the node to the near side', () =>
    page.evaluate(() => selected.sz > 0));

  // ── isolation ───────────────────────────────────────────────────────────
  section('isolation');
  await page.click('[data-act="isolate"]');
  await settle(300);
  await check('ISOLATE dims everything outside the neighbourhood', () =>
    page.evaluate(() => {
      const near = new Set([selected.id, ...(adj.get(selected.id) || [])]);
      const outside = nodes.filter((n) => !near.has(n.id));
      return outside.length > 0 && outside.every((n) => n.em < 0.3);
    }));
  await page.keyboard.press('Escape');
  await settle(300);
  await check('Escape clears isolation', () =>
    page.evaluate(() => nodes.every((n) => n.em === 1)));

  // ── per-node workspace: notes, tags, status, pin ────────────────────────
  section('workspace data');
  await goto(console_ + '#node=skill:claude-seo');
  await settle(900);
  await check('deep link selects the requested node', async () =>
    (await page.locator('.d-name').textContent()) === 'claude-seo');
  await check('the detail panel opens on INFO', async () =>
    (await page.locator('.d-tab.on').textContent()).startsWith('INFO'));

  await openNotes();
  await page.fill('#d-note', 'ship the SEO offer first');
  await page.fill('#d-tags', 'revenue, priority');
  await page.click('[data-status="active"]');
  await settle(200);
  await page.click('[data-act="fav"]');
  await settle(200);

  await check('status button reflects the choice', async () =>
    (await page.locator('[data-status="active"].on').count()) === 1);
  await check('pin button reflects the choice', async () =>
    (await page.locator('.d-fav.on').count()) === 1);

  await goto(console_ + '#node=skill:claude-seo');
  await settle(900);
  await check('the NOTES tab is badged when a note exists', async () =>
    (await page.locator('[data-tab="notes"]').textContent()).includes('•'));
  await openNotes();
  await check('the note survives a reload', async () =>
    (await page.inputValue('#d-note')) === 'ship the SEO offer first');
  await check('the tags survive a reload', async () =>
    (await page.inputValue('#d-tags')) === 'revenue, priority');
  await check('the status survives a reload', async () =>
    (await page.locator('[data-status="active"].on').count()) === 1);
  await check('the pin survives a reload', async () =>
    (await page.locator('.d-fav.on').count()) === 1);

  await check('workspace data is stored apart from the graph payload', () =>
    page.evaluate(() => {
      const raw = JSON.parse(localStorage.getItem('zero.nodes') || '{}');
      return !!raw['skill:claude-seo'] && raw['skill:claude-seo'].note.length > 0;
    }));

  // Typing must not re-render the panel, or the caret jumps to the end.
  await page.click('#d-note');
  await page.keyboard.type('!');
  await check('typing in the note keeps focus in the field', () =>
    page.evaluate(() => document.activeElement && document.activeElement.id === 'd-note'));

  await check('clearing every field drops the record entirely', async () => {
    await page.fill('#d-note', '');
    await page.fill('#d-tags', '');
    await page.click('[data-status="active"]');   // toggles the active status off
    await page.click('.d-fav');                   // unpins
    await page.waitForTimeout(200);
    return page.evaluate(() => {
      const raw = JSON.parse(localStorage.getItem('zero.nodes') || '{}');
      return raw['skill:claude-seo'] === undefined;
    });
  });

  // ── per-node Markdown export ────────────────────────────────────────────
  section('markdown export');
  await openNotes();
  await page.fill('#d-note', 'exported note body');
  await page.waitForTimeout(150);
  const nodeDownload = page.waitForEvent('download', { timeout: 8000 });
  await page.click('[data-act="md"]');
  const md = await nodeDownload;
  await check('.MD exports a slugged filename', () =>
    md.suggestedFilename() === 'claude-seo.md' ? md.suggestedFilename() : false);
  await check('.MD body carries the node and its note', async () => {
    const stream = await md.createReadStream();
    const text = await new Promise((resolve, reject) => {
      let out = '';
      stream.on('data', (c) => { out += c; });
      stream.on('end', () => resolve(out));
      stream.on('error', reject);
    });
    return text.includes('# claude-seo') && text.includes('exported note body')
      && text.includes('## Connected');
  });
  await page.fill('#d-note', '');
  await page.waitForTimeout(150);

  // ── roadmap ─────────────────────────────────────────────────────────────
  section('roadmap');
  await goto();
  await settle(700);
  const roadBefore = await page.locator('#road-count').textContent();
  await page.locator('.road-item').nth(5).click();
  await page.waitForTimeout(200);
  const roadAfter = await page.locator('#road-count').textContent();
  await check('ticking a phase changes the count', () => roadBefore !== roadAfter);
  await goto();
  await settle(700);
  await check('roadmap ticks survive a reload', async () =>
    (await page.locator('#road-count').textContent()) === roadAfter);

  // ── capture inbox ───────────────────────────────────────────────────────
  section('capture inbox');
  await page.fill('#cap-input', 'a captured thought');
  await page.click('#cap-add');
  await page.waitForTimeout(200);
  await check('a capture is stored', async () => (await page.locator('.cap-note').count()) === 1);
  await goto();
  await settle(700);
  await check('captures survive a reload', async () =>
    (await page.locator('.cap-note').count()) === 1);

  const capDownload = page.waitForEvent('download', { timeout: 8000 });
  await page.click('#cap-export');
  await check('captures export as Markdown', async () =>
    (await capDownload).suggestedFilename());

  page.once('dialog', (d) => d.accept());
  await page.click('#cap-clear');
  await page.waitForTimeout(300);
  await check('clearing empties the inbox', async () =>
    (await page.locator('.cap-note').count()) === 0);

  // ── mission control ─────────────────────────────────────────────────────
  section('mission control');
  await page.click('#btn-mc');
  await page.waitForTimeout(400);
  await check('mission control opens', async () => await page.locator('#mc').isVisible());
  await check('it renders its view strip', async () =>
    (await page.locator('#mc-strip > *').count()) > 0);

  const views = await page.locator('#mc-strip > *').count();
  for (let i = 1; i < Math.min(views, 6); i++) {
    await page.locator('#mc-strip > *').nth(i).click();
    await page.waitForTimeout(200);
  }
  await check('every view renders without emptying the body', async () =>
    (await page.locator('#mc-body').textContent()).trim().length > 0);

  // Regression: `/` used to focus the search box hidden under the overlay.
  await page.keyboard.press('/');
  await page.waitForTimeout(150);
  await check('slash does not steal focus while the overlay is open', () =>
    page.evaluate(() => document.activeElement.id !== 'q'));

  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  await check('Escape closes mission control', async () =>
    !(await page.locator('#mc').isVisible()));

  await check('slash focuses the search box once the overlay is closed', async () => {
    await page.keyboard.press('/');
    await page.waitForTimeout(150);
    return page.evaluate(() => document.activeElement.id === 'q');
  });
  await page.keyboard.press('Escape');

  // ── resilience ──────────────────────────────────────────────────────────
  section('resilience');
  await page.evaluate(() => {
    localStorage.setItem('zero.nodes', '[1,2,3]');       // array, not object
    localStorage.setItem('zero.captures', '{"not":"an array"}');
    localStorage.setItem('zero.roadmap', 'not json at all');
    localStorage.setItem('zero.events', 'null');
  });
  await goto();
  await settle(900);
  await check('corrupted storage does not break startup', async () =>
    (await page.locator('.banner').count()) === 0 &&
    (await page.locator('.leg').count()) > 0);
  await check('a corrupted node store still accepts writes', async () => {
    await page.evaluate(() => { location.hash = '#node=skill:claude-seo'; });
    await page.waitForTimeout(600);
    await openNotes();
    await page.fill('#d-note', 'written over corruption');
    await page.waitForTimeout(200);
    return page.evaluate(() => {
      const raw = JSON.parse(localStorage.getItem('zero.nodes') || '{}');
      return raw['skill:claude-seo'] &&
        raw['skill:claude-seo'].note === 'written over corruption';
    });
  });
  await page.evaluate(() => localStorage.clear());

  // ── offline ─────────────────────────────────────────────────────────────
  section('offline');
  await goto();
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForTimeout(2500);
  await check('the shell precaches the console and its data', () =>
    page.evaluate(async () => {
      const keys = await caches.keys();
      for (const k of keys) {
        const urls = (await (await caches.open(k)).keys()).map((r) => new URL(r.url).pathname);
        if (urls.some((u) => u.endsWith('/zero-brain/brain-data.js'))) return true;
      }
      return false;
    }));
  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await settle(1200);
  await check('the console works with the network down', () =>
    page.evaluate(() => !!window.__BRAIN__ && document.querySelectorAll('.leg').length > 0));
  await context.setOffline(false);

  // ── responsive ──────────────────────────────────────────────────────────
  section('responsive');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await check('side panels collapse on a phone', async () =>
    !(await page.locator('#p-left').isVisible()));
  await page.click('#btn-left');
  await page.waitForTimeout(300);
  await check('the SYS button opens the panel', async () =>
    await page.locator('#p-left').isVisible());
  await check('the page never scrolls sideways', () =>
    page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
  await check('visible buttons meet the 44px touch guideline', () =>
    page.evaluate(() =>
      [...document.querySelectorAll('.tbtn')]
        .filter((b) => b.offsetParent)
        .every((b) => b.getBoundingClientRect().height >= 44)));
  await page.setViewportSize({ width: 1440, height: 900 });

  // ── landing page ────────────────────────────────────────────────────────
  section('landing page');
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  await check('the codex grid renders', async () =>
    (await page.locator('#grid > *').count()) > 0);
  await check('it links to the console', async () =>
    (await page.locator('a[href="zero-brain/"]').count()) > 0);
  // The category cards open an in-page tool browser fed by brain.json; only
  // a modifier-click keeps the original jump to the GitHub README anchor.
  await check('a category card opens the in-page tool browser', async () => {
    await page.locator('.card').first().click();
    await page.waitForSelector('#ovl.on', { timeout: 5000 });
    return (await page.locator('#ovl .ovl-row').count()) > 0;
  });
  await check('sub-chips filter the tool list', async () => {
    const total = await page.locator('#ovl .ovl-row').count();
    const chips = page.locator('#ovl-subs .chip');
    if ((await chips.count()) < 2) return false;
    await chips.nth(1).click();
    await page.waitForTimeout(250);
    const filtered = await page.locator('#ovl .ovl-row').count();
    return filtered > 0 && filtered < total;
  });
  await check('escape closes the tool browser', async () => {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);
    return (await page.locator('#ovl.on').count()) === 0;
  });

  // ── console hygiene ─────────────────────────────────────────────────────
  section('console hygiene');
  // Third-party CDN assets (Three.js, Google Fonts) are blocked in sandboxed
  // CI, and the landing page already guards for that — those failures are not
  // ours. Anything else is.
  const ours = consoleErrors.filter((t) => !/Failed to load resource/i.test(t));
  await check('no uncaught page errors', () =>
    pageErrors.length === 0 || `unexpected: ${pageErrors.join('; ')}`.slice(0, 200) && false);
  await check('no console errors from our own code', () =>
    ours.length === 0 || `unexpected: ${ours.join('; ')}`.slice(0, 200) && false);

  await browser.close();
}

// ── main ───────────────────────────────────────────────────────────────────
const chromium = await loadChromium();
if (!chromium) {
  console.log('console_test: SKIP — Playwright is not installed');
  console.log('  install it with: npm i -D playwright && npx playwright install chromium');
  process.exit(0);
}

const { server, base } = await startServer();
try {
  await run(chromium, base);
} finally {
  server.close();
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
console.log('console tests passed');
