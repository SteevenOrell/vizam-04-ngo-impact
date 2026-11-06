import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Smartphone } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container, Tag } from '@/components/ui/primitives';
import { Reveal } from '@/components/motion/Reveal';
import { programmes } from '@/content/programs';
import { campaigns } from '@/content/campaigns';
import { statusLabels, themeLabels } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Programs & Initiatives',
  description: 'Five Weftline programmes: Water Commons, Open Learning, Fair Livelihoods, Climate Resilience and Digital Commons (fictional organization).',
  path: '/programs',
  image: '/images/field-planting.webp',
});

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs & initiatives"
        title="Five programmes. One way of working."
        lede={<p>Each programme pairs practical work on the ground with an open digital tool that the community can run and change.</p>}
        image={{ src: '/images/field-planting.webp', alt: 'People planting young trees across a cleared field among palms.', position: '50% 60%' }}
      >
        <nav aria-label="Programmes on this page">
          <ul className="flex flex-wrap gap-2">
            {programmes.map((p) => (
              <li key={p.slug}>
                <a href={`#${p.slug}`} className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] border-2 border-ink/70 px-3 font-bold hover:bg-ink hover:text-loom">
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
          <section key={p.slug} id={p.slug} aria-labelledby={`${p.slug}-title`} className={`border-b border-rule ${flip ? 'bg-loom-deep' : ''}`}>
            <Container className="grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:gap-14">
              <div className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-loom-deep">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" style={{ objectPosition: p.image.position ?? '50% 50%' }} />
                </div>
                <div className="mt-6 rounded-[var(--radius-md)] border-2 border-ink bg-white p-5">
                  <p className="flex items-center gap-2 text-sm font-bold text-indigo">
                    <Smartphone aria-hidden="true" className="h-4 w-4" />
                    Open digital tool
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold">{p.digitalTool.name}</h3>
                  <p className="mt-1 text-ink-soft">{p.digitalTool.text}</p>
                </div>
              </div>
              <Reveal className={`lg:col-span-7 ${flip ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : ''}`}>
                <p className="tabular eyebrow text-madder">
                  {String(i + 1).padStart(2, '0')} · {themeLabels[p.theme]}
                </p>
                <h2 id={`${p.slug}-title`} className="display-lg mt-4">
                  {p.name}
                </h2>
                <p className="mt-5 text-xl font-bold">{p.lede}</p>
                <p className="prose-measure mt-4 text-lg text-ink-soft">{p.description}</p>
                <h3 className="mt-8 font-bold">Our approach</h3>
                <ul className="mt-3 grid gap-2">
                  {p.approach.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-moss" />
                      {a}
                    </li>
                  ))}
                </ul>
                {related.length > 0 && (
                  <>
                    <h3 className="mt-8 font-bold">Campaigns in this programme</h3>
                    <ul className="mt-3 border-t border-rule">
                      {related.map((c) => (
                        <li key={c.slug} className="border-b border-rule">
                          <Link href={`/campaigns/${c.slug}`} className="group flex min-h-12 items-center justify-between gap-4 py-3 font-bold hover:text-madder">
                            <span>{c.title}</span>
                            <span className="flex shrink-0 items-center gap-2">
                              <Tag>{statusLabels[c.status]}</Tag>
                              <ArrowRight aria-hidden="true" className="h-4 w-4" />
                            </span>
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

      <CtaBand />
    </>
  );
}
