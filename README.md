# diya-site

Personal site for Diya Sreedhar. Single static HTML page, no build step.

## Run locally

```sh
python3 -m http.server 4173 --directory ~/diya-site
# open http://localhost:4173
```

## Deploy as an "unlisted" site

"Unlisted" on the web really means **two things together**:

1. **Don't get indexed by search engines** — already handled. `index.html` includes
   `<meta name="robots" content="noindex, nofollow">`, so Google, Bing, etc. will
   skip it.
2. **Don't have a guessable URL** — handled at the hosting layer. Pick a host that
   gives you a random subdomain, and don't put the link in any public page that
   crawlers can reach.

### Easiest path — Netlify drag-drop (recommended)

1. Go to https://app.netlify.com/drop
2. Drag the entire `~/diya-site` folder onto the drop zone.
3. You get a URL like `https://kindly-bunny-a1b2c3.netlify.app`. Share only with
   people you want to see it.
4. Free, instant, no account needed for a first deploy (account lets you keep it
   forever and rename the subdomain).

### Vercel

```sh
npm i -g vercel
cd ~/diya-site
vercel        # follow prompts; pick a random project name
```

You get `https://<project>.vercel.app`. Same noindex behavior.

### GitHub Pages

Works, but the *repo* needs to be either private (Pages-from-private needs a paid
plan) or public (anyone browsing your GitHub can find it). Less ideal for
"unlisted" than Netlify/Vercel.

### If you want real privacy (not just unlisted)

Add password protection: Netlify and Vercel both offer this on paid tiers
(Netlify ~$19/mo). Or put it behind Cloudflare Access (free for up to 50 users).
The current setup is *unlisted* — anyone with the URL sees it — not *private*.

## Files

```
index.html                # the page
assets/css/main.css       # styles + dark/light theme
assets/js/main.js         # SVG morph animation + scroll reveal + theme toggle
.claude/launch.json       # local dev-server config
```

## Editing

- **Add a project**: copy a `<g class="c-node-g" ...>` block inside `#nodes` and
  add a matching `<article class="card">` in the Research section. The morph
  engine auto-distributes nodes around the orbit based on count.
- **Change shapes**: edit the `SHAPES` array in `assets/js/main.js`. Each entry
  is a function `(t) -> [x, y]` for `t ∈ [0, 1)` walking around the perimeter.
- **Change pacing**: `holdMs` (time on each shape) and `morphMs` (transition
  duration) at the top of the morph-state section.
