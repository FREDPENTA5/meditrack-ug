import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

// Service-role client — bypasses RLS entirely
const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

Deno.serve(async (req) => {
  // Verify the caller is an authenticated admin (not anonymous)
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return json({ error: 'Unauthorized' }, 401);
  }

  // Verify the caller's JWT and check their role
  const callerToken = authHeader.slice(7);
  const userClient = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
    global: { headers: { Authorization: authHeader } },
  });

  const {
    data: { user: caller },
    error: callerErr,
  } = await userClient.auth.getUser();
  if (callerErr || !caller) return json({ error: 'Unauthorized' }, 401);

  // Check caller is NMS_ADMIN or SUPER_ADMIN
  const { data: callerProfile } = await adminClient
    .from('users')
    .select('role')
    .eq('id', caller.id)
    .single();

  if (!callerProfile || !['NMS_ADMIN', 'SUPER_ADMIN'].includes(callerProfile.role)) {
    return json({ error: 'Forbidden: insufficient role' }, 403);
  }

  const body = await req.json();
  const { email, password, fullName, role, facilityId, districtId } = body;

  if (!email || !password || !fullName || !role) {
    return json({ error: 'Missing required fields: email, password, fullName, role' }, 400);
  }

  // Step 1: Create the Supabase Auth user (admin API — does NOT touch current session)
  const { data: authData, error: createErr } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // auto-confirm so user can log in immediately
    user_metadata: { full_name: fullName, role },
  });

  if (createErr || !authData?.user) {
    return json({ error: createErr?.message ?? 'Failed to create auth user' }, 400);
  }

  const userId = authData.user.id;

  // Step 2: Insert application profile into public.users
  const { data: profile, error: insertErr } = await adminClient
    .from('users')
    .upsert({
      id: userId,
      email,
      full_name: fullName,
      role,
      facility_id: facilityId ?? null,
      district_id: districtId ?? null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select('*, facilities(name), districts(name)')
    .single();

  if (insertErr || !profile) {
    // Roll back auth user to keep things consistent
    await adminClient.auth.admin.deleteUser(userId);
    return json({ error: insertErr?.message ?? 'Failed to create user profile' }, 500);
  }

  const fac = profile.facilities as any;
  const dis = profile.districts as any;

  return json({
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    phone: profile.phone ?? null,
    role: profile.role,
    facilityId: profile.facility_id,
    districtId: profile.district_id,
    facilityName: fac?.name ?? null,
    districtName: dis?.name ?? null,
    isActive: profile.is_active,
    lastLoginAt: null,
    createdAt: profile.created_at,
  });
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
