import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors, spacing } from '../../theme';
import { Button } from '../common/Button';

interface Props {
  icon?: string;
  title: string;
  message?: string;
  loading?: boolean;
  action?: { title: string; onPress: () => void };
}

/** One component for loading / empty / error so the three states stay visually consistent. */
export function StateView({ icon, title, message, loading, action }: Props) {
  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      {loading ? <ActivityIndicator color={colors.primary} size="large" /> : <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {action ? (
        <View style={styles.action}>
          <Button title={action.title} onPress={action.onPress} />
        </View>
      ) : null}
    </Animated.View>
  );
}

export const LoadingState = () => <StateView loading title="Loading conversation..." />;

export const EmptyState = () => (
  <StateView icon="🌙" title="Start your conversation." message="Ask about your career, love life or today’s Panchang." />
);

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <StateView
    icon="🛰️"
    title="Unable to load conversation."
    message="Please check your connection and try again."
    action={{ title: 'Retry', onPress: onRetry }}
  />
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  icon: { fontSize: 48 },
  title: { color: colors.text, fontSize: 18, fontWeight: '600', marginTop: spacing.lg, textAlign: 'center' },
  message: { color: colors.textMuted, fontSize: 14, marginTop: spacing.sm, textAlign: 'center' },
  action: { marginTop: spacing.xl },
});
