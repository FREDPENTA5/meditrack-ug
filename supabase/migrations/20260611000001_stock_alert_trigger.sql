-- Migration: Auto-create/resolve alerts from stock_entries
-- Trigger fires AFTER INSERT on stock_entries
-- Creates a new ACTIVE alert for LOW/CRITICAL/STOCKOUT entries
-- Resolves existing ACTIVE alerts when stock is restored to ADEQUATE

CREATE OR REPLACE FUNCTION public.handle_stock_alert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_drug_name    TEXT;
  v_facility_name TEXT;
  v_severity     public.severity;
  v_alert_type   public.alert_type;
  v_message      TEXT;
BEGIN
  -- Fetch drug name
  SELECT name INTO v_drug_name FROM public.drugs WHERE id = NEW.drug_id;
  -- Fetch facility name
  SELECT name INTO v_facility_name FROM public.facilities WHERE id = NEW.facility_id;

  IF NEW.status = 'ADEQUATE' THEN
    -- Resolve any existing active/acknowledged alert for this drug+facility
    UPDATE public.alerts
    SET
      status       = 'RESOLVED',
      resolved_at  = NOW(),
      updated_at   = NOW()
    WHERE
      facility_id = NEW.facility_id
      AND drug_id  = NEW.drug_id
      AND status  IN ('ACTIVE', 'ACKNOWLEDGED');

    RETURN NEW;
  END IF;

  -- Map stock status → alert severity + type
  IF NEW.status = 'STOCKOUT' THEN
    v_severity   := 'CRITICAL';
    v_alert_type := 'STOCKOUT';
    v_message    := v_drug_name || ' at ' || v_facility_name || ' is out of stock.';
  ELSIF NEW.status = 'CRITICAL' THEN
    v_severity   := 'CRITICAL';
    v_alert_type := 'STOCK_CRITICAL';
    v_message    := v_drug_name || ' at ' || v_facility_name || ' is critically low ('
                    || COALESCE(NEW.days_remaining::TEXT, '?') || ' days remaining).';
  ELSE -- LOW
    v_severity   := 'WARNING';
    v_alert_type := 'STOCK_LOW';
    v_message    := v_drug_name || ' at ' || v_facility_name || ' is running low ('
                    || COALESCE(NEW.days_remaining::TEXT, '?') || ' days remaining).';
  END IF;

  -- Only insert a new alert if there is no active/acknowledged one for this drug+facility
  INSERT INTO public.alerts (
    facility_id,
    drug_id,
    drug_name,
    severity,
    type,
    message,
    status,
    created_at,
    updated_at
  )
  SELECT
    NEW.facility_id,
    NEW.drug_id,
    v_drug_name,
    v_severity,
    v_alert_type,
    v_message,
    'ACTIVE',
    NOW(),
    NOW()
  WHERE NOT EXISTS (
    SELECT 1 FROM public.alerts
    WHERE facility_id = NEW.facility_id
      AND drug_id     = NEW.drug_id
      AND status     IN ('ACTIVE', 'ACKNOWLEDGED')
  );

  RETURN NEW;
END;
$$;

-- Drop old trigger if it exists, then recreate
DROP TRIGGER IF EXISTS trg_stock_alert ON public.stock_entries;

CREATE TRIGGER trg_stock_alert
  AFTER INSERT ON public.stock_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_stock_alert();
