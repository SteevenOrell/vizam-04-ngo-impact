import { ButtonLink } from '@/components/ui/primitives';
import { ThreadLine } from '@/components/motion/ThreadLine';

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative overflow-hidden bg-ink text-loom">
      <div aria-hidden="true" className="warp absolute inset-0 opacity-50" />
      <ThreadLine d="M-2 80 C 15 20, 35 100, 55 45 S 85 10, 102 55" color="var(--color-turmeric)" className="inset-x-0 bottom-0 h-1/3 w-full opacity-60" width={3} />
      <div className="relative mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28 lg:px-10">
        <div>
          <p className="eyebrow text-turmeric">Pick up a thread</p>
          <h2 id="cta-title" className="display-lg mt-4">
            Give time, give skills, or give a little each month.
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-6">
          <p className="text-lg text-ink-muted">
            Volunteers plant, map, translate and mentor. Donors fund the parts, the training and the paid days that
            communities ask for. Both are demos on this concept site.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/volunteer" variant="light" arrow>
              Volunteer with us
            </ButtonLink>
            <ButtonLink href="/donate" variant="primary" className="border-2 border-loom/0">
              Donate (demo)
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
