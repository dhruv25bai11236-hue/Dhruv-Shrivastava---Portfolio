import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// The admin email allowed to edit content. Kept here only for UI hints;
// real enforcement happens in the database via Row Level Security (RLS).
export const ADMIN_EMAIL = 'dhruvshrivastava1803@gmail.com'

// If env vars are missing we run in read-only "demo" mode so the site
// still renders locally without a backend configured.
export const isConfigured = Boolean(url && anonKey)

export const supabase = isConfigured
  ? createClient(url, anonKey)
  : null
