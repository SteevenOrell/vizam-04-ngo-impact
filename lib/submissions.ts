import type { z } from 'zod';
import { flattenErrors, type FieldErrors } from './schemas';
import type { RateLimiter } from './rate-limit';

export type SubmissionResult<T = undefined> =
  | { ok: true; message: string; data?: T }
  | { ok: false; message: string; fieldErrors?: FieldErrors };

/**
 * Pure submission pipeline shared by all demo forms: rate limit → honeypot → Zod validation → build a reply.
 * Deliberately does not store, send or log anything; personal data stays inside this function call.
 */
export function processSubmission<S extends z.ZodType<{ website?: string }>, T = undefined>(opts: {
  schema: S;
  input: unknown;
  clientKey: string;
  limiter: RateLimiter;
  onValid: (data: z.infer<S>) => { message: string; data?: T };
  now?: number;
}): SubmissionResult<T> {
  const { schema, input, clientKey, limiter, onValid, now } = opts;

  const limit = limiter.check(clientKey, now);
  if (!limit.allowed) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterMs / 60000));
    return { ok: false, message: `Too many submissions from this connection. Please try again in about ${minutes} minute${minutes === 1 ? '' : 's'}.` };
  }

  // Honeypot filled: pretend success so bots learn nothing, but do no work.
  if (input && typeof input === 'object' && 'website' in input) {
    const hp = (input as { website?: unknown }).website;
    if (typeof hp === 'string' && hp.trim() !== '') {
      return { ok: true, message: 'Thank you. This demo submission was received.' };
    }
  }

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: 'Please correct the highlighted fields.', fieldErrors: flattenErrors(parsed.error) };
  }

  const reply = onValid(parsed.data);
  return { ok: true, message: reply.message, data: reply.data };
}

/** Turns a client IP into an opaque in-memory key (never logged, never stored). */
export async function hashClientKey(form: string, ip: string) {
  const bytes = new TextEncoder().encode(`${form}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest).slice(0, 12), (b) => b.toString(16).padStart(2, '0')).join('');
}

export function clientIpFrom(headers: Pick<Headers, 'get'>) {
  const forwarded = headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  return first || headers.get('x-real-ip') || 'unknown';
}
