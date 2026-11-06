import Image from 'next/image';
import { Check } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container, SectionHeading } from '@/components/ui/primitives';
import { Reveal } from '@/components/motion/Reveal';
import { governance, principles, team, timeline } from '@/content/about';
import { photoCredits } from '@/content/credits';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'About',
  description: 'The story, principles, people and governance of Weftline Collective, a fictional community-led nonprofit (VIZAM concept project).',
  path: '/about',
  image: '/images/loom-threads.webp',
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Weftline"
        title="Started by fixing hand pumps. Still fixing, still asking first."
        lede={
          <p>
            Weftline Collective began in 2014 when four people answered a request from village water committees in the
            Saren Valley. Twelve years on, the habit is the same: communities lead, we bind. <em>(A fictional history.)</em>
          </p>
        }
        image={{ src: '/images/loom-threads.webp', alt: 'White threads stretched across a wooden loom, a hand guiding them.', position: '50% 50%' }}
      />

      <section aria-labelledby="timeline-title">
        <Container className="py-20 md:py-28">
          <SectionHeading id="timeline-title" eyebrow="Our story" title="Twelve years, one rule at a time." />
          <Reveal as="ol" stagger className="mt-12 border-l-2 border-ink">
            {timeline.map((t) => (
              <li key={t.year} data-reveal-item className="relative grid gap-2 py-5 pl-8 md:grid-cols-12 md:gap-6">
                <span aria-hidden="true" className="absolute -left-[7px] top-7 h-3 w-3 rounded-full bg-madder" />
                <span className="tabular font-display text-3xl font-bold text-madder md:col-span-2">{t.year}</span>
                <p className="text-lg md:col-span-8">{t.text}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="principles-title" className="border-y border-rule bg-loom-deep">
        <Container className="py-20 md:py-28">
          <SectionHeading id="principles-title" eyebrow="Principles" title="What holds the cloth together." />
          <Reveal as="ul" stagger className="mt-12 grid gap-6 md:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal-item className="flex h-full flex-col rounded-[var(--radius-md)] border border-rule bg-loom p-6 md:p-8">
                <span aria-hidden="true" className="tabular text-sm font-bold text-ink-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold">{p.title}</h3>
                <p className="mt-3 text-ink-soft">{p.text}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="team-title">
        <Container className="py-20 md:py-28">
          <SectionHeading
            id="team-title"
            eyebrow="People"
            title="A small team, mostly in the regions."
            lede="Leadership shown here is fictional. In this concept, 80% of staff live in the regions where Weftline works."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <li key={m.name} className="flex h-full flex-col rounded-[var(--radius-md)] border border-rule bg-white p-6">
                <span aria-hidden="true" className="warp grid h-20 w-20 place-items-center rounded-full bg-ink font-display text-2xl font-bold text-turmeric">
                  {m.initials}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{m.name}</h3>
                <p className="font-bold text-madder">{m.role}</p>
                <p className="mt-2 text-ink-soft">{m.bio}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="governance-title" className="border-t border-rule bg-white/60">
        <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="governance-title" eyebrow="Governance" title="Accountable to the people we work with." />
          </div>
          <ul className="grid gap-4 lg:col-span-7">
            {governance.map((g) => (
              <li key={g} className="flex items-start gap-3 border-b border-rule pb-4 text-lg">
                <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-moss" />
                {g}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="credits" className="border-t border-rule">
        <Container className="py-16">
          <h2 id="credits" className="font-display text-2xl font-bold">
            Photo credits
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            All photographs are from Unsplash, used under the Unsplash License. People shown are not connected with this
            fictional organization.
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {photoCredits.map((c) => (
              <li key={c.file} className="flex items-center gap-3">
                <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-[2px] bg-loom-deep">
                  <Image src={`/images/${c.file}`} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span>
                  Photo by{' '}
                  <a href={c.authorUrl} className="font-bold underline underline-offset-2 hover:text-madder" rel="noopener noreferrer">
                    {c.author}
                  </a>{' '}
                  on{' '}
                  <a href={c.page} className="underline underline-offset-2 hover:text-madder" rel="noopener noreferrer">
                    Unsplash
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
