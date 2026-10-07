import type { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { PressableScale } from './PressableScale';

interface Props {
  title: string;
  onPress: () => void;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'danger';
  flex?: boolean;
}

export function Button({ title, onPress, icon: Icon, variant = 'primary', flex }: Props) {
  const fg = variant === 'secondary' ? colors.text : '#fff';
  return (
    <PressableScale onPress={onPress} style={[styles.button, styles[variant], flex && styles.flex]} accessibilityRole="button">
      {Icon ? <Icon size={16} color={fg} strokeWidth={2.2} /> : null}
      <Text style={[styles.text, { color: fg }]}>{title}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    height: 44,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xl,
  },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surfaceAlt },
  danger: { backgroundColor: colors.danger },
  flex: { flex: 1 },
  text: { fontWeight: '600', fontSize: 15 },
});
