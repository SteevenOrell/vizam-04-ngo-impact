'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Heart, Menu, X } from 'lucide-react';
import { Wordmark } from '@/components/brand/Logo';
import { navGroups, navItems } from '@/content/site';

/** Routes whose first screen is a full-bleed photograph: the header starts transparent there. */
const HERO_ROUTES = ['/'];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [group, setGroup] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const hero = HERO_ROUTES.includes(pathname);
  const transparent = hero && !scrolled;

  // Close the menu and dropdowns on navigation (state adjusted during render, no effect needed).
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    if (open) setOpen(false);
    if (group) setGroup(null);
  }

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Dropdowns: Escape closes (focus returns to the trigger), and so does a click outside.
  useEffect(() => {
    if (!group) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        navRef.current?.querySelector<HTMLElement>('button[aria-expanded="true"]')?.focus();
        setGroup(null);
      }
    }
    function onDown(e: MouseEvent) {
      if (!navRef.current?.contains(e.target as Node)) setGroup(null);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [group]);

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

  const linkBase = 'relative inline-flex min-h-11 items-center gap-1 rounded-sm px-3 text-[0.95rem] font-medium transition-colors';
  const tone = transparent ? 'hover:text-white/75' : 'hover:text-accent';
  const current = 'underline decoration-accent decoration-2 underline-offset-8';

  return (
    <>
      {/* Zero-height sticky wrapper: the header overlays the hero yet stays pinned once the concept notice scrolls away. */}
      <div className="sticky top-0 z-40 h-0">
        <header
          className={`absolute inset-x-0 top-0 transition-colors duration-300 ${
            transparent
              ? 'on-dark bg-gradient-to-b from-black/55 to-transparent text-white [--weft:#f3d3c7]'
              : 'bg-white text-ink shadow-[0_1px_0_var(--color-rule)]'
          }`}
        >
          <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
            <Link href="/" className="rounded-sm">
              <Wordmark />
            </Link>

            <nav aria-label="Main" ref={navRef} className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {navGroups.map((g) => {
                  if ('href' in g) {
                    const active = isActive(pathname, g.href);
                    return (
                      <li key={g.label}>
                        <Link href={g.href} aria-current={active ? 'page' : undefined} className={`${linkBase} ${tone} ${active ? current : ''}`}>
                          {g.label}
                        </Link>
                      </li>
                    );
                  }
                  const isOpen = group === g.label;
                  const childActive = g.items.some((i) => isActive(pathname, i.href));
                  const panelId = `nav-${g.label.replace(/\s+/g, '-').toLowerCase()}`;
                  return (
                    <li
                      key={g.label}
                      className="relative"
                      onMouseEnter={() => setGroup(g.label)}
                      onMouseLeave={() => setGroup((cur) => (cur === g.label ? null : cur))}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setGroup((cur) => (cur === g.label ? null : cur));
                      }}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={isOpen ? panelId : undefined}
                        // Keyboard activation (detail 0) toggles; a mouse click keeps the hover-opened panel open.
                        onClick={(e) => setGroup(e.detail === 0 && isOpen ? null : g.label)}
                        className={`${linkBase} ${tone} ${childActive ? current : ''}`}
                      >
                        {g.label}
                        <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <ul
                          id={panelId}
                          className="absolute left-0 top-full z-10 w-72 rounded-[var(--radius-md)] border border-rule bg-white p-2 text-ink shadow-[0_24px_48px_-24px_rgb(20_18_15/0.35)]"
                        >
                          {g.items.map((item) => {
                            const active = isActive(pathname, item.href);
                            return (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  aria-current={active ? 'page' : undefined}
                                  className="block rounded-[var(--radius-md)] px-3 py-2.5 hover:bg-band"
                                >
                                  <span className={`block font-medium ${active ? 'text-accent' : ''}`}>{item.label}</span>
                                  <span className="block text-sm text-ink-soft">{item.hint}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/donate"
                aria-current={isActive(pathname, '/donate') ? 'page' : undefined}
                className={`hidden min-h-11 items-center gap-1.5 rounded-sm px-3 text-[0.95rem] font-medium transition-colors lg:inline-flex ${tone}`}
              >
                <Heart aria-hidden="true" className="h-4 w-4" />
                Donate <span className="sr-only">(demo)</span>
              </Link>
              <Link
                href="/volunteer"
                className="hidden min-h-11 items-center rounded-[var(--radius-md)] bg-accent px-5 font-medium text-white transition-colors hover:bg-accent-dark sm:inline-flex"
              >
                Get Involved
              </Link>
              <button
                ref={buttonRef}
                type="button"
                className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border px-3 font-medium lg:hidden ${
                  transparent ? 'border-white' : 'border-ink'
                }`}
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
      </div>
      {/* Pushes content below the header on routes that do not start with a photograph. */}
      {!hero && <div aria-hidden="true" className="h-[72px]" />}

      {/* Outside the header so no ancestor can become the containing block of this fixed panel. */}
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
            className="on-dark fixed inset-0 z-50 overflow-y-auto bg-ink text-white"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="menu-inner relative mx-auto flex min-h-full w-full max-w-[1240px] flex-col px-4 pb-10 sm:px-6 lg:px-10">
              <div className="flex h-[72px] items-center justify-between">
                <h2 id="mobile-menu-title" className="font-display text-xl font-medium">
                  Menu
                </h2>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-white px-3 font-medium"
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
                          className={`flex items-baseline gap-4 py-3 font-display text-[1.75rem] leading-tight hover:text-accent-tint ${
                            active ? 'text-accent-tint' : ''
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
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/volunteer" className="inline-flex min-h-12 items-center rounded-[var(--radius-md)] bg-accent px-6 py-3 font-medium text-white">
                  Get Involved
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-md)] border border-white px-5 py-3 font-medium text-white"
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
