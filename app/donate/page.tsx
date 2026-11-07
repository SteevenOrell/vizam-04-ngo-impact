import Image from 'next/image';
import { Lock, PieChart, RefreshCw } from 'lucide-react';
import { Container, Eyebrow, IllustrativeNote } from '@/components/ui/primitives';
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
      <section className="relative overflow-x-clip border-b border-rule">
        <Container className="relative py-14 md:py-20">
          <Eyebrow className="mb-5 text-madder">Donate · demo</Eyebrow>
          <h1 className="display-lg max-w-4xl">Add your thread.</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-soft md:text-xl">
            Choose an amount, how often and where it goes. <strong className="text-ink">Demo — no money is taken.</strong>{' '}
            Weftline Collective is a fictional organization and this page is a design prototype.
          </p>
        </Container>
      </section>

      <Container className="grid gap-12 py-12 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <DonateForm initialAllocation={campaign} />
        </div>
        <aside className="grid content-start gap-8 lg:col-span-5" aria-label="About giving">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-md)] bg-loom-deep">
            <Image src="/images/seedling-trays.webp" alt="Several hands potting seedlings into small trays." fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
              <PieChart aria-hidden="true" className="h-5 w-5 text-madder" />
              Where gifts go
            </h2>
            <IllustrativeNote className="mt-3" />
            <ul className="tabular mt-4 border-t border-rule">
              {spending.map((s) => (
                <li key={s.id} className="flex justify-between gap-4 border-b border-rule py-2.5">
                  <span>{s.label}</span>
                  <strong>{s.percent}%</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4">
            <p className="flex items-start gap-3">
              <Lock aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-indigo" />
              <span>
                <strong>No payment details, ever.</strong> A real version would hand over to a certified payment provider
                (for example Stripe Checkout); this demo never collects card or bank data.
              </span>
            </p>
            <p className="flex items-start gap-3">
              <RefreshCw aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-indigo" />
              <span>
                <strong>Monthly gifts</strong> would be cancellable at any time from a link in every receipt.
              </span>
            </p>
          </div>
        </aside>
      </Container>
    </>
  );
}
