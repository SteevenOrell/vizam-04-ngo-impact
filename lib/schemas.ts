import { z } from 'zod';
import { REGIONS } from '@/content/types';
import { campaigns } from '@/content/campaigns';

// Shared by the client (React Hook Form) and the server actions: the server never trusts client validation.

const trimmed = (min: number, max: number, label: string) =>
  z
    .string({ error: `Enter your ${label}.` })
    .trim()
    .min(1, { error: `Enter your ${label}.` })
    .min(min, { error: `${capitalise(label)} must be at least ${min} characters.` })
    .max(max, { error: `${capitalise(label)} must be ${max} characters or fewer.` });

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const email = z
  .string({ error: 'Enter your email address.' })
  .trim()
  .min(1, { error: 'Enter your email address.' })
  .max(254, { error: 'Email address is too long.' })
  .pipe(z.email({ error: 'Enter an email address in the format name@example.com.' }));

/** Honeypot: real people never see or fill this field. */
const honeypot = z.string().max(200).optional();

export const VOLUNTEER_INTERESTS = ['field-days', 'remote-mapping', 'code-mentoring', 'translation', 'events'] as const;
export const AVAILABILITY = ['weekdays', 'evenings', 'weekends', 'flexible'] as const;

export const volunteerSchema = z.object({
  firstName: trimmed(1, 60, 'first name'),
  lastName: trimmed(1, 60, 'last name'),
  email,
  region: z.enum([...REGIONS, 'remote'], { error: 'Choose where you would like to volunteer.' }),
  interests: z
    .array(z.enum(VOLUNTEER_INTERESTS), { error: 'Choose at least one way to help.' })
    .min(1, { error: 'Choose at least one way to help.' })
    .max(VOLUNTEER_INTERESTS.length),
  availability: z.enum(AVAILABILITY, { error: 'Choose when you are usually available.' }),
  experience: z.string().trim().max(1000, { error: 'Keep this to 1,000 characters or fewer.' }).optional(),
  consent: z.literal(true, { error: 'Please confirm you understand this is a demo form.' }),
  website: honeypot,
});
export type VolunteerInput = z.infer<typeof volunteerSchema>;

export const CONTACT_TOPICS = ['general', 'partnerships', 'media', 'volunteering', 'other'] as const;

export const contactSchema = z.object({
  name: trimmed(2, 80, 'name'),
  email,
  topic: z.enum(CONTACT_TOPICS, { error: 'Choose a topic.' }),
  message: trimmed(20, 2000, 'message'),
  website: honeypot,
});
export type ContactInput = z.infer<typeof contactSchema>;

export const DONATION_PRESETS = [15, 30, 60, 120] as const;
export const DONATION_MIN = 5;
export const DONATION_MAX = 10000;
export const ALLOCATIONS = ['where-needed', ...campaigns.filter((c) => c.status !== 'completed').map((c) => c.slug)] as const;

export const donationSchema = z.object({
  amount: z
    .number({ error: 'Enter an amount.' })
    .refine(Number.isFinite, { error: 'Enter an amount.' })
    .min(DONATION_MIN, { error: `The minimum demo amount is $${DONATION_MIN}.` })
    .max(DONATION_MAX, { error: `The maximum demo amount is $${DONATION_MAX.toLocaleString('en-US')}.` })
    .refine((n) => Math.round(n * 100) === n * 100, { error: 'Use at most two decimal places.' }),
  frequency: z.enum(['once', 'monthly'], { error: 'Choose how often to give.' }),
  allocation: z.string().refine((v) => (ALLOCATIONS as readonly string[]).includes(v), { error: 'Choose where your gift goes.' }),
  website: honeypot,
});
export type DonationInput = z.infer<typeof donationSchema>;

export type FieldErrors = Record<string, string>;

export function flattenErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
