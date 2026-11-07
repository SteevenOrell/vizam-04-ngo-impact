import Link from 'next/link';
import { LogoMark } from '@/components/brand/Logo';
import { Eyebrow } from '@/components/ui/primitives';
import { navItems, site } from '@/content/site';
import { programmes } from '@/content/programs';

export function SiteFooter() {
  const linkClass = 'rounded-sm text-white/85 underline-offset-4 hover:text-accent-tint hover:underline';
  return (
    <footer className="on-dark bg-ink text-white [--weft:#f3d3c7]">
      <div className="mx-auto w-full max-w-[1240px] px-4 pt-20 pb-10 sm:px-6 lg:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="flex items-center gap-3 font-display text-2xl font-light">
              <LogoMark className="h-10 w-10" />
              Weftline Collective
            </p>
            <p className="mt-5 max-w-sm text-ink-muted">
              {site.tagline} Community-led programmes in water, learning, livelihoods and climate resilience, woven
              together with open digital tools.
            </p>
            <p className="mt-6 rounded-[var(--radius-md)] border border-white/25 p-4 text-sm text-white/90">
              <strong className="font-medium text-accent-tint">{site.conceptNotice}</strong> Weftline Collective, its places, people,
              campaigns and figures are invented for a design portfolio. Donations and forms are demos: no money is taken
              and nothing is sent or stored.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <Eyebrow as="h2" className="mb-5 text-white">
              Explore
            </Eyebrow>
            <ul className="grid gap-2">
              {[{ href: '/', label: 'Home' }, ...navItems, { href: '/donate', label: 'Donate (demo)' }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <Eyebrow as="h2" className="mb-5 text-white">
              Programmes
            </Eyebrow>
            <ul className="grid gap-2">
              {programmes.map((p) => (
                <li key={p.slug}>
                  <Link href={`/programs#${p.slug}`} className={linkClass}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Eyebrow as="h2" className="mb-4 mt-10 text-white">
              Write to us
            </Eyebrow>
            <p className="text-ink-muted">
              <a href={`mailto:${site.email}`} className="rounded-sm text-white underline underline-offset-4 hover:text-accent-tint">
                {site.email}
              </a>
              <br />
              <span className="text-sm">(fictional address, not monitored)</span>
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} VIZAM. <span className="text-white">VIZAM concept project — fictional organization.</span>
          </p>
          <p>
            Photography from Unsplash —{' '}
            <Link href="/about#credits" className="underline underline-offset-4 hover:text-accent-tint">
              photo credits
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
