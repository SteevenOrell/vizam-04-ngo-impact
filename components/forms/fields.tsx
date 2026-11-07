'use client';

import { forwardRef, useCallback, type ComponentProps, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, FlaskConical } from 'lucide-react';

export const inputClass =
  'block min-h-12 w-full rounded-[var(--radius-md)] border-2 border-ink/70 bg-white px-3 py-2 text-ink placeholder:text-ink-soft aria-[invalid=true]:border-accent';

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-accent">
      <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}

type FieldShellProps = { id: string; label: string; hint?: string; error?: string; optional?: boolean; children: ReactNode };

export function FieldShell({ id, label, hint, error, optional, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-medium">
        {label} {optional && <span className="font-normal text-ink-soft">(optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mb-1.5 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function describedBy(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined;
}

type InputProps = ComponentProps<'input'> & { label: string; hint?: string; error?: string; optional?: boolean; id: string };

export const TextField = forwardRef<HTMLInputElement, InputProps>(function TextField({ label, hint, error, optional, id, className = '', ...rest }, ref) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <input
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${inputClass} ${className}`}
        {...rest}
      />
    </FieldShell>
  );
});

type TextAreaProps = ComponentProps<'textarea'> & { label: string; hint?: string; error?: string; optional?: boolean; id: string };

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({ label, hint, error, optional, id, ...rest }, ref) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional}>
      <textarea
        ref={ref}
        id={id}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${inputClass} min-h-32`}
        {...rest}
      />
    </FieldShell>
  );
});

type SelectProps = ComponentProps<'select'> & { label: string; hint?: string; error?: string; id: string; children: ReactNode };

export const SelectField = forwardRef<HTMLSelectElement, SelectProps>(function SelectField({ label, hint, error, id, children, ...rest }, ref) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <select ref={ref} id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, hint, error)} className={inputClass} {...rest}>
        {children}
      </select>
    </FieldShell>
  );
});

/** Honeypot: hidden from people and assistive tech; bots that fill it are silently ignored. */
export const Honeypot = forwardRef<HTMLInputElement, ComponentProps<'input'>>(function Honeypot(props, ref) {
  return (
    <div className="hp-field" aria-hidden="true">
      <label htmlFor="hp-website">Leave this field empty</label>
      <input ref={ref} id="hp-website" type="text" tabIndex={-1} autoComplete="off" {...props} />
    </div>
  );
});

export function DemoFormNotice({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-md)] border-2 border-dashed border-accent-dark bg-white p-4 text-sm">
      <FlaskConical aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" />
      <div>{children}</div>
    </div>
  );
}

/** Result message. With focusOnMount it takes focus when it appears (remount it with a new key per result). */
export function FormMessage({ tone, children, id, focusOnMount = false }: { tone: 'success' | 'error'; children: ReactNode; id?: string; focusOnMount?: boolean }) {
  const Icon = tone === 'success' ? CheckCircle2 : AlertCircle;
  const ref = useCallback((el: HTMLDivElement | null) => {
    if (el && focusOnMount) el.focus();
  }, [focusOnMount]);
  return (
    <div
      ref={ref}
      id={id}
      tabIndex={-1}
      className={`flex items-start gap-3 rounded-[var(--radius-md)] border-2 p-4 font-medium outline-none ${
        tone === 'success' ? 'border-graphite bg-white text-graphite' : 'border-accent bg-white text-accent'
      }`}
    >
      <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
