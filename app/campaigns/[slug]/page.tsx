import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarRange, CheckCircle2, Circle, Info, MapPin, Smartphone, Users } from 'lucide-react';
import { ButtonLink, Container, Eyebrow, IllustrativeNote, Section, SectionHeading, Tag, WovenProgress } from '@/components/ui/primitives';
import { PageHero } from '@/components/sections/PageHero';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
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
      return <h3 className="mt-12 font-display text-2xl font-medium">{block.text}</h3>;
    case 'list':
      return (
        <ul className="mt-4 grid gap-2">
          {block.items.map((i) => (
            <li key={i} className="flex items-start gap-3 text-ink-soft">
              <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 bg-accent" />
              {i}
            </li>
          ))}
        </ul>
      );
    case 'note':
      return (
        <aside className="mt-8 rounded-[var(--radius-card)] bg-band p-6">
          <p className="flex items-center gap-2 font-medium text-accent">
            <Info aria-hidden="true" className="h-4 w-4" />
            {block.title}
          </p>
          <p className="mt-1">{block.text}</p>
        </aside>
      );
    default:
      return <p className="mt-4 text-ink-soft">{block.text}</p>;
  }
}

const statusTone = { active: 'graphite', upcoming: 'deep', completed: 'ink' } as const;

export default async function CampaignPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) notFound();
  const pct = fundedPercent(c);
  const programme = getProgramme(c.programme);
  const related = campaigns.filter((o) => o.slug !== c.slug && (o.theme === c.theme || o.region === c.region)).slice(0, 3);

  return (
    <>
      <Container className="pt-8">
        <Link href="/campaigns" className="inline-flex min-h-11 items-center gap-2 font-medium hover:text-accent">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          All campaigns
        </Link>
      </Container>

      <PageHero eyebrow={`${themeLabels[c.theme]} · ${regionLabels[c.region]}`} title={c.title} lede={<p>{c.summary}</p>} image={c.image}>
        <div className="flex flex-wrap gap-2">
          <Tag tone={statusTone[c.status]}>{statusLabels[c.status]}</Tag>
          <Tag>{themeLabels[c.theme]}</Tag>
          <Tag tone="tint">Fictional campaign</Tag>
        </div>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
          <div className="flex items-start gap-2">
            <dt>
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 text-accent" />
              <span className="sr-only">Region</span>
            </dt>
            <dd className="font-medium">{regionLabels[c.region]}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt>
              <CalendarRange aria-hidden="true" className="mt-0.5 h-4 w-4 text-accent" />
              <span className="sr-only">Dates</span>
            </dt>
            <dd className="tabular font-medium">
              {formatDate(c.startDate)} – {formatDate(c.endDate)}
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt>
              <Smartphone aria-hidden="true" className="mt-0.5 h-4 w-4 text-accent" />
              <span className="sr-only">Digital tool</span>
            </dt>
            <dd className="font-medium">{c.digitalTool}</dd>
          </div>
        </dl>
      </PageHero>

      <Container className="grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
        <article className="min-w-0 lg:col-span-6" aria-labelledby="story-title">
          <Eyebrow className="mb-5">The campaign</Eyebrow>
          <h2 id="story-title" className="heading-md">
            The story <span className="title-muted">so far</span>
          </h2>
          <div className="max-w-[34rem]">
            {c.story.map((b, i) => (
              <StoryBlock key={i} block={b} />
            ))}
          </div>

          <h2 className="heading-md mt-20" id="milestones-title">
            Milestones
          </h2>
          <ol aria-labelledby="milestones-title" className="mt-6 max-w-[34rem] border-t border-rule">
            {c.milestones.map((m) => (
              <li key={m.label} className="flex items-start gap-4 border-b border-rule py-4">
                <span className="mt-0.5 shrink-0">
                  {m.done ? <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-accent" /> : <Circle aria-hidden="true" className="h-5 w-5 text-ink-soft" />}
                </span>
                <span className="tabular w-24 shrink-0 font-medium">{formatMonth(m.date)}</span>
                <span className="text-ink-soft">
                  {m.label} <span className="sr-only">({m.done ? 'done' : 'planned'})</span>
                </span>
              </li>
            ))}
          </ol>

          <h2 className="mt-16 font-display text-2xl">Partners</h2>
          <ul className="mt-3 grid gap-1 text-ink-soft">
            {c.partners.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </article>

        <aside className="lg:col-span-5 lg:col-start-8" aria-labelledby="progress-title">
          <div className="rounded-[var(--radius-card)] bg-band p-6 md:p-8 lg:sticky lg:top-28">
            <h2 id="progress-title" className="font-display text-2xl">
              Funding progress
            </h2>
            <p className="tabular mt-4 font-display text-6xl font-light text-accent">{pct}%</p>
            <div className="mt-4">
              <WovenProgress percent={pct} label={`${c.title}: funding progress`} />
            </div>
            <dl className="tabular mt-6 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-ink-soft">Raised</dt>
                <dd className="text-xl font-medium">{formatMoney(c.raised)}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Goal</dt>
                <dd className="text-xl font-medium">{formatMoney(c.goal)}</dd>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <dt>
                  <Users aria-hidden="true" className="h-4 w-4 text-accent" />
                  <span className="sr-only">Supporters</span>
                </dt>
                <dd>{formatNumber(c.supporters)} supporters</dd>
              </div>
            </dl>
            <IllustrativeNote className="mt-6" />
            {c.status === 'completed' ? (
              <p className="mt-6 font-medium">This campaign is complete and run by the community.</p>
            ) : (
              <ButtonLink href={`/donate?campaign=${c.slug}`} arrow className="mt-6 w-full">
                Give to this campaign (demo)
              </ButtonLink>
            )}
            {programme && (
              <p className="mt-6 text-sm text-ink-soft">
                Part of{' '}
                <Link href={`/programs#${programme.slug}`} className="font-medium text-ink underline underline-offset-4 hover:text-accent">
                  {programme.name}
                </Link>
              </p>
            )}
          </div>
        </aside>
      </Container>

      {related.length > 0 && (
        <Section tone="band" labelledBy="related-title">
          <SectionHeading id="related-title" eyebrow="Keep reading" title="Related" titleMuted="campaigns." />
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug} className="h-full">
                <CampaignCard campaign={r} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
