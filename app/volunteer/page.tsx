import { Laptop, Languages, Code2, Sprout } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, SectionHeading, Split } from '@/components/ui/primitives';
import { PhotoBand } from '@/components/ui/PhotoBand';
import { VolunteerForm } from '@/components/forms/VolunteerForm';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Volunteer',
  description: 'Volunteer with Weftline: field days, remote mapping, code club mentoring and translation. Demo registration form (fictional organization).',
  path: '/volunteer',
  image: '/images/volunteers-riverbank.webp',
});

const roles = [
  { icon: Sprout, title: 'Field days', text: 'Planting, building and clean-ups alongside paid community teams. A few days a year.' },
  { icon: Laptop, title: 'Remote mapping', text: 'Trace flood routes and water points from photos and walk logs, from anywhere.' },
  { icon: Code2, title: 'Code club mentoring', text: 'One evening a week, online or in the delta, helping young maintainers.' },
  { icon: Languages, title: 'Translation', text: 'Make tools and guides readable in the languages people speak at home.' },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Lend a hand,"
        titleMuted="or a few hours a month."
        lede={<p>Volunteers never replace paid local work. They add skills and time where communities ask for them.</p>}
        image={{ src: '/images/volunteers-riverbank.webp', alt: 'Volunteers in matching light-blue shirts filling bags with litter on a sunlit riverbank.', position: '50% 55%' }}
      />

      <Section tone="band" labelledBy="roles-title">
        <Split heading={<SectionHeading id="roles-title" eyebrow="Ways to help" title="Four ways in," titleMuted="pick the one that fits." />}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {roles.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex h-full flex-col rounded-[var(--radius-card)] bg-page p-6">
                <Icon aria-hidden="true" className="h-7 w-7 text-accent" />
                <h3 className="mt-6 font-display text-xl">{title}</h3>
                <p className="mt-2 text-ink-soft">{text}</p>
              </li>
            ))}
          </ul>
        </Split>
      </Section>

      <PhotoBand
        image={{ src: '/images/volunteer-lead.webp', alt: 'A smiling volunteer lead holding a clipboard while others collect litter in a sunlit wood.', position: '70% 40%' }}
        eyebrow="Join a field day"
      >
        Volunteers add time and skills where communities ask for them, and never replace paid local work.
      </PhotoBand>

      <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Sign up" title="What happens" titleMuted="next." as="h2" />
          <ol className="mt-8 border-t border-rule">
            {['A coordinator reads your registration.', 'We suggest a first role near you or online.', 'You meet the team before your first day.'].map((s, i) => (
              <li key={s} className="flex gap-4 border-b border-rule py-4">
                <span className="tabular font-display text-xl font-light text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-ink-soft">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-ink-soft">On this concept site, the form is a demo: no coordinator will receive it.</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <VolunteerForm />
        </div>
      </Container>
    </>
  );
}
