create extension if not exists vector;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  domain text,
  website text,
  linkedin_url text,
  description text,
  industry text,
  size text,
  location text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists people (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  first_name text,
  last_name text,
  headline text,
  bio text,
  role text,
  company_id uuid references organizations(id) on delete set null,
  location text,
  avatar_url text,
  linkedin_url text,
  website_url text,
  email text,
  phone text,
  relationship_status text default 'unknown',
  relationship_score numeric default 0,
  warmth_score numeric default 0,
  embedding vector(1536),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists person_organizations (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete cascade,
  title text,
  start_date date,
  end_date date,
  current boolean default true,
  created_at timestamptz default now()
);

create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  person_id uuid references people(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,
  raw_text text not null,
  structured_json jsonb default '{}'::jsonb,
  note_type text default 'context',
  source text default 'user_provided',
  created_by text,
  created_at timestamptz default now()
);

create table if not exists interactions (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id) on delete cascade,
  channel text,
  direction text,
  subject text,
  summary text,
  status text,
  happened_at timestamptz,
  next_step text,
  created_by text,
  created_at timestamptz default now()
);

create table if not exists crm_records (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null unique references people(id) on delete cascade,
  pipeline_stage text default 'new',
  priority text default 'medium',
  owner text,
  proposed_offer text,
  current_need text,
  next_action text,
  next_action_at timestamptz,
  last_contact_at timestamptz,
  outcome text,
  updated_at timestamptz default now()
);

create table if not exists relationships (
  id uuid primary key default gen_random_uuid(),
  source_person_id uuid not null references people(id) on delete cascade,
  target_person_id uuid not null references people(id) on delete cascade,
  relation_type text not null,
  strength text default 'weak',
  source_note_id uuid references notes(id) on delete set null,
  confidence numeric default 0.5,
  created_at timestamptz default now()
);

create table if not exists institution_links (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete cascade,
  link_type text,
  confidence numeric default 0.5,
  source_url text,
  created_at timestamptz default now()
);

create table if not exists sources (
  id uuid primary key default gen_random_uuid(),
  person_id uuid references people(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,
  source_type text,
  source_url text,
  title text,
  extracted_facts_json jsonb default '{}'::jsonb,
  confidence numeric default 0.5,
  fetched_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id) on delete cascade,
  interaction_id uuid references interactions(id) on delete set null,
  channel text default 'email',
  direction text default 'outbound',
  subject text,
  body_text text,
  body_html text,
  tone_profile text,
  approval_status text default 'draft',
  send_status text default 'draft',
  resend_message_id text,
  sent_at timestamptz,
  delivered_at timestamptz,
  opened_at timestamptz,
  clicked_at timestamptz,
  replied_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists message_events (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references messages(id) on delete cascade,
  provider text default 'resend',
  event_type text not null,
  payload_json jsonb default '{}'::jsonb,
  occurred_at timestamptz default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  person_id uuid references people(id) on delete cascade,
  crm_record_id uuid references crm_records(id) on delete cascade,
  title text not null,
  description text,
  due_at timestamptz,
  status text default 'open',
  priority text default 'medium',
  created_at timestamptz default now()
);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  person_id uuid references people(id) on delete cascade,
  message_id uuid references messages(id) on delete cascade,
  alert_type text not null,
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz default now()
);
