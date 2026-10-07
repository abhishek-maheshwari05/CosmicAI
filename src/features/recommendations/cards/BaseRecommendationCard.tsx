import { ChevronRight } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PressableScale } from '../../../components/common/PressableScale';
import { colors, radius, spacing, type } from '../../../theme';
import type { RecommendationCardProps } from '../types';

export const CARD_WIDTH = 196;

/** Default visual for every recommendation type. Specialised cards compose it. */
export const BaseRecommendationCard = memo(function BaseRecommendationCard({
  item,
  definition,
  onPress,
  children,
}: RecommendationCardProps & { children?: React.ReactNode }) {
  const Icon = definition.icon;
  return (
    <PressableScale
      onPress={onPress}
      style={styles.card}
      accessibilityRole="button"
      accessibilityLabel={`${definition.label}: ${item.title}`}>
      <View style={styles.header}>
        <View style={[styles.iconTile, { backgroundColor: definition.accent + '1F' }]}>
          <Icon size={16} color={definition.accent} strokeWidth={2} />
        </View>
        <Text style={styles.label}>{definition.label}</Text>
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
      <View style={styles.footer}>
        <Text style={styles.cta}>{item.ctaLabel ?? definition.defaultCta}</Text>
        <ChevronRight size={16} color={colors.textSecondary} strokeWidth={2} />
      </View>
    </PressableScale>
  );
});

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    minHeight: 148,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  iconTile: { width: 30, height: 30, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  label: { ...type.micro, color: colors.textMuted },
  title: { fontSize: 15, lineHeight: 20, fontWeight: '600', color: colors.text },
  subtitle: { ...type.caption, color: colors.textMuted, marginTop: 3 },
  spacer: { flex: 1, minHeight: spacing.md },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderStrong,
    paddingTop: 10,
  },
  cta: { ...type.label, color: colors.text },
});
