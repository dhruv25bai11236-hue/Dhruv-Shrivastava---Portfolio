# Dhruv Shrivastava — Portfolio (Full-Stack)

A pixel-close recreation of the reference hero design, fully interactive, with a secure
admin area. Built with **Vite + React + Tailwind** (frontend) and **Supabase** (auth + database),
deployable free on **Vercel**.

## Features
- Same interface as the reference: glass hero, rotating badge, floating orbs, stats bar, your photo.
- Dark / light mode, smooth scroll, animated sections (Framer Motion).
- Sections: Home, About, Projects, Skills, Experience, Contact (working form).
- **Admin-only editing** of ALL content, secured by Supabase Row Level Security —
  only `dhruvshrivastava.18032006@gmail.com` can log in and change anything.
- Runs in read-only **Demo mode** until Supabase keys are added.

## Get started
See **SETUP_GUIDE.md** — written in plain, non-developer language, step by step.

## Quick commands
```
npm install
npm run dev      # local preview
npm run build    # production build (output in /dist)
```

## Security
- Only the `anon` (public) Supabase key goes in `.env` / Vercel — never the `service_role` key.
- Write access is enforced in the database (`is_admin()` + RLS policies in `supabase_schema.sql`),
  not just in the UI, so it can't be bypassed from the browser.
