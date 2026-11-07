import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buildQuery } from '@/lib/filters';

type Props = {
  basePath: string;
  page: number;
  totalPages: number;
  params: Record<string, string | undefined>;
  label: string;
};

export function Pagination({ basePath, page, totalPages, params, label }: Props) {
  if (totalPages <= 1) return null;
  const href = (p: number) => `${basePath}${buildQuery({ ...params, page: p })}`;
  const item = 'inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-md)] border-2 px-3 font-medium tabular';

  return (
    <nav aria-label={label} className="mt-12">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {page > 1 ? (
            <Link href={href(page - 1)} className={`${item} border-ink hover:bg-ink hover:text-page`} rel="prev">
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              Previous<span className="sr-only"> page</span>
            </Link>
          ) : (
            <span className={`${item} cursor-not-allowed border-rule text-ink-soft`} aria-disabled="true">
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              Previous<span className="sr-only"> page</span>
            </span>
          )}
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li key={p}>
            <Link
              href={href(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`${item} ${p === page ? 'border-accent bg-accent text-white' : 'border-rule hover:border-ink'}`}
            >
              <span className="sr-only">Page </span>
              {p}
            </Link>
          </li>
        ))}
        <li>
          {page < totalPages ? (
            <Link href={href(page + 1)} className={`${item} border-ink hover:bg-ink hover:text-page`} rel="next">
              Next<span className="sr-only"> page</span>
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ) : (
            <span className={`${item} cursor-not-allowed border-rule text-ink-soft`} aria-disabled="true">
              Next<span className="sr-only"> page</span>
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
