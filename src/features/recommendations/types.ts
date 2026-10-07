import type { LucideIcon } from 'lucide-react-native';
import type { ComponentType } from 'react';
import type { Recommendation } from '../../types/conversation';

export interface RecommendationCardProps {
  item: Recommendation;
  definition: RecommendationDefinition;
  onPress: () => void;
}

/**
 * Everything the app needs to know about one recommendation type.
 * Adding a new experience = writing one of these and calling `registerRecommendation`.
 */
export interface RecommendationDefinition {
  type: string;
  label: string;
  icon: LucideIcon;
  accent: string;
  defaultCta: string;
  /** Optional bespoke renderer; defaults to the shared BaseRecommendationCard. */
  Card?: ComponentType<RecommendationCardProps>;
  /** What happens on tap — navigate, open a sheet, deeplink... Themed dialog for now. */
  onPress: (item: Recommendation) => void;
}
