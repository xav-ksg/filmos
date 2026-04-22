-- =========================================================================
-- FilmOS Phase 1 Schema
-- Multi-tenant foundation. YFC seeds as tenant #1 in the next migration.
--
-- Design principles:
--   - Every table except `tenants` has tenant_id + RLS scoped to that tenant.
--   - Public-readable surfaces (published locations, vendors) are
--     explicitly allowed via WHERE published = true policies.
--   - Writes are locked to authenticated users tied to a tenant.
--   - Public form submissions (intake_submissions) allow INSERT by anon.
-- =========================================================================

-- Required extensions (gen_random_uuid lives in pgcrypto; Supabase has it)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- -------------------------------------------------------------------------
-- tenants
-- Top of the hierarchy. A tenant is a film commission (YFC is the first).
-- -------------------------------------------------------------------------
CREATE TABLE public.tenants (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text NOT NULL UNIQUE,
  name        text NOT NULL,
  domain      text,                     -- e.g. filmyosemite.com (future custom-domain routing)
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenants_public_read
  ON public.tenants FOR SELECT
  USING (true);

-- -------------------------------------------------------------------------
-- users
-- Tenant-scoped user profiles. Tied to Supabase auth.users via id.
-- Phase 1 doesn't use auth on the public site, but the schema exists so
-- Phase 2 (dashboard, M5) can drop in without migrations.
-- -------------------------------------------------------------------------
CREATE TABLE public.users (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id   uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  email       text NOT NULL,
  full_name   text,
  role        text NOT NULL DEFAULT 'staff', -- staff | admin | external
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX users_tenant_id_idx ON public.users(tenant_id);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY users_self_read
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY users_self_update
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- -------------------------------------------------------------------------
-- locations
-- Filming locations published on the public site. Stockton Creek is the
-- Phase 1 reference record.
-- -------------------------------------------------------------------------
CREATE TABLE public.locations (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id        uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  slug             text NOT NULL,
  name             text NOT NULL,
  category         text NOT NULL,          -- 'pastoral' | 'natural' | 'built'
  summary          text,
  body             text,                   -- long-form description (markdown ok)
  latitude         double precision,
  longitude        double precision,
  geojson          jsonb,                  -- overlay geometry (trails, zones)
  access_notes     text,
  permit_notes     text,
  published        boolean NOT NULL DEFAULT false,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, slug)
);

CREATE INDEX locations_tenant_id_idx ON public.locations(tenant_id);
CREATE INDEX locations_category_idx ON public.locations(category);
CREATE INDEX locations_published_idx ON public.locations(published) WHERE published = true;

ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY locations_public_read
  ON public.locations FOR SELECT
  USING (published = true);

CREATE POLICY locations_tenant_all
  ON public.locations FOR ALL
  USING (
    tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid())
  );

-- -------------------------------------------------------------------------
-- location_media
-- Photos, videos, maps tied to a location. Storage URLs point to Supabase
-- Storage buckets (configured separately).
-- -------------------------------------------------------------------------
CREATE TABLE public.location_media (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  location_id   uuid NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  media_type    text NOT NULL,          -- 'image' | 'video' | 'map'
  url           text NOT NULL,
  alt_text      text,
  caption       text,
  credit        text,                   -- photographer/owner attribution (critical for Phase 1)
  sort_order    integer NOT NULL DEFAULT 0,
  published     boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX location_media_tenant_id_idx ON public.location_media(tenant_id);
CREATE INDEX location_media_location_id_idx ON public.location_media(location_id);

ALTER TABLE public.location_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY location_media_public_read
  ON public.location_media FOR SELECT
  USING (
    published = true
    AND location_id IN (SELECT id FROM public.locations WHERE published = true)
  );

CREATE POLICY location_media_tenant_all
  ON public.location_media FOR ALL
  USING (
    tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid())
  );

-- -------------------------------------------------------------------------
-- vendors
-- Read-only directory in Phase 1, seeded from Mariposa Chamber of Commerce.
-- No self-service portal yet.
-- -------------------------------------------------------------------------
CREATE TABLE public.vendors (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id      uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  slug           text NOT NULL,
  name           text NOT NULL,
  category       text NOT NULL,         -- 'lodging' | 'catering' | 'equipment' | etc.
  description    text,
  website        text,
  email          text,
  phone          text,
  address        text,
  latitude       double precision,
  longitude      double precision,
  published      boolean NOT NULL DEFAULT false,
  source         text,                  -- 'chamber_import' | 'manual' etc. (for audit)
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, slug)
);

CREATE INDEX vendors_tenant_id_idx ON public.vendors(tenant_id);
CREATE INDEX vendors_category_idx ON public.vendors(category);
CREATE INDEX vendors_published_idx ON public.vendors(published) WHERE published = true;

ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

CREATE POLICY vendors_public_read
  ON public.vendors FOR SELECT
  USING (published = true);

CREATE POLICY vendors_tenant_all
  ON public.vendors FOR ALL
  USING (
    tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid())
  );

-- -------------------------------------------------------------------------
-- productions
-- Production records (future dashboard surface). Schema present now;
-- not surfaced in Phase 1 UI. No public read access.
-- -------------------------------------------------------------------------
CREATE TABLE public.productions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title           text NOT NULL,
  company         text,
  contact_name    text,
  contact_email   text,
  contact_phone   text,
  project_type    text,                 -- 'feature' | 'commercial' | 'documentary' etc.
  start_date      date,
  end_date        date,
  status          text NOT NULL DEFAULT 'inquiry', -- inquiry | active | wrapped | cancelled
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX productions_tenant_id_idx ON public.productions(tenant_id);
CREATE INDEX productions_status_idx ON public.productions(status);

ALTER TABLE public.productions ENABLE ROW LEVEL SECURITY;

CREATE POLICY productions_tenant_all
  ON public.productions FOR ALL
  USING (
    tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid())
  );

-- -------------------------------------------------------------------------
-- intake_submissions
-- The "Plan Your Production" form. Public INSERT (anon submissions),
-- tenant-scoped SELECT for staff.
-- -------------------------------------------------------------------------
CREATE TABLE public.intake_submissions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  contact_name    text NOT NULL,
  contact_email   text NOT NULL,
  contact_phone   text,
  company         text,
  project_title   text,
  project_type    text,
  start_date      date,
  end_date        date,
  locations_of_interest text,
  crew_size       integer,
  budget_range    text,
  message         text,
  source          text,                 -- referral/channel tracking
  status          text NOT NULL DEFAULT 'new', -- new | reviewing | responded | closed
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX intake_submissions_tenant_id_idx ON public.intake_submissions(tenant_id);
CREATE INDEX intake_submissions_status_idx ON public.intake_submissions(status);

ALTER TABLE public.intake_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit the form (public site form posts go through here)
CREATE POLICY intake_submissions_public_insert
  ON public.intake_submissions FOR INSERT
  WITH CHECK (true);

-- Authenticated staff can read/update their tenant's submissions
CREATE POLICY intake_submissions_tenant_read
  ON public.intake_submissions FOR SELECT
  USING (
    tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid())
  );

CREATE POLICY intake_submissions_tenant_update
  ON public.intake_submissions FOR UPDATE
  USING (
    tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid())
  );

-- -------------------------------------------------------------------------
-- updated_at triggers
-- One function, applied per table. Keeps updated_at honest on UPDATE.
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tenants_set_updated_at
  BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER users_set_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER locations_set_updated_at
  BEFORE UPDATE ON public.locations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER location_media_set_updated_at
  BEFORE UPDATE ON public.location_media
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER vendors_set_updated_at
  BEFORE UPDATE ON public.vendors
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER productions_set_updated_at
  BEFORE UPDATE ON public.productions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER intake_submissions_set_updated_at
  BEFORE UPDATE ON public.intake_submissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
