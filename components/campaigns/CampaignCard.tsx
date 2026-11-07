import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { Campaign } from '@/content/types';
import { fundedPercent } from '@/content/campaigns';
import { regionLabels, statusLabels, themeLabels } from '@/content/site';
import { formatMoney } from '@/lib/format';
import { Tag, WovenProgress } from '@/components/ui/primitives';

const statusTone = { active: 'accent', upcoming: 'ink', completed: 'grey' } as const;

export function CampaignCard({ campaign, headingLevel = 'h3' }: { campaign: Campaign; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  const pct = fundedPercent(campaign);
  return (
    <article className="group relative flex h-full flex-col focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-4 focus-within:outline-accent-dark">
      <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-band">
        <Image
          src={campaign.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-weave)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          style={{ objectPosition: campaign.image.position ?? '50% 50%' }}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Tag tone={statusTone[campaign.status]}>{statusLabels[campaign.status]}</Tag>
        </div>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
          <span className="text-accent">{themeLabels[campaign.theme]}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            {regionLabels[campaign.region]}
          </span>
        </p>
        <H className="mt-3 font-display text-[1.5rem] leading-tight group-hover:text-accent">
          <Link href={`/campaigns/${campaign.slug}`} className="outline-none after:absolute after:inset-0 after:content-['']">
            {campaign.title}
          </Link>
        </H>
        <p className="mt-2 text-ink-soft">{campaign.summary}</p>
        <div className="mt-auto pt-5">
          <WovenProgress percent={pct} label={`${campaign.title}: funding progress`} />
          <p className="tabular mt-2 flex justify-between gap-2 text-sm">
            <span>
              <strong>{formatMoney(campaign.raised)}</strong> of {formatMoney(campaign.goal)}
            </span>
            <span className="text-ink-soft">{pct}% · illustrative</span>
          </p>
        </div>
      </div>
    </article>
  );
}
