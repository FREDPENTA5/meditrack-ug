-- Migration: Facility write policies for admins and district officers

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
