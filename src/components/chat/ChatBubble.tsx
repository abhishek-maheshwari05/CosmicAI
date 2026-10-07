import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Message } from '../../types/conversation';
import { colors, radius, spacing } from '../../theme';
import { formatTime } from '../../utils/date';
import { useMessageActions } from './MessageActionsContext';
import { ReplyQuote } from './ReplyQuote';

interface Props {
  message: Message;
  align: 'left' | 'right';
  backgroundColor: string;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  footer?: React.ReactNode;
}

/** Shared bubble chrome: group-aware corners, reply quote, timestamp, long-press. */
export function ChatBubble({ message, align, backgroundColor, isFirstInGroup, isLastInGroup, footer }: Props) {
  const { openActions } = useMessageActions();
  const right = align === 'right';
  const tight = radius.sm / 2;
  const corners = right
    ? { borderTopRightRadius: isFirstInGroup ? radius.lg : tight, borderBottomRightRadius: isLastInGroup ? radius.lg : tight }
    : { borderTopLeftRadius: isFirstInGroup ? radius.lg : tight, borderBottomLeftRadius: isLastInGroup ? radius.lg : tight };

  return (
    <Pressable
      onLongPress={() => openActions(message.id)}
      delayLongPress={300}
      style={({ pressed }) => [styles.bubble, corners, { backgroundColor, opacity: pressed ? 0.85 : 1 }]}
      accessibilityHint="Long press for actions">
      {message.replyToId ? <ReplyQuote messageId={message.replyToId} /> : null}
      <Text style={styles.text}>{message.text}</Text>
      <View style={[styles.meta, right && styles.metaRight]}>
        {isLastInGroup ? <Text style={styles.time}>{formatTime(message.createdAt)}</Text> : null}
        {footer}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '100%',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 6,
  },
  text: { color: colors.text, fontSize: 15, lineHeight: 21 },
  meta: { flexDirection: 'row', alignItems: 'center', marginTop: 2, gap: 4 },
  metaRight: { justifyContent: 'flex-end' },
  time: { color: colors.textMuted, fontSize: 10 },
});
