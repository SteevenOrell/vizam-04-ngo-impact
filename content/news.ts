import type { NewsItem } from './types';

// Fictional news, events and field stories for a fictional organization.
export const newsItems: NewsItem[] = [
  {
    slug: 'mangrove-planting-weekend',
    type: 'event',
    title: 'Mangrove planting weekend on the Kestrel Coast',
    date: '2026-11-21',
    time: '07:30–13:00',
    location: 'Kestrel Coast, north nursery',
    summary: 'Join fishing families for two mornings of planting at low tide. Tools, boots and lunch provided.',
    body: [
      'Volunteers work alongside paid community planters, two mornings, timed to the low tide.',
      'No experience needed. Boots, gloves and lunch are provided; please bring a hat and water bottle.',
      'Registration is through the Volunteer page (demo form in this concept).',
    ],
    image: { src: '/images/seedling-planting.webp', alt: 'Hands firming the soil around a newly planted seedling.' },
    theme: 'climate',
  },
  {
    slug: 'open-data-day-2026',
    type: 'event',
    title: 'Open data day: map your flood routes',
    date: '2026-12-05',
    time: '10:00–16:00',
    location: 'Online and Tamsin Delta community hall',
    summary: 'A remote-friendly mapping session to digitise the flood routes drawn by delta youth groups.',
    body: [
      'Remote volunteers trace routes from walk photos; in the hall, youth groups check every line.',
      'All data is published openly, owned by the villages that collected it.',
    ],
    image: { src: '/images/flood-maps.webp', alt: 'Young people studying a large paper map together on the grass.' },
    theme: 'digital',
  },
  {
    slug: 'reading-rooms-four-open',
    type: 'news',
    title: 'Four reading rooms now open in the Ombra Highlands',
    date: '2026-10-14',
    summary: 'Facilitators report steady lending in the first months, with the most requests for local-language stories.',
    body: [
      'Four of six planned reading rooms are open in community halls across the Ombra Highlands.',
      'Facilitators asked for more picture books in two local languages; a writing workshop with local authors is planned for December.',
    ],
    image: { src: '/images/classroom.webp', alt: 'Pupils working at desks in a bright classroom.' },
    theme: 'learning',
  },
  {
    slug: 'mechanic-training-saren',
    type: 'story',
    title: 'Field story: the valley’s new mechanics',
    date: '2026-09-30',
    summary: 'Sixteen newly trained mechanics now share one repair channel across eight villages.',
    body: [
      'The first cohort trained on the hand pumps their villages chose, then practised on Tapline repair tickets.',
      'The committees set a rule of their own: every village has at least one woman mechanic.',
    ],
    image: { src: '/images/water-carriers.webp', alt: 'Two women carrying water containers along a track.', position: '50% 12%' },
    theme: 'water',
  },
  {
    slug: 'annual-transparency-report',
    type: 'news',
    title: 'Our transparency report: where every dollar went',
    date: '2026-09-02',
    summary: 'A plain-language breakdown of spending by programme, fundraising and administration (illustrative).',
    body: [
      'Each year we publish where money went, what worked and what did not.',
      'This concept site shows illustrative figures for a fictional organization; see the Impact page.',
    ],
    image: { src: '/images/team-review.webp', alt: 'Four people reviewing documents together at a wooden table.' },
  },
  {
    slug: 'volunteer-info-evening',
    type: 'event',
    title: 'Volunteer information evening',
    date: '2027-01-14',
    time: '18:30–20:00',
    location: 'Online',
    summary: 'Meet the volunteer coordinators and hear about field days, remote mapping and code club mentoring.',
    body: ['An hour of short talks and questions. A captioned recording will be shared afterwards.'],
    image: { src: '/images/volunteer-lead.webp', alt: 'A volunteer lead smiles, holding a clipboard, as others collect litter.' },
  },
  {
    slug: 'cold-store-one-year',
    type: 'story',
    title: 'Field story: a year of the fishers’ cold store',
    date: '2026-08-18',
    summary: 'The cooperative now sets its own selling days. Members say the biggest change is time.',
    body: [
      'Before the cold store, catches had to be sold the same morning. Now the cooperative decides when to sell.',
      'Members used the Open Market Ledger to track prices through the season.',
    ],
    image: { src: '/images/cold-store.webp', alt: 'Crates of fish on ice in a market cold store.' },
    theme: 'livelihoods',
  },
  {
    slug: 'seed-library-handover',
    type: 'news',
    title: 'Highland Seed Library handed over to the farmers’ union',
    date: '2026-07-01',
    summary: 'The seed library is now fully run by the farmers who use it.',
    body: ['Weftline’s role ends where the community’s begins. The union now runs lending, storage and records.'],
    image: { src: '/images/seed-grain.webp', alt: 'A woman lets harvested grain fall from her hands.' },
    theme: 'livelihoods',
  },
  {
    slug: 'tideline-maps-open-source',
    type: 'news',
    title: 'Tideline Maps is now open source',
    date: '2026-06-12',
    summary: 'The community flood-mapping tool is published under an open licence with maintainer guides.',
    body: ['Any community group can use, adapt and host Tideline Maps. Documentation is written for first-time maintainers.'],
    image: { src: '/images/code-club.webp', alt: 'A teacher guiding pupils at computers.' },
    theme: 'digital',
  },
  {
    slug: 'rain-gardens-dry-season',
    type: 'story',
    title: 'Field story: rain gardens in the dry season',
    date: '2026-05-20',
    summary: 'Neighbourhood associations on the Lowmere Plains report tanks still holding water into May.',
    body: ['The associations track tank levels on Tapline and share water by an agreed rota.'],
    image: { src: '/images/riverbank-planting.webp', alt: 'Volunteers planting along a river bank.' },
    theme: 'water',
  },
  {
    slug: 'nursery-open-day',
    type: 'event',
    title: 'Community nursery open day',
    date: '2026-04-25',
    time: '09:00–12:00',
    location: 'Kestrel Coast, south nursery',
    summary: 'See how seedlings are raised, and meet the nursery teams.',
    body: ['A morning tour of the nursery with the teams who run it.'],
    image: { src: '/images/tree-planting.webp', alt: 'A volunteer and a child planting a young tree together.' },
    theme: 'climate',
  },
  {
    slug: 'listening-tour-2026',
    type: 'news',
    title: 'Listening tour: what 40 communities asked for',
    date: '2026-03-03',
    summary: 'Before every new programme cycle we ask first. Water, evening light and fair prices topped the list.',
    body: ['Staff and volunteers held open meetings in 40 communities. Requests shape the next three years of campaigns.'],
    image: { src: '/images/community-circle.webp', alt: 'People sitting in a circle of chairs on a lawn.' },
  },
];

export function getNewsItem(slug: string) {
  return newsItems.find((n) => n.slug === slug);
}

/** Newest first. */
export function sortedNews(items: NewsItem[] = newsItems) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}
