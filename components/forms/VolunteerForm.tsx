'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { AVAILABILITY, VOLUNTEER_INTERESTS, volunteerSchema, type VolunteerInput } from '@/lib/schemas';
import { submitVolunteer } from '@/app/actions/forms';
import { REGIONS } from '@/content/types';
import { regionLabels } from '@/content/site';
import { DemoFormNotice, FieldError, FormMessage, Honeypot, SelectField, TextArea, TextField } from './fields';
import { Button } from '@/components/ui/primitives';

const interestLabels: Record<(typeof VOLUNTEER_INTERESTS)[number], string> = {
  'field-days': 'Field days (planting, building, clean-ups)',
  'remote-mapping': 'Remote mapping',
  'code-mentoring': 'Code club mentoring',
  translation: 'Translation',
  events: 'Events and fundraising',
};

const availabilityLabels: Record<(typeof AVAILABILITY)[number], string> = {
  weekdays: 'Weekdays',
  evenings: 'Evenings',
  weekends: 'Weekends',
  flexible: 'Flexible',
};

export function VolunteerForm() {
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const reduce = useReducedMotion();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<VolunteerInput>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { interests: [], website: '', experience: '' },
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const res = await submitVolunteer(values);
      setResult({ ok: res.ok, message: res.message });
      if (!res.ok && res.fieldErrors) {
        for (const [field, message] of Object.entries(res.fieldErrors)) {
          setError(field as keyof VolunteerInput, { type: 'server', message });
        }
      }
      if (res.ok) reset();
      requestAnimationFrame(() => document.getElementById('volunteer-result')?.focus());
    });
  });

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="volunteer-form-title" className="grid gap-6">
      <div>
        <h2 id="volunteer-form-title" className="display-md">
          Register your interest
        </h2>
        <p className="mt-2 text-ink-soft">All fields are required unless marked optional.</p>
      </div>

      <DemoFormNotice>
        <strong>Demo form.</strong> Your answers are checked on the server and then discarded: nothing is sent, stored or
        logged, and no one will contact you.
      </DemoFormNotice>

      <div aria-live="polite" role="status">
        <AnimatePresence>
          {result && (
            <motion.div initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <FormMessage tone={result.ok ? 'success' : 'error'} id="volunteer-result">
                {result.message}
              </FormMessage>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="v-first" label="First name" autoComplete="given-name" error={errors.firstName?.message} {...register('firstName')} />
        <TextField id="v-last" label="Last name" autoComplete="family-name" error={errors.lastName?.message} {...register('lastName')} />
      </div>
      <TextField id="v-email" type="email" label="Email address" autoComplete="email" inputMode="email" error={errors.email?.message} {...register('email')} />

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField id="v-region" label="Where would you like to help?" defaultValue="" error={errors.region?.message} {...register('region')}>
          <option value="" disabled>
            Choose a region
          </option>
          <option value="remote">Remote / online</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {regionLabels[r]}
            </option>
          ))}
        </SelectField>
        <fieldset aria-describedby={errors.availability ? 'v-availability-error' : undefined}>
          <legend className="mb-1.5 font-bold">When are you usually available?</legend>
          <div className="grid grid-cols-2 gap-2">
            {AVAILABILITY.map((a) => (
              <label key={a} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border-2 border-rule bg-white px-3 has-[:checked]:border-ink">
                <input type="radio" value={a} className="h-4 w-4 accent-[var(--color-madder)]" {...register('availability')} />
                {availabilityLabels[a]}
              </label>
            ))}
          </div>
          <FieldError id="v-availability-error" message={errors.availability?.message} />
        </fieldset>
      </div>

      <fieldset aria-describedby={errors.interests ? 'v-interests-error' : undefined}>
        <legend className="mb-1.5 font-bold">How would you like to help?</legend>
        <p className="mb-2 text-sm text-ink-soft">Choose all that apply.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {VOLUNTEER_INTERESTS.map((i) => (
            <label key={i} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border-2 border-rule bg-white px-3 py-2 has-[:checked]:border-ink">
              <input type="checkbox" value={i} className="h-4 w-4 shrink-0 accent-[var(--color-madder)]" {...register('interests')} />
              {interestLabels[i]}
            </label>
          ))}
        </div>
        <FieldError id="v-interests-error" message={errors.interests?.message} />
      </fieldset>

      <TextArea
        id="v-experience"
        label="Anything we should know?"
        hint="Skills, languages, access needs. Please do not include sensitive personal information."
        optional
        maxLength={1000}
        error={errors.experience?.message}
        {...register('experience')}
      />

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-madder)]"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'v-consent-error' : undefined}
            {...register('consent')}
          />
          <span>I understand this is a demo form for a fictional organization and that my answers will not be kept.</span>
        </label>
        <FieldError id="v-consent-error" message={errors.consent?.message} />
      </div>

      <Honeypot {...register('website')} />

      <div>
        <Button type="submit" disabled={pending} aria-disabled={pending}>
          {pending && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
          {pending ? 'Checking…' : 'Send demo registration'}
        </Button>
      </div>
    </form>
  );
}
