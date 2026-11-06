import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clock, MapPin } from 'lucide-react';
import { ButtonLink, Container, Tag } from '@/components/ui/primitives';
import { getNewsItem, newsItems } from '@/content/news';
import { newsTypeLabels } from '@/content/site';
import { formatDate } from '@/lib/format';
import { pageMetadata } from '@/lib/metadata';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return newsItems.map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const n = getNewsItem(slug);
  if (!n) return {};
  return pageMetadata({ title: n.title, description: n.summary, path: `/news/${n.slug}`, image: n.image.src });
}

export default async function NewsItemPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const n = getNewsItem(slug);
  if (!n) notFound();

  return (
    <article>
      <Container className="max-w-[880px] py-10 md:py-16">
        <Link href="/news" className="inline-flex min-h-11 items-center gap-2 font-bold hover:text-madder">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          All news & events
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Tag tone={n.type === 'event' ? 'madder' : n.type === 'story' ? 'moss' : 'ink'}>{newsTypeLabels[n.type]}</Tag>
          <Tag tone="turmeric">Fictional</Tag>
        </div>
        <h1 className="display-lg mt-5">{n.title}</h1>
        <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-bold">
          <div className="flex items-center gap-2">
            <dt>
              <CalendarDays aria-hidden="true" className="h-4 w-4 text-madder" />
              <span className="sr-only">Date</span>
            </dt>
            <dd className="tabular">
              <time dateTime={n.date}>{formatDate(n.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</time>
            </dd>
          </div>
          {n.time && (
            <div className="flex items-center gap-2">
              <dt>
                <Clock aria-hidden="true" className="h-4 w-4 text-madder" />
                <span className="sr-only">Time</span>
              </dt>
              <dd className="tabular">{n.time}</dd>
            </div>
          )}
          {n.location && (
            <div className="flex items-center gap-2">
              <dt>
                <MapPin aria-hidden="true" className="h-4 w-4 text-madder" />
                <span className="sr-only">Location</span>
              </dt>
              <dd>{n.location}</dd>
            </div>
          )}
        </dl>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-md)] bg-loom-deep">
          <Image src={n.image.src} alt={n.image.alt} fill priority sizes="(min-width: 900px) 880px, 100vw" className="object-cover" />
        </div>
        <p className="mt-10 text-xl font-bold">{n.summary}</p>
        {n.body.map((p) => (
          <p key={p} className="mt-5 text-lg">
            {p}
          </p>
        ))}
        {n.type === 'event' && (
          <ButtonLink href="/volunteer" className="mt-10" arrow>
            Register as a volunteer (demo)
          </ButtonLink>
        )}
      </Container>
    </article>
  );
}
