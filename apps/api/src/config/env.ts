import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('3001'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  AT_API_KEY: z.string().default(''),
  AT_USERNAME: z.string().default('sandbox'),
  AT_SHORTCODE: z.string(),
  RESEND_API_KEY: z.string().default(''),
  RESEND_FROM: z.string().default('MediTrack Alerts <onboarding@resend.dev>'),
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.string().default('587'),
  SMTP_USER: z.string().default(''),
  SMTP_PASS: z.string().default(''),
  FRONTEND_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function loadEnv(): Env {
  cachedEnv = envSchema.parse(process.env);
  return cachedEnv;
}

export const env: Env = new Proxy({} as Env, {
  get(_target, prop: string) {
    if (!cachedEnv) {
      cachedEnv = envSchema.parse(process.env);
    }
    return cachedEnv[prop as keyof Env];
  },
});
