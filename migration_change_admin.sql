-- ============================================================
--  CHANGE ADMIN EMAIL → dhruvshrivastava1803@gmail.com
--  Run this ONCE in Supabase → SQL Editor → New query → Run.
-- ============================================================
create or replace function public.is_admin()
returns boolean
language sql stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'dhruvshrivastava1803@gmail.com';
$$;
