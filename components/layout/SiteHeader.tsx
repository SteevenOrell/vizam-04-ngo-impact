'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Heart, Menu, X } from 'lucide-react';
import { Wordmark } from '@/components/brand/Logo';
import { navItems } from '@/content/site';

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Close the menu on navigation (state adjusted during render, no effect needed).
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    if (open) setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []).filter((el) => el.offsetParent !== null);
    focusables()[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const firstEl = items[0]!;
      const lastEl = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-rule bg-loom/95 backdrop-blur supports-[backdrop-filter]:bg-loom/85">
      <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="rounded-sm text-ink">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative rounded-sm px-2.5 py-2 text-[0.95rem] font-bold transition-colors hover:text-madder ${
                      active ? 'text-madder after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-0.5 after:bg-madder' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            aria-current={isActive(pathname, '/donate') ? 'page' : undefined}
            className="hidden min-h-11 items-center gap-2 rounded-[var(--radius-md)] bg-madder px-4 py-2 font-bold text-white transition-colors hover:bg-madder-dark sm:inline-flex"
          >
            <Heart aria-hidden="true" className="h-4 w-4" />
            Donate <span className="sr-only">(demo)</span>
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border-2 border-ink px-3 font-bold xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
            <span>Menu</span>
          </button>
        </div>
      </div>
    </header>

      {/* Outside the header: its backdrop-filter would otherwise become the containing block of this fixed panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            data-fixed
            className="on-dark fixed inset-0 z-50 overflow-y-auto bg-ink text-loom"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="warp pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative mx-auto flex min-h-full w-full max-w-[1240px] flex-col px-4 pb-10 sm:px-6 lg:px-10">
              <div className="flex h-[72px] items-center justify-between">
                <h2 id="mobile-menu-title" className="font-display text-xl font-bold">
                  Menu
                </h2>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border-2 border-loom px-3 font-bold"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                  <span>Close</span>
                </button>
              </div>
              <nav aria-label="Main" className="mt-6">
                <ul className="grid gap-1 sm:grid-cols-2 sm:gap-x-10">
                  {[{ href: '/', label: 'Home' }, ...navItems].map((item, i) => {
                    const active = item.href === '/' ? pathname === '/' : isActive(pathname, item.href);
                    return (
                      <li key={item.href} className="border-b border-white/15">
                        <Link
                          href={item.href}
                          aria-current={active ? 'page' : undefined}
                          className={`flex items-baseline gap-4 py-3 font-display text-[1.75rem] font-semibold leading-tight hover:text-turmeric ${
                            active ? 'text-turmeric' : ''
                          }`}
                        >
                          <span aria-hidden="true" className="tabular w-7 font-sans text-sm text-ink-muted">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="mt-8">
                <Link
                  href="/donate"
                  className="inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] bg-turmeric px-5 py-3 font-bold text-ink"
                >
                  <Heart aria-hidden="true" className="h-4 w-4" />
                  Donate (demo — no money is taken)
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
