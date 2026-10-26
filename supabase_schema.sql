-- =================================================================
-- 1. JOBS TABLE (All 18 Companies & Openings)
-- =================================================================
create table if not exists public.jobs (
  id text primary key,
  company text not null,
  qualification text not null,
  trade text not null,
  category text not null, -- NAPS / Contractual Staffing
  gender text not null,    -- Male / Female / Male & Female
  age text not null,
  salary text not null,
  accommodation text not null, -- Free / No
  food text not null,          -- Free / Subsidized Canteen / No
  transport text not null,     -- Free / No
  location text not null,
  state text default 'Karnataka',
  openings integer not null default 1,
  status text default 'Active',
  created_at timestamptz default now()
);

-- =================================================================
-- 2. JOB APPLICATIONS TABLE
-- =================================================================
create table if not exists public.job_applications (
  id uuid default gen_random_uuid() primary key,
  job_id text not null,
  job_company text not null,
  job_role text not null,
  name text not null,
  email text,
  contact text not null,
  dob text,
  gender text,
  address text not null,
  qualification text not null,
  trade text,
  preferred_location text,
  resume_url text,
  marks_card_url text,
  additional_doc_url text,
  status text default 'Pending', -- Pending, Shortlisted, Contacted, Rejected
  notes text,
  created_at timestamptz default now()
);

-- Migrations for existing deployments:
alter table if exists public.job_applications add column if not exists preferred_location text;
alter table if exists public.job_applications add column if not exists additional_doc_url text;

-- =================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================
alter table public.jobs enable row level security;
alter table public.job_applications enable row level security;

-- Allow public read of jobs
create policy "Public can read jobs" on public.jobs
  for select using (true);

-- Allow public to insert applications
create policy "Public can apply to jobs" on public.job_applications
  for insert with check (true);

-- Allow reading applications (Admin view)
create policy "Allow read applications" on public.job_applications
  for select using (true);

-- Allow update application status
create policy "Allow update applications" on public.job_applications
  for update using (true);

-- =================================================================
-- 4. STORAGE BUCKET FOR RESUMES AND MARKS CARDS
-- Run in Supabase SQL editor or create 'job-documents' in Storage UI:
-- =================================================================
insert into storage.buckets (id, name, public)
values ('job-documents', 'job-documents', true)
on conflict (id) do update set public = true;

create policy "Public Access to Job Documents"
  on storage.objects for select
  using ( bucket_id = 'job-documents' );

create policy "Public Upload to Job Documents"
  on storage.objects for insert
  with check ( bucket_id = 'job-documents' );
