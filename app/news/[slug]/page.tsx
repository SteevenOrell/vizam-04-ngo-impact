import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clock, MapPin } from 'lucide-react';
import { ButtonLink, Container, Eyebrow, Tag } from '@/components/ui/primitives';
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
      <Container className="pt-8">
        <Link href="/news" className="inline-flex min-h-11 items-center gap-2 font-medium hover:text-accent">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          All news & events
        </Link>
      </Container>
      <Container className="pt-8 md:pt-12">
        <Eyebrow className="mb-6">{newsTypeLabels[n.type]}</Eyebrow>
        <h1 className="heading-lg max-w-4xl">{n.title}</h1>
        <div className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-band sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={n.image.src}
            alt={n.image.alt}
            fill
            priority
            sizes="(min-width: 1240px) 1160px, 100vw"
            className="object-cover"
            style={{ objectPosition: n.image.position ?? '50% 50%' }}
          />
        </div>
      </Container>

      <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="flex flex-wrap items-center gap-3">
            <Tag tone={n.type === 'event' ? 'accent' : n.type === 'story' ? 'graphite' : 'ink'}>{newsTypeLabels[n.type]}</Tag>
            <Tag tone="tint">Fictional</Tag>
          </div>
          <dl className="mt-6 grid gap-3">
            <div className="flex items-center gap-2">
              <dt>
                <CalendarDays aria-hidden="true" className="h-4 w-4 text-accent" />
                <span className="sr-only">Date</span>
              </dt>
              <dd className="tabular font-medium">
                <time dateTime={n.date}>{formatDate(n.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</time>
              </dd>
            </div>
            {n.time && (
              <div className="flex items-center gap-2">
                <dt>
                  <Clock aria-hidden="true" className="h-4 w-4 text-accent" />
                  <span className="sr-only">Time</span>
                </dt>
                <dd className="tabular font-medium">{n.time}</dd>
              </div>
            )}
            {n.location && (
              <div className="flex items-center gap-2">
                <dt>
                  <MapPin aria-hidden="true" className="h-4 w-4 text-accent" />
                  <span className="sr-only">Location</span>
                </dt>
                <dd className="font-medium">{n.location}</dd>
              </div>
            )}
          </dl>
        </div>
        <div className="min-w-0 lg:col-span-6 lg:col-start-7">
          <p className="max-w-[34rem] text-xl">{n.summary}</p>
          {n.body.map((p) => (
            <p key={p} className="mt-5 max-w-[34rem] text-ink-soft">
              {p}
            </p>
          ))}
          {n.type === 'event' && (
            <ButtonLink href="/volunteer" className="mt-10" arrow>
              Register as a volunteer (demo)
            </ButtonLink>
          )}
        </div>
      </Container>
    </article>
  );
}
