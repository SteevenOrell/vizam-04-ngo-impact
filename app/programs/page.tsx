import Image from 'next/image';
import Link from 'next/link';
import { Check, Smartphone } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { ArrowLink, Container, Eyebrow, Tag } from '@/components/ui/primitives';
import { Reveal } from '@/components/motion/Reveal';
import { programmes } from '@/content/programs';
import { campaigns } from '@/content/campaigns';
import { statusLabels, themeLabels } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Programs & Initiatives',
  description: 'Five Weftline programmes: Water Commons, Open Learning, Fair Livelihoods, Climate Resilience and Digital Commons (fictional organization).',
  path: '/programs',
  image: '/images/greens-picking.webp',
});

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs & initiatives"
        title="Five programmes."
        titleMuted="One way of working."
        lede={<p>Each programme pairs practical work on the ground with an open digital tool that the community can run and change.</p>}
        image={{ src: '/images/greens-picking.webp', alt: 'Women picking leafy greens in a bright field, one in a pink headscarf in the foreground.', position: '50% 55%' }}
      >
        <nav aria-label="Programmes on this page">
          <ul className="grid border-t border-rule sm:grid-cols-2 lg:grid-cols-5">
            {programmes.map((p, i) => (
              <li key={p.slug} className="border-b border-rule sm:border-r sm:last:border-r-0">
                <a href={`#${p.slug}`} className="flex min-h-14 items-center gap-3 px-1 py-3 font-medium hover:text-accent sm:px-4">
                  <span aria-hidden="true" className="tabular text-sm text-ink-soft">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {programmes.map((p, i) => {
        const related = campaigns.filter((c) => c.programme === p.slug);
        const flip = i % 2 === 1;
        return (
          <section key={p.slug} id={p.slug} aria-labelledby={`${p.slug}-title`} className={flip ? 'bg-band' : ''}>
            <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
              <div className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-band lg:aspect-[4/5]">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" style={{ objectPosition: p.image.position ?? '50% 50%' }} />
                </div>
              </div>
              <Reveal className={`min-w-0 lg:col-span-6 ${flip ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : 'lg:col-start-7'}`}>
                <Eyebrow className="mb-5">
                  <span className="tabular">{String(i + 1).padStart(2, '0')}</span> · {themeLabels[p.theme]}
                </Eyebrow>
                <h2 id={`${p.slug}-title`} className="heading-lg">
                  {p.name}
                </h2>
                <p className="mt-6 max-w-[30rem] text-xl">{p.lede}</p>
                <p className="mt-4 max-w-[30rem] text-ink-soft">{p.description}</p>

                <h3 className="mt-10 font-display text-xl">Our approach</h3>
                <ul className="mt-3 grid max-w-[30rem] gap-2">
                  {p.approach.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-ink-soft">
                      <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      {a}
                    </li>
                  ))}
                </ul>

                <div className={`mt-10 max-w-[30rem] rounded-[var(--radius-card)] p-6 ${flip ? 'bg-page' : 'bg-band'}`}>
                  <p className="flex items-center gap-2 text-sm font-medium text-accent">
                    <Smartphone aria-hidden="true" className="h-4 w-4" />
                    Open digital tool
                  </p>
                  <h3 className="mt-2 font-display text-xl">{p.digitalTool.name}</h3>
                  <p className="mt-1 text-ink-soft">{p.digitalTool.text}</p>
                </div>

                {related.length > 0 && (
                  <>
                    <h3 className="mt-10 font-display text-xl">Campaigns in this programme</h3>
                    <ul className="mt-3 max-w-[30rem] border-t border-rule">
                      {related.map((c) => (
                        <li key={c.slug} className="border-b border-rule">
                          <Link href={`/campaigns/${c.slug}`} className="flex min-h-12 items-center justify-between gap-4 py-3 font-medium hover:text-accent">
                            <span>{c.title}</span>
                            <Tag>{statusLabels[c.status]}</Tag>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Reveal>
            </Container>
          </section>
        );
      })}

      <section aria-label="Browse all campaigns" className="border-t border-rule">
        <Container className="py-12">
          <ArrowLink href="/campaigns">Browse every campaign</ArrowLink>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
