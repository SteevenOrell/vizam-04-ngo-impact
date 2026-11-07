import Image from 'next/image';
import type { ImageRef } from '@/content/types';

export type CaptionedImage = ImageRef & { caption: string };

/** Two tall photographs side by side, each with a short caption underneath. The second is offset down. */
export function ImagePair({ images, className = '' }: { images: [CaptionedImage, CaptionedImage]; className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-5 ${className}`}>
      {images.map((img, i) => (
        <figure key={img.src} className={i === 1 ? 'mt-8 sm:mt-14' : ''}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] bg-loom-deep">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 24vw, 45vw"
              className="object-cover"
              style={{ objectPosition: img.position ?? '50% 50%' }}
            />
          </div>
          <figcaption className="mt-3 text-sm text-ink-soft">{img.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
