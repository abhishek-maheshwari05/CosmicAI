import type { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { colors, radius } from '../../theme';

interface Props {
  icon: LucideIcon;
  onPress: () => void;
  label: string;
  size?: number;
  color?: string;
  active?: boolean;
  activeColor?: string;
  style?: StyleProp<ViewStyle>;
}

/** Compact icon-only button with a pressed background, used for toolbars. */
export function IconButton({ icon: Icon, onPress, label, size = 16, color = colors.textMuted, active, activeColor = colors.text, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={active !== undefined ? { selected: active } : undefined}
      style={({ pressed }) => [styles.button, (pressed || active) && styles.pressed, style]}>
      <Icon size={size} color={active ? activeColor : color} strokeWidth={2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { width: 32, height: 32, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  pressed: { backgroundColor: colors.surfaceAlt },
});
