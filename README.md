# diya-site

Personal site for Diya Sreedhar. Static HTML site, no build step. GitHub Pages serves it from the `main` branch.

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
index.html                 # the home page (profile column + Currently, Previously, Research, Building, Writing, Honors, Press)
projects/*.html            # one write-up page per research card
assets/css/site.css        # all styles (light and dark follow the visitor's system setting)
assets/images/             # headshot and OpenDoor photos
assets/figures/            # figures used on project pages
assets/press/              # press thumbnails
```

## Editing

- **Add a research card**: copy one `<li><details class="card">...</details></li>` block inside
  `#research .cards` in `index.html`. The summary holds the title, a meta line and a one-line
  blurb; the `card-body` holds the longer text shown when the card is opened.
- **Add a project page**: copy any file in `projects/` and replace the `<h1>` and the `<article>` body.
- **Change the headshot**: replace `assets/images/headshot.jpg` with a square image (400x400 or larger).
- **Change "Currently" or "Previously"**: each line is one `<li>` with a `label` and a `desc`.
