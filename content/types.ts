// Content types shaped like headless-CMS documents. Replacing the local modules with CMS fetchers that return these
// types is the only change needed to move content out of the repo.

export const THEMES = ['water', 'learning', 'livelihoods', 'climate', 'digital'] as const;
export type Theme = (typeof THEMES)[number];

export const REGIONS = ['saren-valley', 'kestrel-coast', 'ombra-highlands', 'tamsin-delta', 'lowmere-plains'] as const;
export type Region = (typeof REGIONS)[number];

export const CAMPAIGN_STATUSES = ['active', 'upcoming', 'completed'] as const;
export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

export const NEWS_TYPES = ['news', 'event', 'story'] as const;
export type NewsType = (typeof NEWS_TYPES)[number];

export type ImageRef = {
  src: string;
  alt: string;
  /** CSS object-position for art direction, e.g. "50% 30%". */
  position?: string;
};

export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'note'; title: string; text: string };

export type Milestone = { date: string; label: string; done: boolean };

export type Campaign = {
  slug: string;
  title: string;
  theme: Theme;
  region: Region;
  status: CampaignStatus;
  summary: string;
  /** Illustrative goal and raised amounts in USD for a fictional organization. */
  goal: number;
  raised: number;
  supporters: number;
  startDate: string;
  endDate: string;
  image: ImageRef;
  digitalTool: string;
  story: Block[];
  milestones: Milestone[];
  partners: string[];
  programme: string;
};

export type Programme = {
  slug: string;
  name: string;
  theme: Theme;
  lede: string;
  description: string;
  approach: string[];
  digitalTool: { name: string; text: string };
  image: ImageRef;
};

export type NewsItem = {
  slug: string;
  type: NewsType;
  title: string;
  date: string;
  /** Events only. */
  location?: string;
  time?: string;
  summary: string;
  body: string[];
  image: ImageRef;
  theme?: Theme;
};

export type ImpactStat = {
  id: string;
  value: string;
  label: string;
  note: string;
  theme?: Theme;
};
