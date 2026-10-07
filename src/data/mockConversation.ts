import type { ApiMessage, Recommendation } from '../types/conversation';

const HOUR = 60 * 60 * 1000;
const iso = (msAgo: number) => new Date(Date.now() - msAgo).toISOString();

/** Payload from the brief, extended with timestamps so date separators can be demoed. */
export const mockConversation: ApiMessage[] = [
  { id: '1', type: 'system', text: 'Your session with AI Astrologer has started.', createdAt: iso(26 * HOUR) },
  { id: '2', type: 'user', text: 'Can you tell me about my career this year?', createdAt: iso(26 * HOUR - 60_000) },
  {
    id: '3',
    type: 'ai',
    createdAt: iso(26 * HOUR - 90_000),
    text: 'I can already see a strong Saturn influence in your chart. Based on this, here are a few recommendations that may help you.',
    recommendations: [
      { id: '1', type: 'gemstone', title: 'Blue Sapphire', subtitle: 'Recommended for Saturn' },
      { id: '2', type: 'tarot', title: 'Career Tarot Reading' },
      { id: '3', type: 'consultation', title: 'Talk to an Astrologer' },
      { id: '4', type: 'article', title: 'Understanding Saturn Mahadasha' },
    ],
  },
  {
    id: '4',
    type: 'human',
    authorName: 'Acharya Vinod',
    text: 'I also recommend focusing on your upcoming Jupiter transit.',
    createdAt: iso(25 * HOUR),
  },
  {
    id: '5',
    type: 'human',
    authorName: 'Acharya Vinod',
    text: 'It begins next month and favours new opportunities.',
    createdAt: iso(25 * HOUR - 30_000),
  },
];

/** Canned AI replies used by the mock "send" endpoint, chosen by keyword. */
export const mockAiReplies: { match: RegExp; text: string; recommendations?: Recommendation[] }[] = [
  {
    match: /love|relationship|marriage|partner/i,
    text: 'Venus is moving into your 7th house — a gentle, supportive period for relationships.',
    recommendations: [
      { id: 'r1', type: 'tarot', title: 'Love Tarot Reading', subtitle: '3-card spread' },
      { id: 'r2', type: 'remedy', title: 'Friday Venus Remedy', subtitle: 'White flowers & ghee lamp' },
      { id: 'r3', type: 'promotion', title: '50% off Couple Report', subtitle: 'Ends tonight', ctaLabel: 'Claim' },
    ],
  },
  {
    match: /today|panchang|muhurat|day/i,
    text: 'Here is today’s Panchang. Shukla Paksha with an auspicious Abhijit Muhurat around noon.',
    recommendations: [
      { id: 'p1', type: 'panchang', title: 'Today’s Panchang', subtitle: 'Tithi, Nakshatra, Yoga' },
      { id: 'p2', type: 'remedy', title: 'Saturday Remedy', subtitle: 'Mustard oil diya' },
      // Deliberately unknown type → exercises the fallback renderer.
      { id: 'p3', type: 'kundli_match', title: 'Kundli Matching', subtitle: 'Coming soon' },
    ],
  },
];

export const defaultAiReply =
  'The stars suggest patience right now. Ask me about your career, love life or today’s Panchang for specific guidance.';
