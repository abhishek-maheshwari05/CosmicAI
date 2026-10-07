import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../../theme';
import { ChatBubble } from '../ChatBubble';
import { DeliveryStatus } from '../DeliveryStatus';
import type { MessageRendererProps } from './types';

export function UserMessage({ message, isFirstInGroup, isLastInGroup }: MessageRendererProps) {
  return (
    <View style={styles.row}>
      <View style={styles.bubbleWrap}>
        <ChatBubble
          message={message}
          align="right"
          backgroundColor={message.status === 'failed' ? '#5B2333' : colors.userBubble}
          isFirstInGroup={isFirstInGroup}
          isLastInGroup={isLastInGroup}
          footer={<DeliveryStatus id={message.id} status={message.status} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: spacing.lg },
  bubbleWrap: { maxWidth: '80%' },
});
