-- Create job seeker profiles for detailed resume information
create table if not exists public.job_seeker_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  headline text,
  summary text,
  years_of_experience integer,
  skills text[] default array[]::text[],
  education jsonb default '[]'::jsonb,
  work_experience jsonb default '[]'::jsonb,
  certifications jsonb default '[]'::jsonb,
  portfolio_url text,
  linkedin_url text,
  github_url text,
  resume_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.job_seeker_profiles enable row level security;

-- RLS Policies for job seeker profiles
create policy "Users can view their own job seeker profile"
  on public.job_seeker_profiles for select
  using (auth.uid() = id);

create policy "Recruiters can view job seeker profiles"
  on public.job_seeker_profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and user_type = 'recruiter'
    )
  );

create policy "Job seekers can insert their own profile"
  on public.job_seeker_profiles for insert
  with check (
    auth.uid() = id and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and user_type = 'job_seeker'
    )
  );

create policy "Job seekers can update their own profile"
  on public.job_seeker_profiles for update
  using (auth.uid() = id);
