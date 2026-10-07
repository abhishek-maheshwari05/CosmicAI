import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMessage } from '../../store/conversationStore';
import { spacing } from '../../theme';
import { motion } from '../../theme/motion';
import { messageRenderers } from './messages';

interface Props {
  id: string;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
}

/** Only messages that arrived moments ago get an entrance animation. */
const FRESH_MS = 2000;

/**
 * Subscribes to a single message by id, so state changes to other messages
 * never re-render this row. Rows are recycled by the virtualised list, so an
 * unconditional `entering` would replay on every scroll and flicker.
 */
export const MessageRow = memo(function MessageRow({ id, isFirstInGroup, isLastInGroup }: Props) {
  const message = useMessage(id);
  if (!message) return null;
  const Renderer = messageRenderers[message.sender];
  return (
    <Animated.View
      entering={Date.now() - message.createdAt < FRESH_MS ? motion.rise : undefined}
      style={isLastInGroup ? styles.groupEnd : styles.grouped}>
      <Renderer message={message} isFirstInGroup={isFirstInGroup} isLastInGroup={isLastInGroup} />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  grouped: { marginBottom: 3 },
  groupEnd: { marginBottom: spacing.lg },
});

