import { Laptop, Languages, Code2, Sprout } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Container, SectionHeading } from '@/components/ui/primitives';
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
        title="Lend a hand, or a few hours a month."
        lede={<p>Volunteers never replace paid local work. They add skills and time where communities ask for them.</p>}
        image={{ src: '/images/volunteers-riverbank.webp', alt: 'Volunteers in matching shirts collecting litter along a riverbank.', position: '50% 50%' }}
      />

      <section aria-labelledby="roles-title" className="border-b border-rule bg-loom-deep">
        <Container className="py-16 md:py-20">
          <SectionHeading id="roles-title" eyebrow="Ways to help" title="Four ways in." />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex h-full flex-col rounded-[var(--radius-md)] border border-rule bg-loom p-6">
                <Icon aria-hidden="true" className="h-7 w-7 text-madder" />
                <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-ink-soft">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="font-display text-2xl font-bold">What happens next</h2>
          <ol className="mt-4 grid gap-4">
            {['A coordinator reads your registration.', 'We suggest a first role near you or online.', 'You meet the team before your first day.'].map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="tabular grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-loom">{i + 1}</span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-ink-soft">On this concept site, the form is a demo: no coordinator will receive it.</p>
        </div>
        <div className="lg:col-span-8">
          <VolunteerForm />
        </div>
      </Container>
    </>
  );
}
