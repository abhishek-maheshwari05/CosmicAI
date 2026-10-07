import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme';
import type { RecommendationCardProps } from '../types';
import { BaseRecommendationCard } from './BaseRecommendationCard';

/** Example of a type-specific card: highlighted "limited time" ribbon. */
export function PromotionCard(props: RecommendationCardProps) {
  return (
    <BaseRecommendationCard {...props}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>LIMITED TIME</Text>
      </View>
    </BaseRecommendationCard>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    marginTop: 6,
    backgroundColor: colors.gold,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { color: '#1A1300', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
});
