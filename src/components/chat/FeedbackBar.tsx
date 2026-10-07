import Clipboard from '@react-native-clipboard/clipboard';
import { Copy, ThumbsDown, ThumbsUp } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useConversationStore } from '../../store/conversationStore';
import type { Feedback, FeedbackReason } from '../../types/conversation';
import { colors, radius, spacing, type } from '../../theme';
import { motion } from '../../theme/motion';
import { IconButton } from '../common/IconButton';
import { showToast } from '../dialog/Toast';

const REASONS: { key: FeedbackReason; label: string }[] = [
  { key: 'inaccurate', label: 'Inaccurate' },
  { key: 'too_generic', label: 'Too generic' },
  { key: 'didnt_help', label: 'Didn’t help' },
  { key: 'too_long', label: 'Too long' },
];

export const FeedbackBar = memo(function FeedbackBar({ id, text, feedback }: { id: string; text: string; feedback: Feedback }) {
  const setRating = useConversationStore(s => s.setRating);
  const toggleReason = useConversationStore(s => s.toggleReason);

  return (
    <View>
      <View style={styles.toolbar}>
        <IconButton
          icon={Copy}
          label="Copy"
          onPress={() => {
            Clipboard.setString(text);
            showToast('Copied to clipboard');
          }}
        />
        <IconButton icon={ThumbsUp} label="Like" active={feedback.rating === 'like'} activeColor={colors.primary} onPress={() => setRating(id, 'like')} />
        <IconButton icon={ThumbsDown} label="Dislike" active={feedback.rating === 'dislike'} activeColor={colors.primary} onPress={() => setRating(id, 'dislike')} />
        {feedback.rating === 'like' ? <Text style={styles.thanks}>Thanks for your feedback</Text> : null}
      </View>
      {feedback.rating === 'dislike' ? (
        <Animated.View entering={motion.fadeIn} style={styles.reasons}>
          <Text style={styles.prompt}>What could be better?</Text>
          <View style={styles.wrap}>
            {REASONS.map(r => {
              const active = feedback.reasons.includes(r.key);
              return (
                <Pressable
                  key={r.key}
                  onPress={() => toggleReason(id, r.key)}
                  style={({ pressed }) => [styles.chip, active && styles.chipActive, pressed && !active && styles.chipPressed]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}>
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{r.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  toolbar: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  thanks: { ...type.caption, color: colors.textMuted, marginLeft: spacing.sm },
  reasons: { marginTop: spacing.xs, paddingLeft: spacing.sm },
  prompt: { ...type.caption, color: colors.textMuted, marginBottom: spacing.sm },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  chipPressed: { backgroundColor: colors.surfaceAlt },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  chipText: { ...type.caption, color: colors.textSecondary },
  chipTextActive: { color: colors.text, fontWeight: '600' },
});
