import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../../../theme';
import type { RecommendationCardProps } from '../types';
import { BaseRecommendationCard } from './BaseRecommendationCard';

/** Example of a type-specific card: adds a live "online" indicator. */
export function ConsultationCard(props: RecommendationCardProps) {
  const online = (props.item.payload?.onlineCount as number | undefined) ?? 12;
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(withTiming(1, { duration: 1200 }), withTiming(0, { duration: 1200 })),
      -1,
    );
  }, [pulse]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: 0.5 + pulse.value * 0.5,
  }));

  return (
    <BaseRecommendationCard {...props}>
      <View style={styles.row}>
        <Animated.View style={[styles.dot, dotStyle]} />
        <Text style={styles.text}>{online} online now</Text>
      </View>
    </BaseRecommendationCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success, marginRight: 6 },
  text: { color: colors.textMuted, fontSize: 12 },
});

