import { ArrowLink, ButtonLink, Eyebrow } from '@/components/ui/primitives';
import { ThreadLine } from '@/components/motion/ThreadLine';

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-band">
      <ThreadLine d="M-2 80 C 15 20, 35 100, 55 45 S 85 10, 102 55" color="var(--color-accent)" className="inset-x-0 bottom-0 h-1/3 w-full opacity-25" width={2} />
      <div className="relative mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-20 sm:px-6 md:grid-cols-12 md:py-28 lg:px-10">
        <div className="md:col-span-7">
          <Eyebrow className="mb-5">Join the mission</Eyebrow>
          <h2 id="cta-title" className="heading-lg">
            Give time, give skills, <span className="title-muted">or give a little each month.</span>
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-8 md:col-span-5">
          <p className="max-w-md text-ink-soft">
            Volunteers plant, map, translate and mentor. Donors fund the parts, the training and the paid days that
            communities ask for. Both are demos on this concept site.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <ArrowLink href="/volunteer">Volunteer with us</ArrowLink>
            <ButtonLink href="/donate" variant="secondary">
              Donate (demo)
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
