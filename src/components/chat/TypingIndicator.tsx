import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors, radius, spacing } from '../../theme';
import { Avatar } from '../common/Avatar';

function Dot({ index }: { index: number }) {
  const v = useSharedValue(0);
  useEffect(() => {
    v.value = withDelay(index * 150, withRepeat(withSequence(withTiming(1, { duration: 300 }), withTiming(0, { duration: 300 })), -1));
  }, [index, v]);
  const style = useAnimatedStyle(() => ({ opacity: 0.4 + v.value * 0.6, transform: [{ translateY: -3 * v.value }] }));
  return <Animated.View style={[styles.dot, style]} />;
}

export function TypingIndicator() {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.row} accessibilityLabel="Cosmic AI is typing">
      <Avatar emoji="✨" color={colors.primarySoft} />
      <View style={styles.bubble}>
        {[0, 1, 2].map(i => (
          <Dot key={i} index={i} />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm, paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  bubble: { flexDirection: 'row', gap: 4, backgroundColor: colors.aiBubble, borderRadius: radius.lg, padding: spacing.md },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.textMuted },
});
