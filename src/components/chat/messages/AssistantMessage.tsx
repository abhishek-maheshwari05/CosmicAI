import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RecommendationCarousel } from '../../../features/recommendations';
import { colors, spacing, type } from '../../../theme';
import { formatTime } from '../../../utils/date';
import { CosmicLogo } from '../../brand/CosmicLogo';
import { FeedbackBar } from '../FeedbackBar';
import { useMessageActions } from '../MessageActionsContext';
import { ReplyQuote } from '../ReplyQuote';
import { ASSISTANT_AVATAR, ASSISTANT_INSET } from './layout';
import type { MessageRendererProps } from './types';


/**
 * AI responses render as open text rather than a bubble (the convention in
 * modern assistant apps): it reads better for long answers and gives the
 * recommendation cards room to breathe.
 */
export function AssistantMessage({ message, isFirstInGroup, isLastInGroup }: MessageRendererProps) {
  const { openActions } = useMessageActions();
  return (
    <View>
      {isFirstInGroup ? (
        <View style={styles.header}>
          <CosmicLogo size={ASSISTANT_AVATAR} animated={false} />
          <Text style={styles.name}>Cosmic AI</Text>
          <Text style={styles.time}>{formatTime(message.createdAt)}</Text>
        </View>
      ) : null}
      <Pressable
        onLongPress={() => openActions(message.id)}
        delayLongPress={300}
        style={({ pressed }) => [styles.body, pressed && styles.pressed]}
        accessibilityHint="Long press for actions">
        {message.replyToId ? <ReplyQuote messageId={message.replyToId} /> : null}
        <Text style={styles.text}>{message.text}</Text>
      </Pressable>
      {message.recommendations?.length ? (
        <View style={styles.carousel}>
          <RecommendationCarousel items={message.recommendations} />
        </View>
      ) : null}
      {message.feedback && isLastInGroup ? (
        <View style={styles.feedback}>
          <FeedbackBar id={message.id} text={message.text} feedback={message.feedback} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, marginBottom: 2 },
  name: { ...type.label, color: colors.text },
  time: { ...type.micro, color: colors.textMuted },
  body: { paddingLeft: ASSISTANT_INSET, paddingRight: spacing.xl, paddingVertical: 2 },
  pressed: { opacity: 0.7 },
  text: { ...type.body, color: colors.text },
  carousel: { marginTop: spacing.sm },
  feedback: { paddingLeft: ASSISTANT_INSET - spacing.sm, paddingRight: spacing.lg, marginTop: 2 },
});
