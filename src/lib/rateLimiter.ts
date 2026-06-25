interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const MAX_REQUESTS = 3;       // max submissions
const WINDOW_MS = 60 * 60 * 1000; // per hour

// Prune stale entries to prevent unbounded memory growth
function prune() {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
} {
  prune();
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, retryAfterSeconds: 0 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count, retryAfterSeconds: 0 };
}
