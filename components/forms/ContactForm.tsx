'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { CONTACT_TOPICS, contactSchema, type ContactInput } from '@/lib/schemas';
import { submitContact } from '@/app/actions/forms';
import { DemoFormNotice, FormMessage, Honeypot, SelectField, TextArea, TextField } from './fields';
import { Button } from '@/components/ui/primitives';

const topicLabels: Record<(typeof CONTACT_TOPICS)[number], string> = {
  general: 'General question',
  partnerships: 'Partnerships',
  media: 'Media and press',
  volunteering: 'Volunteering',
  other: 'Something else',
};

export function ContactForm() {
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const reduce = useReducedMotion();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: { website: '' }, mode: 'onTouched' });

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const res = await submitContact(values);
      setResult({ ok: res.ok, message: res.message });
      if (!res.ok && res.fieldErrors) {
        for (const [field, message] of Object.entries(res.fieldErrors)) setError(field as keyof ContactInput, { type: 'server', message });
      }
      if (res.ok) reset();
      requestAnimationFrame(() => document.getElementById('contact-result')?.focus());
    });
  });

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="contact-form-title" className="grid gap-6">
      <div>
        <h2 id="contact-form-title" className="display-md">
          Send a message
        </h2>
        <p className="mt-2 text-ink-soft">All fields are required.</p>
      </div>
      <DemoFormNotice>
        <strong>Demo form.</strong> Messages are validated on the server and then discarded. Nothing is sent, stored or
        logged.
      </DemoFormNotice>
      <div aria-live="polite" role="status">
        <AnimatePresence>
          {result && (
            <motion.div initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <FormMessage tone={result.ok ? 'success' : 'error'} id="contact-result">
                {result.message}
              </FormMessage>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="c-name" label="Your name" autoComplete="name" error={errors.name?.message} {...register('name')} />
        <TextField id="c-email" type="email" label="Email address" autoComplete="email" inputMode="email" error={errors.email?.message} {...register('email')} />
      </div>
      <SelectField id="c-topic" label="Topic" defaultValue="" error={errors.topic?.message} {...register('topic')}>
        <option value="" disabled>
          Choose a topic
        </option>
        {CONTACT_TOPICS.map((t) => (
          <option key={t} value={t}>
            {topicLabels[t]}
          </option>
        ))}
      </SelectField>
      <TextArea
        id="c-message"
        label="Message"
        hint="At least 20 characters. Please do not include sensitive personal information."
        maxLength={2000}
        error={errors.message?.message}
        {...register('message')}
      />
      <Honeypot {...register('website')} />
      <div>
        <Button type="submit" disabled={pending}>
          {pending && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
          {pending ? 'Checking…' : 'Send demo message'}
        </Button>
      </div>
    </form>
  );
}
