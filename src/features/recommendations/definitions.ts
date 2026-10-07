import { BookOpen, CalendarDays, Flame, Gem, Gift, Sparkles, UserRound } from 'lucide-react-native';
import { colors } from '../../theme';
import { showRecommendationDialog } from './actions';
import { ConsultationCard } from './cards/ConsultationCard';
import { PromotionCard } from './cards/PromotionCard';
import { registerRecommendation } from './registry';
import type { RecommendationDefinition } from './types';

/**
 * Single place where recommendation types are declared. Imported once for its
 * side effects (see App.tsx). A future type is one entry here — no changes to
 * the message list, bubbles or store.
 */
const definitions: Omit<RecommendationDefinition, 'onPress'>[] = [
  { type: 'gemstone', label: 'Gemstone', icon: Gem, accent: '#6FA8F5', defaultCta: 'View stone' },
  { type: 'tarot', label: 'Tarot', icon: Sparkles, accent: '#A98BF5', defaultCta: 'Draw cards' },
  { type: 'consultation', label: 'Consultation', icon: UserRound, accent: '#4FC1A6', defaultCta: 'Start chat', Card: ConsultationCard },
  { type: 'article', label: 'Article', icon: BookOpen, accent: '#9AA3B5', defaultCta: 'Read' },
  { type: 'promotion', label: 'Offer', icon: Gift, accent: colors.gold, defaultCta: 'Claim offer', Card: PromotionCard },
  { type: 'remedy', label: 'Remedy', icon: Flame, accent: '#EE9A5D', defaultCta: 'See remedy' },
  { type: 'panchang', label: 'Panchang', icon: CalendarDays, accent: '#E07BA8', defaultCta: 'Open' },
];

definitions.forEach(def => registerRecommendation({ ...def, onPress: showRecommendationDialog(def) }));

/** Used when the backend sends a type this build doesn't know yet. */
const fallbackBase = { type: 'unknown', label: 'Explore', icon: Sparkles, accent: colors.primary, defaultCta: 'Explore' };
export const fallbackDefinition: RecommendationDefinition = { ...fallbackBase, onPress: showRecommendationDialog(fallbackBase) };
