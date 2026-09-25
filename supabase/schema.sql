-- Schema of the portfolio-comments Supabase project (ref zqtojgkbuzfzdvdwoajh).
--
-- A REFERENCE, reconstructed on 25 September 2026 from the live project's
-- catalogue (columns, checks, defaults, indexes, row level security). It exists
-- so the database the site depends on is written down somewhere next to the
-- code that uses it, and so a fresh project can be set up to match.
--
-- It is not a migration history. Read it before running it anywhere; against
-- the live project every statement would fail or duplicate what is there.
--
-- The server talks to these tables only through PostgREST with the service
-- role key (src/lib/env.ts, src/lib/accounts.ts). The browser holds the
-- publishable key and, through the one policy below, can read approved
-- comments and nothing else.

-- ---------------------------------------------------------------- comments
-- Written by src/pages/api/comments.ts, read by the article pages
-- (src/components/ui/CommentThread.tsx) and by /moderation.

create table public.comments (
  id          uuid primary key default gen_random_uuid(),
  post_slug   text not null check (char_length(post_slug) >= 1 and char_length(post_slug) <= 200),
  author_name text not null check (char_length(btrim(author_name)) >= 1 and char_length(btrim(author_name)) <= 60),
  body        text not null check (char_length(btrim(body)) >= 2 and char_length(btrim(body)) <= 4000),
  created_at  timestamptz not null default now(),
  -- The API inserts approved = true: comments publish on sight and the filter
  -- only flags the notification. The default is the safe side for anything
  -- else that might insert.
  approved    boolean not null default false,
  -- Salted SHA-256 of the submitter's address (src/lib/ip-hash.ts), for the
  -- rate limit. Not reversible.
  ip_hash     text
);

create index comments_ip_recent_idx     on public.comments (ip_hash, created_at desc);
create index comments_post_approved_idx on public.comments (post_slug, approved, created_at);

alter table public.comments enable row level security;

create policy "anyone reads approved comments"
  on public.comments for select
  to anon, authenticated
  using (approved = true);

-- ----------------------------------------------------------------- editors
-- CMS accounts (src/lib/accounts.ts). No policy: only the service role reads
-- or writes it.

create table public.editors (
  id                uuid primary key default gen_random_uuid(),
  email             text not null unique check (position('@' in email) > 1 and char_length(email) <= 200),
  display_name      text not null check (char_length(btrim(display_name)) >= 2 and char_length(btrim(display_name)) <= 80),
  role              text not null default 'editor' check (role = any (array['admin', 'editor'])),
  -- scrypt$N$r$p$salt$key, see hashPassword().
  password_hash     text,
  invite_token      text unique,
  invite_expires_at timestamptz,
  disabled          boolean not null default false,
  created_at        timestamptz not null default now(),
  last_login_at     timestamptz
);

create index editors_email_idx on public.editors (lower(email));

alter table public.editors enable row level security;

-- ---------------------------------------------------------- login_attempts
-- Sign-in throttling for the CMS (per email address) and for /moderation
-- (under the fixed name 'secret:moderation'). No policy: service role only.

create table public.login_attempts (
  id         bigserial primary key,
  email      text not null,
  ip_hash    text,
  successful boolean not null default false,
  at         timestamptz not null default now()
);

create index login_attempts_recent_idx on public.login_attempts (email, at desc);

alter table public.login_attempts enable row level security;
