'use server';

import { headers } from 'next/headers';
import { contactSchema, donationSchema, volunteerSchema } from '@/lib/schemas';
import { createRateLimiter } from '@/lib/rate-limit';
import { clientIpFrom, hashClientKey, processSubmission, type SubmissionResult } from '@/lib/submissions';
import { getCampaign } from '@/content/campaigns';
import { demoReference, formatMoney } from '@/lib/format';

// Demo submissions only: no email provider, database or payment provider is connected. Nothing is stored or logged.

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

async function keyFor(form: string) {
  const h = await headers();
  return hashClientKey(form, clientIpFrom(h));
}

export async function submitVolunteer(input: unknown): Promise<SubmissionResult> {
  return processSubmission({
    schema: volunteerSchema,
    input,
    clientKey: await keyFor('volunteer'),
    limiter,
    onValid: (d) => ({
      message: `Thank you, ${d.firstName}. This was a demo submission: nothing was sent or stored, and no one will contact you.`,
    }),
  });
}

export async function submitContact(input: unknown): Promise<SubmissionResult> {
  return processSubmission({
    schema: contactSchema,
    input,
    clientKey: await keyFor('contact'),
    limiter,
    onValid: () => ({
      message: 'Thank you. This was a demo submission: your message was checked but not sent or stored.',
    }),
  });
}

export type DonationReceipt = { reference: string; amount: string; frequency: 'once' | 'monthly'; allocation: string };

export async function submitDonation(input: unknown): Promise<SubmissionResult<DonationReceipt>> {
  return processSubmission({
    schema: donationSchema,
    input,
    clientKey: await keyFor('donate'),
    limiter,
    onValid: (d) => {
      const allocation = d.allocation === 'where-needed' ? 'Where it is needed most' : (getCampaign(d.allocation)?.title ?? 'Where it is needed most');
      return {
        message: 'Demo complete. No money has been taken and no payment details were requested.',
        data: { reference: demoReference(), amount: formatMoney(d.amount), frequency: d.frequency, allocation },
      };
    },
  });
}
