# Salt & Fire Meat Co. — Website

A fast, static website for Salt & Fire Meat Co. at Oak Knoll Golf Course, Ashland, OR.
No build step, no framework — just HTML/CSS/JS. Host it anywhere.

## Pages
- `index.html` — Home (hero, highlights, three ways to order, story teaser)
- `menu.html` — Full menu + Order Online section
- `events.html` — Live music & comedy on the deck (Google Calendar embed)
- `about.html` — Our story (smoker, house-made, seating, beer/wine)
- `catering.html` — Catering with deposit flow
- `preorders.html` — Weekly ready-to-eat meals / pre-orders
- `location.html` — Address, hours, map, directions
- `css/styles.css` — Shared design system
- `js/main.js` — Mobile nav + active-link handling
- `assets/logos/` — Logo files

## How to preview
Open `index.html` in a browser, or run a local server from this folder:
```
python3 -m http.server 8000
```
Then visit http://localhost:8000

## How to publish (free/cheap options)
- **Netlify** or **Cloudflare Pages**: drag-and-drop this `site` folder, or connect the repo. Free tier is plenty.
- **GitHub Pages**: push the folder, enable Pages.
Point your domain (e.g. salt-n-fire.com) at whichever host you pick.

---

## ⚠️ Connect your Toast system (do this before going live)

All commerce is handled by **Toast**, not this website.

### ⭐ Fastest path — one link for every "Order Online" button
Open `js/main.js`, and near the very top set:

```js
var ORDER_URL = "https://www.toasttab.com/your-restaurant/order";
```

That single line wires **every** "Order Online" / "Order Now" / "Start Your Order"
button across the whole site to go **straight to ordering in one tap** (opens in a
new tab). Until it's set, those buttons fall back to the menu's order section.

### Other Toast buttons (catering, weekly meals)
These still use per-button placeholders (`href="#"`), each marked with a
`data-toast="..."` attribute so they're easy to find. Replace each `href="#"`
with the real Toast URL.

| Button | File | `data-toast` value | Point it to |
|---|---|---|---|
| Start Your Order | `menu.html` | `online-ordering` | Your **Toast Online Ordering** page URL |
| Request a Catering Quote | `catering.html` | `catering-deposit` | Your **Toast Catering & Events** deposit/invoice link (or an inquiry form) |
| Pre-Order This Week's Meals | `preorders.html` | `preorder-scheduled` | Your **Toast scheduled/future-order** menu link |

The "Order Online" buttons in the nav and hero link to `menu.html#order`; once the
Online Ordering button is wired up, they'll funnel customers straight to it.

### Toast setup checklist
1. **Toast Online Ordering** — enable it in Toast Web; it gives you a hosted ordering
   page tied to your POS. Copy that URL into the `online-ordering` button.
2. **DoorDash integration** — turn on the direct Toast ↔ DoorDash integration so
   DoorDash orders flow into your POS (setup takes ~3–5 business days). No website
   change needed; the menu page already mentions DoorDash.
3. **Catering & Events (deposits)** — set up Catering & Events to request deposits
   (fixed $ or a %) and collect balances by invoice link or on the POS. Use that
   flow (or an inquiry form) for the `catering-deposit` button.
4. **Scheduled / future orders (weekly meals)** — in Takeout & delivery →
   Availability, enable scheduling and set a minimum lead time. Build your weekly
   ready-to-eat menu, then link it from the `preorder-scheduled` button.

---

## Events calendar (bands & comedy on the deck)

The Events page (`events.html`) embeds a **public Google Calendar** so shows update
themselves — the owner just adds an event in Google Calendar on their phone and it
appears on the site. Until it's connected, the page shows a "not connected" placeholder.

To connect it:
1. In Google Calendar, make (or pick) a calendar for shows and set it to **public**
   (Settings → *your calendar* → Access permissions → "Make available to public").
2. Under **Integrate calendar**, copy your **Calendar ID** (looks like
   `abc123@group.calendar.google.com`).
3. In `events.html`, find the `data-embed-src` line and replace `YOUR_CALENDAR_ID`
   with that ID. That's it — the placeholder swaps out for the live calendar
   automatically. (Timezone is already set to `America/Los_Angeles`.)

## Daily specials ("Today's Special" board)

The Home page shows a **Today's Special** board that fills itself in based on the day
of the week. On days with no special it hides automatically — no empty box.

To edit the week, open `js/main.js` and change the `SPECIALS` block near the bottom.
Each weekday has a `name`, `desc`, and `price`. To hide the board on a given day,
leave its `name` blank (`""`). No other files need touching.

## Things to update with real info
- **Hours** (`location.html`) — set to 10:00 AM–6:30 PM daily (from Google listing); confirm weekend hours.
- **Phone** — set to `(541) 622-3989` (Salt & Fire's Google listing number).
- **Photos** — drop food/smoker/patio photos into `assets/photos/` using the exact
  filenames in `assets/photos/README.txt` (story.jpg, gallery-1.jpg … gallery-6.jpg).
  They auto-populate the Home gallery and the story panels. Missing files fall back
  to the logo, so nothing ever looks broken. Use owner-taken originals, not scraped
  Google/customer photos (rights).
- **Social links** — add Facebook/Instagram to the footer when ready.
- **Menu** — prices and items transcribed from the in-store chalkboards; keep in sync.

## Design notes
- Palette: smoky charcoal, burgundy (matches the restaurant wall), ember gold, warm cream.
- Fonts: Playfair Display (headings), Oswald (BBQ-signage labels), Karla (body).
- Southern-smokehouse texture: kraft-paper background, woodgrain/smoke hero.
