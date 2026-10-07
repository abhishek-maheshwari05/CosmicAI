import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../../theme';
import { Avatar, AvatarSpacer } from '../../common/Avatar';
import { ChatBubble } from '../ChatBubble';
import type { MessageRendererProps } from './types';

export function HumanMessage({ message, isFirstInGroup, isLastInGroup }: MessageRendererProps) {
  return (
    <View style={styles.row}>
      {isLastInGroup ? <Avatar emoji="👨‍🏫" color="#13324A" /> : <AvatarSpacer />}
      <View style={styles.content}>
        {isFirstInGroup ? (
          <Text style={styles.name}>
            {message.authorName ?? 'Astrologer'} <Text style={styles.badge}> · Verified Astrologer</Text>
          </Text>
        ) : null}
        <ChatBubble
          message={message}
          align="left"
          backgroundColor={colors.humanBubble}
          isFirstInGroup={isFirstInGroup}
          isLastInGroup={isLastInGroup}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: spacing.lg, gap: spacing.sm },
  content: { maxWidth: '80%' },
  name: { color: colors.human, fontSize: 12, fontWeight: '600', marginBottom: 4, marginLeft: 4 },
  badge: { color: colors.textMuted, fontWeight: '400' },
});
