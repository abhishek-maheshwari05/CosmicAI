import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, spacing, type } from '../../theme';

export const DateSeparator = memo(function DateSeparator({ label }: { label: string }) {
  return (
    <Text style={styles.label} accessibilityRole="header">
      {label}
    </Text>
  );
});

const styles = StyleSheet.create({
  label: { ...type.micro, fontWeight: '600', color: colors.textMuted, textAlign: 'center', marginVertical: spacing.lg },
});
