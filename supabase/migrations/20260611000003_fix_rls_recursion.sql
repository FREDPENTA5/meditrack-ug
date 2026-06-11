-- Fix recursive RLS policies on public.users
-- The self-join inside USING/WITH CHECK caused infinite recursion.
-- Replace with a SECURITY DEFINER function that reads role bypassing RLS.

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role::TEXT FROM public.users WHERE id = auth.uid() LIMIT 1
$$;

-- Drop old recursive policies
DROP POLICY IF EXISTS "Admins can update user status" ON public.users;
DROP POLICY IF EXISTS "Admins can insert users" ON public.users;

-- Recreate using the SECURITY DEFINER helper (no recursion)
CREATE POLICY "Admins can update user status"
  ON public.users FOR UPDATE TO authenticated
  USING (public.get_my_role() IN ('NMS_ADMIN', 'SUPER_ADMIN'))
  WITH CHECK (true);

CREATE POLICY "Admins can insert users"
  ON public.users FOR INSERT TO authenticated
  WITH CHECK (
    id = auth.uid()
    OR public.get_my_role() IN ('NMS_ADMIN', 'SUPER_ADMIN')
  );

-- Also fix facility policies the same way
DROP POLICY IF EXISTS "Admins can insert facilities" ON public.facilities;
DROP POLICY IF EXISTS "Admins can update facilities" ON public.facilities;

CREATE POLICY "Admins can insert facilities"
  ON public.facilities FOR INSERT TO authenticated
  WITH CHECK (
    public.get_my_role() IN ('NMS_ADMIN', 'SUPER_ADMIN', 'DISTRICT_OFFICER')
  );

CREATE POLICY "Admins can update facilities"
  ON public.facilities FOR UPDATE TO authenticated
  USING (
    public.get_my_role() IN ('NMS_ADMIN', 'SUPER_ADMIN', 'DISTRICT_OFFICER')
  )
  WITH CHECK (true);
