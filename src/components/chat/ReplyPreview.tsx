import { X } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useConversationStore, useMessage } from '../../store/conversationStore';
import { colors, spacing, type } from '../../theme';
import { motion } from '../../theme/motion';
import { IconButton } from '../common/IconButton';
import { senderLabel } from './senderMeta';

export function ReplyPreview({ messageId }: { messageId: string }) {
  const message = useMessage(messageId);
  const clear = useConversationStore(s => s.setReplyingTo);
  if (!message) return null;
  return (
    <Animated.View entering={motion.fadeIn} style={styles.container}>
      <View style={styles.bar} />
      <View style={styles.body}>
        <Text style={styles.title}>Replying to {senderLabel(message)}</Text>
        <Text style={styles.text} numberOfLines={1}>
          {message.text}
        </Text>
      </View>
      <IconButton icon={X} label="Cancel reply" onPress={() => clear(null)} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    marginTop: spacing.sm,
    paddingLeft: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
  },
  bar: { width: 2, alignSelf: 'stretch', backgroundColor: colors.primary, borderRadius: 1, marginRight: spacing.sm },
  body: { flex: 1 },
  title: { ...type.micro, fontWeight: '600', color: colors.primary },
  text: { ...type.caption, color: colors.textSecondary, marginTop: 1 },
});
