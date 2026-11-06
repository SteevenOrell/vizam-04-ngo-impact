import { describe, expect, it } from 'vitest';
import { contactSchema, donationSchema, flattenErrors, volunteerSchema } from '@/lib/schemas';

const volunteer = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'test@example.com',
  region: 'remote',
  interests: ['remote-mapping'],
  availability: 'evenings',
  experience: '',
  consent: true,
  website: '',
};

describe('volunteerSchema', () => {
  it('accepts a complete registration', () => {
    expect(volunteerSchema.safeParse(volunteer).success).toBe(true);
  });

  it('trims names and rejects blank ones', () => {
    const r = volunteerSchema.safeParse({ ...volunteer, firstName: '   ' });
    expect(r.success).toBe(false);
    if (!r.success) expect(flattenErrors(r.error).firstName).toMatch(/first name/i);
  });

  it('requires at least one interest, a known region and consent', () => {
    const r = volunteerSchema.safeParse({ ...volunteer, interests: [], region: 'atlantis', consent: false });
    expect(r.success).toBe(false);
    if (!r.success) {
      const e = flattenErrors(r.error);
      expect(Object.keys(e)).toEqual(expect.arrayContaining(['interests', 'region', 'consent']));
    }
  });

  it('rejects malformed emails and over-long notes', () => {
    const r = volunteerSchema.safeParse({ ...volunteer, email: 'not-an-email', experience: 'x'.repeat(1001) });
    expect(r.success).toBe(false);
    if (!r.success) expect(Object.keys(flattenErrors(r.error))).toEqual(expect.arrayContaining(['email', 'experience']));
  });
});

describe('contactSchema', () => {
  const base = { name: 'John Doe', email: 'test@example.com', topic: 'general', message: 'Hello, this is a test message.', website: '' };

  it('accepts a valid message', () => {
    expect(contactSchema.safeParse(base).success).toBe(true);
  });

  it('requires a message of at least 20 characters and a known topic', () => {
    const r = contactSchema.safeParse({ ...base, message: 'too short', topic: 'spam' });
    expect(r.success).toBe(false);
    if (!r.success) expect(Object.keys(flattenErrors(r.error)).sort()).toEqual(['message', 'topic']);
  });
});

describe('donationSchema', () => {
  const base = { amount: 30, frequency: 'once', allocation: 'where-needed', website: '' };

  it('accepts presets, custom amounts with cents and active campaigns', () => {
    expect(donationSchema.safeParse(base).success).toBe(true);
    expect(donationSchema.safeParse({ ...base, amount: 42.5, frequency: 'monthly' }).success).toBe(true);
    expect(donationSchema.safeParse({ ...base, allocation: 'twelve-taps-saren-valley' }).success).toBe(true);
  });

  it('rejects out-of-range, NaN and sub-cent amounts', () => {
    for (const amount of [4.99, 10001, Number.NaN, 10.005]) {
      expect(donationSchema.safeParse({ ...base, amount }).success, String(amount)).toBe(false);
    }
  });

  it('rejects completed or unknown campaigns as allocation', () => {
    expect(donationSchema.safeParse({ ...base, allocation: 'highland-seed-library' }).success).toBe(false);
    expect(donationSchema.safeParse({ ...base, allocation: '<script>' }).success).toBe(false);
  });

  it('has no payment-card fields', () => {
    expect(Object.keys(donationSchema.shape).sort()).toEqual(['allocation', 'amount', 'frequency', 'website']);
  });
});
