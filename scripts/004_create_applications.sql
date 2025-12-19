-- Create applications table for job applications
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  job_seeker_id uuid not null references public.profiles(id) on delete cascade,
  recruiter_id uuid not null references public.profiles(id) on delete cascade,
  cover_letter text,
  resume_url text,
  status text not null default 'pending' check (status in ('pending', 'reviewing', 'shortlisted', 'rejected', 'accepted')),
  match_score integer check (match_score >= 0 and match_score <= 100),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(job_id, job_seeker_id)
);

-- Enable RLS
alter table public.applications enable row level security;

-- RLS Policies for applications
create policy "Job seekers can view their own applications"
  on public.applications for select
  using (auth.uid() = job_seeker_id);

create policy "Recruiters can view applications for their jobs"
  on public.applications for select
  using (auth.uid() = recruiter_id);

create policy "Job seekers can create applications"
  on public.applications for insert
  with check (
    auth.uid() = job_seeker_id and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and user_type = 'job_seeker'
    )
  );

create policy "Job seekers can update their own applications"
  on public.applications for update
  using (auth.uid() = job_seeker_id and status = 'pending');

create policy "Recruiters can update application status"
  on public.applications for update
  using (auth.uid() = recruiter_id);

create policy "Job seekers can delete their pending applications"
  on public.applications for delete
  using (auth.uid() = job_seeker_id and status = 'pending');
