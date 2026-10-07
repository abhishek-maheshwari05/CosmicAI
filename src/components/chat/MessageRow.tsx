import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { useMessage } from '../../store/conversationStore';
import { spacing } from '../../theme';
import { messageRenderers } from './messages';

interface Props {
  id: string;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
}

/**
 * Subscribes to a single message by id, so state changes to other messages
 * never re-render this row.
 */
export const MessageRow = memo(function MessageRow({ id, isFirstInGroup, isLastInGroup }: Props) {
  const message = useMessage(id);
  if (!message) return null;
  const Renderer = messageRenderers[message.sender];
  return (
    <Animated.View
      entering={FadeInDown.duration(250)}
      exiting={FadeOut.duration(150)}
      style={isLastInGroup ? styles.groupEnd : styles.grouped}>
      <Renderer message={message} isFirstInGroup={isFirstInGroup} isLastInGroup={isLastInGroup} />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  grouped: { marginBottom: 2 },
  groupEnd: { marginBottom: spacing.md },
});
