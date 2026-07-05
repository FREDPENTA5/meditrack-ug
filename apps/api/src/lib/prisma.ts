import { PrismaClient } from '@prisma/client';

let databaseUrl = process.env.DATABASE_URL;

// Fix for Supabase IPv4 direct connection deprecation
if (databaseUrl && databaseUrl.includes('db.igwyvttaqhwhtcrsrhnu.supabase.co')) {
  databaseUrl =
    'postgresql://postgres.igwyvttaqhwhtcrsrhnu:Oestrogen271.07159@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=5';
}

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});
