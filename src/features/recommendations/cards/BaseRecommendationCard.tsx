import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PressableScale } from '../../../components/common/PressableScale';
import { colors, radius, spacing } from '../../../theme';
import type { RecommendationCardProps } from '../types';

export const CARD_WIDTH = 168;

/** Default visual for every recommendation type. Specialised cards compose it. */
export const BaseRecommendationCard = memo(function BaseRecommendationCard({
  item,
  definition,
  onPress,
  children,
}: RecommendationCardProps & { children?: React.ReactNode }) {
  return (
    <PressableScale
      onPress={onPress}
      style={[styles.card, { borderColor: definition.accent + '55' }]}
      accessibilityRole="button"
      accessibilityLabel={`${definition.label}: ${item.title}`}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: definition.accent + '26' }]}>
          <Text style={styles.icon}>{definition.icon}</Text>
        </View>
        <Text style={[styles.label, { color: definition.accent }]}>{definition.label.toUpperCase()}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      {item.subtitle ? (
        <Text style={styles.subtitle} numberOfLines={2}>
          {item.subtitle}
        </Text>
      ) : null}
      {children}
      <View style={styles.spacer} />
      <Text style={[styles.cta, { color: definition.accent }]}>{item.ctaLabel ?? definition.defaultCta} →</Text>
    </PressableScale>
  );
});

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    minHeight: 150,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  iconWrap: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 16 },
  label: { marginLeft: spacing.sm, fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  title: { color: colors.text, fontSize: 15, fontWeight: '600' },
  subtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  spacer: { flex: 1, minHeight: spacing.sm },
  cta: { fontSize: 13, fontWeight: '600' },
});
