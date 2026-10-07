import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useConversationStore } from '../../store/conversationStore';
import type { DeliveryStatus as Status } from '../../types/conversation';
import { colors } from '../../theme';

export function DeliveryStatus({ id, status }: { id: string; status?: Status }) {
  const retry = useConversationStore(s => s.retry);
  if (!status) return null;
  if (status === 'failed') {
    return (
      <Pressable onPress={() => retry(id)} hitSlop={8} accessibilityRole="button" accessibilityLabel="Retry sending">
        <Text style={[styles.text, styles.failed]}>Failed · Retry ↻</Text>
      </Pressable>
    );
  }
  return (
    <Animated.Text key={status} entering={FadeIn} style={styles.text}>
      {status === 'sending' ? 'Sending...' : 'Sent ✓'}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  text: { color: 'rgba(255,255,255,0.7)', fontSize: 10 },
  failed: { color: colors.danger, fontWeight: '700' },
});
