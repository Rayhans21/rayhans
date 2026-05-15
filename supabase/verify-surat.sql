-- Jalankan di Supabase Dashboard → SQL Editor (proyek verify: tgpxprtwfrvtszdmnpnc)

create table if not exists public.surat (
  id uuid primary key default gen_random_uuid(),
  nomor_surat text not null,
  judul_surat text not null,
  jenis_surat text not null,
  perihal text,
  penerima text,
  penandatangan text not null default 'Muhammad Rayhan Syah',
  tanggal_ttd timestamptz not null,
  catatan text,
  pdf_path text,
  created_at timestamptz not null default now()
);

alter table public.surat enable row level security;

create policy "surat_anon_insert"
  on public.surat for insert
  to anon, authenticated
  with check (true);

create policy "surat_public_select"
  on public.surat for select
  to anon, authenticated
  using (true);

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
on conflict (id) do nothing;

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
