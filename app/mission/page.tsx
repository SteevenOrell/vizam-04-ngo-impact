import { X } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { Section, SectionHeading, Split } from '@/components/ui/primitives';
import { ImagePair } from '@/components/ui/ImagePair';
import { PhotoBand } from '@/components/ui/PhotoBand';
import { Reveal } from '@/components/motion/Reveal';
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
        title="Help communities hold together what they have built,"
        titleMuted="and build what they ask for."
        lede={<p>Our vision is a region where every village can fix its own water, light its own classrooms and read its own flood maps, with or without us.</p>}
        image={{ src: '/images/community-circle.webp', alt: 'People seated in a wide circle of white chairs on a lawn during an open community meeting.', position: '50% 55%' }}
      />

      <Section labelledBy="change-title">
        <Split
          heading={
            <SectionHeading
              id="change-title"
              eyebrow="Theory of change"
              title="Five crossings"
              titleMuted="of the thread."
              lede="Each step passes across the community’s own structure and binds it a little tighter, until the cloth holds without us."
            />
          }
        >
          <Reveal as="ol" stagger className="border-t border-rule">
            {change.map((c, i) => (
              <li key={c.step} data-reveal-item className="grid gap-1 border-b border-rule py-6 sm:grid-cols-[3rem_9rem_1fr] sm:gap-6">
                <span className="tabular text-sm text-ink-soft sm:pt-2">
                  <span className="sr-only">Step </span>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-2xl">{c.step}</h3>
                <p className="text-ink-soft">{c.text}</p>
              </li>
            ))}
          </Reveal>
        </Split>
      </Section>

      <PhotoBand
        image={{ src: '/images/highland-terraces.webp', alt: 'Aerial view of green and gold terraced fields among low clouds in the highlands.', position: '50% 55%' }}
        eyebrow="Patience"
      >
        We would rather be slow and still standing in ten years.
      </PhotoBand>

      <Section tone="band" labelledBy="values-title">
        <Split heading={<SectionHeading id="values-title" eyebrow="Values" title="Four values" titleMuted="in every thread." />}>
          <dl className="border-t border-rule">
            {values.map((v, i) => (
              <div key={v.title} className="grid gap-1 border-b border-rule py-6 sm:grid-cols-[3rem_9rem_1fr] sm:gap-6">
                <span aria-hidden="true" className="tabular text-sm text-ink-soft sm:pt-2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <dt className="font-display text-2xl">{v.title}</dt>
                <dd className="text-ink-soft">{v.text}</dd>
              </div>
            ))}
          </dl>
        </Split>
        <ImagePair
          className="mx-auto mt-20 max-w-3xl"
          images={[
            {
              src: '/images/tree-planting.webp',
              alt: 'A volunteer and a child plant a young tree together while others look on.',
              position: '40% 50%',
              caption: 'Care for place: native species, planted together.',
            },
            {
              src: '/images/bean-sorting.webp',
              alt: 'Women sort beans by hand along a long worktable.',
              position: '60% 50%',
              caption: 'Dignity: people shown at work, not in need.',
            },
          ]}
        />
      </Section>

      <Section labelledBy="wont-title">
        <Split heading={<SectionHeading id="wont-title" eyebrow="Limits" title="Things we" titleMuted="will not do." lede="A mission is also a list of refusals." />}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {wontDo.map((w) => (
              <li key={w} className="flex h-full items-start gap-3 rounded-[var(--radius-card)] bg-band p-6">
                <X aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <span className="font-medium">{w}</span>
              </li>
            ))}
          </ul>
        </Split>
      </Section>

      <CtaBand />
    </>
  );
}
