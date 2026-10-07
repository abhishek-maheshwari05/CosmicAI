import { BadgeCheck } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, type } from '../../../theme';
import { Avatar, AvatarSpacer } from '../../common/Avatar';
import { ChatBubble } from '../ChatBubble';
import type { MessageRendererProps } from './types';

export function HumanMessage({ message, isFirstInGroup, isLastInGroup }: MessageRendererProps) {
  const name = message.authorName ?? 'Astrologer';
  return (
    <View style={styles.row}>
      {isLastInGroup ? <Avatar name={name} color={colors.human} /> : <AvatarSpacer />}
      <View style={styles.content}>
        {isFirstInGroup ? (
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            <BadgeCheck size={13} color={colors.human} strokeWidth={2.2} />
            <Text style={styles.role}>Astrologer</Text>
          </View>
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
  content: { maxWidth: '78%' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4, marginLeft: 2 },
  name: { ...type.label, color: colors.text },
  role: { ...type.micro, color: colors.textMuted, marginLeft: 2 },
});
