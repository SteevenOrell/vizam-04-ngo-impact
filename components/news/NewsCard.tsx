import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import type { NewsItem } from '@/content/types';
import { newsTypeLabels } from '@/content/site';
import { formatDate } from '@/lib/format';
import { Tag } from '@/components/ui/primitives';

const tone = { news: 'ink', event: 'accent', story: 'graphite' } as const;

export function NewsCard({ item, headingLevel = 'h3' }: { item: NewsItem; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-4 focus-within:outline-accent-dark">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-band">
        <Image src={item.image.src} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-soft">
          <Tag tone={tone[item.type]}>{newsTypeLabels[item.type]}</Tag>
          <span className="tabular inline-flex items-center gap-1">
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            <time dateTime={item.date}>{formatDate(item.date)}</time>
          </span>
        </div>
        <H className="mt-3 font-display text-[1.4rem] leading-tight">
          <Link href={`/news/${item.slug}`} className="outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-accent">
            {item.title}
          </Link>
        </H>
        <p className="mt-2 text-ink-soft">{item.summary}</p>
        {item.type === 'event' && (
          <dl className="mt-auto grid gap-1 pt-4 text-sm">
            {item.time && (
              <div className="flex items-center gap-2">
                <dt>
                  <Clock aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">Time</span>
                </dt>
                <dd className="tabular">{item.time}</dd>
              </div>
            )}
            {item.location && (
              <div className="flex items-center gap-2">
                <dt>
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">Location</span>
                </dt>
                <dd>{item.location}</dd>
              </div>
            )}
          </dl>
        )}
      </div>
    </article>
  );
}
