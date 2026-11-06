// Basic in-memory sliding-window rate limiter. Keys are hashed client identifiers held only in memory; nothing is
// logged. On serverless platforms each instance has its own memory, so this is a speed bump, not a guarantee:
// production would use a shared store (e.g. Redis / Vercel KV).

export type RateLimitResult = { allowed: boolean; remaining: number; retryAfterMs: number };

export function createRateLimiter({ limit, windowMs, maxKeys = 5000 }: { limit: number; windowMs: number; maxKeys?: number }) {
  const hits = new Map<string, number[]>();

  function check(key: string, now: number = Date.now()): RateLimitResult {
    const windowStart = now - windowMs;
    const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);

    if (recent.length >= limit) {
      hits.set(key, recent);
      const oldest = recent[0] ?? now;
      return { allowed: false, remaining: 0, retryAfterMs: Math.max(0, oldest + windowMs - now) };
    }

    recent.push(now);
    hits.set(key, recent);

    // Keep memory bounded: drop the oldest keys when the map grows too large.
    if (hits.size > maxKeys) {
      const overflow = hits.size - maxKeys;
      let i = 0;
      for (const k of hits.keys()) {
        if (i++ >= overflow) break;
        hits.delete(k);
      }
    }

    return { allowed: true, remaining: limit - recent.length, retryAfterMs: 0 };
  }

  return { check, reset: () => hits.clear(), size: () => hits.size };
}

export type RateLimiter = ReturnType<typeof createRateLimiter>;
