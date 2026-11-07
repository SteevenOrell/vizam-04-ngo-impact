import Link from 'next/link';
import { ArrowLink, ButtonLink, Container, Eyebrow } from '@/components/ui/primitives';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <Container className="py-24 md:py-36">
      <Eyebrow className="mb-6">Error 404</Eyebrow>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <h1 className="heading-xl lg:col-span-8">
          This thread <span className="title-muted">does not lead anywhere.</span>
        </h1>
        <div className="max-w-[30rem] lg:col-span-4">
          <p className="text-lg text-ink-soft">The page may have moved, or the link may be mistyped. Try one of these instead.</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/" arrow>
              Back to home
            </ButtonLink>
            <ArrowLink href="/campaigns">Browse campaigns</ArrowLink>
          </div>
          <p className="mt-6">
            <Link href="/contact" className="font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
