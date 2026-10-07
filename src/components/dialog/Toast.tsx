import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { duration, easeOut } from '../../theme/motion';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { create } from 'zustand';
import { CircleCheck } from 'lucide-react-native';
import { colors, glow, radius, spacing, type } from '../../theme';

const useToastStore = create<{ message: string | null; key: number }>(() => ({ message: null, key: 0 }));

/** Lightweight confirmation (e.g. "Copied") that doesn't need a full dialog. */
export const showToast = (message: string) => useToastStore.setState(s => ({ message, key: s.key + 1 }));

export function ToastHost() {
  const { message, key } = useToastStore();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => useToastStore.setState({ message: null }), 1800);
    return () => clearTimeout(t);
  }, [message, key]);

  if (!message) return null;
  return (
    <Animated.View
      key={key}
      entering={FadeInUp.duration(duration.base).easing(easeOut)}
      exiting={FadeOutUp.duration(duration.fast)}
      pointerEvents="none"
      style={[styles.toast, glow('#000', 0.4), { top: insets.top + spacing.sm }]}>
      <View style={styles.row}>
        <CircleCheck size={15} color={colors.success} strokeWidth={2.2} />
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.borderStrong,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  text: { ...type.caption, fontWeight: '500', color: colors.text },
});
