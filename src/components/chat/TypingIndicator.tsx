import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { colors, spacing } from '../../theme';
import { motion } from '../../theme/motion';
import { CosmicLogo } from '../brand/CosmicLogo';
import { ASSISTANT_AVATAR } from './messages/layout';

function Dot({ index }: { index: number }) {
  const v = useSharedValue(0);
  useEffect(() => {
    v.value = withDelay(index * 200, withRepeat(withSequence(withTiming(1, { duration: 450 }), withTiming(0, { duration: 450 })), -1));
  }, [index, v]);
  const style = useAnimatedStyle(() => ({ opacity: 0.25 + v.value * 0.75 }));
  return <Animated.View style={[styles.dot, style]} />;
}

export function TypingIndicator() {
  return (
    <Animated.View entering={motion.fadeIn} exiting={motion.fadeOut} style={styles.row} accessibilityLabel="Cosmic AI is typing">
      <CosmicLogo size={ASSISTANT_AVATAR} animated={false} />
      <View style={styles.dots}>
        {[0, 1, 2].map(i => (
          <Dot key={i} index={i} />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
  dots: { flexDirection: 'row', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.textSecondary },
});
