import { RotateCw, WifiOff, type LucideIcon } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useConversationStore } from '../../store/conversationStore';
import { colors, radius, spacing, type } from '../../theme';
import { motion } from '../../theme/motion';
import { CosmicLogo } from '../brand/CosmicLogo';
import { Button } from '../common/Button';

interface Props {
  icon?: LucideIcon;
  /** Show the brand mark instead of an icon. */
  logo?: boolean;
  title: string;
  message?: string;
  action?: { title: string; icon?: LucideIcon; onPress: () => void };
  children?: React.ReactNode;
}

/** One component for loading / empty / error so the three states stay visually consistent. */
export function StateView({ icon: Icon, logo, title, message, action, children }: Props) {
  return (
    <Animated.View entering={motion.fadeIn} style={styles.container}>
      {logo ? (
        <CosmicLogo size={56} animated={false} />
      ) : Icon ? (
        <View style={styles.iconTile}>
          <Icon size={24} color={colors.textSecondary} strokeWidth={2} />
        </View>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {action ? (
        <View style={styles.action}>
          <Button title={action.title} icon={action.icon} onPress={action.onPress} variant="secondary" />
        </View>
      ) : null}
      {children}
    </Animated.View>
  );
}

export const LoadingState = () => (
  <Animated.View entering={motion.fadeIn} style={styles.container}>
    <ActivityIndicator color={colors.textSecondary} />
    <Text style={styles.loading}>Loading conversation...</Text>
  </Animated.View>
);

const SUGGESTIONS = ['How will my career go this year?', 'What does my chart say about love?', 'Show me today’s Panchang'];

export function EmptyState() {
  const send = useConversationStore(s => s.send);
  return (
    <StateView logo title="Start your conversation." message="Ask about your career, relationships or today’s Panchang.">
      <View style={styles.suggestions}>
        {SUGGESTIONS.map(s => (
          <Pressable
            key={s}
            onPress={() => send(s)}
            style={({ pressed }) => [styles.suggestion, pressed && styles.suggestionPressed]}
            accessibilityRole="button">
            <Text style={styles.suggestionText}>{s}</Text>
          </Pressable>
        ))}
      </View>
    </StateView>
  );
}

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <StateView
    icon={WifiOff}
    title="Unable to load conversation."
    message="Check your internet connection and try again."
    action={{ title: 'Retry', icon: RotateCw, onPress: onRetry }}
  />
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  iconTile: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { ...type.title, color: colors.text, marginTop: spacing.lg, textAlign: 'center' },
  message: { fontSize: 14, lineHeight: 20, color: colors.textMuted, marginTop: spacing.xs, textAlign: 'center', maxWidth: 280 },
  loading: { ...type.caption, color: colors.textMuted, marginTop: spacing.md },
  action: { marginTop: spacing.xl },
  suggestions: { marginTop: spacing.xl, gap: spacing.sm, alignSelf: 'stretch' },
  suggestion: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },
  suggestionPressed: { backgroundColor: colors.surfaceAlt },
  suggestionText: { fontSize: 14, color: colors.textSecondary },
});
