import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useConversationStore, useMessage } from '../../store/conversationStore';
import { colors, spacing } from '../../theme';
import { senderLabel } from './senderMeta';

export function ReplyPreview({ messageId }: { messageId: string }) {
  const message = useMessage(messageId);
  const clear = useConversationStore(s => s.setReplyingTo);
  if (!message) return null;
  return (
    <Animated.View entering={FadeInDown.duration(200)} exiting={FadeOutDown.duration(150)} style={styles.container}>
      <View style={styles.bar} />
      <View style={styles.body}>
        <Text style={styles.title}>Replying to {senderLabel(message)}</Text>
        <Text style={styles.text} numberOfLines={1}>
          {message.text}
        </Text>
      </View>
      <Pressable onPress={() => clear(null)} hitSlop={10} accessibilityLabel="Cancel reply">
        <Text style={styles.close}>✕</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  bar: { width: 3, alignSelf: 'stretch', backgroundColor: colors.gold, borderRadius: 2, marginRight: spacing.sm },
  body: { flex: 1 },
  title: { color: colors.gold, fontSize: 12, fontWeight: '600' },
  text: { color: colors.textMuted, fontSize: 13 },
  close: { color: colors.textMuted, fontSize: 16, paddingLeft: spacing.md },
});
