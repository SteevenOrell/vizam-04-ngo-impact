import { Mail, MapPin, Newspaper } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/primitives';
import { ContactForm } from '@/components/forms/ContactForm';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Contact Weftline Collective (fictional organization, VIZAM concept project). Demo contact form.',
  path: '/contact',
  image: '/images/gathering-tree.webp',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write to us. We answer within five working days."
        lede={<p>Partnerships, press, volunteering or a question about a campaign. (In this concept, the form is a demo and the addresses are fictional.)</p>}
        image={{ src: '/images/gathering-tree.webp', alt: 'A small group sitting together in the shade of a tree.', position: '50% 50%' }}
      />
      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="font-display text-2xl font-bold">Other ways to reach us</h2>
          <dl className="mt-6 grid gap-6">
            <div className="flex gap-3">
              <dt>
                <Mail aria-hidden="true" className="mt-1 h-5 w-5 text-madder" />
                <span className="sr-only">Email</span>
              </dt>
              <dd>
                <a href={`mailto:${site.email}`} className="font-bold underline underline-offset-4 hover:text-madder">
                  {site.email}
                </a>
                <p className="text-sm text-ink-soft">Fictional address, not monitored.</p>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <Newspaper aria-hidden="true" className="mt-1 h-5 w-5 text-madder" />
                <span className="sr-only">Press</span>
              </dt>
              <dd>
                <a href={`mailto:${site.press}`} className="font-bold underline underline-offset-4 hover:text-madder">
                  {site.press}
                </a>
                <p className="text-sm text-ink-soft">Media requests (fictional).</p>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 text-madder" />
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
        <div className="lg:col-span-8">
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
