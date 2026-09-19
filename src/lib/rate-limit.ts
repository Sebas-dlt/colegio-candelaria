import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Fallback: in-memory rate limiting (for development without Redis)
const inMemoryStore = new Map<string, { count: number; resetAt: number }>();

function getInMemoryRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = inMemoryStore.get(key);
  
  if (!entry || now > entry.resetAt) {
    inMemoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  
  if (entry.count >= limit) {
    return false;
  }
  
  entry.count++;
  return true;
}

export const ratelimits = {
  // Login: 5 intentos por 10 minutos
  login: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "10 m"),
        analytics: true,
      })
    : null,

  // PQRS: 3 envíos por hora
  pqrs: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, "1 h"),
        analytics: true,
      })
    : null,

  // Email: 5 envíos por hora
  email: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 h"),
        analytics: true,
      })
    : null,

  // Search: 10 búsquedas por minuto
  search: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "1 m"),
        analytics: true,
      })
    : null,
};

export async function checkRateLimit(
  type: keyof typeof ratelimits,
  identifier: string
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  const ratelimit = ratelimits[type];
  
  // If Redis is not configured, use in-memory fallback
  if (!ratelimit) {
    const limits = { login: 5, pqrs: 3, email: 5, search: 10 };
    const windows = { login: 600000, pqrs: 3600000, email: 3600000, search: 60000 };
    
    const success = getInMemoryRateLimit(`${type}:${identifier}`, limits[type], windows[type]);
    return { success, limit: limits[type], remaining: success ? limits[type] - 1 : 0 };
  }

  const result = await ratelimit.limit(identifier);
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}