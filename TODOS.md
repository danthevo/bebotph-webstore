# bebot — TODOS
> Last updated: 2026-04-20 · Event: Saturday Apr 25

---

## 🔴 CRITICAL — must ship before Saturday

### Shopify
- [ ] Push Shopify theme live: `cd webstore/shopify-theme && shopify theme push --store bebotph-dev.myshopify.com --theme 153661309099`
- [ ] Add products in Shopify admin (Baby Tee ₱1,000 · Tank ₱900 · sizes S/M/L/XL)
- [ ] Install Paymongo app → enable GCash + COD
- [ ] Test real checkout end-to-end (place a ₱1 test order)

### Domain
- [ ] Connect bebot.ph → Vercel in Vercel dashboard → Domains (currently unconnected)
- [ ] Confirm www redirect works: bebot.ph → www.bebot.ph ✓ (already 307)

### Main page (page.tsx)
- [ ] Wire "Checkout →" button to Shopify checkout URL (or redirect to Shopify store)
- [ ] Fix nav links: New In, Collections, Events, Contact — add routes or scroll anchors
- [ ] Fix "Shop Now →" — scroll to product grid or link to /products

---

## 🟠 HIGH — before event, good to have

### Splash page (splash.html)
- [x] **Spotify playlist** — swapped to `playlist/5fer54vyXk9avMBGtMwX62` ✓
- [ ] **TikTok panel** — add real #bebot video IDs (grab top 4 from tiktok.com/tag/bebot → Share → Copy link → grab number after /video/)
- [ ] **enterSite() destination** — update `prototype.html` → `/` (the real Next.js store)
- [ ] **Mobile splash layout** — test on 375px: stacked panels need min-height so each panel isn't 50px tall on phone

### Music player (page.tsx)
- [x] Replaced custom music player with Spotify embed (`playlist/5fer54vyXk9avMBGtMwX62`) ✓

### Email signup
- [ ] Replace `YOUR_APPS_SCRIPT_WEB_APP_URL` in `webstore/app/page.tsx` with real Google Apps Script URL

---

## 🟡 MEDIUM — mobile/UX polish

### Mobile responsiveness
- [ ] **page.tsx hero** — right panel (model photo) hidden on mobile is correct, but hero text needs bigger tap targets
- [ ] **Product cards** — verify `.pcard` grid stacks to 1 column on 375px, images don't crop weirdly
- [ ] **Cart drawer** — test open/close on mobile, ensure overlay tap-to-close works
- [ ] **Nav bar** — on mobile, "CART ( 0 )" button overflows on small screens — reduce padding
- [ ] **Music player bar** — fixed bottom bar needs safe-area-inset on iPhone (add `padding-bottom: env(safe-area-inset-bottom)`)
- [ ] **Splash split on mobile** — each stacked panel should be `50vh` minimum, not collapse
- [ ] **Font load flash** — Playbill loads late; add `font-display: swap` or preload link for Playbill

### UX / interactions
- [ ] Product card hover → show second image (alt image already loaded: `-2.jpg` files)
- [ ] Add size selector before "Add to Cart" (S / M / L / XL)
- [ ] "VIEW ALL →" link on product grid — goes nowhere, add anchor or page
- [ ] Dark mode toggle state should persist in localStorage

---

## 🟢 LOW — post-Saturday, brand growth

### Shopify
- [ ] Add shipping: J&T Express or Ninja Van via Shopify Shipping
- [ ] Size guide page (in cm — PH market)
- [ ] Bilingual copy option (Filipino line in hero)
- [ ] Trust signals: FB page link, returns policy, "Manila-made" badge

### Splash page (long-term)
- [ ] Replace Elfsight placeholder with real TikTok feed widget
- [ ] Add YouTube panel option (swap Spotify ↔ YouTube behind toggle)
- [ ] Animate grain overlay off after intro completes (currently always on)

### Infrastructure
- [ ] Vercel preview deployments: disable password protection so preview URLs are shareable
- [ ] Set up Vercel Analytics (free tier) for traffic visibility
- [ ] Add OG meta tags (og:image, og:title) for Instagram/FB link preview

---

## ✅ DONE
- [x] Vercel auto-deploy from `main` branch → bebot.ph (live)
- [x] Next.js storefront: hero, product grid, cart drawer, dark mode, music player UI
- [x] All product images uploaded (`/public/assets/`)
- [x] Design tokens: cream/pink/dark brown, Playbill + DM Mono
- [x] Shopify theme built (`webstore/shopify-theme/`) — not yet pushed live
- [x] Splash intro animation: dark → logo → tagline → reveal (working)
- [x] gstack upgraded to v1.4.0
