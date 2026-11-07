'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { RotateCcw } from 'lucide-react';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 py-24 sm:px-6 lg:px-10" role="alert">
      <p className="eyebrow text-accent">Something went wrong</p>
      <h1 ref={headingRef} tabIndex={-1} className="heading-lg mt-4 max-w-3xl outline-none">
        A thread snapped while loading this page.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-ink-soft">Please try again. If it keeps happening, go back to the home page.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] bg-accent px-5 py-3 font-medium text-white hover:bg-accent-dark"
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          Try again
        </button>
        <Link href="/" className="inline-flex min-h-12 items-center rounded-[var(--radius-md)] border-2 border-ink px-5 py-3 font-medium">
          Back to home
        </Link>
      </div>
    </div>
  );
}
