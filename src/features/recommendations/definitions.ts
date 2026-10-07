import { colors } from '../../theme';
import { showRecommendationAlert } from './actions';
import { registerRecommendation } from './registry';
import { ConsultationCard } from './cards/ConsultationCard';
import { PromotionCard } from './cards/PromotionCard';
import type { RecommendationDefinition } from './types';

/**
 * Single place where recommendation types are declared. Imported once for its
 * side effects (see App.tsx). A future type is one entry here — no changes to
 * the message list, bubbles or store.
 */
const definitions: Omit<RecommendationDefinition, 'onPress'>[] = [
  { type: 'gemstone', label: 'Gemstone', icon: '💎', accent: '#60A5FA', defaultCta: 'View stone' },
  { type: 'tarot', label: 'Tarot', icon: '🔮', accent: '#C084FC', defaultCta: 'Draw cards' },
  { type: 'consultation', label: 'Consult', icon: '👨‍🏫', accent: colors.human, defaultCta: 'Chat now', Card: ConsultationCard },
  { type: 'article', label: 'Read', icon: '📖', accent: '#34D399', defaultCta: 'Read article' },
  { type: 'promotion', label: 'Offer', icon: '🎁', accent: colors.gold, defaultCta: 'Claim offer', Card: PromotionCard },
  { type: 'remedy', label: 'Remedy', icon: '🪔', accent: '#FB923C', defaultCta: 'See remedy' },
  { type: 'panchang', label: 'Panchang', icon: '📅', accent: '#F472B6', defaultCta: 'Open' },
];

definitions.forEach(def => registerRecommendation({ ...def, onPress: showRecommendationAlert(def.label) }));

/** Used when the backend sends a type this build doesn't know yet. */
export const fallbackDefinition: RecommendationDefinition = {
  type: 'unknown',
  label: 'Explore',
  icon: '✨',
  accent: colors.primary,
  defaultCta: 'Explore',
  onPress: showRecommendationAlert('Explore'),
};
