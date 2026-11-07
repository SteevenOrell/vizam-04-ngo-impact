import { PageHero } from '@/components/sections/PageHero';
import { StatLedger } from '@/components/sections/StatLedger';
import { CtaBand } from '@/components/sections/CtaBand';
import { IllustrativeNote, Section, SectionHeading, Split } from '@/components/ui/primitives';
import { PhotoBand } from '@/components/ui/PhotoBand';
import { Reveal } from '@/components/motion/Reveal';
import { headlineStats, measurementPrinciples, spending, themeResults, yearlyHandover } from '@/content/impact';
import { themeLabels } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Impact & Results',
  description: 'How Weftline counts results, where money goes and what is still working. Illustrative figures for a fictional organization.',
  path: '/impact',
  image: '/images/solar-valley.webp',
});

const spendColours: Record<string, string> = {
  programmes: 'bg-accent',
  tools: 'bg-accent-dark',
  fundraising: 'bg-graphite',
  admin: 'bg-ink',
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact & results"
        title="What is still working,"
        titleMuted="counted by the people who use it."
        lede={
          <>
            <p>We count late and publish failures. Every number on this page is an illustrative figure for a fictional organization.</p>
            <IllustrativeNote className="mt-4" />
          </>
        }
        image={{ src: '/images/solar-valley.webp', alt: 'Solar panels on a terraced slope beside a village in a green mountain valley.', position: '50% 60%' }}
      />

      <Section labelledBy="headline-title">
        <SectionHeading id="headline-title" eyebrow="The year in numbers" title="Headline results," titleMuted="2026." className="mb-12" />
        <StatLedger stats={headlineStats} showNotes />
      </Section>

      <PhotoBand
        image={{ src: '/images/hero-farmers.webp', alt: 'Four women on a green farm plot, three standing and smiling, one digging.', position: '50% 40%' }}
        eyebrow="Counted late"
      >
        We count what is still working two years later, and we publish what is not.
      </PhotoBand>

      <Section tone="band" labelledBy="themes-title">
          <SectionHeading id="themes-title" eyebrow="By programme" title="One result we watch" titleMuted="in each programme." />
          <IllustrativeNote className="mt-6" />
          <Reveal as="ul" stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {themeResults.map((t) => (
              <li key={t.theme} data-reveal-item className="flex h-full flex-col rounded-[var(--radius-card)] bg-page p-6">
                <span className="text-sm font-medium text-accent">{themeLabels[t.theme]}</span>
                <span className="tabular mt-5 font-display text-4xl font-light">
                  {t.value}
                  <span className="sr-only"> (illustrative)</span>
                </span>
                <span className="mt-2 text-ink-soft">{t.label}</span>
              </li>
            ))}
          </Reveal>
      </Section>

      <Section labelledBy="spend-title">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading id="spend-title" eyebrow="Where each dollar goes" title="Open books," titleMuted="in plain words." />
            <IllustrativeNote className="mt-6" />
            <div className="mt-8 flex h-6 w-full overflow-hidden rounded-[3px]" aria-hidden="true">
              {spending.map((s) => (
                <div key={s.id} className={spendColours[s.id]} style={{ width: `${s.percent}%` }} />
              ))}
            </div>
            <table className="tabular mt-6 w-full text-left">
              <caption className="sr-only">Spending by category, illustrative percentages</caption>
              <thead>
                <tr className="border-b border-ink text-sm">
                  <th scope="col" className="py-2 font-medium">
                    Category
                  </th>
                  <th scope="col" className="py-2 text-right font-medium">
                    Share
                  </th>
                </tr>
              </thead>
              <tbody>
                {spending.map((s) => (
                  <tr key={s.id} className="border-b border-rule">
                    <th scope="row" className="py-3 font-normal">
                      <span className="flex items-center gap-3">
                        <span aria-hidden="true" className={`h-3 w-3 rounded-[2px] ${spendColours[s.id]}`} />
                        {s.label}
                      </span>
                    </th>
                    <td className="py-3 text-right font-medium">{s.percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow="Handover rate" title="Projects run fully by communities" titleMuted="after three years." />
            <IllustrativeNote className="mt-6" />
            <figure className="mt-8">
              <div className="flex h-56 items-end gap-3 border-b border-ink sm:gap-5" aria-hidden="true">
                {yearlyHandover.map((y) => (
                  <div key={y.year} className="flex h-full flex-1 flex-col justify-end">
                    <span className="tabular mb-1 text-center text-sm font-medium">{y.percent}%</span>
                    <div className="woven-fill rounded-t-[2px]" style={{ height: `${y.percent}%` }} />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-3 sm:gap-5" aria-hidden="true">
                {yearlyHandover.map((y) => (
                  <span key={y.year} className="tabular flex-1 text-center text-sm text-ink-soft">
                    {y.year}
                  </span>
                ))}
              </div>
              <figcaption className="mt-4 text-sm text-ink-soft">Share of projects started three years earlier that communities now run alone (illustrative).</figcaption>
              <table className="sr-only">
                <caption>Handover rate by year, illustrative</caption>
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Handover rate</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyHandover.map((y) => (
                    <tr key={y.year}>
                      <th scope="row">{y.year}</th>
                      <td>{y.percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          </div>
        </div>
      </Section>

      <Section tone="band" labelledBy="method-title">
        <Split heading={<SectionHeading id="method-title" eyebrow="Method" title="How" titleMuted="we count." />}>
          <ul className="grid gap-4">
            {measurementPrinciples.map((m) => (
              <li key={m.title} className="flex h-full flex-col rounded-[var(--radius-card)] bg-page p-6">
                <h3 className="font-display text-xl">{m.title}</h3>
                <p className="mt-2 text-ink-soft">{m.text}</p>
              </li>
            ))}
          </ul>
        </Split>
      </Section>

      <CtaBand />
    </>
  );
}
