import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme';
import type { RecommendationCardProps } from '../types';
import { BaseRecommendationCard } from './BaseRecommendationCard';

/** Example of a type-specific card: adds a live "online" indicator. */
export function ConsultationCard(props: RecommendationCardProps) {
  const online = (props.item.payload?.onlineCount as number | undefined) ?? 12;
  return (
    <BaseRecommendationCard {...props}>
      <View style={styles.row}>
        <View style={styles.dot} />
        <Text style={styles.text}>{online} astrologers online</Text>
      </View>
    </BaseRecommendationCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.success, marginRight: 6 },
  text: { color: colors.textMuted, fontSize: 12 },
});
