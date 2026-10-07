import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Message } from '../../types/conversation';
import { colors, radius, type } from '../../theme';
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
  const tight = 6;
  const corners = right
    ? { borderTopRightRadius: isFirstInGroup ? radius.lg : tight, borderBottomRightRadius: isLastInGroup ? radius.lg : tight }
    : { borderTopLeftRadius: isFirstInGroup ? radius.lg : tight, borderBottomLeftRadius: isLastInGroup ? radius.lg : tight };

  return (
    <Pressable
      onLongPress={() => openActions(message.id)}
      delayLongPress={300}
      style={({ pressed }) => [styles.bubble, corners, { backgroundColor }, pressed && styles.pressed]}
      accessibilityHint="Long press for actions">
      {message.replyToId ? <ReplyQuote messageId={message.replyToId} /> : null}
      <Text style={styles.text}>{message.text}</Text>
      {isLastInGroup || footer ? (
        <View style={[styles.meta, right && styles.metaRight]}>
          {isLastInGroup ? <Text style={styles.time}>{formatTime(message.createdAt)}</Text> : null}
          {footer}
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bubble: { maxWidth: '100%', borderRadius: radius.lg, paddingHorizontal: 14, paddingTop: 9, paddingBottom: 7 },
  pressed: { opacity: 0.8 },
  text: { ...type.body, color: colors.text },
  meta: { flexDirection: 'row', alignItems: 'center', marginTop: 2, gap: 4 },
  metaRight: { justifyContent: 'flex-end' },
  time: { ...type.micro, color: 'rgba(237, 237, 242, 0.55)' },
});
