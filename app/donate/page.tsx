import Image from 'next/image';
import { Lock, PieChart, RefreshCw } from 'lucide-react';
import { Container, IllustrativeNote } from '@/components/ui/primitives';
import { PageHero } from '@/components/sections/PageHero';
import { DonateForm } from '@/components/forms/DonateForm';
import { spending } from '@/content/impact';
import type { SearchParams } from '@/lib/filters';
import { pageMetadata } from '@/lib/metadata';

export const metadata = {
  ...pageMetadata({
    title: 'Donate (demo)',
    description: 'A demo donation interface for a fictional organization. No money is taken and no payment details are requested.',
    path: '/donate',
  }),
  robots: { index: false, follow: true },
};

export default async function DonatePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const campaign = typeof sp.campaign === 'string' ? sp.campaign : undefined;

  return (
    <>
      <PageHero
        eyebrow="Donate · demo"
        title="Add"
        titleMuted="your thread."
        lede={
          <p>
            Choose an amount, how often and where it goes. <strong className="font-medium text-ink">Demo — no money is taken.</strong>{' '}
            Weftline Collective is a fictional organization and this page is a design prototype.
          </p>
        }
      />

      <Container className="grid gap-14 pb-24 md:pb-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <DonateForm initialAllocation={campaign} />
        </div>
        <aside className="grid content-start gap-10 lg:col-span-4 lg:col-start-9" aria-label="About giving">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-band">
              <Image
                src="/images/tree-planting.webp"
                alt="A volunteer and a child plant a young tree together."
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
                style={{ objectPosition: '40% 45%' }}
              />
            </div>
            <figcaption className="mt-3 text-sm text-ink-soft">Gifts fund parts, training and paid days of work.</figcaption>
          </figure>
          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl">
              <PieChart aria-hidden="true" className="h-5 w-5 text-accent" />
              Where gifts go
            </h2>
            <IllustrativeNote className="mt-3" />
            <ul className="tabular mt-4 border-t border-rule">
              {spending.map((s) => (
                <li key={s.id} className="flex justify-between gap-4 border-b border-rule py-2.5">
                  <span>{s.label}</span>
                  <strong className="font-medium">{s.percent}%</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 text-ink-soft">
            <p className="flex items-start gap-3">
              <Lock aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <span>
                <strong className="font-medium text-ink">No payment details, ever.</strong> A real version would hand over to a certified payment provider
                (for example Stripe Checkout); this demo never collects card or bank data.
              </span>
            </p>
            <p className="flex items-start gap-3">
              <RefreshCw aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <span>
                <strong className="font-medium text-ink">Monthly gifts</strong> would be cancellable at any time from a link in every receipt.
              </span>
            </p>
          </div>
        </aside>
      </Container>
    </>
  );
}
