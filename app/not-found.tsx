import { ButtonLink, Container } from '@/components/ui/primitives';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <Container className="relative py-24 md:py-32">
      <p className="eyebrow text-madder">Error 404</p>
      <h1 className="display-lg mt-4 max-w-3xl">This thread does not lead anywhere.</h1>
      <p className="mt-6 max-w-xl text-lg text-ink-soft">
        The page may have moved, or the link may be mistyped. Try one of these instead.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/" arrow>
          Back to home
        </ButtonLink>
        <ButtonLink href="/campaigns" variant="secondary">
          Browse campaigns
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact us
        </ButtonLink>
      </div>
      <svg aria-hidden="true" viewBox="0 0 400 60" className="mt-16 w-full max-w-xl">
        <path d="M0 30 C 60 0, 100 60, 160 30 S 230 0, 250 28" fill="none" stroke="var(--color-madder)" strokeWidth="4" strokeLinecap="round" />
        <path d="M262 34 l14 -10 M270 40 l12 -14" stroke="var(--color-madder)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </Container>
  );
}
