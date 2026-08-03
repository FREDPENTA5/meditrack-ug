-- Migration to add performance indexes across the database

-- 1. FOREIGN KEY INDEXES
-- PostgreSQL does not automatically index foreign keys. We add them here.

-- facilities
CREATE INDEX IF NOT EXISTS idx_facilities_district_id ON public.facilities(district_id);

-- users
CREATE INDEX IF NOT EXISTS idx_users_facility_id ON public.users(facility_id);
CREATE INDEX IF NOT EXISTS idx_users_district_id ON public.users(district_id);

-- thresholds
CREATE INDEX IF NOT EXISTS idx_thresholds_drug_id ON public.thresholds(drug_id);

-- stock_entries
CREATE INDEX IF NOT EXISTS idx_stock_entries_reported_by_id ON public.stock_entries(reported_by_id);
-- (facility_id, drug_id, entry_date) is already indexed via idx_stock_entries_facility_drug

-- alerts
CREATE INDEX IF NOT EXISTS idx_alerts_drug_id ON public.alerts(drug_id);
CREATE INDEX IF NOT EXISTS idx_alerts_resolved_by_id ON public.alerts(resolved_by_id);

-- resupply_requests
CREATE INDEX IF NOT EXISTS idx_resupply_requests_facility_id ON public.resupply_requests(facility_id);
CREATE INDEX IF NOT EXISTS idx_resupply_requests_requested_by_id ON public.resupply_requests(requested_by_id);

-- sms_logs
CREATE INDEX IF NOT EXISTS idx_sms_logs_alert_id ON public.sms_logs(alert_id);

-- audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);

-- 2. PARTIAL INDEXES
-- Highly efficient indexes for specific, common queries

-- Active alerts
CREATE INDEX IF NOT EXISTS idx_active_alerts_partial ON public.alerts(facility_id) WHERE status = 'ACTIVE';

-- Pending resupply requests
CREATE INDEX IF NOT EXISTS idx_pending_resupply ON public.resupply_requests(facility_id) WHERE status = 'PENDING';

-- 3. TIME-SERIES INDEX (BRIN)
-- BRIN indexes are much smaller and faster for monotonically increasing data like entry_date
CREATE INDEX IF NOT EXISTS idx_stock_entries_entry_date_brin ON public.stock_entries USING brin(entry_date);
