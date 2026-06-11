import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Africa's Talking SMS via Edge Function
// Triggered by: Supabase Database Webhook → INSERT on public.alerts

const AT_API_KEY = Deno.env.get('AT_API_KEY') ?? '';
const AT_USERNAME = Deno.env.get('AT_USERNAME') ?? 'sandbox';
const AT_SHORTCODE = Deno.env.get('AT_SHORTCODE') ?? '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function sendSms(to: string, message: string): Promise<boolean> {
  const body = new URLSearchParams({
    username: AT_USERNAME,
    to,
    message,
  });
  if (AT_SHORTCODE) body.append('from', AT_SHORTCODE);

  const res = await fetch('https://api.africastalking.com/version1/messaging', {
    method: 'POST',
    headers: {
      apiKey: AT_API_KEY,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const json = await res.json();
  const recipients = json?.SMSMessageData?.Recipients ?? [];
  return recipients.some((r: any) => r.status === 'Success' || r.statusCode === 101);
}

Deno.serve(async (req) => {
  try {
    const payload = await req.json();

    // Supabase database webhooks send { type, table, record, old_record, schema }
    const alert = payload?.record;

    if (!alert || payload?.type !== 'INSERT') {
      return new Response(JSON.stringify({ skipped: true }), { status: 200 });
    }

    // Only notify for ACTIVE, non-INFO alerts
    if (alert.status !== 'ACTIVE' || alert.severity === 'INFO') {
      return new Response(JSON.stringify({ skipped: 'not active or not important' }), {
        status: 200,
      });
    }

    // Fetch all DISTRICT_OFFICER and NMS_ADMIN/SUPER_ADMIN users in scope
    // who have a phone number
    const { data: facility } = await supabase
      .from('facilities')
      .select('district_id, name')
      .eq('id', alert.facility_id)
      .single();

    if (!facility) {
      return new Response(JSON.stringify({ error: 'Facility not found' }), { status: 200 });
    }

    const { data: recipients } = await supabase
      .from('users')
      .select('phone, full_name, role')
      .in('role', ['DISTRICT_OFFICER', 'NMS_ADMIN', 'SUPER_ADMIN'])
      .not('phone', 'is', null)
      .or(`district_id.eq.${facility.district_id},role.in.(NMS_ADMIN,SUPER_ADMIN)`);

    if (!recipients?.length) {
      return new Response(JSON.stringify({ message: 'No recipients with phone numbers' }), {
        status: 200,
      });
    }

    const smsText = `[MediTrack] ${alert.severity}: ${alert.message}`;
    const phones = recipients
      .map((r: any) => r.phone)
      .filter(Boolean)
      .join(',');

    const delivered = await sendSms(phones, smsText);

    // Update the alert to mark SMS delivered
    await supabase
      .from('alerts')
      .update({ sms_delivered: delivered, sms_sent_at: new Date().toISOString() })
      .eq('id', alert.id);

    // Log to sms_logs
    await supabase.from('sms_logs').insert({
      recipient: phones,
      message: smsText,
      status: delivered ? 'delivered' : 'failed',
      alert_id: alert.id,
      provider: 'AfricasTalking',
      sent_at: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ ok: true, delivered, recipients: phones }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('send-alert-sms error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
