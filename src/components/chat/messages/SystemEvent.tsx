import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, spacing, type } from '../../../theme';
import type { MessageRendererProps } from './types';

export function SystemEvent({ message }: MessageRendererProps) {
  return <Text style={styles.text}>{message.text}</Text>;
}

const styles = StyleSheet.create({
  text: { ...type.caption, color: colors.textMuted, textAlign: 'center', marginHorizontal: spacing.xxl },
});
