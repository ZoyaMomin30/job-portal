-- Create jobs table for job postings
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  requirements text,
  responsibilities text,
  salary_min integer,
  salary_max integer,
  location text not null,
  job_type text not null check (job_type in ('full_time', 'part_time', 'contract', 'internship')),
  experience_level text not null check (experience_level in ('entry', 'mid', 'senior', 'lead')),
  skills text[] default array[]::text[],
  company_id uuid not null references public.companies(id) on delete cascade,
  recruiter_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active' check (status in ('active', 'closed', 'draft')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.jobs enable row level security;

-- RLS Policies for jobs
create policy "Anyone can view active jobs"
  on public.jobs for select
  using (status = 'active' or auth.uid() = recruiter_id);

create policy "Recruiters can create jobs"
  on public.jobs for insert
  with check (
    auth.uid() = recruiter_id and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and user_type = 'recruiter'
    )
  );

create policy "Recruiters can update their own jobs"
  on public.jobs for update
  using (auth.uid() = recruiter_id);

create policy "Recruiters can delete their own jobs"
  on public.jobs for delete
  using (auth.uid() = recruiter_id);
