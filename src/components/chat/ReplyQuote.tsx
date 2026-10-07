import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useMessage } from '../../store/conversationStore';
import { radius, spacing, type } from '../../theme';
import { senderLabel } from './senderMeta';

/** Quoted message shown inside a message that replies to another one. */
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
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    marginBottom: 6,
  },
  author: { ...type.micro, fontWeight: '600', color: 'rgba(255,255,255,0.85)' },
  text: { ...type.caption, color: 'rgba(255,255,255,0.65)', marginTop: 1 },
});
