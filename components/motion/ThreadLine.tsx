'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Props = {
  /** Path in a 0–100 × 0–100 box; it is stretched to the element's size. */
  d: string;
  className?: string;
  color?: string;
  width?: number;
  /** ScrollTrigger start/end. */
  start?: string;
  end?: string;
};

/**
 * The Weftline "thread": a line drawn as the visitor scrolls. Server-rendered fully drawn, so it is visible without
 * JavaScript and with reduced motion; GSAP only takes over when motion is allowed.
 */
export function ThreadLine({ d, className = '', color = 'var(--color-accent)', width = 3, start = 'top 85%', end = 'bottom 35%' }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Reveal left to right with a clip-path: works with non-scaling strokes on stretched SVGs.
      gsap.set(svg, { clipPath: 'inset(0% 100% 0% 0%)' });
      gsap.to(svg, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: svg, start, end, scrub: 0.8 },
      });
    });
    return () => mm.revert();
  }, [start, end]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute ${className}`}
    >
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
