type Props = { className?: string; title?: string };

/** Weftline mark: three warp threads crossed by one weft thread that passes over and under. */
export function LogoMark({ className, title }: Props) {
  return (
    <svg viewBox="0 0 40 40" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M10 5v30" />
        <path d="M20 5v30" />
        <path d="M30 5v30" />
      </g>
      <path
        d="M3 24c4 0 5-8 7-8s3 8 10 8 8-8 10-8 3 8 7 8"
        fill="none"
        stroke="var(--color-madder)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className="font-display text-[1.3rem] font-bold leading-none tracking-tight">
        Weftline<span className="sr-only"> Collective</span>
        <span aria-hidden="true" className="ml-1 hidden font-semibold opacity-70 sm:inline">
          Collective
        </span>
      </span>
    </span>
  );
}
