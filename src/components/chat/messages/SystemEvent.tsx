import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../../theme';
import type { MessageRendererProps } from './types';

export function SystemEvent({ message }: MessageRendererProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🪐 {message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    marginHorizontal: spacing.xl,
  },
  text: { color: colors.textMuted, fontSize: 12, textAlign: 'center' },
});
