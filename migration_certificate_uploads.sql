-- ============================================================
--  ADD-ON: Upload certificate images
--  Run this ONCE in Supabase → SQL Editor → New query → Run.
-- ============================================================

-- 1) Add a column to store the uploaded image's web address.
alter table public.certificates add column if not exists image_url text;

-- 2) Create a public storage bucket to hold the image files.
insert into storage.buckets (id, name, public)
values ('certificates', 'certificates', true)
on conflict (id) do nothing;

-- 3) Storage rules: anyone can VIEW the images, only the admin can upload/replace/delete.
drop policy if exists "cert public read"   on storage.objects;
drop policy if exists "cert admin write"   on storage.objects;
drop policy if exists "cert admin update"  on storage.objects;
drop policy if exists "cert admin delete"  on storage.objects;

create policy "cert public read" on storage.objects
  for select using (bucket_id = 'certificates');

create policy "cert admin write" on storage.objects
  for insert with check (bucket_id = 'certificates' and public.is_admin());

create policy "cert admin update" on storage.objects
  for update using (bucket_id = 'certificates' and public.is_admin());

create policy "cert admin delete" on storage.objects
  for delete using (bucket_id = 'certificates' and public.is_admin());
