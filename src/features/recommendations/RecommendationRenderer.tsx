import React, { memo, useCallback } from 'react';
import type { Recommendation } from '../../types/conversation';
import { BaseRecommendationCard } from './cards/BaseRecommendationCard';
import { fallbackDefinition } from './definitions';
import { getRecommendationDefinition } from './registry';

/** Resolves a recommendation to its definition + card. Knows nothing about specific types. */
export const RecommendationRenderer = memo(function RecommendationRenderer({ item }: { item: Recommendation }) {
  const definition = getRecommendationDefinition(item.type) ?? fallbackDefinition;
  const Card = definition.Card ?? BaseRecommendationCard;
  const onPress = useCallback(() => definition.onPress(item), [definition, item]);
  return <Card item={item} definition={definition} onPress={onPress} />;
});
