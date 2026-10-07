import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { PressableScale } from './PressableScale';

export function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <PressableScale onPress={onPress} style={styles.button} accessibilityRole="button">
      <Text style={styles.text}>{title}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: colors.primary, borderRadius: radius.pill, paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  text: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
