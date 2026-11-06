import { describe, expect, it } from 'vitest';
import { createRateLimiter } from '@/lib/rate-limit';
import { clientIpFrom, hashClientKey, processSubmission } from '@/lib/submissions';
import { contactSchema } from '@/lib/schemas';
import { demoReference, formatDate, formatMoney, formatMonth } from '@/lib/format';

const valid = { name: 'John Doe', email: 'test@example.com', topic: 'general', message: 'A message long enough to pass.', website: '' };

describe('createRateLimiter', () => {
  it('allows up to the limit inside the window, then blocks, then recovers', () => {
    const rl = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(rl.check('a', 0).allowed).toBe(true);
    expect(rl.check('a', 100).allowed).toBe(true);
    const blocked = rl.check('a', 200);
    expect(blocked).toMatchObject({ allowed: false, remaining: 0 });
    expect(blocked.retryAfterMs).toBe(800);
    expect(rl.check('b', 200).allowed).toBe(true); // keys are independent
    expect(rl.check('a', 1001).allowed).toBe(true);
  });

  it('keeps memory bounded', () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 1000, maxKeys: 10 });
    for (let i = 0; i < 50; i++) rl.check(`k${i}`, 0);
    expect(rl.size()).toBeLessThanOrEqual(10);
  });
});

describe('processSubmission', () => {
  const run = (input: unknown, limiter = createRateLimiter({ limit: 5, windowMs: 60_000 })) =>
    processSubmission({ schema: contactSchema, input, clientKey: 'k', limiter, onValid: () => ({ message: 'ok-demo' }) });

  it('returns the demo reply for valid input', () => {
    expect(run(valid)).toEqual({ ok: true, message: 'ok-demo', data: undefined });
  });

  it('returns field errors for invalid input', () => {
    const r = run({ ...valid, email: 'nope' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fieldErrors?.email).toBeTruthy();
  });

  it('silently accepts but does not process honeypot submissions', () => {
    let called = false;
    const r = processSubmission({
      schema: contactSchema,
      input: { ...valid, website: 'http://spam.example' },
      clientKey: 'k',
      limiter: createRateLimiter({ limit: 5, windowMs: 60_000 }),
      onValid: () => {
        called = true;
        return { message: 'x' };
      },
    });
    expect(r.ok).toBe(true);
    expect(called).toBe(false);
  });

  it('rate limits repeated submissions', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000 });
    expect(run(valid, limiter).ok).toBe(true);
    const r = run(valid, limiter);
    expect(r.ok).toBe(false);
    expect(r.message).toMatch(/too many submissions/i);
  });

  it('handles non-object input safely', () => {
    expect(run(null).ok).toBe(false);
    expect(run('string').ok).toBe(false);
  });
});

describe('client keys', () => {
  it('uses the first forwarded IP and hashes it to an opaque key', async () => {
    const h = new Headers({ 'x-forwarded-for': '203.0.113.7, 10.0.0.1' });
    expect(clientIpFrom(h)).toBe('203.0.113.7');
    expect(clientIpFrom(new Headers())).toBe('unknown');
    const key = await hashClientKey('contact', '203.0.113.7');
    expect(key).toMatch(/^[0-9a-f]{24}$/);
    expect(key).not.toContain('203');
    expect(await hashClientKey('donate', '203.0.113.7')).not.toBe(key);
  });
});

describe('format', () => {
  it('formats money, dates and demo references', () => {
    expect(formatMoney(31250)).toBe('$31,250');
    expect(formatMoney(42.5)).toBe('$42.50');
    expect(formatDate('2026-11-21')).toBe('21 Nov 2026');
    expect(formatMonth('2026-03')).toBe('Mar 2026');
    expect(demoReference(() => 0)).toBe('DEMO-AAAAAA');
    expect(demoReference()).toMatch(/^DEMO-[A-Z2-9]{6}$/);
  });
});
