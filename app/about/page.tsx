import Image from 'next/image';
import { Check } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container, Section, SectionHeading, Split } from '@/components/ui/primitives';
import { ImagePair } from '@/components/ui/ImagePair';
import { PhotoBand } from '@/components/ui/PhotoBand';
import { Reveal } from '@/components/motion/Reveal';
import { governance, principles, team, timeline } from '@/content/about';
import { photoCredits } from '@/content/credits';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'About',
  description: 'The story, principles, people and governance of Weftline Collective, a fictional community-led nonprofit (VIZAM concept project).',
  path: '/about',
  image: '/images/community-build.webp',
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Weftline"
        title="Started by fixing hand pumps."
        titleMuted="Still fixing, still asking first."
        lede={
          <p>
            Weftline Collective began in 2014 when four people answered a request from village water committees in the
            Saren Valley. Twelve years on, the habit is the same: communities lead, we bind. <em>(A fictional history.)</em>
          </p>
        }
        image={{ src: '/images/community-build.webp', alt: 'Neighbours fitting a blue shade frame onto a timber pergola by the sea.', position: '50% 38%' }}
      />

      <Section labelledBy="timeline-title">
        <Split heading={<SectionHeading id="timeline-title" eyebrow="Our story" title="Twelve years," titleMuted="one rule at a time." />}>
          <Reveal as="ol" stagger className="border-t border-rule">
            {timeline.map((t) => (
              <li key={t.year} data-reveal-item className="grid gap-1 border-b border-rule py-6 sm:grid-cols-[6rem_1fr] sm:gap-6">
                <span className="tabular font-display text-3xl font-light text-accent">{t.year}</span>
                <p className="max-w-[30rem] text-ink-soft">{t.text}</p>
              </li>
            ))}
          </Reveal>
        </Split>
        <ImagePair
          className="mx-auto mt-20 max-w-3xl"
          images={[
            {
              src: '/images/garden-tending.webp',
              alt: 'A teenager and an older woman tending vegetables together in a raised garden bed.',
              position: '50% 40%',
              caption: 'A neighbourhood garden, tended across generations.',
            },
            {
              src: '/images/greens-picking.webp',
              alt: 'A woman in a bright headscarf picks leafy greens in a field while others work behind her.',
              position: '45% 50%',
              caption: 'Harvest day on a cooperative plot.',
            },
          ]}
        />
      </Section>

      <PhotoBand
        image={{ src: '/images/field-harvest.webp', alt: 'Four women on a green farm plot, one digging, three standing and smiling.', position: '50% 40%' }}
        eyebrow="Where we work"
      >
        In this concept, eight in ten of our staff live in the regions where we work.
      </PhotoBand>

      <Section tone="band" labelledBy="principles-title">
        <Split heading={<SectionHeading id="principles-title" eyebrow="Principles" title="What holds" titleMuted="the cloth together." />}>
          <Reveal as="ul" stagger className="grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal-item className="flex h-full flex-col rounded-[var(--radius-card)] bg-page p-6">
                <span aria-hidden="true" className="tabular text-sm text-ink-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-2xl">{p.title}</h3>
                <p className="mt-3 text-ink-soft">{p.text}</p>
              </li>
            ))}
          </Reveal>
        </Split>
      </Section>

      <Section labelledBy="team-title">
        <SectionHeading
          id="team-title"
          eyebrow="People"
          title="A small team,"
          titleMuted="mostly in the regions."
          lede="Leadership shown here is fictional. In this concept, 80% of staff live in the regions where Weftline works."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <li key={m.name} className="flex h-full flex-col rounded-[var(--radius-card)] bg-band p-6">
              <span aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-full bg-accent font-display text-xl text-white">
                {m.initials}
              </span>
              <h3 className="mt-6 font-display text-xl">{m.name}</h3>
              <p className="font-medium text-accent">{m.role}</p>
              <p className="mt-3 text-ink-soft">{m.bio}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="band" labelledBy="governance-title">
        <Split heading={<SectionHeading id="governance-title" eyebrow="Governance" title="Accountable to" titleMuted="the people we work with." />}>
          <ul className="border-t border-rule">
            {governance.map((g) => (
              <li key={g} className="flex items-start gap-3 border-b border-rule py-5">
                <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <span className="max-w-[30rem] text-ink-soft">{g}</span>
              </li>
            ))}
          </ul>
        </Split>
      </Section>

      <section aria-labelledby="credits">
        <Container className="py-16">
          <h2 id="credits" className="font-display text-2xl">
            Photo credits
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Photographs are from Unsplash (Unsplash License) and Pixabay (Pixabay Content License). People shown are not
            connected with this fictional organization.
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {photoCredits.map((c) => (
              <li key={c.file} className="flex items-center gap-3">
                <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-[2px] bg-band">
                  <Image src={`/images/${c.file}`} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span>
                  Photo by{' '}
                  <a href={c.authorUrl} className="font-medium underline underline-offset-2 hover:text-accent" rel="noopener noreferrer">
                    {c.author}
                  </a>{' '}
                  on{' '}
                  <a href={c.page} className="underline underline-offset-2 hover:text-accent" rel="noopener noreferrer">
                    {c.source}
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
