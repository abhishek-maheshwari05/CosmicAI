import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../../theme';
import type { RecommendationCardProps } from '../types';
import { BaseRecommendationCard } from './BaseRecommendationCard';

/** Example of a type-specific card: highlighted "limited time" ribbon. */
export function PromotionCard(props: RecommendationCardProps) {
  return (
    <BaseRecommendationCard {...props}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Limited time</Text>
      </View>
    </BaseRecommendationCard>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    backgroundColor: colors.gold + '1F',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { color: colors.gold, fontSize: 10, fontWeight: '600' },
});
