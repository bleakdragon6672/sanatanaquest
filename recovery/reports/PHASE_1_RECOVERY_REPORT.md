# SanatanaQuest Recovery Mission — Phase 1 Report

**Date:** 2026-06-26
**Sources analyzed:**
1. `/home/z/my-project/upload/sanatanaquest1.tar` — source code backup (extracted to `/home/z/my-project/recovery/source_backup/`)
2. `/home/z/my-project/upload/sanatanaquest.space-z.ai.zip` — live deployment mirror (extracted to `/home/z/my-project/recovery/live_mirror/sanatanaquest.space-z.ai/`)
3. Live website `https://sanatanaquest.space-z.ai` — behavior reference (Phase 2)

---

## 1. Project Architecture

### Application Type
Single-page Next.js 16 application with **client-side view switching** (no Next.js routing for individual views). The entire app lives on `/` and switches views via a `NavContext`.

### Directory Layout (source backup)
```
sanatanaquest1/
├── .env                       # DATABASE_URL=file:/home/z/my-project/db/custom.db
├── .git/                      # 9 commits, 2026-06-25
├── .gitignore
├── .zscripts/                 # workspace-agent build/start/dev shell scripts
│   ├── build.sh               # standalone build → /tmp/build_fullstack_$BUILD_ID.tar.gz
│   ├── dev.sh
│   ├── start.sh               # production runtime launcher
│   └── mini-services-*.sh     # (mini-services empty — boilerplate)
├── Caddyfile                  # reverse proxy :81 → localhost:3000
├── bun.lock
├── components.json            # shadcn/ui config: new-york style, RSC, lucide icons
├── db/custom.db               # SQLite (unused — only boilerplate User/Post schema)
├── eslint.config.mjs
├── next.config.ts             # output: "standalone", ignoreBuildErrors: true
├── package.json
├── postcss.config.mjs
├── prisma/schema.prisma       # User, Post only — boilerplate, NOT used by app
├── public/
│   ├── logo.svg
│   ├── manifest.json          # PWA: Sanatan Quest, theme #f59e0b / #1a1410
│   └── robots.txt
├── scripts/
│   ├── generate_gita.py       # 3076-line Python that emits src/lib/gita-data.ts
│   └── gita-verify/           # (empty)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── route.ts                # GET /api → "Hello, world!"
│   │   │   └── ai/route.ts             # POST /api/ai — Spiritual Guide (4 actions)
│   │   ├── globals.css                 # 238 lines — saffron palette, animations
│   │   ├── layout.tsx                  # 90 lines — fonts, metadata, ThemeProvider
│   │   └── page.tsx                    # 131 lines — AppShell with ViewRouter
│   ├── components/
│   │   ├── nav-context.tsx             # client-side nav state in localStorage
│   │   ├── share-card-modal.tsx        # canvas-rendered PNG share cards
│   │   ├── sidebar.tsx                 # 11 nav items + mobile drawer
│   │   ├── spiritual-icons.tsx         # OmSymbol, LotusIcon, Mandala SVGs
│   │   ├── theme-provider.tsx          # next-themes wrapper
│   │   ├── theme-toggle.tsx            # light/dark/system dropdown
│   │   ├── verse-of-day.tsx            # deterministic daily verse card
│   │   ├── ui/                         # 49 shadcn/ui primitives (accordion…tooltip)
│   │   └── views/
│   │       ├── home-view.tsx           # 284 lines
│   │       ├── gita-view.tsx           # 573 lines — chapter list + reader + verse card
│   │       ├── guide-view.tsx          # 502 lines — Ask/Explain/Exam tabs
│   │       ├── tracker-view.tsx        # 237 lines — 10 activity types
│   │       ├── skilltree-view.tsx      # 160 lines — 4 paths × 12 skills
│   │       ├── challenges-view.tsx     # 161 lines — 6 challenges
│   │       ├── achievements-view.tsx   # 87 lines  — 12 achievements
│   │       ├── journal-view.tsx        # 204 lines — entries + AI weekly summary
│   │       ├── analytics-view.tsx      # 248 lines — recharts dashboards
│   │       ├── profile-view.tsx        # 273 lines — name editor + share cards
│   │       └── search-view.tsx         # 214 lines — verse/chapter/topic search
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   └── lib/
│       ├── db.ts                # Prisma client (unused)
│       ├── gita-data.ts         # 971 lines — 700 verses hardcoded (no commentary)
│       ├── store.ts             # 526 lines — Zustand persisted to localStorage
│       └── utils.ts             # cn() helper
├── tailwind.config.ts           # shadcn tokens
├── tsconfig.json                # @/* → ./src/*
└── upload/                      # empty
```

### Routing Model
- One route: `/` → `src/app/page.tsx`
- `NavProvider` (in `nav-context.tsx`) holds the current view + params in React state, mirrored to `localStorage['sanatan-quest-view']`
- `ViewRouter` in `page.tsx` switches between 11 view components based on `view` field
- 11 view keys: `home | gita | guide | tracker | skilltree | challenges | achievements | journal | analytics | profile | search`

### State Management
- **Global user state:** Zustand store (`src/lib/store.ts`), persisted via `persist` middleware to `localStorage['sanatan-quest-v1']`
- **Navigation state:** React Context (`NavContext`), persisted to `localStorage['sanatan-quest-view']`
- **Theme state:** `next-themes` (light/dark/system), class-based dark mode
- **No backend auth** — fully client-side, single user

---

## 2. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.1 |
| Runtime | Node.js + Bun (for install/start) | bun-types 1.3.4 |
| Language | TypeScript | 5 |
| UI Library | React | 19 |
| Styling | TailwindCSS 4 + tw-animate-css + tailwindcss-animate | 4 |
| Components | shadcn/ui (new-york style) + Radix primitives | latest |
| Icons | lucide-react | 0.525 |
| State | Zustand + persist middleware | 5.0.6 |
| Forms | react-hook-form + @hookform/resolvers + zod | 7.60 / 5.1.1 / 4.0.2 |
| Notifications | sonner + @radix-ui/react-toast | 2.0.6 |
| Theme | next-themes | 0.4.6 |
| i18n (declared, unused) | next-intl | 4.3.4 |
| Auth (declared, unused) | next-auth | 4.24.11 |
| Charts | recharts | 2.15.4 |
| Animation | framer-motion (declared, light use) | 12.23.2 |
| Markdown | react-markdown + react-syntax-highlighter | 10.1 / 15.6 |
| Editor | @mdxeditor/editor | 3.39.1 |
| Drag-and-drop | @dnd-kit/core + sortable + utilities | 6.3.1 / 10 / 3.2.2 |
| Database (declared, unused) | Prisma + SQLite (@prisma/client 6.11.1) | 6.11.1 |
| AI | z-ai-web-dev-sdk | 0.0.18 |
| Image | sharp | 0.34.3 |
| Build | Turbopack (Next 16 default) | — |
| Deployment | Caddy reverse proxy → Next standalone | — |

### Build Configuration (`next.config.ts`)
- `output: "standalone"` (production single-file server)
- `typescript.ignoreBuildErrors: true`
- `reactStrictMode: false`

### Build Pipeline (`.zscripts/build.sh`)
1. `bun install`
2. `bun run build` → emits `.next/standalone/`
3. Copies `.next/static` and `public/` into standalone
4. Copies `db/custom.db` and runs `prisma db push` to sync schema
5. Bundles everything to `/tmp/build_fullstack_$BUILD_ID.tar.gz`

---

## 3. Existing Features (in source backup)

### 3.1 Home Dashboard
- Hero card with greeting, saffron gradient, lotus + om decorations
- Spiritual level + XP bar with progress to next level
- 4 stat tiles: chapters completed, verses read, reading hours, daily streak
- Verse of the Day card (deterministic by day-of-year) with bookmark/share/AI-explain
- Chapter progress strip (18 tiles in a grid showing % complete)
- 3 quick-action cards: Daily Tracker, Active Challenges, Reflection Journal

### 3.2 Bhagavad Gita Reader
- 18-chapter grid with name, sanskrit name, theme, verse count, per-chapter progress bar
- Chapter reader with:
  - Verse navigation (prev/next, chapter prev/next)
  - **6 reading modes:** Sanskrit only, English only, Sanskrit+English, Full (Skt+Translit+Eng), Focus, Night
  - Verse actions: Mark as read (+10 XP), Bookmark, Highlight, Note editor, Share card
  - **Web Speech API** verse recitation with 4-speed control (0.75/1/1.25/1.5x)
  - "AI Explain this verse" button → navigates to Guide with verse pre-loaded
- 700 verses total (verse IDs `1.1` through `18.78`)
- Each verse has: `id, chapter, verse, sanskrit, transliteration, english, meaning?` — **NO commentary**

### 3.3 AI Spiritual Guide (`/api/ai`)
Four actions:
- **`explain`** — explain a specific verse (4 modes: simple, beginner, student, application)
- **`ask`** — open Q&A; auto-searches the verse database for relevant verses using keyword + topic-index scoring
- **`exam`** — student/exam mode; same verse search, framed for academic stress
- **`reflection`** — generates a personalized weekly spiritual reflection from journal + activity logs

Server-side:
- `SYSTEM_PROMPT` defines the persona of a wise, warm Rishi-like teacher
- Verse search engine: stopword removal, English/translit/meaning scoring, topic-boost
- Returns AI text + matched verse IDs in structured format (`content` + `verses[]`)
- Calls `z-ai-web-dev-sdk` with `thinking: { type: 'disabled' }`

### 3.4 Daily Tracker
- 10 activity types: gita (10 XP), ramayana (10), meditation (15), chanting (20), temple (25), charity (30), yoga (15), puja (20), service (20), gratitude (10)
- Optional duration (minutes) for meditation/yoga/chanting/gita/ramayana
- Optional free-text note per activity
- 7-day grid showing daily activity counts (today highlighted)
- Today's log list with type, duration, note, time, XP earned
- Streak tracking: currentStreak + longestStreak

### 3.5 Skill Tree
- 4 paths: Bhakti, Jnana, Karma, Yoga
- 12 skills total (3 per path)
- Each skill requires specific activity types to be unlocked
- Each unlock awards 80–150 XP

### 3.6 Challenges
- 6 prebuilt challenges:
  - 7-Day Gita (50 XP)
  - 21-Day Meditation (150 XP)
  - 30-Day Discipline (200 XP)
  - 40-Day Hanuman Chalisa (250 XP)
  - 14-Day Bhakti (100 XP)
  - 7-Day Karma Yoga (75 XP)
- Daily check-in with day badges
- Auto-completion + XP award on final day

### 3.7 Achievements
- 12 milestones with predicate-based checks (e.g., `Object.keys(s.readVerses).length >= 100`)
- Earned/locked UI states with grayscale + lock icon

### 3.8 Reflection Journal
- 3 entry types: Reflection (मननम्), Insight (ज्ञानम्), Gratitude (कृतज्ञता)
- AI Weekly Spiritual Reflection summary (calls `/api/ai` with `action: 'reflection'`)
- Past entries list with delete

### 3.9 Analytics
- Recharts dashboards:
  - Radial Gita completion gauge
  - 30-day activity bar chart
  - Practice distribution pie chart
  - XP growth line chart (cumulative)
  - 7-level progression tiles
- KPI cards: Total XP, Verses Read, Total Activities, Longest Streak

### 3.10 Profile
- Avatar (level icon) + name (editable)
- Level progress bar to next level
- 4 shareable cards (level, streak, verses, chapters) — each opens `ShareCardModal`
- Earned badges row
- Reset-all-progress danger zone with confirmation dialog

### 3.11 Search
- Single search box → searches verses (keyword), chapters (name/theme/summary), topics
- Topic chips for quick filtering
- Result rows with bookmark/explain/read actions

### 3.12 Spiritual Progression System
- **7 levels:** Seeker (0) → Sadhak (100) → Bhakta (300) → Yogi (700) → Acharya (1500) → Rishi (3000) → Dharma Guardian (6000)
- XP sources: verse read (+10), activity logged (+10–30), skill unlocked (+80–150), challenge completed (+50–250)

### 3.13 Theming
- Saffron / gold / vermilion spiritual palette
- Light: warm cream/parchment background, saffron primary
- Dark: deep midnight temple, warm gold accents
- Custom scrollbar styled with saffron
- Custom utility classes: `bg-saffron-gradient`, `bg-saffron-gradient-soft`, `text-saffron-gradient`, `lotus-divider`, `glow-saffron`, `shimmer`, `animate-float-slow`, `animate-om-pulse`, `sanskrit-text`, `reading-focus`, `highlight-marker`
- Fonts: Geist Sans, Geist Mono, Playfair Display

### 3.14 PWA Support
- `manifest.json` with name, theme colors, icon
- Standalone display mode
- Meta theme-color tags for light/dark

### 3.15 Mobile Responsive
- Sidebar collapses to drawer (`MobileNav`) on `< lg` screens
- Top bar shows hamburger menu on mobile
- Stats grids reflow 2→4 columns
- All view components tested with `sm:` / `lg:` breakpoints

---

## 4. Missing Features (in source backup, present in live deployment)

The live deployment was built ~1 day after the source backup's last commit. The following features were added in that window:

### 4.1 Atmosphere / Ambient Soundscape System ⭐ NEW MAJOR FEATURE
A complete ambient sound system wrapped around the entire app.

**8 ambient soundscapes + 1 silent mode:**

| ID | Name | Sanskrit | Background | Audio File | Recommended Ch. | Accent Color |
|---|---|---|---|---|---|---|
| `vrindavan_flute` | Vrindavan Flute | वृन्दावन | flute | `/audio/atmosphere/vrindavan_flute.mp3` | [12, 15] | `#f59e0b` |
| `ganga_banks` | Banks of Mother Ganga | गङ्गा | river | `/audio/atmosphere/ganga_banks.mp3` | [2, 8] | `#06b6d4` |
| `forest_ashram` | Forest Ashram | आश्रम | forest | `/audio/atmosphere/forest_ashram.mp3` | [3, 4, 5] | `#10b981` |
| `monsoon_meditation` | Monsoon Meditation | वर्षा | rain | `/audio/atmosphere/monsoon_meditation.mp3` | [6, 7] | `#6366f1` |
| `temple_dawn` | Temple Dawn | प्रभात | temple | `/audio/atmosphere/temple_dawn.mp3` | [1, 10, 11] | `#f97316` |
| `himalayan_night` | Himalayan Night | हिमालय | night | `/audio/atmosphere/himalayan_night.mp3` | [11, 13, 14] | `#818cf8` |
| `sacred_fire` | Sacred Fire | अग्नि | fire | `/audio/atmosphere/sacred_fire.mp3` | [4, 16, 17] | `#dc2626` |
| `garden_serenity` | Garden Serenity | उद्यान | garden | `/audio/atmosphere/garden_serenity.mp3` | [9, 18] | `#84cc16` |
| `silent` | Silent Mode | मौन | none | `""` (no audio) | — | `#94a3b8` |

**AtmosphereProvider State:**
- `currentAtmosphere: Atmosphere | null`
- `isPlaying: boolean`
- `volume: number` (0–1, default 0.2)
- `showPanel: boolean`
- `showMiniWidget: boolean` — true when atmosphere ≠ null and ≠ silent
- `visualEffectsEnabled: boolean` (default true)
- `reduceMotion: boolean` (default false)
- Persisted to `localStorage['sanatan-quest-atmosphere']` as `{atmosphereId, volume, visualEffects, reduceMotion}`

**AtmosphereProvider Actions:**
- `selectAtmosphere(id)` — switch atmosphere with smooth 20-step fade-out + fade-in
- `togglePlay()` — pause/resume
- `stop()` — full stop, reset currentTime to 0
- `setVolume(v)` — adjust volume live
- `openPanel() / closePanel() / togglePanel()` — Sheet panel control
- `toggleVisualEffects()` — turn full-screen animated overlays on/off
- `toggleReduceMotion()` — disable animations (accessibility)

**Components (reverse-engineered from bundle):**
1. **AtmosphereProvider (`ry`)** — root context provider, manages audio element + state
2. **AtmospherePanel (`sq`)** — right-side Sheet dialog with atmosphere selector, volume slider, visual effects toggle, reduce motion toggle
3. **AtmosphereMiniWidget (`sW`)** — fixed bottom-right pill showing current atmosphere, play/pause button, mini volume slider
4. **AtmosphereChapterButton (`sL`)** — small button in the gita-view chapter reader that opens the panel; shows current atmosphere icon and a pulsing dot when playing
5. **AtmosphereVisualEffects (`sz`)** — fixed full-screen overlay rendering animated backgrounds for each atmosphere type

**CSS Animations (in `globals.css`):**
- `river-flow` (8s ease-in-out alternate)
- `rain-fall` (1–2.5s linear infinite)
- `leaf-float` (6–14s ease-in-out infinite)
- `temple-glow` (4s ease-in-out alternate)
- `star-twinkle` (2–5s ease-in-out infinite)
- `fire-flicker` (0.8s ease-in-out alternate)
- `garden-float` (5–11s ease-in-out infinite)
- `flute-pulse` (5s ease-in-out alternate)
- `@media (prefers-reduced-motion: reduce)` disables all of the above

**Audio Files Required:**
8 mp3 files in `/public/audio/atmosphere/` — these are NOT in the live deployment mirror (only HTML/CSS/JS were captured). They must be either:
- Sourced from royalty-free ambient sound libraries
- Generated as silent placeholder files (so the UI works)
- Replaced by the user after recovery

### 4.2 Verse Commentary Field ⭐ NEW DATA
- Each verse object now has a `commentary: string` field
- **694 of 700 verses have full commentary** (the other 6 have placeholder `"(Commentary not available for this verse)"`)
- Attribution: "Swami Mukundananda"
- Commentary is rendered in the gita-view VerseCard as a styled box with the label `📜 Commentary — Swami Mukundananda`
- Commentary supports `**bold**` markdown via `dangerouslySetInnerHTML`
- Data extracted to `/home/z/my-project/recovery/inspections/verses_live.json` (700 verses, 1.65 MB)

### 4.3 Layout.tsx Modification
- The `AppShell` (or root layout) must be wrapped with `<AtmosphereProvider>` so the atmosphere state + visual effects + mini widget are globally available
- Bundle confirms: `IQ = () => jsx(IR, { children: jsx(ry, { children: jsx(U, {...}) }) })` — i.e., AtmosphereProvider wraps the main app shell

### 4.4 Gita-View VerseCard Modification
- Added `📜 Commentary — Swami Mukundananda` block below the meaning field
- Added `<AtmosphereChapterButton chapter={verse.chapter} />` next to the existing "AI Explain this verse" button
- Commentary block uses `rounded-xl bg-saffron-gradient-soft border border-primary/20 p-4` styling

---

## 5. Recoverable Assets

### Fully Recoverable
| Asset | Source | Confidence |
|---|---|---|
| Project scaffolding (package.json, tsconfig, next.config, etc.) | source_backup | 100% |
| All 49 shadcn/ui components | source_backup | 100% |
| Zustand store + persist logic | source_backup | 100% |
| All 11 view components | source_backup | 100% |
| NavContext + 11 view keys | source_backup | 100% |
| AI Spiritual Guide API route + system prompt | source_backup | 100% |
| Verse search engine + topic index | source_backup | 100% |
| Sidebar + MobileNav | source_backup | 100% |
| Theme provider + toggle (light/dark/system) | source_backup | 100% |
| ShareCardModal canvas renderer | source_backup | 100% |
| globals.css base styles (palette, utilities, animations) | source_backup | 100% |
| Spiritual levels, activities, challenges, skills, achievements | source_backup | 100% |
| 700 verses (sanskrit, transliteration, english, meaning) | source_backup | 100% |
| **700 verses with commentary field** | live_mirror (extracted to JSON) | 100% |
| **Atmosphere system architecture** (provider, hooks, state) | live_mirror (reverse-engineered from bundle) | ~95% |
| **Atmosphere UI components** (panel, mini widget, chapter button, visual effects) | live_mirror (reverse-engineered from bundle) | ~90% |
| **8 CSS animations** for visual effects | live_mirror (CSS file) | 100% |
| **8 atmosphere configs** (id, name, sanskrit, audio path, background, chapters, color) | live_mirror (JS bundle) | 100% |
| PWA manifest + logo | source_backup + live_mirror | 100% |

### Partially Recoverable
| Asset | Notes |
|---|---|
| Atmosphere component JSX/TSX | Reverse-engineered from minified bundle; will be rewritten as clean TypeScript React components that produce equivalent behavior. Variable names will be original (e.g., `AtmosphereProvider`, `useAtmosphere`, `AtmospherePanel`, etc.). |

### Not Recoverable
| Asset | Reason | Mitigation |
|---|---|---|
| 8 ambient `.mp3` audio files | Only HTML/CSS/JS were captured in the deployment mirror — audio files were not in the zip | Generate silent placeholder `.mp3` files so the UI works; user replaces with real audio later. Documented in final report. |

---

## 6. Recovery Percentage Estimate

| Component | Recovery % |
|---|---|
| Source architecture | 100% |
| Source components | 100% |
| Source styling | 100% |
| Source data (700 verses without commentary) | 100% |
| Live delta — verse commentary data | 100% (extracted) |
| Live delta — Atmosphere system architecture | ~95% |
| Live delta — Atmosphere UI components | ~90% |
| Live delta — CSS animations | 100% |
| Live delta — Audio assets | 0% (will use silent placeholders) |
| **Overall estimated recovery** | **~96%** |

---

## 7. Source-vs-Live Diff Summary

### Files Modified
| File | Change Type | Reason |
|---|---|---|
| `src/app/layout.tsx` or `src/app/page.tsx` | Wrap app shell with `<AtmosphereProvider>` | New atmosphere system needs to wrap content |
| `src/app/globals.css` | Add 8 keyframe animations + reduced-motion media query | Visual effects overlays |
| `src/lib/gita-data.ts` | Add `commentary` field to all 700 verses | Live has commentary; source does not |
| `src/components/views/gita-view.tsx` | Add commentary block + atmosphere chapter button in VerseCard | New UI in live |
| `src/app/page.tsx` (AppShell) | Add `<AtmosphereMiniWidget />` + `<AtmosphereVisualEffects />` to render tree | New UI elements |

### Files Added
| File | Purpose |
|---|---|
| `src/components/atmosphere/atmosphere-context.tsx` | AtmosphereProvider + useAtmosphere hook + Atmosphere type + ATMOSPHERES array |
| `src/components/atmosphere/atmosphere-panel.tsx` | Sheet panel with atmosphere selector |
| `src/components/atmosphere/atmosphere-mini-widget.tsx` | Fixed bottom-right pill widget |
| `src/components/atmosphere/atmosphere-visual-effects.tsx` | Full-screen animated overlay per atmosphere type |
| `src/components/atmosphere/atmosphere-chapter-button.tsx` | Small button in chapter reader |
| `public/audio/atmosphere/*.mp3` (8 files) | Ambient soundscape audio (silent placeholders initially) |

### Files Deleted
None.

### Configuration Changes
None — `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts` all unchanged.

### API Changes
None — `/api/ai` route is unchanged.

### Database Changes
None — Prisma schema unchanged (and unused).

---

## 8. Phase 1 Conclusion

The source backup is **architecturally complete and the canonical editable codebase**. The live deployment adds **two new features**:

1. **Atmosphere / Ambient Soundscape System** — a brand-new ambient sound + visual effects system wrapping the entire app, with 8 soundscapes, a panel, a mini widget, a chapter-button, and full-screen animated overlays. The architecture is fully reverse-engineerable from the live JS bundle.

2. **Verse Commentary Data** — 694 of 700 verses now have full commentary attributed to Swami Mukundananda. The data has been successfully extracted from the live JS bundle to a JSON file ready for re-injection.

**Overall recovery is feasible at ~96%.** The only unrecoverable assets are the 8 ambient `.mp3` audio files, which were not present in the deployment mirror. These will be replaced with silent placeholder files so the UI works end-to-end; the user can later replace them with real audio.

---

**Next:** Proceed to Phase 2 (inspect live deployment at `https://sanatanaquest.space-z.ai` to verify UI behavior) and Phase 3 (consolidate comparison), then Phase 4 (incremental recovery).
