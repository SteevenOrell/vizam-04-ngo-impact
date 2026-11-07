import Image from 'next/image';
import type { ReactNode } from 'react';
import type { ImageRef } from '@/content/types';

/** Full-bleed photograph with a large overlaid statement. The scrim is only as strong as AA contrast needs. */
export function PhotoBand({
  image,
  eyebrow,
  children,
  action,
  className = '',
}: {
  image: ImageRef;
  eyebrow?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`on-dark relative isolate flex min-h-[28rem] items-end overflow-hidden text-white md:min-h-[36rem] ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: image.position ?? '50% 50%' }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/55 to-black/40" />
      <div className="mx-auto w-full max-w-[1240px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        {eyebrow && (
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="inline-block h-2 w-2 bg-accent-tint" />
            {eyebrow}
          </p>
        )}
        <p className="font-display max-w-4xl text-[clamp(1.75rem,1.2rem+2.4vw,3.5rem)] font-light leading-[1.12] tracking-tight text-balance">{children}</p>
        {action && <div className="mt-8">{action}</div>}
      </div>
    </section>
  );
}
