import Image from 'next/image';
import { X } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container, SectionHeading } from '@/components/ui/primitives';
import { Reveal } from '@/components/motion/Reveal';
import { ThreadLine } from '@/components/motion/ThreadLine';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Our Mission',
  description: 'Weftline’s mission, vision, values and theory of change: communities lead, open tools bind (fictional organization).',
  path: '/mission',
  image: '/images/community-circle.webp',
});

const change = [
  { step: 'Listen', text: 'Open meetings in every community before any plan is written.' },
  { step: 'Co-design', text: 'Committees choose sites, technologies, fees and who maintains what.' },
  { step: 'Fund', text: 'Money goes to parts, training and paid days of work.' },
  { step: 'Equip', text: 'Open tools on basic phones so everyone sees the same information.' },
  { step: 'Hand over', text: 'Within three years, the community runs it alone.' },
];

const values = [
  { title: 'Dignity', text: 'People are the authors of their own stories. We photograph work, not need.' },
  { title: 'Openness', text: 'Open books, open source, open meetings.' },
  { title: 'Patience', text: 'We would rather be slow and still standing in ten years.' },
  { title: 'Care for place', text: 'Native species, local materials, local languages.' },
];

const wontDo = [
  'Start a project a community did not ask for',
  'Use photos that portray people as helpless',
  'Build tools that only we can maintain',
  'Count trees on the day they are planted',
];

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Our mission"
        title="Help communities hold together what they have built, and build what they ask for."
        lede={<p>Our vision is a region where every village can fix its own water, light its own classrooms and read its own flood maps, with or without us.</p>}
        image={{ src: '/images/community-circle.webp', alt: 'A community meeting: people sitting in a wide circle of chairs on a lawn.', position: '50% 55%' }}
      />

      <section aria-labelledby="change-title" className="relative overflow-x-clip">
        <Container className="relative py-20 md:py-28">
          <SectionHeading
            id="change-title"
            eyebrow="Theory of change"
            title="Five crossings of the thread."
            lede="Each step passes across the community’s own structure and binds it a little tighter, until the cloth holds without us."
          />
          <div className="relative mt-14">
            <ThreadLine d="M0 50 C 10 10, 20 90, 30 50 S 50 10, 60 50 S 80 90, 100 50" className="inset-x-0 top-8 hidden h-24 w-full lg:block" width={3} />
            <Reveal as="ol" stagger className="relative grid gap-6 lg:grid-cols-5">
              {change.map((c, i) => (
                <li key={c.step} data-reveal-item className="flex h-full flex-col rounded-[var(--radius-md)] border border-rule bg-white p-6">
                  <span className="tabular grid h-12 w-12 place-items-center rounded-full bg-ink font-bold text-loom">
                    <span className="sr-only">Step </span>
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold">{c.step}</h3>
                  <p className="mt-2 text-ink-soft">{c.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <section aria-labelledby="values-title" className="border-y border-rule bg-loom-deep">
        <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="values-title" eyebrow="Values" title="Four dyes in every thread." />
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]">
              <Image src="/images/seedling-hands.webp" alt="Two pairs of hands planting a small seedling in dark soil." fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
            </div>
          </div>
          <dl className="grid content-start gap-px bg-rule lg:col-span-7">
            {values.map((v, i) => (
              <div key={v.title} className="grid gap-2 bg-loom-deep py-6 sm:grid-cols-[3rem_1fr_2fr] sm:gap-6">
                <span aria-hidden="true" className="tabular text-sm font-bold text-ink-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <dt className="font-display text-2xl font-bold">{v.title}</dt>
                <dd className="text-ink-soft">{v.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="wont-title">
        <Container className="py-20 md:py-28">
          <SectionHeading id="wont-title" eyebrow="Limits" title="Things we will not do." lede="A mission is also a list of refusals." />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {wontDo.map((w) => (
              <li key={w} className="flex h-full items-start gap-3 rounded-[var(--radius-md)] border-2 border-ink p-5 text-lg font-bold">
                <X aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-madder" />
                {w}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
