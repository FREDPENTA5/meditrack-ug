# MediTrack UG — Supabase + Vercel setup (no CLI)

The web app talks **directly to Supabase** for auth and data. You do **not** need to deploy the Express API for your lecturer demo.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. Wait until the database is ready.

## 2. Run SQL in the dashboard (SQL Editor)

Run these files **in order** (copy/paste each into **SQL Editor → Run**):

| Order | File | Purpose |
|-------|------|---------|
| 1 | `supabase/migrations/20260609000000_init_schema.sql` | Tables + base RLS |
| 2 | `supabase/final_supabase_seed.sql` | Demo data + users |
| 3 | `supabase/hosted_policies.sql` | Login fix + write policies |

**Demo logins** (password for all: `12345678`):

| Email | Role |
|-------|------|
| `admin@nms.ug` | NMS Admin |
| `dho@wakiso.ug` | District Officer |
| `pharmacist@gayaza.ug` | Facility Worker |

## 3. Get API keys

In Supabase: **Project Settings → API**

- **Project URL** → `VITE_SUPABASE_URL`
- **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 4. Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [vercel.com](https://vercel.com).
3. Add **Environment Variables** (Production + Preview):

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

4. Deploy. Share the Vercel URL with your lecturer.

`VITE_API_URL` is **not required** — the frontend no longer depends on Express for the demo.

## 5. Local development

Create `.env` in the repo root (copy from `.env.example`) and set at least:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Then:

```bash
pnpm install
pnpm --filter @meditrack/web dev
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Login fails | Re-run `hosted_policies.sql` |
| Dashboard shows zeros | Re-run seed SQL; confirm you are logged in |
| Build fails on Vercel | Set both `VITE_SUPABASE_*` env vars |
| "User profile not found" | Seed `public.users` rows match `auth.users` IDs |
