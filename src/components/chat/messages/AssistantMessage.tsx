import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RecommendationCarousel } from '../../../features/recommendations';
import { colors, spacing } from '../../../theme';
import { Avatar, AvatarSpacer } from '../../common/Avatar';
import { ChatBubble } from '../ChatBubble';
import { FeedbackBar } from '../FeedbackBar';
import type { MessageRendererProps } from './types';

/** AI response = bubble + optional recommendation carousel + feedback. */
export function AssistantMessage({ message, isFirstInGroup, isLastInGroup }: MessageRendererProps) {
  return (
    <View>
      <View style={styles.row}>
        {isLastInGroup ? <Avatar emoji="✨" color={colors.primarySoft} /> : <AvatarSpacer />}
        <View style={styles.content}>
          {isFirstInGroup ? <Text style={styles.name}>Cosmic AI</Text> : null}
          <ChatBubble
            message={message}
            align="left"
            backgroundColor={colors.aiBubble}
            isFirstInGroup={isFirstInGroup}
            isLastInGroup={isLastInGroup}
          />
        </View>
      </View>
      {/* Carousel spans full width so cards can scroll edge to edge. */}
      {message.recommendations?.length ? <RecommendationCarousel items={message.recommendations} /> : null}
      {message.feedback ? (
        <View style={styles.feedback}>
          <FeedbackBar id={message.id} feedback={message.feedback} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: spacing.lg, gap: spacing.sm },
  content: { maxWidth: '80%' },
  name: { color: colors.primary, fontSize: 12, fontWeight: '600', marginBottom: 4, marginLeft: 4 },
  feedback: { paddingLeft: spacing.lg + 30 + spacing.sm, paddingRight: spacing.lg },
});
