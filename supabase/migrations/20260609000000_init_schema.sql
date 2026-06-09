-- Supabase PostgreSQL Schema Migration

-- ENUMS
CREATE TYPE public.role AS ENUM ('FACILITY_WORKER', 'DISTRICT_OFFICER', 'NMS_ADMIN', 'SUPER_ADMIN');
CREATE TYPE public.facility_level AS ENUM ('HC_II', 'HC_III', 'HC_IV', 'GENERAL_HOSPITAL', 'REGIONAL_REFERRAL');
CREATE TYPE public.drug_category AS ENUM ('ANTIBIOTIC', 'ANTIMALARIAL', 'ARV', 'ANALGESIC', 'ANTIHYPERTENSIVE', 'ANTIDIABETIC', 'VACCINE', 'MATERNAL_HEALTH', 'SURGICAL_SUPPLY', 'DIAGNOSTIC', 'OTHER');
CREATE TYPE public.stock_status AS ENUM ('ADEQUATE', 'LOW', 'CRITICAL', 'STOCKOUT');
CREATE TYPE public.severity AS ENUM ('INFO', 'WARNING', 'CRITICAL');
CREATE TYPE public.alert_type AS ENUM ('STOCK_LOW', 'STOCK_CRITICAL', 'STOCKOUT', 'STOCK_EXPIRING', 'SYSTEM');
CREATE TYPE public.alert_status AS ENUM ('ACTIVE', 'ACKNOWLEDGED', 'RESOLVED', 'DISMISSED');

-- DISTRICTS
CREATE TABLE public.districts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  region text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- FACILITIES
CREATE TABLE public.facilities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  level facility_level NOT NULL,
  district_id uuid REFERENCES public.districts(id) NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  address text,
  contact_phone text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  is_active boolean DEFAULT true NOT NULL
);

-- USERS (Extends auth.users)
CREATE TABLE public.users (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  role role NOT NULL,
  facility_id uuid REFERENCES public.facilities(id),
  district_id uuid REFERENCES public.districts(id),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  last_login_at timestamptz
);

-- DRUGS
CREATE TABLE public.drugs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  generic_name text NOT NULL,
  category drug_category NOT NULL,
  unit text NOT NULL,
  emhs_code text,
  description text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- THRESHOLDS
CREATE TABLE public.thresholds (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_id uuid REFERENCES public.facilities(id),
  drug_id uuid REFERENCES public.drugs(id) NOT NULL,
  low_days integer DEFAULT 14 NOT NULL,
  critical_days integer DEFAULT 7 NOT NULL,
  avg_daily_usage double precision DEFAULT 0 NOT NULL,
  UNIQUE(facility_id, drug_id)
);

-- STOCK ENTRIES
CREATE TABLE public.stock_entries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_id uuid REFERENCES public.facilities(id) NOT NULL,
  drug_id uuid REFERENCES public.drugs(id) NOT NULL,
  quantity double precision NOT NULL,
  unit text NOT NULL,
  reported_by_id uuid REFERENCES public.users(id) NOT NULL,
  entry_date timestamptz DEFAULT now() NOT NULL,
  notes text,
  status stock_status DEFAULT 'ADEQUATE' NOT NULL,
  days_remaining double precision,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_stock_entries_facility_drug ON public.stock_entries(facility_id, drug_id, entry_date);

-- ALERTS
CREATE TABLE public.alerts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_id uuid REFERENCES public.facilities(id) NOT NULL,
  drug_id uuid REFERENCES public.drugs(id),
  drug_name text NOT NULL,
  severity severity NOT NULL,
  type alert_type NOT NULL,
  message text NOT NULL,
  status alert_status DEFAULT 'ACTIVE' NOT NULL,
  resolved_at timestamptz,
  resolved_by_id uuid REFERENCES public.users(id),
  sms_delivered boolean DEFAULT false NOT NULL,
  sms_sent_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_alerts_facility_status ON public.alerts(facility_id, status, created_at);

-- RESUPPLY REQUESTS
CREATE TABLE public.resupply_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_id uuid REFERENCES public.facilities(id) NOT NULL,
  facility_name text NOT NULL,
  district_name text NOT NULL,
  generated_at timestamptz DEFAULT now() NOT NULL,
  requested_by_id uuid REFERENCES public.users(id) NOT NULL,
  status text DEFAULT 'PENDING' NOT NULL,
  items jsonb NOT NULL,
  pdf_url text
);

-- SMS LOGS
CREATE TABLE public.sms_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient text NOT NULL,
  message text NOT NULL,
  status text NOT NULL,
  alert_id uuid REFERENCES public.alerts(id),
  provider text DEFAULT 'AfricasTalking' NOT NULL,
  sent_at timestamptz DEFAULT now() NOT NULL,
  delivered_at timestamptz
);

-- AUDIT LOGS
CREATE TABLE public.audit_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id),
  action text NOT NULL,
  entity text NOT NULL,
  entity_id uuid,
  before jsonb,
  after jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Row Level Security (RLS) basics (to be expanded later)
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drugs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thresholds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resupply_requests ENABLE ROW LEVEL SECURITY;

-- Enable Read Access for all authenticated users for now
CREATE POLICY "Allow authenticated read access" ON public.districts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.facilities FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.drugs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read access" ON public.stock_entries FOR SELECT TO authenticated USING (true);
