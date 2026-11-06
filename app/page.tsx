import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { ButtonLink, Container, Eyebrow, SectionHeading } from '@/components/ui/primitives';
import { ThreadLine } from '@/components/motion/ThreadLine';
import { Reveal } from '@/components/motion/Reveal';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { StatLedger } from '@/components/sections/StatLedger';
import { CtaBand } from '@/components/sections/CtaBand';
import { programmes } from '@/content/programs';
import { campaigns } from '@/content/campaigns';
import { headlineStats } from '@/content/impact';
import { newsItems, sortedNews } from '@/content/news';
import { themeLabels } from '@/content/site';
import { formatDate } from '@/lib/format';
import { pageMetadata } from '@/lib/metadata';

export const metadata = {
  ...pageMetadata({
    title: 'Weftline Collective — We are the crossing thread',
    description:
      'A fictional community-led nonprofit (VIZAM concept project): water, learning, livelihoods and climate resilience, woven together with open digital tools.',
    path: '/',
  }),
  title: { absolute: 'Weftline Collective — We are the crossing thread' },
};

const steps = [
  { n: '01', title: 'Listen first', text: 'Every programme starts with open meetings. Communities set the priorities, the sites and the rules.' },
  { n: '02', title: 'Fund what is asked for', text: 'Parts, training and paid days of work, not branded buildings. Budgets are published in plain language.' },
  { n: '03', title: 'Build open tools', text: 'Simple, open-source tools for basic phones, so committees can see and share the same information.' },
  { n: '04', title: 'Hand over', text: 'Every project has an exit. Within three years, communities run it without us.' },
];

export default function HomePage() {
  const featured = campaigns.filter((c) => c.status === 'active').slice(0, 3);
  const events = sortedNews(newsItems.filter((n) => n.type === 'event')).slice(0, 2).reverse();
  const latest = sortedNews(newsItems.filter((n) => n.type !== 'event'))[0];

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-x-clip">
        <div aria-hidden="true" className="warp absolute inset-y-0 right-0 hidden w-[42%] text-ink opacity-70 lg:block" />
        <Container className="relative grid gap-10 pt-12 pb-16 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-7 lg:pt-6">
            <Eyebrow className="mb-6 text-madder">Community-led since 2014 · fictional</Eyebrow>
            <h1 id="hero-title" className="display-xl">
              We are the <span className="text-madder">crossing thread</span>.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-ink-soft md:text-xl">
              Communities are the warp: they were here first and they hold everything together. Weftline passes across,
              binding local efforts in water, learning, livelihoods and climate resilience with funding, training and
              open digital tools.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/campaigns" arrow>
                Explore campaigns
              </ButtonLink>
              <ButtonLink href="/mission" variant="secondary">
                How we work
              </ButtonLink>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-loom-deep sm:aspect-[16/10] lg:aspect-[4/5]">
              <Image
                src="/images/hero-weaving-hands.webp"
                alt="Two people's hands working together on a woven piece."
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: '45% 50%' }}
              />
            </div>
            <p className="mt-3 text-sm text-ink-soft">Many hands, one piece of work.</p>
          </div>
        </Container>
        <ThreadLine
          d="M0 62 C 12 40, 22 85, 36 70 S 58 30, 70 52 S 90 88, 100 60"
          className="inset-x-0 bottom-0 h-40 w-full"
          width={4}
          start="top 70%"
          end="bottom top"
        />
      </section>

      {/* How we work */}
      <section aria-labelledby="how-title" className="border-y border-rule bg-loom-deep">
        <Container className="py-20 md:py-28">
          <SectionHeading
            id="how-title"
            eyebrow="How the thread works"
            title="Four rules we never skip."
            lede="Not a model to replicate, but habits we keep in every region, written down so anyone can hold us to them."
          />
          <Reveal as="ol" stagger className="mt-14 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} data-reveal-item className="flex flex-col bg-loom-deep p-6 pt-8">
                <span aria-hidden="true" className="tabular font-display text-5xl font-bold text-madder">
                  {s.n}
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-ink-soft">{s.text}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Programmes ledger */}
      <section aria-labelledby="programmes-title">
        <Container className="py-20 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="programmes-title" eyebrow="Programmes" title="Five threads, one cloth." />
            <ButtonLink href="/programs" variant="ghost" arrow className="self-start md:self-auto">
              All programmes
            </ButtonLink>
          </div>
          <Reveal as="ol" stagger className="mt-12 border-t-2 border-ink">
            {programmes.map((p, i) => (
              <li key={p.slug} data-reveal-item className="group relative border-b border-rule">
                <div className="grid gap-3 py-6 md:grid-cols-12 md:items-baseline md:gap-6">
                  <span aria-hidden="true" className="tabular text-sm font-bold text-ink-soft md:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl font-bold md:col-span-4 md:text-3xl">
                    <Link href={`/programs#${p.slug}`} className="outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-madder">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="text-ink-soft md:col-span-5">{p.lede}</p>
                  <p className="flex items-center gap-2 text-sm font-bold md:col-span-2 md:justify-end">
                    <span className="text-madder">{p.digitalTool.name}</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                  </p>
                </div>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Featured campaigns */}
      <section aria-labelledby="campaigns-title" className="border-t border-rule bg-white/60">
        <Container className="py-20 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="campaigns-title"
              eyebrow="Active campaigns"
              title="Where the thread is moving now."
              lede="Each campaign was asked for by the community that runs it."
            />
            <ButtonLink href="/campaigns" variant="ghost" arrow className="self-start md:self-auto">
              All campaigns
            </ButtonLink>
          </div>
          <Reveal as="ul" stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <li key={c.slug} data-reveal-item className="h-full">
                <CampaignCard campaign={c} />
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Impact */}
      <section aria-labelledby="impact-title" className="on-dark relative overflow-hidden bg-ink text-loom">
        <div aria-hidden="true" className="warp absolute inset-0 opacity-40" />
        <Container className="relative py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-turmeric">Impact, counted late</p>
              <h2 id="impact-title" className="display-lg mt-4">
                We count what is still working.
              </h2>
            </div>
            <p className="text-lg text-ink-muted lg:col-span-6 lg:col-start-7 lg:self-end">
              Trees are counted at 24 months, water points only if they still run, and projects only when communities
              run them alone.
            </p>
          </div>
          <div className="mt-12">
            <StatLedger stats={headlineStats} dark />
          </div>
          <ButtonLink href="/impact" variant="light" arrow className="mt-10">
            Impact & results
          </ButtonLink>
        </Container>
      </section>

      {/* News + events */}
      <section aria-labelledby="news-title">
        <Container className="py-20 md:py-28">
          <SectionHeading id="news-title" eyebrow="News & events" title="From the field, and coming up." />
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            {latest && (
              <article className="group relative lg:col-span-7">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-md)] bg-loom-deep">
                  <Image src={latest.image.src} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                </div>
                <p className="mt-5 text-sm font-bold text-ink-soft">
                  <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                  {latest.theme && <span className="text-madder"> · {themeLabels[latest.theme]}</span>}
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold leading-tight">
                  <Link href={`/news/${latest.slug}`} className="outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-madder group-focus-within:underline">
                    {latest.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-xl text-ink-soft">{latest.summary}</p>
              </article>
            )}
            <div className="lg:col-span-5">
              <h3 className="eyebrow text-madder">Upcoming events</h3>
              <ul className="mt-4 border-t-2 border-ink">
                {events.map((e) => (
                  <li key={e.slug} className="group relative border-b border-rule py-5">
                    <p className="tabular flex items-center gap-2 text-sm font-bold">
                      <CalendarDays aria-hidden="true" className="h-4 w-4 text-madder" />
                      <time dateTime={e.date}>{formatDate(e.date, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</time>
                    </p>
                    <h4 className="mt-2 font-display text-xl font-bold leading-snug">
                      <Link href={`/news/${e.slug}`} className="outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-madder group-focus-within:underline">
                        {e.title}
                      </Link>
                    </h4>
                    {e.location && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
                        <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                        {e.location}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/news?type=event" variant="ghost" arrow className="mt-4 px-0">
                All events
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
