import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarRange, CheckCircle2, Circle, Info, MapPin, Smartphone, Users } from 'lucide-react';
import { ButtonLink, Container, IllustrativeNote, Tag, WovenProgress } from '@/components/ui/primitives';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { ThreadLine } from '@/components/motion/ThreadLine';
import { campaigns, fundedPercent, getCampaign } from '@/content/campaigns';
import { getProgramme } from '@/content/programs';
import { regionLabels, statusLabels, themeLabels } from '@/content/site';
import { formatDate, formatMoney, formatMonth, formatNumber } from '@/lib/format';
import { pageMetadata } from '@/lib/metadata';
import type { Block } from '@/content/types';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: `${c.summary} (Fictional campaign, illustrative figures.)`, path: `/campaigns/${c.slug}`, image: c.image.src });
}

function StoryBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'heading':
      return <h3 className="mt-10 font-display text-2xl font-bold">{block.text}</h3>;
    case 'list':
      return (
        <ul className="mt-4 grid gap-2">
          {block.items.map((i) => (
            <li key={i} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-2.5 h-0.5 w-4 shrink-0 bg-madder" />
              {i}
            </li>
          ))}
        </ul>
      );
    case 'note':
      return (
        <aside className="mt-8 rounded-[var(--radius-md)] border-l-4 border-indigo bg-white p-5">
          <p className="flex items-center gap-2 font-bold text-indigo">
            <Info aria-hidden="true" className="h-4 w-4" />
            {block.title}
          </p>
          <p className="mt-1">{block.text}</p>
        </aside>
      );
    default:
      return <p className="mt-4 text-lg">{block.text}</p>;
  }
}

const statusTone = { active: 'moss', upcoming: 'indigo', completed: 'ink' } as const;

export default async function CampaignPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) notFound();
  const pct = fundedPercent(c);
  const programme = getProgramme(c.programme);
  const related = campaigns.filter((o) => o.slug !== c.slug && (o.theme === c.theme || o.region === c.region)).slice(0, 3);

  return (
    <>
      <section className="relative overflow-x-clip border-b border-rule">
        <Container className="pt-8">
          <Link href="/campaigns" className="inline-flex min-h-11 items-center gap-2 font-bold hover:text-madder">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All campaigns
          </Link>
        </Container>
        <Container className="grid gap-10 pb-14 pt-6 lg:grid-cols-12 lg:pb-20">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-2">
              <Tag tone={statusTone[c.status]}>{statusLabels[c.status]}</Tag>
              <Tag>{themeLabels[c.theme]}</Tag>
              <Tag tone="turmeric">Fictional campaign</Tag>
            </div>
            <h1 className="display-lg mt-5">{c.title}</h1>
            <p className="mt-5 max-w-2xl text-xl text-ink-soft">{c.summary}</p>
            <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
              <div className="flex items-start gap-2">
                <dt>
                  <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 text-madder" />
                  <span className="sr-only">Region</span>
                </dt>
                <dd className="font-bold">{regionLabels[c.region]}</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt>
                  <CalendarRange aria-hidden="true" className="mt-0.5 h-4 w-4 text-madder" />
                  <span className="sr-only">Dates</span>
                </dt>
                <dd className="tabular font-bold">
                  {formatDate(c.startDate)} – {formatDate(c.endDate)}
                </dd>
              </div>
              <div className="flex items-start gap-2">
                <dt>
                  <Smartphone aria-hidden="true" className="mt-0.5 h-4 w-4 text-madder" />
                  <span className="sr-only">Digital tool</span>
                </dt>
                <dd className="font-bold">{c.digitalTool}</dd>
              </div>
            </dl>
          </div>
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-loom-deep">
              <Image src={c.image.src} alt={c.image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" style={{ objectPosition: c.image.position ?? '50% 50%' }} />
            </div>
          </div>
        </Container>
        <ThreadLine d="M0 70 C 15 30, 30 95, 50 55 S 80 20, 100 50" className="inset-x-0 bottom-0 h-24 w-full" width={3} start="top 60%" end="bottom top" />
      </section>

      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <article className="lg:col-span-7" aria-labelledby="story-title">
          <h2 id="story-title" className="display-md">
            The story so far
          </h2>
          <div className="prose-measure">
            {c.story.map((b, i) => (
              <StoryBlock key={i} block={b} />
            ))}
          </div>

          <h2 className="display-md mt-16" id="milestones-title">
            Milestones
          </h2>
          <ol aria-labelledby="milestones-title" className="mt-6 border-l-2 border-ink">
            {c.milestones.map((m) => (
              <li key={m.label} className="relative flex items-start gap-4 py-3 pl-6">
                <span className="absolute -left-[11px] top-3.5 bg-loom">
                  {m.done ? <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-moss" /> : <Circle aria-hidden="true" className="h-5 w-5 text-ink-soft" />}
                </span>
                <span className="tabular w-24 shrink-0 font-bold">{formatMonth(m.date)}</span>
                <span>
                  {m.label} <span className="sr-only">({m.done ? 'done' : 'planned'})</span>
                </span>
              </li>
            ))}
          </ol>

          <h2 className="mt-16 font-display text-2xl font-bold">Partners</h2>
          <ul className="mt-3 grid gap-1 text-ink-soft">
            {c.partners.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </article>

        <aside className="lg:col-span-5" aria-labelledby="progress-title">
          <div className="on-dark sticky top-24 rounded-[var(--radius-md)] bg-ink p-6 text-loom md:p-8">
            <h2 id="progress-title" className="font-display text-2xl font-bold">
              Funding progress
            </h2>
            <p className="tabular mt-4 font-display text-5xl font-bold text-turmeric">{pct}%</p>
            <div className="mt-4">
              <WovenProgress percent={pct} label={`${c.title}: funding progress`} dark />
            </div>
            <dl className="tabular mt-6 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-ink-muted">Raised</dt>
                <dd className="text-xl font-bold">{formatMoney(c.raised)}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">Goal</dt>
                <dd className="text-xl font-bold">{formatMoney(c.goal)}</dd>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <dt>
                  <Users aria-hidden="true" className="h-4 w-4 text-turmeric" />
                  <span className="sr-only">Supporters</span>
                </dt>
                <dd>{formatNumber(c.supporters)} supporters</dd>
              </div>
            </dl>
            <IllustrativeNote dark className="mt-6" />
            {c.status === 'completed' ? (
              <p className="mt-6 font-bold">This campaign is complete and run by the community.</p>
            ) : (
              <ButtonLink href={`/donate?campaign=${c.slug}`} variant="light" arrow className="mt-6 w-full">
                Give to this campaign (demo)
              </ButtonLink>
            )}
            {programme && (
              <p className="mt-6 text-sm text-ink-muted">
                Part of{' '}
                <Link href={`/programs#${programme.slug}`} className="font-bold text-loom underline underline-offset-4 hover:text-turmeric">
                  {programme.name}
                </Link>
              </p>
            )}
          </div>
        </aside>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-rule bg-loom-deep">
          <Container className="py-16 md:py-20">
            <h2 id="related-title" className="display-md">
              Related campaigns
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="h-full">
                  <CampaignCard campaign={r} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
