'use client';

import { useRef, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BadgeCheck, FlaskConical, Loader2, RotateCcw } from 'lucide-react';
import { ALLOCATIONS, DONATION_MAX, DONATION_MIN, DONATION_PRESETS, donationSchema, type DonationInput } from '@/lib/schemas';
import { submitDonation, type DonationReceipt } from '@/app/actions/forms';
import { getCampaign } from '@/content/campaigns';
import { formatMoney } from '@/lib/format';
import { FieldError, FormMessage, Honeypot, inputClass } from './fields';
import { Button } from '@/components/ui/primitives';

const presetMeaning: Record<number, string> = {
  15: 'could buy a spare-parts kit for one hand pump',
  30: 'could stock a reading room with five local-language books',
  60: 'could pay for two community planting days',
  120: 'could train one water mechanic for a month',
};

function allocationLabel(slug: string) {
  return slug === 'where-needed' ? 'Where it is needed most' : (getCampaign(slug)?.title ?? slug);
}

export function DonateForm({ initialAllocation }: { initialAllocation?: string }) {
  const reduce = useReducedMotion();
  const [pending, startTransition] = useTransition();
  const [receipt, setReceipt] = useState<DonationReceipt | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [choice, setChoice] = useState<string>('30');
  const [custom, setCustom] = useState('');
  const focusTitle = useRef(false);

  const allocationDefault = initialAllocation && (ALLOCATIONS as readonly string[]).includes(initialAllocation) ? initialAllocation : 'where-needed';

  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<DonationInput>({
    resolver: zodResolver(donationSchema),
    defaultValues: { amount: 30, frequency: 'once', allocation: allocationDefault, website: '' },
  });

  const [amount, frequency, allocation] = useWatch({ control, name: ['amount', 'frequency', 'allocation'] });

  function choosePreset(v: string) {
    setChoice(v);
    if (v !== 'other') setValue('amount', Number(v), { shouldValidate: true });
    else setValue('amount', custom === '' ? Number.NaN : Number(custom), { shouldValidate: false });
  }

  const onSubmit = handleSubmit((values) => {
    setServerError(null);
    startTransition(async () => {
      const res = await submitDonation(values);
      if (res.ok && res.data) {
        setReceipt(res.data);
      } else if (res.ok) {
        setServerError(res.message);
      } else {
        setServerError(res.message);
        if (res.fieldErrors) for (const [f, m] of Object.entries(res.fieldErrors)) setError(f as keyof DonationInput, { type: 'server', message: m });
      }
    });
  });

  function startAgain() {
    setReceipt(null);
    setChoice('30');
    setCustom('');
    reset({ amount: 30, frequency: 'once', allocation: allocationDefault, website: '' });
    focusTitle.current = true;
  }

  const validAmount = Number.isFinite(amount) && amount >= DONATION_MIN && amount <= DONATION_MAX;

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border-2 border-ink bg-white">
      <div className="flex items-start gap-3 bg-indigo px-5 py-4 text-white" id="demo-banner">
        <FlaskConical aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0" />
        <p>
          <strong className="block text-lg">Demo — no money is taken.</strong>
          This interface shows how giving could work. There is no payment provider, and you will never be asked for card or
          bank details.
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {receipt ? (
          <motion.div
            key="receipt"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            className="p-5 sm:p-8"
          >
            <div id="donation-receipt" ref={(el) => el?.focus()} tabIndex={-1} role="status" className="outline-none">
              <p className="flex items-center gap-2 font-bold text-moss">
                <BadgeCheck aria-hidden="true" className="h-6 w-6" />
                Demo donation complete
              </p>
              <h2 className="display-md mt-3">Thank you for trying the demo.</h2>
              <p className="mt-3 text-lg font-bold">No money has been taken and no payment details were requested.</p>
            </div>
            <dl className="tabular mt-6 grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-rule bg-rule sm:grid-cols-2">
              {[
                ['Demo reference', receipt.reference],
                ['Amount (not charged)', receipt.amount],
                ['Frequency', receipt.frequency === 'monthly' ? 'Monthly' : 'One-time'],
                ['Allocated to', receipt.allocation],
              ].map(([k, v]) => (
                <div key={k} className="bg-loom p-4">
                  <dt className="text-sm text-ink-soft">{k}</dt>
                  <dd className="mt-1 font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            <Button type="button" variant="secondary" className="mt-6" onClick={startAgain}>
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Start again
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            aria-labelledby="donate-form-title"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            className="grid gap-8 p-5 sm:p-8"
          >
            <h2
              id="donate-form-title"
              ref={(el) => {
                if (el && focusTitle.current) {
                  focusTitle.current = false;
                  el.focus();
                }
              }}
              tabIndex={-1}
              className="display-md outline-none"
            >
              Choose a demo gift
            </h2>

            {serverError && (
              <FormMessage key={serverError} tone="error" id="donation-error" focusOnMount>
                {serverError}
              </FormMessage>
            )}

            <fieldset>
              <legend className="mb-3 font-bold">1. How often?</legend>
              <div className="grid grid-cols-2 gap-2 sm:max-w-sm">
                {(['once', 'monthly'] as const).map((f) => (
                  <label
                    key={f}
                    className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-md)] border-2 border-rule px-3 font-bold has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-loom has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo"
                  >
                    <input type="radio" value={f} className="sr-only" {...register('frequency')} />
                    {f === 'once' ? 'One-time' : 'Monthly'}
                  </label>
                ))}
              </div>
              <FieldError id="frequency-error" message={errors.frequency?.message} />
            </fieldset>

            <fieldset aria-describedby={errors.amount ? 'amount-error' : undefined}>
              <legend className="mb-3 font-bold">2. How much? (US dollars, demo only)</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {DONATION_PRESETS.map((p) => (
                  <label
                    key={p}
                    className="flex min-h-20 cursor-pointer flex-col justify-center rounded-[var(--radius-md)] border-2 border-rule p-3 has-[:checked]:border-madder has-[:checked]:bg-madder/5 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo"
                  >
                    <input
                      type="radio"
                      name="amount-choice"
                      value={String(p)}
                      checked={choice === String(p)}
                      onChange={() => choosePreset(String(p))}
                      className="sr-only"
                    />
                    <span className="tabular font-display text-2xl font-bold">{formatMoney(p)}</span>
                    <span className="text-sm text-ink-soft">{presetMeaning[p]} (illustrative)</span>
                  </label>
                ))}
                <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border-2 border-rule p-3 has-[:checked]:border-madder has-[:checked]:bg-madder/5 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo sm:col-span-2">
                  <input
                    type="radio"
                    name="amount-choice"
                    value="other"
                    checked={choice === 'other'}
                    onChange={() => choosePreset('other')}
                    className="h-4 w-4 accent-[var(--color-madder)]"
                  />
                  <span className="font-bold">Other amount</span>
                </label>
              </div>
              {choice === 'other' && (
                <div className="mt-3 max-w-xs">
                  <label htmlFor="custom-amount" className="mb-1.5 block font-bold">
                    Amount in US dollars
                  </label>
                  <div className="relative">
                    <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-bold text-ink-soft">
                      $
                    </span>
                    <input
                      id="custom-amount"
                      type="number"
                      inputMode="decimal"
                      min={DONATION_MIN}
                      max={DONATION_MAX}
                      step="0.01"
                      value={custom}
                      aria-invalid={errors.amount ? true : undefined}
                      aria-describedby={`custom-amount-hint${errors.amount ? ' amount-error' : ''}`}
                      onChange={(e) => {
                        setCustom(e.target.value);
                        setValue('amount', e.target.value === '' ? Number.NaN : Number(e.target.value), { shouldValidate: true });
                      }}
                      className={`${inputClass} pl-7`}
                    />
                  </div>
                  <p id="custom-amount-hint" className="mt-1.5 text-sm text-ink-soft">
                    Between {formatMoney(DONATION_MIN)} and {formatMoney(DONATION_MAX)}.
                  </p>
                </div>
              )}
              <FieldError id="amount-error" message={errors.amount?.message} />
            </fieldset>

            <div>
              <label htmlFor="allocation" className="mb-1.5 block font-bold">
                3. Where should it go?
              </label>
              <select id="allocation" className={inputClass} aria-invalid={errors.allocation ? true : undefined} {...register('allocation')}>
                {ALLOCATIONS.map((a) => (
                  <option key={a} value={a}>
                    {allocationLabel(a)}
                  </option>
                ))}
              </select>
              <FieldError id="allocation-error" message={errors.allocation?.message} />
            </div>

            <Honeypot {...register('website')} />

            <div className="rounded-[var(--radius-md)] bg-loom p-4" aria-live="polite">
              <p className="text-sm font-bold text-ink-soft">Demo summary</p>
              <p className="mt-1 text-lg">
                {validAmount ? <strong className="tabular">{formatMoney(amount)}</strong> : <strong>—</strong>}{' '}
                {frequency === 'monthly' ? 'every month' : 'once'}, to <strong>{allocationLabel(allocation)}</strong>.
              </p>
              <p className="mt-1 text-sm text-ink-soft">Nothing will be charged.</p>
            </div>

            <div>
              <Button type="submit" disabled={pending}>
                {pending && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
                {pending ? 'Processing demo…' : 'Complete demo donation'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
