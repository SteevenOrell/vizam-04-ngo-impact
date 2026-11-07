import type { Programme } from './types';

export const programmes: Programme[] = [
  {
    slug: 'water-commons',
    name: 'Water Commons',
    theme: 'water',
    lede: 'Safe water points that the people who use them design, run and repair.',
    description:
      'Village water committees choose the site, the technology and the fee model. Weftline funds the build, trains two mechanics per committee and stays on call for three years, then steps back.',
    approach: [
      'Committee-led site selection and design',
      'Two trained local mechanics per water point',
      'Spare-parts fund held by the community',
      'Monthly water-quality checks logged by committee members',
    ],
    digitalTool: {
      name: 'Tapline',
      text: 'A text-message service: anyone can report a broken tap by SMS, and the mechanic, the committee and Weftline see the same repair ticket.',
    },
    image: { src: '/images/water-carriers.webp', alt: 'Two women carry water containers along a dirt track with mountains behind.', position: '50% 12%' },
  },
  {
    slug: 'open-learning',
    name: 'Open Learning',
    theme: 'learning',
    lede: 'Reading rooms, evening classes and teacher circles that stay open after funding ends.',
    description:
      'We work with existing schools and community halls instead of building new ones. Funding goes to books in local languages, solar lighting for evening study and a stipend for community reading facilitators.',
    approach: [
      'Reading rooms in existing community buildings',
      'Books in the languages children speak at home',
      'Peer circles where teachers share lesson plans',
      'Solar lighting for evening classes',
    ],
    digitalTool: {
      name: 'Shelf',
      text: 'An offline-first library catalogue that runs on a single low-cost tablet and syncs when a connection is available.',
    },
    image: { src: '/images/classroom.webp', alt: 'A bright classroom with pupils working at wooden desks.', position: '50% 45%' },
  },
  {
    slug: 'fair-livelihoods',
    name: 'Fair Livelihoods',
    theme: 'livelihoods',
    lede: 'Cooperatives, seed libraries and shared infrastructure that keep more value in local hands.',
    description:
      'Producers decide what they need: a cold store, a seed bank, a shared market stall. Weftline co-funds the asset, supports cooperative governance and helps members keep simple, shared books.',
    approach: [
      'Co-funded shared assets owned by cooperatives',
      'Seed libraries for locally adapted varieties',
      'Bookkeeping and governance mentoring',
      'Fair-price market days organised with municipalities',
    ],
    digitalTool: {
      name: 'Open Market Ledger',
      text: 'A shared price board and record book for cooperatives, usable on basic phones, so every member can see the same numbers.',
    },
    image: { src: '/images/bean-sorting.webp', alt: 'Women sorting beans by hand along a long table.', position: '50% 50%' },
  },
  {
    slug: 'climate-resilience',
    name: 'Climate Resilience',
    theme: 'climate',
    lede: 'Mangrove belts, rain gardens and terraces that protect homes and harvests.',
    description:
      'Nature-based protection planned with the people who live behind it. Communities choose the species and the sites; Weftline funds nurseries, tools and the paid days that planting and maintenance take.',
    approach: [
      'Community nurseries for native species',
      'Paid planting and maintenance days',
      'Survival counts after 6, 12 and 24 months',
      'Shared early-warning plans for floods and storms',
    ],
    digitalTool: {
      name: 'Tideline Maps',
      text: 'Community flood maps drawn on phones during walks along the shore and riverbanks, then printed for village halls.',
    },
    image: { src: '/images/seedling-planting.webp', alt: 'Hands firming the soil around a newly planted seedling.', position: '50% 50%' },
  },
  {
    slug: 'digital-commons',
    name: 'Digital Commons',
    theme: 'digital',
    lede: 'Open, low-cost tools that communities own, and the skills to change them.',
    description:
      'Every tool Weftline builds is open source, works on basic phones or offline, and comes with local people trained to maintain it. Youth code clubs turn users into maintainers.',
    approach: [
      'Open-source tools designed for basic phones and weak signal',
      'Data owned by the community that collects it',
      'Youth code clubs and paid maintainer roles',
      'No tool launches without an exit plan',
    ],
    digitalTool: {
      name: 'Weftline Toolkit',
      text: 'The shared codebase behind Tapline, Shelf, Open Market Ledger and Tideline Maps, documented for local maintainers.',
    },
    image: { src: '/images/code-club.webp', alt: 'A teacher guiding pupils at computers.', position: '50% 50%' },
  },
];

export function getProgramme(slug: string) {
  return programmes.find((p) => p.slug === slug);
}
