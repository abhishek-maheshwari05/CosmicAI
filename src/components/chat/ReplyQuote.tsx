import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useMessage } from '../../store/conversationStore';
import { colors, radius, spacing } from '../../theme';
import { senderLabel } from './senderMeta';

/** Quoted message shown inside a bubble that replies to another message. */
export function ReplyQuote({ messageId }: { messageId: string }) {
  const original = useMessage(messageId);
  return (
    <View style={styles.quote}>
      <Text style={styles.author}>{original ? senderLabel(original) : 'Message'}</Text>
      <Text style={styles.text} numberOfLines={2}>
        {original?.text ?? 'This message was deleted.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  quote: {
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginBottom: 6,
  },
  author: { color: colors.gold, fontSize: 12, fontWeight: '600' },
  text: { color: colors.textMuted, fontSize: 12 },
});
