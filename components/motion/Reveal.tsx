'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Props = {
  children: ReactNode;
  className?: string;
  /** Animate direct children marked with data-reveal-item one after another. */
  stagger?: boolean;
  as?: 'div' | 'section' | 'ul' | 'ol';
};

/**
 * Calm scroll reveal. Content is rendered visible on the server; elements already on screen at load, users who
 * prefer reduced motion and visitors without JavaScript never see it hidden.
 */
export function Reveal({ children, className = '', stagger = false, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already visible: leave it alone
      const targets = stagger ? Array.from(el.querySelectorAll<HTMLElement>(':scope > [data-reveal-item]')) : [el];
      if (!targets.length) return;
      gsap.set(targets, { autoAlpha: 0, y: 28 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => gsap.to(targets, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: stagger ? 0.09 : 0 }),
      });
    });
    return () => mm.revert();
  }, [stagger]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
