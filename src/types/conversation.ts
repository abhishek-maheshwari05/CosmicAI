/**
 * Domain model for the conversation. The wire format (see data/mockConversation)
 * is normalised into these types by services/conversationApi.
 */

export type Sender = 'user' | 'ai' | 'human' | 'system';

/** Delivery lifecycle — only meaningful for messages authored locally. */
export type DeliveryStatus = 'sending' | 'sent' | 'failed';

export type FeedbackReason = 'inaccurate' | 'too_generic' | 'didnt_help' | 'too_long';

export interface Feedback {
  rating: 'like' | 'dislike' | null;
  reasons: FeedbackReason[];
}

/**
 * A recommendation is intentionally open-ended: `type` is a string (not a closed
 * union) so the backend can ship new experiences before the app knows about them.
 * Unknown types are rendered by a generic fallback card.
 */
export interface Recommendation {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  /** CTA override coming from the backend, e.g. "Book now". */
  ctaLabel?: string;
  /** Free-form, type-specific data (price, duration, deeplink, ...). */
  payload?: Record<string, unknown>;
}

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  createdAt: number;
  /** Display name for human astrologers etc. */
  authorName?: string;
  recommendations?: Recommendation[];
  status?: DeliveryStatus;
  replyToId?: string;
  feedback?: Feedback;
}

/** Raw API shape (as provided in the brief). */
export interface ApiMessage {
  id: string;
  type: Sender;
  text: string;
  createdAt?: string;
  authorName?: string;
  recommendations?: Recommendation[];
}
