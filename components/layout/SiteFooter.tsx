import Link from 'next/link';
import { LogoMark } from '@/components/brand/Logo';
import { navItems, site } from '@/content/site';
import { programmes } from '@/content/programs';

export function SiteFooter() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-loom">
      <div aria-hidden="true" className="warp pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto w-full max-w-[1240px] px-4 pt-16 pb-10 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="flex items-center gap-3 font-display text-2xl font-bold">
              <LogoMark className="h-10 w-10" />
              Weftline Collective
            </p>
            <p className="mt-5 max-w-sm text-ink-muted">
              {site.tagline} Community-led programmes in water, learning, livelihoods and climate resilience, woven
              together with open digital tools.
            </p>
            <p className="mt-6 rounded-[var(--radius-md)] border border-turmeric/60 p-4 text-sm text-loom">
              <strong className="text-turmeric">{site.conceptNotice}</strong> Weftline Collective, its places, people,
              campaigns and figures are invented for a design portfolio. Donations and forms are demos: no money is taken
              and nothing is sent or stored.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="eyebrow text-turmeric">Explore</h2>
            <ul className="mt-4 grid gap-2">
              {[{ href: '/', label: 'Home' }, ...navItems, { href: '/donate', label: 'Donate (demo)' }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="rounded-sm hover:text-turmeric hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="eyebrow text-turmeric">Programmes</h2>
            <ul className="mt-4 grid gap-2">
              {programmes.map((p) => (
                <li key={p.slug}>
                  <Link href={`/programs#${p.slug}`} className="rounded-sm hover:text-turmeric hover:underline">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="eyebrow mt-8 text-turmeric">Write to us</h2>
            <p className="mt-3 text-ink-muted">
              <a href={`mailto:${site.email}`} className="rounded-sm text-loom underline underline-offset-4 hover:text-turmeric">
                {site.email}
              </a>
              <br />
              <span className="text-sm">(fictional address, not monitored)</span>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} VIZAM. <span className="text-loom">VIZAM concept project — fictional organization.</span>
          </p>
          <p>
            Photography from Unsplash — <Link href="/about#credits" className="underline underline-offset-4 hover:text-turmeric">photo credits</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
