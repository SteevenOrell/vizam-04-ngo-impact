import { Mail, MapPin, Newspaper } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Eyebrow } from '@/components/ui/primitives';
import { ContactForm } from '@/components/forms/ContactForm';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Contact Weftline Collective (fictional organization, VIZAM concept project). Demo contact form.',
  path: '/contact',
  image: '/images/team-review.webp',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write to us."
        titleMuted="We answer within five working days."
        lede={<p>Partnerships, press, volunteering or a question about a campaign. (In this concept, the form is a demo and the addresses are fictional.)</p>}
        image={{ src: '/images/team-review.webp', alt: 'Four colleagues around a wooden table reviewing printed pages together.', position: '50% 45%' }}
      />
      <Container className="grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Eyebrow className="mb-5">Other ways to reach us</Eyebrow>
          <dl className="grid gap-8 border-t border-rule pt-8">
            <div className="flex gap-3">
              <dt>
                <Mail aria-hidden="true" className="mt-1 h-5 w-5 text-accent" />
                <span className="sr-only">Email</span>
              </dt>
              <dd>
                <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-4 hover:text-accent">
                  {site.email}
                </a>
                <p className="text-sm text-ink-soft">Fictional address, not monitored.</p>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <Newspaper aria-hidden="true" className="mt-1 h-5 w-5 text-accent" />
                <span className="sr-only">Press</span>
              </dt>
              <dd>
                <a href={`mailto:${site.press}`} className="font-medium underline underline-offset-4 hover:text-accent">
                  {site.press}
                </a>
                <p className="text-sm text-ink-soft">Media requests (fictional).</p>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 text-accent" />
                <span className="sr-only">Address</span>
              </dt>
              <dd>
                <address className="not-italic">
                  {site.address.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <p className="text-sm text-ink-soft">An invented place.</p>
              </dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
