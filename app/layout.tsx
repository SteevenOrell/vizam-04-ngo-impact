import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { site } from '@/content/site';
import './globals.css';

const display = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap', weight: ['300', '400', '500'] });
const text = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_GB',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#14120f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${text.variable}`}>
      <body>
        <div id="root" className="flex min-h-screen flex-col">
          <a
            href="#main"
            className="sr-only-focusable absolute left-4 top-3 z-[60] rounded-[var(--radius-md)] bg-ink px-4 py-3 font-medium text-white"
          >
            Skip to main content
          </a>
          <p className="bg-ink px-4 py-1.5 text-center text-[0.8125rem] font-medium text-white">
            <span className="text-accent-tint">VIZAM concept project</span> — Weftline Collective is a fictional organization.
          </p>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
