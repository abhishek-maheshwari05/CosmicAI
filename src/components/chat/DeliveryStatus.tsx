import { CheckCheck, CircleAlert, Clock } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useConversationStore } from '../../store/conversationStore';
import type { DeliveryStatus as Status } from '../../types/conversation';
import { colors, spacing, type } from '../../theme';

export function DeliveryStatus({ id, status }: { id: string; status?: Status }) {
  const retry = useConversationStore(s => s.retry);
  if (!status) return null;
  if (status === 'failed') {
    return (
      <Pressable onPress={() => retry(id)} hitSlop={8} style={styles.row} accessibilityRole="button" accessibilityLabel="Retry sending">
        <CircleAlert size={12} color={colors.danger} strokeWidth={2.4} />
        <Text style={[styles.text, styles.failed]}>Not sent · Tap to retry</Text>
      </Pressable>
    );
  }
  if (status === 'sending') {
    return <Clock size={11} color="rgba(255,255,255,0.6)" strokeWidth={2.4} accessibilityLabel="Sending" />;
  }
  return (
    <View style={[styles.row, styles.sent]} accessibilityLabel="Sent">
      <CheckCheck size={12} color={colors.textMuted} strokeWidth={2.2} />
      <Text style={styles.text}>Sent</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sent: { marginTop: spacing.xs, marginRight: 2 },
  text: { ...type.micro, color: colors.textMuted },
  failed: { color: colors.danger },
});
