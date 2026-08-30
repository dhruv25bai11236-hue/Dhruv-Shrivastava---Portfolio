-- ============================================================
--  FIX: remove duplicate rows (caused by running the seed script
--  more than once). Keeps the earliest copy of each item.
--  Run this ONCE in Supabase → SQL Editor → New query → Run.
-- ============================================================

-- Experience: keep one per (role, org, period)
delete from public.experience a
using public.experience b
where a.id > b.id
  and a.role = b.role
  and coalesce(a.org,'') = coalesce(b.org,'')
  and coalesce(a.period,'') = coalesce(b.period,'');

-- Projects: keep one per title
delete from public.projects a
using public.projects b
where a.id > b.id and a.title = b.title;

-- Skills: keep one per name
delete from public.skills a
using public.skills b
where a.id > b.id and a.name = b.name;

-- Stats: keep one per label
delete from public.stats a
using public.stats b
where a.id > b.id and a.label = b.label;

-- Certificates: keep one per (title, issuer)
delete from public.certificates a
using public.certificates b
where a.id > b.id
  and a.title = b.title
  and coalesce(a.issuer,'') = coalesce(b.issuer,'');
