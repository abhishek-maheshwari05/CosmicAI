import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../theme';

export const DateSeparator = memo(function DateSeparator({ label }: { label: string }) {
  return (
    <View style={styles.row} accessibilityRole="header">
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
});

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.xl, marginVertical: spacing.md },
  line: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  label: { color: colors.textMuted, fontSize: 11, fontWeight: '600', marginHorizontal: spacing.md },
});
