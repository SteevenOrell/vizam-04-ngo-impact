import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { site } from '@/content/site';

export function Container({ className = '', children, as: Tag = 'div' }: { className?: string; children: ReactNode; as?: 'div' | 'section' | 'header' | 'footer' }) {
  return <Tag className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</Tag>;
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'light';

const variants: Record<Variant, string> = {
  primary: 'bg-madder text-white hover:bg-madder-dark',
  secondary: 'border-2 border-ink text-ink hover:bg-ink hover:text-loom',
  ghost: 'text-ink underline decoration-madder decoration-2 underline-offset-4 hover:decoration-4',
  light: 'bg-loom text-ink hover:bg-turmeric',
};

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] px-5 py-3 font-bold leading-tight transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

export function ButtonLink({
  href,
  variant = 'primary',
  className = '',
  children,
  arrow = false,
  ...rest
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <ArrowRight aria-hidden="true" className="h-4 w-4" />}
    </Link>
  );
}

export function Button({ variant = 'primary', className = '', ...rest }: ComponentProps<'button'> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...rest} />;
}

type Tone = 'madder' | 'ink' | 'moss' | 'indigo' | 'turmeric' | 'outline';
const tones: Record<Tone, string> = {
  madder: 'bg-madder text-white',
  ink: 'bg-ink text-loom',
  moss: 'bg-moss text-white',
  indigo: 'bg-indigo text-white',
  turmeric: 'bg-turmeric text-ink',
  outline: 'border border-current',
};

/** Dye tag: small rectangular label used for themes, statuses and honesty labels. */
export function Tag({ tone = 'outline', children, className = '' }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-0.5 text-[0.8125rem] font-bold leading-5 ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="inline-block h-0.5 w-8 bg-current opacity-70" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  className = '',
  as: H = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  className?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow className="mb-4 text-madder">{eyebrow}</Eyebrow>}
      <H id={id} className="display-md">
        {title}
      </H>
      {lede && <p className="mt-5 text-lg text-ink-soft">{lede}</p>}
    </div>
  );
}

/** The required honesty label for every impact figure. */
export function IllustrativeNote({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  return (
    <p className={`inline-flex items-start gap-2 text-sm font-bold ${dark ? 'text-turmeric' : 'text-madder'} ${className}`}>
      <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{site.illustrativeNotice}</span>
    </p>
  );
}

export function WovenProgress({ percent, label, dark = false }: { percent: number; label: string; dark?: boolean }) {
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div className={dark ? 'on-dark' : ''}>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={p}
        aria-valuetext={`${p}% funded (illustrative)`}
        className="woven-track h-3 w-full overflow-hidden rounded-[2px]"
      >
        <div className="woven-fill h-full rounded-[2px] transition-[width] duration-700" style={{ width: `${p}%` }} />
      </div>
    </div>
  );
}
