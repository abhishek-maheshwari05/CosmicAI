import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';
import { useConversationStore } from '../../store/conversationStore';
import type { Feedback, FeedbackReason } from '../../types/conversation';
import { colors, radius, spacing } from '../../theme';
import { PressableScale } from '../common/PressableScale';

const REASONS: { key: FeedbackReason; label: string }[] = [
  { key: 'inaccurate', label: 'Inaccurate' },
  { key: 'too_generic', label: 'Too Generic' },
  { key: 'didnt_help', label: 'Didn’t Help' },
  { key: 'too_long', label: 'Too Long' },
];

export const FeedbackBar = memo(function FeedbackBar({ id, feedback }: { id: string; feedback: Feedback }) {
  const setRating = useConversationStore(s => s.setRating);
  const toggleReason = useConversationStore(s => s.toggleReason);

  return (
    <Animated.View layout={LinearTransition} style={styles.container}>
      <View style={styles.row}>
        <Chip label="👍" active={feedback.rating === 'like'} onPress={() => setRating(id, 'like')} a11y="Like" />
        <Chip label="👎" active={feedback.rating === 'dislike'} onPress={() => setRating(id, 'dislike')} a11y="Dislike" />
        {feedback.rating === 'like' ? <Text style={styles.thanks}>Thanks for the feedback!</Text> : null}
      </View>
      {feedback.rating === 'dislike' ? (
        <Animated.View entering={FadeInDown} exiting={FadeOut} style={styles.reasons}>
          <Text style={styles.prompt}>What went wrong?</Text>
          <View style={styles.wrap}>
            {REASONS.map(r => (
              <Chip
                key={r.key}
                label={r.label}
                active={feedback.reasons.includes(r.key)}
                onPress={() => toggleReason(id, r.key)}
              />
            ))}
          </View>
        </Animated.View>
      ) : null}
    </Animated.View>
  );
});

function Chip({ label, active, onPress, a11y }: { label: string; active: boolean; onPress: () => void; a11y?: string }) {
  return (
    <PressableScale
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
      accessibilityRole="button"
      accessibilityLabel={a11y ?? label}
      accessibilityState={{ selected: active }}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  thanks: { color: colors.textMuted, fontSize: 12 },
  reasons: { marginTop: spacing.sm },
  prompt: { color: colors.textMuted, fontSize: 12, marginBottom: 6 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    backgroundColor: colors.surface,
  },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  chipText: { color: colors.textMuted, fontSize: 13 },
  chipTextActive: { color: colors.text },
});
