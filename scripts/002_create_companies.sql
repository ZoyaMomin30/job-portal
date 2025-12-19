-- Create companies table for recruiter organizations
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  industry text,
  website text,
  logo_url text,
  location text,
  company_size text,
  recruiter_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.companies enable row level security;

-- RLS Policies for companies
create policy "Anyone can view companies"
  on public.companies for select
  using (true);

create policy "Recruiters can create their own companies"
  on public.companies for insert
  with check (
    auth.uid() = recruiter_id and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and user_type = 'recruiter'
    )
  );

create policy "Recruiters can update their own companies"
  on public.companies for update
  using (auth.uid() = recruiter_id);

create policy "Recruiters can delete their own companies"
  on public.companies for delete
  using (auth.uid() = recruiter_id);
