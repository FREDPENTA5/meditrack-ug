-- Run this in Supabase Dashboard → SQL Editor (after init schema + seed)
-- No Supabase CLI required.

-- Ensure login works for seeded users (auth.identities required for signInWithPassword)
UPDATE auth.users
SET
  raw_app_meta_data = '{"provider":"email","providers":["email"]}',
  raw_user_meta_data = '{}',
  aud = 'authenticated',
  role = 'authenticated',
  email_confirmed_at = COALESCE(email_confirmed_at, now())
WHERE email IN ('admin@nms.ug', 'dho@wakiso.ug', 'pharmacist@gayaza.ug');

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
SELECT
  gen_random_uuid(),
  u.id,
  jsonb_build_object('sub', u.id::text, 'email', u.email, 'email_verified', true),
  'email',
  u.id::text,
  now(),
  now(),
  now()
FROM auth.users u
WHERE u.email IN ('admin@nms.ug', 'dho@wakiso.ug', 'pharmacist@gayaza.ug')
  AND NOT EXISTS (
    SELECT 1 FROM auth.identities i WHERE i.user_id = u.id AND i.provider = 'email'
  );

-- Extra read policies
CREATE POLICY "Allow authenticated read thresholds"
  ON public.thresholds FOR SELECT TO authenticated USING (true);

-- Write policies for the web app
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Admins can update user status"
  ON public.users FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users admin
      WHERE admin.id = auth.uid()
        AND admin.role IN ('NMS_ADMIN', 'SUPER_ADMIN')
    )
  );

CREATE POLICY "Authenticated can update alerts"
  ON public.alerts FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Workers can insert stock entries"
  ON public.stock_entries FOR INSERT TO authenticated
  WITH CHECK (reported_by_id = auth.uid());
