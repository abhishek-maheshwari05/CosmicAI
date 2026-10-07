import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../../theme';
import { ChatBubble } from '../ChatBubble';
import { DeliveryStatus } from '../DeliveryStatus';
import type { MessageRendererProps } from './types';

export function UserMessage({ message, isFirstInGroup, isLastInGroup }: MessageRendererProps) {
  const failed = message.status === 'failed';
  return (
    <View style={styles.row}>
      <View style={styles.bubbleWrap}>
        <ChatBubble
          message={message}
          align="right"
          backgroundColor={failed ? colors.surfaceAlt : colors.userBubble}
          isFirstInGroup={isFirstInGroup}
          isLastInGroup={isLastInGroup}
          footer={message.status && message.status !== 'sent' ? <DeliveryStatus id={message.id} status={message.status} /> : undefined}
        />
        {message.status === 'sent' && isLastInGroup ? <DeliveryStatus id={message.id} status="sent" /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: spacing.lg },
  bubbleWrap: { maxWidth: '78%', alignItems: 'flex-end' },
});
