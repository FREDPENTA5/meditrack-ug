# MediTrack UG — Cursor Implementation Prompt

### Full-Stack Build Brief: Senior UI/UX + Engineering Standard

> in order. Do not skip the Design System phase; everything else derives from it.

---

## 0. PROJECT CONTEXT

You are building **MediTrack UG** — a real-time drug stock-out alert and inventory management

system for rural and peri-urban health centres in Uganda. The primary case study site is

**Gayaza Hospital, Wakiso District**.

The system solves a documented national crisis: 84% of Ugandan public health facilities

experience drug stock-outs because there is no real-time digital link between facility

pharmacies and district health authorities. MediTrack UG fixes this with a web dashboard,

a mobile-first PWA, and an SMS/USSD interface for feature phones.

**Users:**

- `FACILITY_WORKER` — Pharmacist / In-charge at a health facility (Gayaza Hospital).
  Logs stock, views alerts. May use a low-end Android phone.
- `DISTRICT_OFFICER` — Wakiso District Health Officer. Monitors all facilities in district.
- `NMS_ADMIN` — National Medical Stores administrator. National visibility.
- `SYSTEM` — Background alert engine (non-human actor).

**Guiding principles for every decision you make:**

1. Uganda-first: design for 2G/3G, low-end Android (Chrome), mixed digital literacy.
2. Clarity over cleverness: health workers under stress must understand the UI instantly.
3. Data integrity above all: a missed stock-out alert can cost a life.
4. Progressive enhancement: core functionality must work without JS (SMS/USSD path).

---

## 1. TECH STACK

### Frontend

- **Framework:** React 18 with TypeScript (strict mode)
- **Build tool:** Vite
- **Styling:** Tailwind CSS v3 + CSS custom properties (design tokens)
- **State management:** Zustand (global) + React Query v5 (server state)
- **Routing:** React Router v6 (file-based convention)
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Maps:** Leaflet.js + React-Leaflet (Uganda facility map)
- **Icons:** Lucide React (consistent, clean icon set)
- **PWA:** Vite PWA plugin (Workbox) — offline-first service worker
- **Animations:** Framer Motion (purposeful micro-interactions only)
- **Date handling:** date-fns

### Backend

- **Runtime:** Node.js 20 LTS
- **Framework:** Express.js with TypeScript
- **ORM:** Prisma (PostgreSQL)
- **Auth:** JWT (access + refresh token pattern) with bcrypt
- **SMS/USSD:** Africa's Talking Node.js SDK
- **Job queue:** BullMQ + Redis (alert engine, scheduled stock checks)
- **Validation:** Zod (shared schemas between frontend and backend)
- **Logging:** Winston + Morgan
- **API docs:** Swagger/OpenAPI (auto-generated)

### Database

- **Primary:** PostgreSQL 15
- **Cache / Queue broker:** Redis 7

### DevOps & Quality

- **Monorepo:** pnpm workspaces `apps/web`, `apps/api`, `packages/shared`)
- **Linting:** ESLint (Airbnb config + custom rules)
- **Formatting:** Prettier
- **Git hooks:** Husky + lint-staged
- **Testing:** Vitest (unit) + React Testing Library (components) + Supertest (API)
- **Type checking:** `tsc --noEmit` in CI
- **Env management:** `.env` files with Zod-validated config (never `process.env` directly)
- **Version control:** Conventional Commits `feat:`, `fix:`, `chore:`, etc.)

---

## 2. MONOREPO STRUCTURE

Scaffold the following structure exactly:

```

meditrack-ug/

├── apps/

│   ├── web/                        # React frontend (Vite + TS)

│   │   ├── public/

│   │   │   ├── icons/              # PWA icons (192, 512, maskable)

│   │   │   └── manifest.webmanifest

│   │   ├── src/

│   │   │   ├── assets/             # Static assets (logo, images)

│   │   │   ├── components/

│   │   │   │   ├── atoms/          # Button, Badge, Input, Label, Spinner, Avatar

│   │   │   │   ├── molecules/      # FormField, StockCard, AlertBanner, StatTile

│   │   │   │   ├── organisms/      # StockTable, FacilityMap, AlertFeed, NavBar, Sidebar

│   │   │   │   └── templates/      # DashboardLayout, AuthLayout, SettingsLayout

│   │   │   ├── design-system/

│   │   │   │   ├── tokens.css      # All CSS custom properties

│   │   │   │   └── typography.css  # Font-face declarations + scale

│   │   │   ├── features/           # Feature-sliced modules

│   │   │   │   ├── auth/

│   │   │   │   ├── stock/

│   │   │   │   ├── alerts/

│   │   │   │   ├── facilities/

│   │   │   │   ├── reports/

│   │   │   │   └── users/

│   │   │   ├── hooks/              # Custom React hooks

│   │   │   ├── lib/                # axios instance, queryClient, utils

│   │   │   ├── pages/              # Route-level page components

│   │   │   ├── stores/             # Zustand stores

│   │   │   ├── types/              # TS types not in shared package

│   │   │   ├── main.tsx

│   │   │   └── App.tsx

│   │   ├── index.html

│   │   ├── vite.config.ts

│   │   └── tailwind.config.ts

│   │

│   └── api/                        # Express backend (Node + TS)

│       ├── src/

│       │   ├── config/             # Zod-validated env, db, redis config

│       │   ├── controllers/        # Route handlers (thin — delegate to services)

│       │   ├── services/           # Business logic layer

│       │   ├── repositories/       # Prisma data access layer

│       │   ├── middleware/         # auth, error, rate-limit, logging

│       │   ├── routes/             # Express routers

│       │   ├── jobs/               # BullMQ workers (alert engine, reports)

│       │   ├── lib/                # africasTalking, mailer, redis clients

│       │   ├── utils/              # helpers, constants

│       │   ├── types/              # Express augmentations, custom types

│       │   └── index.ts            # App entry point

│       └── prisma/

│           ├── schema.prisma

│           └── migrations/

│

├── packages/

│   └── shared/                     # Shared TS types + Zod schemas

│       ├── src/

│       │   ├── schemas/            # Zod schemas (Drug, Facility, StockEntry, Alert)

│       │   └── types/              # Inferred TS types from schemas

│       └── package.json

│

├── .husky/

├── .eslintrc.js

├── .prettierrc

├── pnpm-workspace.yaml

├── turbo.json                      # Turborepo for build orchestration

└── package.json

```

---

## 3. DESIGN SYSTEM

> This is the most critical phase. Build the design system FIRST, before any page or

> feature. Every component derives from these tokens. Do not hardcode any colour,

> spacing, or type value anywhere — always reference a token.

### 3.1 Design Rationale

MediTrack UG serves health workers in a high-stakes environment. The aesthetic direction is:

**"Clinical Confidence"** — Clean, authoritative, and instantly scannable.

Inspired by modern medical data interfaces and the lush green of Uganda's landscape.

Not sterile white-box hospital UI. Not consumer-app playful.

Confident greens with warm neutral grounding. Data-dense but breathable.

Status colours (red/amber/green) must be unambiguous and accessible at a glance.

The interface should feel like it was built by a team that has actually visited a

Ugandan health centre and thought carefully about the user — not a template purchased

from a UI kit.

---

### 3.2 Colour System

Define ALL colours as CSS custom properties in `src/design-system/tokens.css`.

#### Brand Palette

```css
:root {
  /* ── PRIMARY: Ugandan Forest Green ── */

  --color-primary-50: #f0faf4;

  --color-primary-100: #d6f2e2;

  --color-primary-200: #aee4c5;

  --color-primary-300: #76cfa0;

  --color-primary-400: #3db478;

  --color-primary-500: #1e9658; /* Base brand green */

  --color-primary-600: #177a46;

  --color-primary-700: #145f37;

  --color-primary-800: #124d2e;

  --color-primary-900: #0e3d24;

  --color-primary-950: #071f12;

  /* ── SECONDARY: Warm Amber (Uganda sun / urgency balance) ── */

  --color-secondary-50: #fffbeb;

  --color-secondary-100: #fef3c7;

  --color-secondary-200: #fde68a;

  --color-secondary-300: #fcd34d;

  --color-secondary-400: #fbbf24;

  --color-secondary-500: #f59e0b; /* Base amber */

  --color-secondary-600: #d97706;

  --color-secondary-700: #b45309;

  --color-secondary-800: #92400e;

  --color-secondary-900: #78350f;

  /* ── NEUTRALS: Warm slate (not cold gray) ── */

  --color-neutral-0: #ffffff;

  --color-neutral-50: #f8f9f8; /* Page background */

  --color-neutral-100: #f0f1f0;

  --color-neutral-200: #e2e4e2;

  --color-neutral-300: #c8cbc8;

  --color-neutral-400: #9ca49c;

  --color-neutral-500: #727972;

  --color-neutral-600: #565d56;

  --color-neutral-700: #3e443e;

  --color-neutral-800: #272d27;

  --color-neutral-900: #161a16;

  --color-neutral-950: #0a0d0a;

  /* ── SEMANTIC: Status Colours ── */

  /* Critical / Stock-out */

  --color-danger-50: #fff1f1;

  --color-danger-100: #ffe0e0;

  --color-danger-200: #ffc5c5;

  --color-danger-300: #fe9898;

  --color-danger-400: #fc5858;

  --color-danger-500: #f42828; /* Base danger */

  --color-danger-600: #e11111;

  --color-danger-700: #bd0a0a;

  --color-danger-800: #9c0f0f;

  --color-danger-900: #821414;

  /* Warning / Low stock */

  --color-warning-50: #fffbeb;

  --color-warning-100: #fef3c7;

  --color-warning-300: #fcd34d;

  --color-warning-500: #f59e0b;

  --color-warning-600: #d97706;

  --color-warning-700: #b45309;

  /* Success / Adequate stock */

  --color-success-50: #f0fdf4;

  --color-success-100: #dcfce7;

  --color-success-300: #86efac;

  --color-success-500: #22c55e;

  --color-success-600: #16a34a;

  --color-success-700: #15803d;

  /* Info */

  --color-info-50: #eff6ff;

  --color-info-100: #dbeafe;

  --color-info-300: #93c5fd;

  --color-info-500: #3b82f6;

  --color-info-600: #2563eb;

  --color-info-700: #1d4ed8;
}
```

#### Semantic Token Layer (aliases — use THESE in components, never raw palette tokens)

```css
:root {
  /* Surfaces */

  --surface-page: var(--color-neutral-50);

  --surface-card: var(--color-neutral-0);

  --surface-card-hover: var(--color-primary-50);

  --surface-overlay: rgba(22, 26, 22, 0.55);

  --surface-sidebar: var(--color-primary-950);

  --surface-sidebar-item-hover: var(--color-primary-800);

  --surface-sidebar-item-active: var(--color-primary-700);

  /* Text */

  --text-primary: var(--color-neutral-900);

  --text-secondary: var(--color-neutral-600);

  --text-tertiary: var(--color-neutral-400);

  --text-inverse: var(--color-neutral-0);

  --text-brand: var(--color-primary-600);

  --text-danger: var(--color-danger-600);

  --text-warning: var(--color-warning-700);

  --text-success: var(--color-success-700);

  /* Borders */

  --border-subtle: var(--color-neutral-200);

  --border-default: var(--color-neutral-300);

  --border-strong: var(--color-neutral-400);

  --border-brand: var(--color-primary-400);

  --border-danger: var(--color-danger-300);

  --border-warning: var(--color-warning-300);

  /* Interactive */

  --interactive-primary: var(--color-primary-600);

  --interactive-primary-hover: var(--color-primary-700);

  --interactive-primary-active: var(--color-primary-800);

  --interactive-primary-disabled: var(--color-primary-200);

  /* Stock status (used in map dots, table rows, badges) */

  --status-adequate: var(--color-success-500);

  --status-low: var(--color-warning-500);

  --status-critical: var(--color-danger-500);

  --status-unknown: var(--color-neutral-400);
}
```

---

### 3.3 Typography

Use **DM Sans** (body — readable, clean, slightly humanist) paired with

**Sora** (headings — confident, modern, slightly wide). Both are Google Fonts

and load well on slow connections. Self-host via `@font-face` for offline PWA support.

```css
/* src/design-system/typography.css */

/* Scale (Major Third — 1.250 ratio) */

:root {
  --font-family-heading: 'Sora', sans-serif;

  --font-family-body: 'DM Sans', sans-serif;

  --font-family-mono: 'JetBrains Mono', monospace;

  /* Size scale */

  --text-xs: 0.64rem; /* 10.24px */

  --text-sm: 0.8rem; /* 12.8px  */

  --text-base: 1rem; /* 16px    */

  --text-md: 1rem;

  --text-lg: 1.25rem; /* 20px    */

  --text-xl: 1.563rem; /* 25px    */

  --text-2xl: 1.953rem; /* 31.25px */

  --text-3xl: 2.441rem; /* 39px    */

  --text-4xl: 3.052rem; /* 48.8px  */

  /* Weight */

  --font-regular: 400;

  --font-medium: 500;

  --font-semibold: 600;

  --font-bold: 700;

  /* Line height */

  --leading-tight: 1.25;

  --leading-snug: 1.375;

  --leading-normal: 1.5;

  --leading-relaxed: 1.625;

  /* Letter spacing */

  --tracking-tight: -0.025em;

  --tracking-normal: 0em;

  --tracking-wide: 0.025em;

  --tracking-widest: 0.1em;
}
```

---

### 3.4 Spacing Scale

Based on a 4px base unit. Never use arbitrary pixel values.

```css
:root {
  --space-0: 0px;

  --space-1: 4px;

  --space-2: 8px;

  --space-3: 12px;

  --space-4: 16px;

  --space-5: 20px;

  --space-6: 24px;

  --space-8: 32px;

  --space-10: 40px;

  --space-12: 48px;

  --space-16: 64px;

  --space-20: 80px;

  --space-24: 96px;

  --space-32: 128px;

  /* Layout */

  --sidebar-width: 256px;

  --sidebar-collapsed: 64px;

  --topbar-height: 64px;

  --content-max-width: 1280px;

  --card-padding: var(--space-6);

  --section-gap: var(--space-8);
}
```

---

### 3.5 Elevation & Shadows

```css
:root {
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.04);

  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 2px -1px rgba(0, 0, 0, 0.05);

  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05);

  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.09), 0 4px 6px -4px rgba(0, 0, 0, 0.05);

  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);

  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);

  /* Coloured glow shadows for status cards */

  --shadow-danger: 0 4px 14px 0 rgba(244, 40, 40, 0.18);

  --shadow-warning: 0 4px 14px 0 rgba(245, 158, 11, 0.18);

  --shadow-success: 0 4px 14px 0 rgba(34, 197, 94, 0.18);
}
```

---

### 3.6 Border Radius

```css
:root {
  --radius-sm: 4px;

  --radius-md: 8px;

  --radius-lg: 12px;

  --radius-xl: 16px;

  --radius-2xl: 24px;

  --radius-full: 9999px;
}
```

---

### 3.7 Motion / Animation

Purposeful animation only. No decoration for its own sake.

Health workers should not be distracted by movement.

```css
:root {
  --duration-instant: 50ms;

  --duration-fast: 100ms;

  --duration-base: 200ms;

  --duration-slow: 350ms;

  --duration-enter: 250ms;

  --duration-exit: 150ms;

  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);

  --ease-in: cubic-bezier(0.4, 0, 1, 1);

  --ease-out: cubic-bezier(0, 0, 0.2, 1);

  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Respect reduced motion globally */

@media (prefers-reduced-motion: reduce) {
  *,
  * ::before,
  *::after {
    animation-duration: 0.01ms !important;

    transition-duration: 0.01ms !important;
  }
}
```

---

### 3.8 Tailwind Config

Wire all tokens into Tailwind so utility classes reference the design system:

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: {
          /* map all --color-primary-* shades */
        },

        secondary: {
          /* map all --color-secondary-* shades */
        },

        neutral: {
          /* map all --color-neutral-* shades */
        },

        danger: {
          /* map all --color-danger-* shades */
        },

        warning: {
          /* map all --color-warning-* shades */
        },

        success: {
          /* map all --color-success-* shades */
        },

        info: {
          /* map all --color-info-* shades */
        },
      },

      fontFamily: {
        heading: ['Sora', 'sans-serif'],

        body: ['DM Sans', 'sans-serif'],

        mono: ['JetBrains Mono', 'monospace'],
      },

      boxShadow: {
        danger: 'var(--shadow-danger)',

        warning: 'var(--shadow-warning)',

        success: 'var(--shadow-success)',
      },

      borderRadius: {
        sm: 'var(--radius-sm)',

        md: 'var(--radius-md)',

        lg: 'var(--radius-lg)',

        xl: 'var(--radius-xl)',
      },
    },
  },

  plugins: [],
};

export default config;
```

---

## 4. COMPONENT ARCHITECTURE (Atomic Design)

Build components bottom-up. Each level only uses components from the level below it.

### 4.1 Atoms

Each atom is a single, fully typed, fully accessible React component.

Every atom must: accept a `className` prop for extension,

use `forwardRef` where a DOM ref is meaningful,

have an associated Vitest unit test, and be keyboard-navigable.

#### `Button`

```typescript
// Variants: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'

// Sizes: 'sm' | 'md' | 'lg'

// States: loading (shows spinner), disabled, full-width

// Must show focus-visible ring using --border-brand
```

#### `Badge`

```typescript
// Variants: 'adequate' | 'low' | 'critical' | 'unknown' | 'info'

// Each maps to a semantic status colour

// Used on stock status throughout the app

// Include a colour dot + label pattern
```

#### `Input`

```typescript
// Types: text, number, password, search

// States: default, focused, error, disabled

// Must show --border-brand on focus

// Error state shows --border-danger + error message below

// Prefix/suffix icon slots
```

#### `Select`

```typescript
// Accessible custom select (keyboard navigable)

// Supports option groups

// Matches Input visual style
```

#### `Spinner`

```typescript
// Sizes: 'sm' | 'md' | 'lg'

// Colour variants: 'primary' | 'white' | 'muted'

// Pure CSS animation, respects prefers-reduced-motion
```

#### `Avatar`

```typescript
// Shows initials or image

// Sizes: 'xs' | 'sm' | 'md' | 'lg'

// Status indicator dot (online/offline)
```

#### `Tooltip`

```typescript
// Accessible (role="tooltip", aria-describedby)

// Positions: top | right | bottom | left (auto-flip near viewport edge)
```

#### `Skeleton`

```typescript
// Loading placeholder for any content shape

// Shimmer animation

// Props: width, height, variant ('text' | 'circular' | 'rectangular')
```

---

### 4.2 Molecules

Compositions of atoms. Still generic — not tied to MediTrack domain logic.

#### `FormField`

```typescript
// Wraps: Label + Input/Select + HelperText + ErrorMessage

// Manages aria-describedby wiring automatically

// Props: label, name, error, hint, required
```

#### `StatTile`

```typescript
// Props: title, value, unit, trend (up|down|flat), trendValue, icon, status

// Used on the dashboard for summary KPIs

// Subtle left-border coloured by status

// Animated count-up on mount (Framer Motion)
```

#### `StockLevelBar`

```typescript
// Visual representation of stock percentage

// Colour transitions: success → warning → danger as percentage drops

// Accessible: aria-label includes exact percentage

// Threshold markers at 25% and 10%
```

#### `AlertBanner`

```typescript
// Types: 'info' | 'warning' | 'danger' | 'success'

// Dismissible (X button)

// Icon + title + body + optional action button

// Animates in/out with Framer Motion
```

#### `SearchInput`

```typescript
// Input + search icon + clear button

// Debounced onChange (300ms)

// Loading indicator during search
```

#### `DataTablePagination`

```typescript
// Page navigation, items-per-page selector

// Shows "1–20 of 247 results"
```

---

### 4.3 Organisms

Domain-aware, composed from molecules and atoms.

These are the building blocks of pages.

#### `Sidebar`

```typescript
// Dark green (--surface-sidebar) collapsible sidebar

// Logo at top, collapses to icon-only on mobile

// Nav items with icons, active state, badge for alert count

// User avatar + name + role at bottom

// Collapsible on mobile with smooth Framer Motion transition

// Nav items: Dashboard | Facilities | Stock Entry | Alerts | Reports | Users | Settings
```

#### `TopBar`

```typescript
// Facility/district context switcher (dropdown)

// Global search bar (SearchInput)

// Notification bell with unread count badge

// User menu (avatar + dropdown: profile, settings, logout)

// Breadcrumb trail below on desktop
```

#### `StockTable`

```typescript
// Full drug inventory table

// Columns: Drug Name | Category | Current Stock | Unit | Threshold | Status | Last Updated | Actions

// Sortable column headers

// Row-level status colour coding (background tint by status)

// Inline edit mode for stock quantity

// Bulk selection for batch operations

// Filter bar: by category, by status (adequate/low/critical)

// Empty state illustration when no data

// Skeleton loading state
```

#### `AlertFeed`

```typescript
// Real-time alert list (polling or WebSocket)

// Each alert: drug name + facility + severity + time ago + action button

// Grouped by severity (critical first)

// Mark as acknowledged action

// Infinite scroll
```

#### `FacilityMap`

```typescript
// Leaflet map centred on Uganda (lat: 1.3733, lng: 32.2903, zoom: 7)

// Marker per registered facility

// Marker colour = worst stock status at that facility

// Popup on click: facility name, critical drugs count, link to facility detail

// Legend: adequate / low / critical / unknown

// Cluster markers when zoomed out
```

#### `DrugStockEntryForm`

```typescript
// For FACILITY_WORKER role

// Lists all drugs on the Uganda EMHS list for that facility

// Input per drug: current quantity + unit

// Batch submit with loading state

// Confirmation step showing what will be submitted

// Offline queue: if no internet, saves to IndexedDB and syncs when online
```

#### `ReportBuilder`

```typescript
// Date range picker

// Facility / district / drug filters

// Report type: Stock History | Alert Summary | Resupply Requests

// Preview table

// Export to PDF and CSV
```

---

### 4.4 Templates (Layout Components)

#### `DashboardLayout`

```typescript
// Sidebar (left) + TopBar (top) + main content area

// Sidebar collapses to icon rail on md screens, fully hidden on sm (drawer)

// Content area scrolls independently of sidebar

// Sticky TopBar
```

#### `AuthLayout`

```typescript
// Split: left panel (green brand panel with logo + tagline),

//        right panel (white, centred auth form)

// Left panel hidden on mobile

// Responsive: stacks on sm screens
```

#### `FullPageLayout`

```typescript
// For: 404, 500, empty states, onboarding

// Centred, minimal, brand-consistent
```

---

## 5. PAGE ROUTES & SCREENS

Implement the following routes under `src/pages/`:

```

/auth/login                     — Login page (email + password, remember me)

/auth/forgot-password           — Forgot password

/auth/reset-password/:token     — Reset password

/dashboard                      — Main KPI dashboard (role-aware content)

/facilities                     — Facility list (DISTRICT_OFFICER + NMS only)

/facilities/:id                 — Facility detail (stock status, history, staff)

/facilities/:id/stock-entry     — Drug stock entry form (FACILITY_WORKER)

/alerts                         — Alert feed (all active + historical)

/alerts/:id                     — Alert detail + resolution workflow

/reports                        — Report builder

/users                          — User management (admin only)

/settings                       — Profile + notification preferences

/settings/thresholds            — Drug threshold configuration

```

---

## 6. DASHBOARD PAGE (Most critical screen — build this first after layout)

The dashboard is the first screen every user sees after login.

It must communicate the health of the entire system at a glance.

**For DISTRICT_OFFICER / NMS_ADMIN:**

```

┌─────────────────────────────────────────────────────────────────────┐

│  TOP ROW: 4 StatTiles                                               │

│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐ │

│  │ Total        │ │ Stock-outs   │ │ Low Stock    │ │ Alerts     │ │

│  │ Facilities   │ │ Today        │ │ Drugs        │ │ Unresolved │ │

│  │ 24           │ │ 7 🔴         │ │ 31 🟡        │ │ 12         │ │

│  └──────────────┘ └──────────────┘ └──────────────┘ └────────────┘ │

├──────────────────────────────┬──────────────────────────────────────┤

│  FACILITY MAP (Leaflet)      │  ALERT FEED (live)                  │

│  Uganda map, coloured dots   │  Most recent 10 alerts              │

│  per facility status         │  Grouped: Critical / Warning        │

│                              │                                      │

├──────────────────────────────┴──────────────────────────────────────┤

│  CRITICAL DRUGS TABLE                                               │

│  Drugs at zero stock across all facilities — most urgent first      │

│  Columns: Drug | Facilities Affected | Days Since Stock-Out         │

├─────────────────────────────────────────────────────────────────────┤

│  STOCK TREND CHART (Recharts)                                       │

│  Line chart: stock levels over last 30 days for top 5 critical drugs│

└─────────────────────────────────────────────────────────────────────┘

```

**For FACILITY_WORKER (Gayaza Hospital view):**

```

┌─────────────────────────────────────────────────────────────────────┐

│  TOP ROW: 3 StatTiles — My Facility Only                            │

│  Drugs OK | Drugs Low | Drugs at Zero                               │

├──────────────────────────────┬──────────────────────────────────────┤

│  MY STOCK TABLE              │  QUICK STOCK ENTRY WIDGET            │

│  All drugs, current status   │  Most recently logged drugs          │

│  Filter: show critical only  │  One-tap update interface            │

├──────────────────────────────┴──────────────────────────────────────┤

│  RECENT ALERTS for this facility                                    │

└─────────────────────────────────────────────────────────────────────┘

```

---

## 7. DATABASE SCHEMA (Prisma)

```prisma

// prisma/schema.prisma

generator client {

  provider = "prisma-client-js"

}

datasource db {

  provider = "postgresql"

  url      = env("DATABASE_URL")

}

model User {

  id           String    @id @default(cuid())

  email        String    @unique

  passwordHash String

  fullName     String

  phone        String?

  role         Role

  facilityId   String?

  districtId   String?

  facility     Facility? @relation(fields: [facilityId], references: [id])

  district     District? @relation(fields: [districtId], references: [id])

  stockEntries StockEntry[]

  createdAt    DateTime  @default(now())

  updatedAt    DateTime  @updatedAt

  isActive     Boolean   @default(true)

  lastLoginAt  DateTime?

}

enum Role {

  FACILITY_WORKER

  DISTRICT_OFFICER

  NMS_ADMIN

  SUPER_ADMIN

}

model District {

  id         String     @id @default(cuid())

  name       String     @unique   // e.g. "Wakiso"

  region     String               // e.g. "Central"

  facilities Facility[]

  officers   User[]

  createdAt  DateTime   @default(now())

}

model Facility {

  id           String       @id @default(cuid())

  name         String                             // e.g. "Gayaza Hospital"

  code         String       @unique               // MoH facility code

  level        FacilityLevel

  districtId   String

  district     District     @relation(fields: [districtId], references: [id])

  latitude     Float

  longitude    Float

  address      String?

  contactPhone String?

  workers      User[]

  stockEntries StockEntry[]

  alerts       Alert[]

  createdAt    DateTime     @default(now())

  updatedAt    DateTime     @updatedAt

  isActive     Boolean      @default(true)

}

enum FacilityLevel {

  HC_II

  HC_III

  HC_IV

  GENERAL_HOSPITAL

  REGIONAL_REFERRAL

}

model Drug {

  id           String       @id @default(cuid())

  name         String       @unique

  genericName  String

  category     DrugCategory

  unit         String       // "tablets" | "vials" | "bottles" | "packs"

  emhsCode     String?      // Uganda EMHS list code

  description  String?

  stockEntries StockEntry[]

  thresholds   Threshold[]

  createdAt    DateTime     @default(now())

}

enum DrugCategory {

  ANTIBIOTIC

  ANTIMALARIAL

  ARV

  ANALGESIC

  ANTIHYPERTENSIVE

  ANTIDIABETIC

  VACCINE

  MATERNAL_HEALTH

  SURGICAL_SUPPLY

  DIAGNOSTIC

  OTHER

}

model Threshold {

  id           String   @id @default(cuid())

  facilityId   String?  // null = global default

  drugId       String

  drug         Drug     @relation(fields: [drugId], references: [id])

  lowDays      Int      @default(14) // alert when < 14 days supply

  criticalDays Int      @default(7)  // alert when < 7 days supply

  avgDailyUsage Float   @default(0)  // calculated from rolling average

}

model StockEntry {

  id             String      @id @default(cuid())

  facilityId     String

  facility       Facility    @relation(fields: [facilityId], references: [id])

  drugId         String

  drug           Drug        @relation(fields: [drugId], references: [id])

  quantity       Float       // current stock quantity

  unit           String

  reportedById   String

  reportedBy     User        @relation(fields: [reportedById], references: [id])

  entryDate      DateTime    @default(now())

  notes          String?

  status         StockStatus @default(ADEQUATE)

  daysRemaining  Float?      // calculated field

  createdAt      DateTime    @default(now())

  @@index([facilityId, drugId, entryDate])

}

enum StockStatus {

  ADEQUATE    // > lowDays threshold

  LOW         // between criticalDays and lowDays

  CRITICAL    // < criticalDays

  STOCKOUT    // quantity = 0

}

model Alert {

  id           String      @id @default(cuid())

  facilityId   String

  facility     Facility    @relation(fields: [facilityId], references: [id])

  drugId       String?

  drugName     String      // denormalised for quick display

  severity     Severity

  type         AlertType

  message      String

  status       AlertStatus @default(ACTIVE)

  resolvedAt   DateTime?

  resolvedById String?

  smsDelivered Boolean     @default(false)

  smsSentAt    DateTime?

  createdAt    DateTime    @default(now())

  updatedAt    DateTime    @updatedAt

  @@index([facilityId, status, createdAt])

}

enum Severity {

  INFO

  WARNING

  CRITICAL

}

enum AlertType {

  STOCK_LOW

  STOCK_CRITICAL

  STOCKOUT

  STOCK_EXPIRING

  SYSTEM

}

enum AlertStatus {

  ACTIVE

  ACKNOWLEDGED

  RESOLVED

  DISMISSED

}

model ResupplyRequest {

  id             String    @id @default(cuid())

  facilityId     String

  facilityName   String    // denormalised

  districtName   String    // denormalised

  generatedAt    DateTime  @default(now())

  requestedById  String

  status         String    @default("PENDING")

  items          Json      // array of { drugName, unit, quantityRequested }

  pdfUrl         String?

}

model SmsLog {

  id          String   @id @default(cuid())

  recipient   String   // phone number

  message     String

  status      String   // SENT | DELIVERED | FAILED

  alertId     String?

  provider    String   @default("AfricasTalking")

  sentAt      DateTime @default(now())

  deliveredAt DateTime?

}

model AuditLog {

  id         String   @id @default(cuid())

  userId     String?

  action     String   // e.g. "STOCK_ENTRY_CREATED"

  entity     String   // e.g. "StockEntry"

  entityId   String?

  before     Json?

  after      Json?

  ipAddress  String?

  userAgent  String?

  createdAt  DateTime @default(now())

  @@index([userId, createdAt])

}

```

---

## 8. API LAYER

### Architecture Rules

- All controllers are thin: validate input → call service → return response
- All business logic lives in services
- All DB access goes through repositories (never call Prisma directly in controllers)
- All responses use a consistent envelope: `{ success, data, error, meta }`
- All errors flow through a central error handler middleware
- Rate limiting: 100 req/min per IP (general), 10 req/min (auth endpoints)

### Response Envelope

```typescript
// packages/shared/src/types/api.ts

export interface ApiResponse<T> {
  success: boolean;

  data?: T;

  error?: {
    code: string;

    message: string;

    details?: unknown;
  };

  meta?: {
    page?: number;

    pageSize?: number;

    total?: number;

    totalPages?: number;
  };
}
```

### Core Endpoints

```

Auth

POST   /api/v1/auth/login

POST   /api/v1/auth/refresh

POST   /api/v1/auth/logout

POST   /api/v1/auth/forgot-password

POST   /api/v1/auth/reset-password

Facilities

GET    /api/v1/facilities              (district/NMS scoped)

GET    /api/v1/facilities/:id

POST   /api/v1/facilities              (NMS_ADMIN only)

PATCH  /api/v1/facilities/:id

GET    /api/v1/facilities/:id/stock    (latest stock per drug)

Drugs

GET    /api/v1/drugs                   (with category filter)

POST   /api/v1/drugs                   (NMS_ADMIN only)

PATCH  /api/v1/drugs/:id

Stock

POST   /api/v1/stock/entry             (FACILITY_WORKER — batch entry)

GET    /api/v1/stock/:facilityId       (paginated history)

GET    /api/v1/stock/:facilityId/latest

Alerts

GET    /api/v1/alerts                  (role-scoped, filter by status/severity)

GET    /api/v1/alerts/:id

PATCH  /api/v1/alerts/:id/acknowledge

PATCH  /api/v1/alerts/:id/resolve

Reports

POST   /api/v1/reports/generate        (triggers async report job)

GET    /api/v1/reports/:id             (check status + download link)

Users

GET    /api/v1/users

POST   /api/v1/users

PATCH  /api/v1/users/:id

DELETE /api/v1/users/:id               (soft delete — set isActive: false)

Dashboard

GET    /api/v1/dashboard/summary       (KPI tiles data)

GET    /api/v1/dashboard/map           (facility GeoJSON for Leaflet)

GET    /api/v1/dashboard/trend         (stock trend chart data)

USSD (Africa's Talking webhook)

POST   /api/v1/ussd/callback

```

---

## 9. ALERT ENGINE (BullMQ)

The alert engine is the heart of the system.

Implement it as a BullMQ worker in `apps/api/src/jobs/`.

### Jobs

#### `stock-check` job (runs every 6 hours via cron)

```

For every facility:

  For every drug at that facility:

    1. Get latest StockEntry

    2. Get Threshold for that facility+drug (or global default)

    3. Calculate daysRemaining = quantity / threshold.avgDailyUsage

    4. Determine StockStatus:

       - daysRemaining > lowDays      → ADEQUATE

       - daysRemaining > criticalDays → LOW

       - daysRemaining > 0            → CRITICAL

       - quantity === 0               → STOCKOUT

    5. If status changed: create Alert record

    6. If status is CRITICAL or STOCKOUT:

       a. Queue send-sms job for district officer

       b. Queue send-email job for NMS admin

```

#### `send-sms` job

```

Uses Africa's Talking API

Message format (keep it SHORT — SMS is charged per character):

  "ALERT [severity]: [Drug] at [Facility] — [status].

   Days remaining: [N]. Login: meditrack.ug/alerts"

On delivery failure: retry 3x with exponential backoff

Log all attempts in SmsLog table

```

#### `send-email` job

```

Uses Nodemailer (configure SMTP)

Template: HTML email with MediTrack branding

Includes: drug, facility, quantity, days remaining, resupply action button

```

#### `generate-resupply-request` job

```

Triggered when STOCKOUT alert is created

Auto-generates ResupplyRequest record

PDF generation using pdfkit

Uploads PDF to storage

Emails PDF to facility contact + NMS admin

```

---

## 10. USSD FLOW (Africa's Talking)

Implement a full USSD state machine for feature-phone stock reporting.

```

CON MediTrack UG

1. Report Stock

2. View My Facility Status

3. View Alerts

0. Exit

[User selects 1 - Report Stock]

CON Select drug category:

1. Antibiotics

2. Antimalarials

3. ARVs

4. Maternal Health

5. Other

0. Back

[User selects category]

CON [Category] drugs:

1. Amoxicillin 250mg

2. Amoxicillin 500mg

3. Co-trimoxazole

[etc.]

0. Back

[User selects drug]

CON Amoxicillin 250mg

Current stock: Not reported

Enter quantity (number of tablets):

[User enters number]

CON Confirm:

Amoxicillin 250mg: 500 tablets

Facility: Gayaza Hospital

1. Confirm

2. Edit

0. Cancel

[User confirms]

END Stock updated. Thank you.

    Alert sent if stock is low.

    MediTrack UG

```

---

## 11. PWA & OFFLINE SUPPORT

Configure Vite PWA plugin for offline-first behaviour:

```typescript
// vite.config.ts — PWA config

VitePWA({
  registerType: 'autoUpdate',

  includeAssets: ['fonts/**', 'icons/**'],

  manifest: {
    name: 'MediTrack UG',

    short_name: 'MediTrack',

    description: 'Drug stock management for Uganda health facilities',

    theme_color: '#1e9658',

    background_color: '#f8f9f8',

    display: 'standalone',

    orientation: 'portrait-primary',

    icons: [
      { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },

      { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },

      {
        src: 'icons/icon-maskable.png',
        sizes: '512x512',

        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },

  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],

    runtimeCaching: [
      {
        // Cache API responses for dashboard data

        urlPattern: /^https:\/\/api\.meditrack\.ug\/api\/v1\/dashboard/,

        handler: 'StaleWhileRevalidate',

        options: { cacheName: 'dashboard-cache', expiration: { maxAgeSeconds: 300 } },
      },

      {
        // Cache drug list (changes rarely)

        urlPattern: /^https:\/\/api\.meditrack\.ug\/api\/v1\/drugs/,

        handler: 'CacheFirst',

        options: { cacheName: 'drugs-cache', expiration: { maxAgeSeconds: 86400 } },
      },
    ],
  },
});
```

**Offline stock entry:** When a FACILITY_WORKER submits stock data with no network,

save the payload to IndexedDB using the `idb` library.

Show a persistent banner: "You're offline. Stock data saved locally and will sync when connected."

On reconnection, automatically flush the IndexedDB queue to the API.

---

## 12. ACCESSIBILITY (WCAG 2.1 AA)

These are non-negotiable requirements, not nice-to-haves.

Many health workers use older devices with accessibility features enabled.

- All interactive elements reachable and operable via keyboard (Tab, Enter, Space, Arrow keys)
- Focus-visible ring on all interactive elements: `outline: 2px solid var(--border-brand); outline-offset: 2px;`
- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text and UI components
- All images and icons have `alt` text or `aria-label`
- All form inputs linked to labels via `htmlFor` / `id` pair
- Error messages linked via `aria-describedby`
- Status badges include screen-reader text (not just colour):
  e.g., `<Badge>Critical <span className="sr-only">stock level</span></Badge>`
- Live alert feed uses `aria-live="polite"` region
- Critical alerts use `aria-live="assertive"`
- Modal dialogs trap focus and restore on close
- Data tables use proper `<thead>`, `<th scope="col">`, `<caption>` markup
- Colour is never the sole conveyor of meaning (always pair with icon or text label)

---

## 13. CODING STANDARDS & CONVENTIONS

### TypeScript

- Strict mode on. No `any`. No type assertions unless unavoidable (with comment explaining why).
- Prefer `interface` for object shapes, `type` for unions/intersections.
- All async functions must have proper `try/catch` or propagate typed errors.
- Use `zod` to parse and validate all external data (API responses, form inputs, env vars).
- Shared types go in `packages/shared`. Never duplicate type definitions.

### React

- All components are function components with named exports.
- No default exports except for page-level components (required by routing convention).
- `useCallback` and `useMemo` only when profiling shows a need — not preemptively.
- Keep components under 200 lines. Split if larger.
- Co-locate: `Button/Button.tsx`, `Button/Button.test.tsx`, `Button/index.ts`
- Custom hooks live in `src/hooks/` and are prefixed with `use`.
- Never fetch data directly in components — always via React Query hooks.
- All data-fetching hooks live in `src/features/<feature>/hooks/`.

### API / Backend

- Controllers never contain business logic. They: parse request → call service → send response.
- Services never contain SQL. They call repositories.
- All database access through Prisma repositories.
- Every route is protected by the `authenticate` middleware except `/auth/`\*.
- Every route has role-based access control via `authorize(Role[])` middleware.
- Passwords always hashed with bcrypt (rounds: 12). Never logged. Never returned in responses.
- JWT access tokens expire in 15 minutes. Refresh tokens in 7 days (stored in httpOnly cookie).
- All user inputs sanitised before hitting the database.
- Audit log written for every CREATE / UPDATE / DELETE operation.

### Error Handling

```typescript
// Define a typed AppError class

class AppError extends Error {
  constructor(
    public message: string,

    public statusCode: number,

    public code: string,

    public isOperational = true,
  ) {
    super(message);
  }
}

// Central error middleware sends consistent response

// Unexpected errors (non-operational) trigger alert + graceful shutdown
```

### Git Conventions

```

feat(stock): add batch drug entry endpoint

fix(alerts): correct threshold calculation for zero daily usage

chore(deps): update prisma to 5.10.0

refactor(dashboard): extract stat tile into reusable component

test(auth): add refresh token rotation tests

docs(api): update swagger docs for /facilities endpoint

```

### File Naming

- Components: `PascalCase.tsx`
- Hooks: `camelCase.ts` (prefixed `use`)
- Utilities: `camelCase.ts`
- Constants: `SCREAMING_SNAKE_CASE` inside `constants.ts` files
- Types/interfaces: `PascalCase` (suffixed with `Type` or `Schema` to avoid collision)
- Test files: `ComponentName.test.tsx` or `serviceName.test.ts`

---

## 14. ENVIRONMENT CONFIGURATION

Validate all env vars at startup with Zod. App fails fast if config is missing.

```typescript
// apps/api/src/config/env.ts

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),

  PORT: z.string().default('3001'),

  DATABASE_URL: z.string().url(),

  REDIS_URL: z.string().url(),

  JWT_ACCESS_SECRET: z.string().min(32),

  JWT_REFRESH_SECRET: z.string().min(32),

  AT_API_KEY: z.string(), // Africa's Talking API key

  AT_USERNAME: z.string(), // Africa's Talking username

  AT_SHORTCODE: z.string(), // SMS sender ID / shortcode

  SMTP_HOST: z.string(),

  SMTP_PORT: z.string(),

  SMTP_USER: z.string(),

  SMTP_PASS: z.string(),

  FRONTEND_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);

// Throw at startup if any var is missing. Never let the app start misconfigured.
```

---

## 15. TESTING REQUIREMENTS

Write tests alongside code. Do not defer testing.

### Unit Tests (Vitest)

- All utility functions must have 100% coverage
- All Zod schemas must be tested with valid and invalid inputs
- Alert engine threshold calculation logic must have comprehensive test coverage
- Service methods must be tested with mocked repositories

### Component Tests (React Testing Library)

- All atoms: render, interaction, accessibility
- All molecules: form validation, error states
- Dashboard KPI tiles: renders correct value, correct status colour
- StockTable: sorting, filtering, empty state, loading state
- AlertFeed: renders alerts grouped by severity

### API Integration Tests (Supertest)

- All auth endpoints
- Stock entry creation (valid + invalid + unauthorized)
- Alert generation trigger
- Role-based access control (verify 403s for wrong roles)

### Test Conventions

```typescript

// Use descriptive describe/it blocks

describe('StockEntry service', () => {

  describe('createEntry', () => {

    it('should create ADEQUATE status when quantity exceeds low threshold', () => { ... });

    it('should create LOW status when quantity is between thresholds', () => { ... });

    it('should create STOCKOUT status when quantity is zero', () => { ... });

    it('should queue an alert job when status is CRITICAL', () => { ... });

  });

});

```

---

## 16. SEED DATA

Create a comprehensive seed file in `prisma/seed.ts`:

- 3 districts: Wakiso, Kampala, Mukono
- 5 facilities including Gayaza Hospital (lat: 0.4167, lng: 32.6333)
- Full Uganda EMHS essential medicines list (minimum 50 drugs across all categories)
- 3 users per role (FACILITY_WORKER for Gayaza, DISTRICT_OFFICER for Wakiso, NMS_ADMIN)
- 90 days of historical stock entries with realistic patterns (some drugs cycling through stock-out)
- Pre-existing alerts in various states (active, acknowledged, resolved)

---

## 17. BUILD SEQUENCE (follow this order strictly)

```

1.  Scaffold monorepo (pnpm workspaces, turbo, shared package)

2.  Set up ESLint, Prettier, Husky, lint-staged

3.  Set up Prisma schema + run initial migration + seed data

4.  Set up Express API skeleton (routes, middleware, error handler)

5.  Implement auth (login, refresh, logout) with full tests

6.  BUILD DESIGN SYSTEM: tokens.css, typography.css, tailwind.config.ts

7.  BUILD ATOMS: Button, Badge, Input, Select, Spinner, Skeleton, Tooltip

8.  BUILD MOLECULES: FormField, StatTile, StockLevelBar, AlertBanner, SearchInput

9.  Build AuthLayout + Login page (end-to-end working auth)

10. Build DashboardLayout (Sidebar + TopBar)

11. Build API endpoints: facilities, drugs, stock

12. Build Dashboard page with StatTiles + FacilityMap

13. Build StockTable + StockEntry form

14. Build Alert engine (BullMQ jobs + SMS integration)

15. Build AlertFeed + Alert pages

16. Build Reports page + PDF generation

17. Build User management

18. Configure PWA + offline stock entry queue

19. Implement USSD state machine

20. Audit accessibility, run axe-core checks, fix violations

21. Write remaining tests to bring coverage to target levels

22. Performance audit (Lighthouse), fix issues

23. Final code review pass: remove console.logs,

    check all TODOs, ensure all env vars documented in .env.example

```

---

## 18. FINAL QUALITY CHECKLIST

Before considering any feature complete, verify:

- TypeScript compiles with zero errors `tsc --noEmit`)
- ESLint passes with zero warnings
- All new components have at least a smoke test
- Keyboard navigation works end-to-end on the feature
- Feature works on a simulated 3G connection (Chrome DevTools throttling)
- Feature works on a 375px wide viewport (low-end Android simulation)
- No hardcoded colours, spacings, or font sizes outside token system
- Loading states implemented for all async operations
- Empty states implemented for all lists and tables
- Error states implemented and user-friendly (no raw error messages)
- Audit log entry written for all data mutations
- API endpoint documented in Swagger
- Conventional commit message used

---

_This document is the single source of truth for the MediTrack UG implementation._

\*Every architectural decision made during development should trace back to a

requirement stated here. When in doubt, refer back to the guiding principles

in Section 0.\*
