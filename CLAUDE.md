# Bebotph — Claude Code Setup

## Project Structure

```
/Users/danvo/Bebotph/
├── webstore/              ← Next.js 16 app (deploys to Vercel → bebot.ph)
│   ├── app/
│   │   ├── page.tsx       ← Main storefront (full prototype port)
│   │   ├── layout.tsx     ← Fonts: Playbill + DM Mono, no Tailwind
│   │   └── globals.css    ← Full design system (tokens, dark mode, all components)
│   ├── public/assets/     ← Product images served by Next.js
│   │   ├── bebot-logo.png
│   │   ├── bebot-baby-tee-1.jpg / -2.jpg / -3.jpg
│   │   └── bebot-tank-1.jpg / -2.jpg / -3.jpg
│   ├── shopify-theme/     ← Liquid theme (deploys to Shopify via CLI)
│   └── vercel.json        ← Build config (Vercel Root Directory must = "webstore")
└── mobile/                ← Flutter app (separate, not wired to deploy yet)
```

## Git

- **Repo:** https://github.com/danthevo/bebotph-webstore
- **Branch:** `main`
- **Push command:** `git push origin main`
- Vercel auto-deploys on every push to `main`

```bash
# Standard ship flow
git add <files>
git commit -m "your message"
git push origin main
```

## Vercel (bebot.ph)

- **Dashboard:** vercel.com → project bebotph-webstore
- **Root Directory setting:** `webstore` ← CRITICAL, must stay set in dashboard
- **Auto-deploy:** yes, triggers on push to `main`
- **Domain:** bebot.ph (connect in Vercel dashboard → Domains)

If deploy fails, check:
1. Root Directory in Vercel dashboard = `webstore`
2. `webstore/vercel.json` exists with framework = nextjs
3. `webstore/package.json` has `"next"` in dependencies

## Shopify CLI

- **Store:** bebotph-dev.myshopify.com
- **CLI version:** 3.92.1
- **Theme directory:** `webstore/shopify-theme/`

### Themes on store
| Name | Role | ID |
|------|------|----|
| test-data | live | 153661341867 |
| Horizon | unpublished | 153661243563 |
| debut-vintage-theme | unpublished | 153661309099 |

### Push theme
```bash
cd webstore/shopify-theme
shopify theme push --store bebotph-dev.myshopify.com --theme 153661309099
```

### Preview theme (without publishing)
```bash
shopify theme dev --store bebotph-dev.myshopify.com
```

### Publish a theme live
```bash
shopify theme publish --store bebotph-dev.myshopify.com --theme <id>
```

### Login (if session expires)
```bash
shopify auth login --store bebotph-dev.myshopify.com
```

## Email Signup (Google Apps Script)

- `page.tsx` has `YOUR_APPS_SCRIPT_WEB_APP_URL` placeholder
- Deploy a Google Apps Script Web App → copy the URL → replace placeholder in `webstore/app/page.tsx`
- Then `git push origin main` to deploy

## Design Tokens

All colors/fonts live in `webstore/app/globals.css`:

```css
--cr:  #fff8f5   /* cream background */
--pk:  #F887AE   /* bebot pink */
--bk:  #1a0a06   /* dark brown/black */
--bk2: #532C23   /* medium brown */
--fg:  Playbill, serif
--fb:  Verdana, Geneva, sans-serif
--fm:  DM Mono, monospace
```

## Adding New Products

1. Add product images to `webstore/public/assets/` (use kebab-case .jpg names)
2. Edit `webstore/app/page.tsx` — add a new `<div className="pcard">` block in the `prod-grid` section
3. Use `onClick={() => window.addToCart("Product Name", "price")}` on the card

## Full Deploy Checklist

- [ ] Code changes made in `webstore/app/`
- [ ] New images added to `webstore/public/assets/`
- [ ] `npm run build` passes locally (`cd webstore && npm run build`)
- [ ] `git push origin main` — Vercel auto-deploys
- [ ] Check Vercel dashboard for green deploy
- [ ] If Shopify theme changed: `shopify theme push` from `webstore/shopify-theme/`

## gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

Available skills: /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review, /design-consultation, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse, /qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /retro, /investigate, /document-release, /codex, /cso, /autoplan, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade

If gstack skills aren't working, run `cd ~/.claude/skills/gstack && ./setup` to rebuild the binary and re-register skills.
