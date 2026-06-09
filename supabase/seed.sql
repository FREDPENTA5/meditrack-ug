-- Insert Districts
INSERT INTO public.districts (id, name, region) VALUES
  ('d1f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'Kampala', 'Central'),
  ('d2f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'Wakiso', 'Central'),
  ('d3f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'Gulu', 'Northern')
ON CONFLICT DO NOTHING;

-- Insert Facilities
INSERT INTO public.facilities (id, name, code, level, district_id, latitude, longitude, address, contact_phone, is_active) VALUES
  ('f1f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'Mulago National Referral Hospital', 'F001', 'REGIONAL_REFERRAL', 'd1f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 0.3380, 32.5760, 'Mulago Hill, Kampala', '+256700000001', true),
  ('f2f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'Entebbe General Hospital', 'F002', 'GENERAL_HOSPITAL', 'd2f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 0.0630, 32.4637, 'Entebbe Town', '+256700000002', true),
  ('f3f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'Gulu Regional Referral Hospital', 'F003', 'REGIONAL_REFERRAL', 'd3f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 2.7746, 32.2990, 'Gulu City', '+256700000003', true)
ON CONFLICT DO NOTHING;

-- Insert Drugs
INSERT INTO public.drugs (id, name, generic_name, category, unit, emhs_code, description) VALUES
  ('a1f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'Amoxicillin 250mg', 'Amoxicillin', 'ANTIBIOTIC', 'Capsules', 'EMHS-001', 'Broad-spectrum antibiotic'),
  ('a2f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'Paracetamol 500mg', 'Paracetamol', 'ANALGESIC', 'Tablets', 'EMHS-002', 'Pain reliever and fever reducer'),
  ('a3f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'Coartem 20/120', 'Artemether/Lumefantrine', 'ANTIMALARIAL', 'Tablets', 'EMHS-003', 'Treatment for uncomplicated malaria')
ON CONFLICT DO NOTHING;

-- Insert Alerts
INSERT INTO public.alerts (id, facility_id, drug_id, drug_name, severity, type, message, status) VALUES
  ('e1f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'f2f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'a3f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'Coartem 20/120', 'CRITICAL', 'STOCKOUT', 'Entebbe General Hospital is completely out of Coartem.', 'ACTIVE'),
  ('e2f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'f3f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'a1f5e8f1-8f5b-4b1f-b5b5-f5e8f18f5b4b', 'Amoxicillin 250mg', 'WARNING', 'STOCK_LOW', 'Gulu Regional Referral Hospital has less than 14 days supply of Amoxicillin.', 'ACTIVE')
ON CONFLICT DO NOTHING;

-- Note: We skipped inserting into public.users because they reference auth.users. 
-- In a real setup, you should create users via Supabase Auth.
