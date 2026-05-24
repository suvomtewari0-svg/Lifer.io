# Lifer ⚡

A mobile-first daily habit tracker with XP rewards, a focus timer, and trophy history.
Dark, futuristic UI — fully free, no paywalls.

---

## 🚀 Put it on the internet in 3 steps

### Option A — GitHub Pages (free, auto-deploys on every push)

1. **Create a new GitHub repository** (e.g. `lifer`)
2. **Drag all these files** into the repo root on github.com  
   *(click "uploading an existing file" on the empty repo page)*
3. **Enable Pages + set the base URL:**
   - Go to repo **Settings → Pages → Source → GitHub Actions**  
     *(the `.github/workflows/deploy.yml` file handles the build automatically)*
   - Open `vite.config.js` and change `BASE` to match your repo name:
     ```js
     const BASE = process.env.VITE_BASE_URL || '/lifer/'
     //                                          ^^^^^^^^ your repo name
     ```
   - Commit the change — GitHub Actions will build and deploy automatically
4. Your app is live at `https://yourusername.github.io/lifer/`

> **User page?** If your repo is named `yourusername.github.io`, leave `BASE = '/'`.

---

### Option B — Netlify (drag & drop, no account required)

```bash
npm install
npm run build        # creates the dist/ folder
```
Go to **[netlify.com/drop](https://app.netlify.com/drop)** and drag the `dist/` folder.  
You get a live URL instantly. Done.

---

### Option C — Vercel

Push to GitHub, then import at **[vercel.com](https://vercel.com)** — it auto-detects Vite.

---

## 💻 Run locally

```bash
npm install
npm run dev     # http://localhost:3000
```

---

## 📁 File structure

```
lifer/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← auto-build & deploy to GitHub Pages
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AddTaskModal.jsx  ← bottom-sheet form for new tasks
│   │   ├── FocusTab.jsx      ← 25-min countdown timer
│   │   ├── HomeTab.jsx       ← dashboard: XP, progress, challenges
│   │   ├── ProfileTab.jsx    ← avatar, rank journey, theme picker
│   │   ├── RewardsTab.jsx    ← theme switcher, achievements, shop
│   │   ├── StatsTab.jsx      ← bar chart, category breakdown
│   │   ├── TaskCard.jsx      ← reusable task row
│   │   ├── TasksTab.jsx      ← filtered task list
│   │   └── TrophiesTab.jsx   ← completed-task history grouped by week
│   ├── App.jsx               ← root: all state, routing, overlays
│   ├── constants.js          ← themes, tasks, shop items, helpers
│   ├── index.css             ← global reset + keyframe animations
│   ├── main.jsx              ← React entry point
│   └── styles.js             ← theme-aware style factory
├── index.html                ← HTML shell + meta tags + fonts
├── vite.config.js            ← build config (set BASE here for GitHub Pages)
├── netlify.toml              ← Netlify SPA redirect rule
├── vercel.json               ← Vercel SPA redirect rule
└── package.json
```

---

## ✨ Features

| Feature | Details |
|---|---|
| Tasks | Add unlimited custom tasks with category + difficulty |
| XP & levelling | 500 XP per level, Level Up animation |
| Coins & shop | Earn coins, buy badges and avatars |
| Themes | 5 colour themes: Cyan, Void, Forest, Legendary, Rose |
| Focus timer | 25-min Pomodoro ring with +100 XP bonus |
| Trophies | Every completed task logged, grouped by week, kept forever |
| Stats | Weekly bar chart, category completion bars |
| Perfect Day | Bonus banner when all tasks are done |
| Streaks | Daily streak counter with fire icon |

---

## 🛠 Tech stack

| | |
|---|---|
| UI | React 18 |
| Build | Vite 5 |
| Charts | Recharts |
| Icons | Lucide React |
| Fonts | Syne, Space Mono, DM Sans (Google Fonts) |
| Deploy | GitHub Pages / Netlify / Vercel |
