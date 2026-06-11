-- =============================================================
-- RUN THIS IN: Supabase Dashboard → SQL Editor → New query
-- Fixes: alert status updates, user creation, facility CRUD,
--        user status toggle
-- Safe to run multiple times (IF NOT EXISTS guards).
-- =============================================================

-- ─── ALERTS: allow authenticated users to update status ──────
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'alerts'
      AND policyname = 'Authenticated can update alerts'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Authenticated can update alerts"
        ON public.alerts FOR UPDATE TO authenticated
        USING (true)
        WITH CHECK (true)
    $pol$;
  END IF;
END $$;

-- ─── USERS: allow admins to insert new users ──────────────────
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'users'
      AND policyname = 'Admins can insert users'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Admins can insert users"
        ON public.users FOR INSERT TO authenticated
        WITH CHECK (
          -- the new user inserting their own row after signUp
          id = auth.uid()
          OR
          -- an admin creating another user's profile
          EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid()
              AND u.role IN ('NMS_ADMIN', 'SUPER_ADMIN')
          )
        )
    $pol$;
  END IF;
END $$;

-- ─── USERS: allow admins to update any user ───────────────────
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'users'
      AND policyname = 'Admins can update user status'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Admins can update user status"
        ON public.users FOR UPDATE TO authenticated
        USING (
          EXISTS (
            SELECT 1 FROM public.users admin
            WHERE admin.id = auth.uid()
              AND admin.role IN ('NMS_ADMIN', 'SUPER_ADMIN')
          )
        )
        WITH CHECK (true)
    $pol$;
  END IF;
END $$;

-- ─── USERS: allow a user to update their own profile ─────────
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'users'
      AND policyname = 'Users can update own profile'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Users can update own profile"
        ON public.users FOR UPDATE TO authenticated
        USING (id = auth.uid())
        WITH CHECK (id = auth.uid())
    $pol$;
  END IF;
END $$;

-- ─── FACILITIES: admins can insert new facilities ─────────────
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'facilities'
      AND policyname = 'Admins can insert facilities'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Admins can insert facilities"
        ON public.facilities FOR INSERT TO authenticated
        WITH CHECK (
          EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid()
              AND u.role IN ('NMS_ADMIN', 'SUPER_ADMIN', 'DISTRICT_OFFICER')
          )
        )
    $pol$;
  END IF;
END $$;

-- ─── FACILITIES: admins can update (activate/deactivate) ─────
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'facilities'
      AND policyname = 'Admins can update facilities'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Admins can update facilities"
        ON public.facilities FOR UPDATE TO authenticated
        USING (
          EXISTS (
            SELECT 1 FROM public.users u
            WHERE u.id = auth.uid()
              AND u.role IN ('NMS_ADMIN', 'SUPER_ADMIN', 'DISTRICT_OFFICER')
          )
        )
        WITH CHECK (true)
    $pol$;
  END IF;
END $$;

-- ─── STOCK ENTRIES: workers can insert their own entries ──────
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'stock_entries'
      AND policyname = 'Workers can insert stock entries'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Workers can insert stock entries"
        ON public.stock_entries FOR INSERT TO authenticated
        WITH CHECK (reported_by_id = auth.uid())
    $pol$;
  END IF;
END $$;

-- ─── THRESHOLDS: allow authenticated users to read ───────────
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename  = 'thresholds'
      AND policyname = 'Allow authenticated read thresholds'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "Allow authenticated read thresholds"
        ON public.thresholds FOR SELECT TO authenticated
        USING (true)
    $pol$;
  END IF;
END $$;

-- Confirm what's applied — you should see all policies listed below
SELECT schemaname, tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
