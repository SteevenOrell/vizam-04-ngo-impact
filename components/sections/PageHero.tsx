import Image from 'next/image';
import type { ReactNode } from 'react';
import { Eyebrow } from '@/components/ui/primitives';
import { ThreadLine } from '@/components/motion/ThreadLine';
import type { ImageRef } from '@/content/types';

/** Interior page hero: editorial split with a woven thread crossing from text to image. */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  image?: ImageRef;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-x-clip border-b border-rule">
      <div aria-hidden="true" className="warp absolute inset-y-0 right-0 w-1/2 text-ink opacity-60" />
      <div className="relative mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <div className={image ? 'lg:col-span-7' : 'lg:col-span-10'}>
          <Eyebrow className="mb-5 text-madder">{eyebrow}</Eyebrow>
          <h1 className="display-lg">{title}</h1>
          <div className="mt-6 max-w-2xl text-lg text-ink-soft md:text-xl">{lede}</div>
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-loom-deep lg:aspect-[4/5]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: image.position ?? '50% 50%' }}
              />
            </div>
            <ThreadLine d="M-5 70 C 20 40, 40 95, 60 60 S 95 30, 105 45" className="-left-10 -right-6 top-0 h-full w-[calc(100%+4rem)]" width={4} start="top 90%" end="bottom 20%" />
          </div>
        )}
      </div>
    </section>
  );
}
