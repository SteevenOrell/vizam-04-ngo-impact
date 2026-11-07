import Image from 'next/image';
import type { ReactNode } from 'react';
import { Eyebrow } from '@/components/ui/primitives';
import type { ImageRef } from '@/content/types';

/**
 * Interior page hero: light, editorial. Eyebrow and a large two-tone title on the left, a narrow lede on the right,
 * then (optionally) one wide rounded photograph underneath. No text sits on the photograph, so contrast never depends on it.
 */
export function PageHero({
  eyebrow,
  title,
  titleMuted,
  lede,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  /** Second, grey tone of a two-tone title. */
  titleMuted?: ReactNode;
  lede?: ReactNode;
  image?: ImageRef;
  children?: ReactNode;
}) {
  return (
    <section className="relative">
      <div className="mx-auto w-full max-w-[1240px] px-4 pt-12 sm:px-6 md:pt-20 lg:px-10">
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h1 className="heading-lg lg:col-span-8">
            {title}
            {titleMuted && (
              <>
                {' '}
                <span className="title-muted">{titleMuted}</span>
              </>
            )}
          </h1>
          {lede && <div className="max-w-[30rem] text-lg text-ink-soft lg:col-span-4 lg:col-start-9">{lede}</div>}
        </div>
        {children && <div className="mt-10">{children}</div>}
        {image ? (
          <div className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-band sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1240px) 1160px, 100vw"
              className="object-cover"
              style={{ objectPosition: image.position ?? '50% 50%' }}
            />
          </div>
        ) : (
          <div className="pb-16 md:pb-24" />
        )}
      </div>
    </section>
  );
}
