import Image from 'next/image';
import type { ReactNode } from 'react';
import type { ImageRef } from '@/content/types';

/** Large rounded card: photograph, dark gradient, text and one action. Use for a single featured item. */
export function FeatureCard({
  image,
  eyebrow,
  title,
  children,
  action,
  className = '',
}: {
  image: ImageRef;
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <article className={`on-dark relative isolate flex min-h-[30rem] items-end overflow-hidden rounded-[var(--radius-card)] text-white md:min-h-[34rem] ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 1140px, 100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: image.position ?? '50% 50%' }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/50 to-black/10" />
      <div className="grid w-full gap-6 p-6 sm:p-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          {eyebrow && (
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="inline-block h-2 w-2 bg-turmeric" />
              {eyebrow}
            </p>
          )}
          <h3 className="display-md">{title}</h3>
        </div>
        <div className="flex flex-col items-start gap-6 lg:col-span-5">
          {children && <div className="text-white/90">{children}</div>}
          {action}
        </div>
      </div>
    </article>
  );
}
