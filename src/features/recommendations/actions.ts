import { showDialog } from '../../components/dialog/dialogStore';
import type { Recommendation } from '../../types/conversation';
import type { RecommendationDefinition } from './types';

/** Placeholder action. Real implementations would navigate or open a sheet. */
export const showRecommendationDialog =
  (def: Pick<RecommendationDefinition, 'label' | 'icon' | 'accent' | 'defaultCta'>) => (item: Recommendation) =>
    showDialog({
      icon: def.icon,
      accent: def.accent,
      title: item.title,
      message: item.subtitle ?? `${def.label} experiences are coming soon.`,
      actions: [{ text: 'Not now', style: 'cancel' }, { text: item.ctaLabel ?? def.defaultCta }],
    });
