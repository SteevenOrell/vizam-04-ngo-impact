import { PageHero } from '@/components/sections/PageHero';
import { StatLedger } from '@/components/sections/StatLedger';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container, IllustrativeNote, SectionHeading } from '@/components/ui/primitives';
import { Reveal } from '@/components/motion/Reveal';
import { headlineStats, measurementPrinciples, spending, themeResults, yearlyHandover } from '@/content/impact';
import { themeLabels } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Impact & Results',
  description: 'How Weftline counts results, where money goes and what is still working. Illustrative figures for a fictional organization.',
  path: '/impact',
  image: '/images/harvest-path.webp',
});

const spendColours: Record<string, string> = {
  programmes: 'bg-madder',
  tools: 'bg-indigo',
  fundraising: 'bg-moss',
  admin: 'bg-ink',
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact & results"
        title="What is still working, counted by the people who use it."
        lede={
          <>
            <p>We count late and publish failures. Every number on this page is an illustrative figure for a fictional organization.</p>
            <IllustrativeNote className="mt-4" />
          </>
        }
        image={{ src: '/images/harvest-path.webp', alt: 'A farmer carries baskets of vegetables along a hillside path between fields.', position: '50% 50%' }}
      />

      <section aria-labelledby="headline-title">
        <Container className="py-20 md:py-24">
          <h2 id="headline-title" className="display-md mb-10">
            Headline results, 2026
          </h2>
          <StatLedger stats={headlineStats} showNotes />
        </Container>
      </section>

      <section aria-labelledby="themes-title" className="border-y border-rule bg-loom-deep">
        <Container className="py-20 md:py-24">
          <SectionHeading id="themes-title" eyebrow="By programme" title="One result we watch in each programme." />
          <IllustrativeNote className="mt-6" />
          <Reveal as="ul" stagger className="mt-8 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-5">
            {themeResults.map((t) => (
              <li key={t.theme} data-reveal-item className="flex h-full flex-col bg-loom-deep p-6">
                <span className="text-sm font-bold text-madder">{themeLabels[t.theme]}</span>
                <span className="tabular mt-5 font-display text-4xl font-bold">
                  {t.value}
                  <span className="sr-only"> (illustrative)</span>
                </span>
                <span className="mt-2 text-ink-soft">{t.label}</span>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="spend-title">
        <Container className="grid gap-14 py-20 md:py-24 lg:grid-cols-2">
          <div>
            <SectionHeading id="spend-title" eyebrow="Where each dollar goes" title="Open books, in plain words." />
            <IllustrativeNote className="mt-6" />
            <div className="mt-8 flex h-6 w-full overflow-hidden rounded-[3px]" aria-hidden="true">
              {spending.map((s) => (
                <div key={s.id} className={spendColours[s.id]} style={{ width: `${s.percent}%` }} />
              ))}
            </div>
            <table className="tabular mt-6 w-full text-left">
              <caption className="sr-only">Spending by category, illustrative percentages</caption>
              <thead>
                <tr className="border-b-2 border-ink text-sm">
                  <th scope="col" className="py-2 font-bold">
                    Category
                  </th>
                  <th scope="col" className="py-2 text-right font-bold">
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
                    <td className="py-3 text-right font-bold">{s.percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <SectionHeading eyebrow="Handover rate" title="Projects run fully by communities after three years." />
            <IllustrativeNote className="mt-6" />
            <figure className="mt-8">
              <div className="flex h-56 items-end gap-3 border-b-2 border-ink sm:gap-5" aria-hidden="true">
                {yearlyHandover.map((y) => (
                  <div key={y.year} className="flex h-full flex-1 flex-col justify-end">
                    <span className="tabular mb-1 text-center text-sm font-bold">{y.percent}%</span>
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
        </Container>
      </section>

      <section aria-labelledby="method-title" className="border-t border-rule bg-white/60">
        <Container className="py-20 md:py-24">
          <SectionHeading id="method-title" eyebrow="Method" title="How we count." />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {measurementPrinciples.map((m) => (
              <li key={m.title} className="flex h-full flex-col rounded-[var(--radius-md)] border border-rule bg-loom p-6">
                <h3 className="font-display text-xl font-bold">{m.title}</h3>
                <p className="mt-2 text-ink-soft">{m.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
