-- RUN THIS IN SUPABASE → SQL Editor
-- Fixes "Database error querying schema" on login
-- Cause: manually seeded auth.users rows have NULL token columns; GoTrue expects ''

BEGIN;

-- 1. Fix NULL token columns on demo users
UPDATE auth.users
SET
  confirmation_token = COALESCE(confirmation_token, ''),
  recovery_token = COALESCE(recovery_token, ''),
  email_change = COALESCE(email_change, ''),
  email_change_token_new = COALESCE(email_change_token_new, ''),
  email_change_token_current = COALESCE(email_change_token_current, ''),
  raw_app_meta_data = COALESCE(raw_app_meta_data, '{"provider":"email","providers":["email"]}'::jsonb),
  raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb),
  aud = 'authenticated',
  role = 'authenticated',
  email_confirmed_at = COALESCE(email_confirmed_at, now())
WHERE email IN ('admin@nms.ug', 'dho@wakiso.ug', 'pharmacist@gayaza.ug');

-- 2. Ensure auth.identities exist (required for email login)
INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
SELECT
  gen_random_uuid(),
  u.id,
  jsonb_build_object('sub', u.id::text, 'email', u.email, 'email_verified', true),
  'email',
  u.email,
  now(),
  now(),
  now()
FROM auth.users u
WHERE u.email IN ('admin@nms.ug', 'dho@wakiso.ug', 'pharmacist@gayaza.ug')
  AND NOT EXISTS (
    SELECT 1 FROM auth.identities i WHERE i.user_id = u.id AND i.provider = 'email'
  );

-- 3. Fix provider_id on existing identities (must be email, not uuid)
UPDATE auth.identities i
SET provider_id = u.email
FROM auth.users u
WHERE i.user_id = u.id
  AND i.provider = 'email'
  AND i.provider_id <> u.email;

COMMIT;
