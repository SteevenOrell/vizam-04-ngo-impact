import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, MapPin } from 'lucide-react';
import { ArrowLink, Eyebrow, SectionHeading, WovenProgress } from '@/components/ui/primitives';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { ImagePair } from '@/components/ui/ImagePair';
import { PhotoBand } from '@/components/ui/PhotoBand';
import { ThreadLine } from '@/components/motion/ThreadLine';
import { Reveal } from '@/components/motion/Reveal';
import { StatLedger } from '@/components/sections/StatLedger';
import { CtaBand } from '@/components/sections/CtaBand';
import { programmes } from '@/content/programs';
import { fundedPercent, getCampaign } from '@/content/campaigns';
import { headlineStats } from '@/content/impact';
import { newsItems, sortedNews } from '@/content/news';
import { regionLabels, themeLabels } from '@/content/site';
import { formatDate, formatMoney } from '@/lib/format';
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

const commitments = [
  { n: '01', title: 'Listen first', text: 'Every programme starts with open meetings. Communities set the priorities, the sites and the rules.' },
  { n: '02', title: 'Fund what is asked for', text: 'Parts, training and paid days of work, not branded buildings. Budgets are published in plain language.' },
  { n: '03', title: 'Build open tools', text: 'Simple, open-source tools for basic phones, so committees can see and share the same information.' },
  { n: '04', title: 'Hand over', text: 'Every project has an exit. Within three years, communities run it without us.' },
];

export default function HomePage() {
  const featured = getCampaign('ombra-reading-rooms')!;
  const pct = fundedPercent(featured);
  const events = sortedNews(newsItems.filter((n) => n.type === 'event')).slice(0, 2).reverse();
  const latest = sortedNews(newsItems.filter((n) => n.type !== 'event'))[0];

  return (
    <>
      {/* Hero: full-viewport photograph, headline low in the frame */}
      <section aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[100svh] items-end overflow-hidden text-white">
        <Image
          src="/images/community-circle.webp"
          alt="People seated in a wide circle on a lawn during an outdoor community meeting."
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
          style={{ objectPosition: '50% 60%' }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/15 via-45% to-black/5" />
        <div className="mx-auto w-full max-w-[1240px] px-4 pb-14 pt-32 sm:px-6 md:pb-20 lg:px-10">
          <Eyebrow className="mb-8">Welcome · a fictional community-led nonprofit</Eyebrow>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h1 id="hero-title" className="display-xl lg:col-span-8">
              We are the crossing thread.
            </h1>
            <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:items-end lg:text-right">
              <p className="max-w-sm text-white/90">
                Water, learning, livelihoods and climate resilience: local efforts bound together with funding, training and open digital tools.
              </p>
              <ArrowLink href="/campaigns" onDark>
                Explore our campaigns
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section aria-labelledby="about-title" className="relative overflow-x-clip">
        <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-12 lg:gap-10 lg:px-10">
          <div className="lg:col-span-5">
            <SectionHeading id="about-title" eyebrow="About Weftline" title="Communities are the warp." titleMuted="We are the crossing thread." />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-[30rem] text-ink-soft">
              Communities were here first and they hold everything together. Weftline passes across, binding local efforts in water,
              learning, livelihoods and climate resilience with funding, training and open digital tools, then steps back.
            </p>
            <ArrowLink href="/about" className="mt-8">
              About us
            </ArrowLink>
            <ImagePair
              className="mt-14"
              images={[
                {
                  src: '/images/community-build.webp',
                  alt: 'Four people fitting a blue shade frame on a timber pergola.',
                  position: '50% 40%',
                  caption: 'Neighbours raising a shade frame for a reading room.',
                },
                {
                  src: '/images/seedling-trays.webp',
                  alt: 'Hands potting young seedlings into small black pots of soil.',
                  position: '50% 50%',
                  caption: 'Seedlings potted for a coastal nursery.',
                },
              ]}
            />
          </div>
        </div>
        <ThreadLine d="M0 62 C 12 40, 22 85, 36 70 S 58 30, 70 52 S 90 88, 100 60" color="var(--color-madder)" className="inset-x-0 bottom-0 h-32 w-full opacity-20" width={2} start="top 80%" end="bottom top" />
      </section>

      {/* Featured campaign */}
      <section aria-labelledby="featured-title" className="pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="featured-title" eyebrow="Featured campaign" title="Where the thread is moving" titleMuted="right now." />
            <ArrowLink href="/campaigns" className="self-start md:self-auto">
              All campaigns
            </ArrowLink>
          </div>
          <FeatureCard
            image={featured.image}
            eyebrow={`${themeLabels[featured.theme]} · ${regionLabels[featured.region]}`}
            title={featured.title}
            action={
              <ArrowLink href={`/campaigns/${featured.slug}`} onDark>
                Read the campaign
              </ArrowLink>
            }
          >
            <p>{featured.summary}</p>
            <div className="mt-5 max-w-sm">
              <WovenProgress percent={pct} label={`${featured.title}: funding progress`} dark />
              <p className="tabular mt-2 text-sm">
                {formatMoney(featured.raised)} of {formatMoney(featured.goal)} · {pct}% · illustrative
              </p>
            </div>
          </FeatureCard>
        </div>
      </section>

      {/* Full-bleed statement */}
      <PhotoBand
        image={{ src: '/images/highland-terraces.webp', alt: 'Aerial view of green and gold terraced fields among clouds in the highlands.', position: '50% 55%' }}
        eyebrow="Our approach"
        action={
          <ArrowLink href="/mission" onDark>
            How we work
          </ArrowLink>
        }
      >
        Communities hold the structure. We carry the thread across it, and then we let go.
      </PhotoBand>

      {/* Commitments */}
      <section aria-labelledby="commitments-title" className="bg-loom-deep">
        <div className="mx-auto w-full max-w-[1240px] px-4 py-24 sm:px-6 md:py-32 lg:px-10">
          <SectionHeading
            id="commitments-title"
            eyebrow="Our commitments"
            title="Four rules"
            titleMuted="we never skip."
            lede="Not a model to replicate, but habits we keep in every region, written down so anyone can hold us to them."
          />
          <Reveal as="ol" stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((s) => (
              <li key={s.n} data-reveal-item className="flex flex-col rounded-[var(--radius-card)] bg-white p-7">
                <span aria-hidden="true" className="tabular font-display text-4xl font-light text-madder">
                  {s.n}
                </span>
                <h3 className="mt-10 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-ink-soft">{s.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Programmes */}
      <section aria-labelledby="programmes-title">
        <div className="mx-auto w-full max-w-[1240px] px-4 py-24 sm:px-6 md:py-32 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="programmes-title" eyebrow="What we do" title="Five threads," titleMuted="one cloth." />
            <ArrowLink href="/programs" className="self-start md:self-auto">
              All programmes
            </ArrowLink>
          </div>
          <Reveal as="ol" stagger className="mt-14 border-t border-rule">
            {programmes.map((p, i) => (
              <li key={p.slug} data-reveal-item className="group relative border-b border-rule">
                <div className="grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-6">
                  <span aria-hidden="true" className="tabular text-sm text-ink-soft md:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl md:col-span-4 md:text-3xl">
                    <Link href={`/programs#${p.slug}`} className="outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-madder">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="text-ink-soft md:col-span-5">{p.lede}</p>
                  <p className="text-sm font-medium text-madder md:col-span-2 md:text-right">{p.digitalTool.name}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Impact */}
      <section aria-labelledby="impact-title" className="border-t border-rule">
        <div className="mx-auto w-full max-w-[1240px] px-4 py-24 sm:px-6 md:py-32 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading id="impact-title" eyebrow="Impact, counted late" title="We count" titleMuted="what is still working." />
            </div>
            <p className="max-w-[30rem] text-ink-soft lg:col-span-5 lg:col-start-8 lg:self-end">
              Trees are counted at 24 months, water points only if they still run, and projects only when communities run them alone.
            </p>
          </div>
          <div className="mt-14">
            <StatLedger stats={headlineStats} />
          </div>
          <ArrowLink href="/impact" className="mt-10">
            Impact & results
          </ArrowLink>
        </div>
      </section>

      {/* News + events */}
      <section aria-labelledby="news-title" className="border-t border-rule">
        <div className="mx-auto w-full max-w-[1240px] px-4 py-24 sm:px-6 md:py-32 lg:px-10">
          <SectionHeading id="news-title" eyebrow="News & events" title="From the field," titleMuted="and coming up." />
          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            {latest && (
              <article className="group relative lg:col-span-7">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-loom-deep">
                  <Image src={latest.image.src} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                </div>
                <p className="mt-6 text-sm text-ink-soft">
                  <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                  {latest.theme && <span className="text-madder"> · {themeLabels[latest.theme]}</span>}
                </p>
                <h3 className="mt-2 font-display text-3xl leading-tight">
                  <Link href={`/news/${latest.slug}`} className="outline-none after:absolute after:inset-0 after:content-[''] group-hover:text-madder group-focus-within:underline">
                    {latest.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-xl text-ink-soft">{latest.summary}</p>
              </article>
            )}
            <div className="lg:col-span-5">
              <h3 className="eyebrow flex items-center gap-3">
                <span aria-hidden="true" className="inline-block h-2 w-2 bg-madder" />
                Upcoming events
              </h3>
              <ul className="mt-5 border-t border-rule">
                {events.map((e) => (
                  <li key={e.slug} className="group relative border-b border-rule py-6">
                    <p className="tabular flex items-center gap-2 text-sm font-medium">
                      <CalendarDays aria-hidden="true" className="h-4 w-4 text-madder" />
                      <time dateTime={e.date}>{formatDate(e.date, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</time>
                    </p>
                    <h4 className="mt-2 font-display text-xl leading-snug">
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
              <ArrowLink href="/news?type=event" className="mt-8">
                All events
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
