-- Tambahan untuk PDF surat (jalankan setelah verify-surat.sql)

alter table public.surat add column if not exists pdf_path text;

create policy "surat_anon_update_pdf"
  on public.surat for update
  to anon, authenticated
  using (true)
  with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'surat-pdf',
  'surat-pdf',
  true,
  10485760,
  array['application/pdf']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "surat_pdf_insert"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'surat-pdf');

create policy "surat_pdf_update"
  on storage.objects for update
  to anon, authenticated
  using (bucket_id = 'surat-pdf');

create policy "surat_pdf_select"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'surat-pdf');
