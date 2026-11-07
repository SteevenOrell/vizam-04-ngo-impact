import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Info } from 'lucide-react';
import { site } from '@/content/site';

export function Container({ className = '', children, as: Tag = 'div' }: { className?: string; children: ReactNode; as?: 'div' | 'section' | 'header' | 'footer' }) {
  return <Tag className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</Tag>;
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'light';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-white',
  ghost: 'text-ink underline decoration-accent decoration-2 underline-offset-4 hover:decoration-4',
  light: 'bg-white text-ink hover:bg-accent-tint',
};

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] px-6 py-3 font-medium leading-tight transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

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

type Tone = 'accent' | 'ink' | 'graphite' | 'deep' | 'tint' | 'outline' | 'grey';
const tones: Record<Tone, string> = {
  accent: 'bg-accent text-white',
  ink: 'bg-ink text-page',
  graphite: 'bg-graphite text-white',
  deep: 'bg-accent-dark text-white',
  grey: 'bg-white text-ink-soft ring-1 ring-rule',
  tint: 'bg-accent-tint text-ink',
  outline: 'border border-current',
};

/** Dye tag: small rectangular label used for themes, statuses and honesty labels. */
export function Tag({ tone = 'outline', children, className = '' }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-0.5 text-[0.8125rem] font-medium leading-5 ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

/** Small label with a brown square bullet (bullet lightens on dark sections). */
export function Eyebrow({ children, className = '', as: Tag = 'p' }: { children: ReactNode; className?: string; as?: 'p' | 'h2' }) {
  return (
    <Tag className={`eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 bg-accent [.on-dark_&]:bg-accent-tint" />
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  titleMuted,
  lede,
  id,
  className = '',
  as: H = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  /** Second, grey tone of a two-tone title. */
  titleMuted?: ReactNode;
  lede?: ReactNode;
  id?: string;
  className?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <H id={id} className="heading-md">
        {title}
        {titleMuted && (
          <>
            {' '}
            <span className="title-muted">{titleMuted}</span>
          </>
        )}
      </H>
      {lede && <p className="mt-5 text-lg text-ink-soft">{lede}</p>}
    </div>
  );
}

/** The required honesty label for every impact figure. */
export function IllustrativeNote({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  return (
    <p className={`inline-flex items-start gap-2 text-sm font-medium ${dark ? 'text-accent-tint' : 'text-accent'} ${className}`}>
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

/** Text link followed by a square brown arrow chip (the site's signature call to action). */
export function ArrowLink({
  href,
  children,
  className = '',
  onDark = false,
  ...rest
}: ComponentProps<typeof Link> & { onDark?: boolean }) {
  return (
    <Link href={href} className={`arrow-link group inline-flex items-center gap-4 font-medium ${onDark ? 'text-white' : 'text-ink'} ${className}`} {...rest}>
      <span className="underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-current">{children}</span>
      <span aria-hidden="true" className="arrow-chip">
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </Link>
  );
}

/** Standard page section: optional warm-grey band, shared container and vertical rhythm. */
export function Section({
  labelledBy,
  tone = 'plain',
  className = '',
  children,
  id,
}: {
  labelledBy?: string;
  tone?: 'plain' | 'band';
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={tone === 'band' ? 'bg-band' : undefined}>
      <Container className={`py-20 md:py-28 ${className}`}>{children}</Container>
    </section>
  );
}

/** Asymmetric two-column rhythm: heading on the left (5 columns), narrow content on the right (6 columns). */
export function Split({ heading, children, className = '' }: { heading: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`grid gap-10 lg:grid-cols-12 lg:gap-10 ${className}`}>
      <div className="lg:col-span-5">{heading}</div>
      <div className="min-w-0 lg:col-span-6 lg:col-start-7">{children}</div>
    </div>
  );
}
