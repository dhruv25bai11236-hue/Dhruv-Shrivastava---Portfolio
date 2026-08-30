# Your Portfolio Website — Setup Guide (plain language)

Hi Dhruv! This is your personal portfolio site — same look as the design you sent,
with your photo in the hero, fully interactive, and a secure admin area where **only you**
(dhruvshrivastava.18032006@gmail.com) can change any content.

You do **not** need to be a developer. Follow the steps in order and copy-paste exactly.

---

## What you have

- A modern website (React + Vite + Tailwind).
- A secure backend (Supabase) that stores all your content and messages.
- An **Admin** page (bottom of the site → "Admin") where you log in and edit everything:
  your name, role, bio, photo, stats, skills, projects, experience, and read contact messages.
- It runs in **Demo mode** out of the box (works instantly, but editing is off) until you
  connect Supabase in Step 2.

---

## Step 1 — Try it on your computer (optional, 5 min)

1. Install **Node.js** (LTS version) from https://nodejs.org — just click through the installer.
2. Open this folder in a terminal and run:
   ```
   npm install
   npm run dev
   ```
3. Open the link it prints (usually http://localhost:5173). You'll see your site in Demo mode.

---

## Step 2 — Create your free backend (Supabase)

1. Go to https://supabase.com → **Sign up** (free).
2. Click **New Project**. Give it a name (e.g. "portfolio"), set a database password
   (save it somewhere), pick a region near you, click **Create**.
3. Wait ~2 minutes for it to finish setting up.

### 2a. Create the tables and security
1. In the left menu click **SQL Editor** → **New query**.
2. Open the file **`supabase_schema.sql`** (in this folder), copy ALL of it, paste into the box.
3. Click **Run**. You should see "Success". This creates your tables and locks editing to your email.

### 2b. Create your admin account
1. Left menu → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Email: `dhruvshrivastava.18032006@gmail.com`
3. Set a password you'll remember. Turn ON "Auto Confirm User". Click **Create user**.
   *(This password is how you log into the Admin page.)*

### 2c. Get your two keys
1. Left menu → **Project Settings** → **API**.
2. Copy the **Project URL** and the **anon public** key (NOT the service_role key — never share that one).

---

## Step 3 — Connect the keys

1. In this folder, make a copy of **`.env.example`** and rename the copy to **`.env`**.
2. Open `.env` and paste your two values:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your-anon-key...
   ```
3. Save. Run `npm run dev` again — Demo mode banner disappears. Editing now works.

---

## Step 4 — Put it online for free (Vercel)

1. Create a free account at https://vercel.com (sign in with GitHub is easiest).
2. Push this folder to a GitHub repository (or use "Deploy" → upload).
3. In Vercel → **New Project** → pick your repo.
4. Under **Environment Variables**, add the same two lines from your `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy**. In ~1 minute you get a live web address. Done!

---

## How to edit your site (the fun part)

1. Open your site → scroll to the very bottom → click **Admin**.
2. Log in with `dhruvshrivastava.18032006@gmail.com` and the password from Step 2b.
3. Edit anything and click **Save**. Refresh the site to see changes.

Only your email can log in and edit. If anyone else logs in, they're blocked — this is
enforced by the database itself (Row Level Security), not just the screen, so it's genuinely secure.

## Changing your photo
Your photo lives at `public/dhruv.jpeg`. To swap it, replace that file with a new one of the
same name, OR paste an image URL into the "Photo URL" field in the Admin panel.

## Security notes (important)
- Never put the **service_role** key anywhere in this project or online. Only the **anon** key
  belongs in `.env` / Vercel. The anon key is safe to expose.
- Your admin password is separate — keep it private.
- Website visitors can read your site and send you messages, but cannot change anything.
