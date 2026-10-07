import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors, glow } from '../../theme';

interface Props {
  size?: number;
  /** Slow orbit + soft halo. Off for tiny/static usages. */
  animated?: boolean;
}

/**
 * Brand mark drawn with plain Views (no SVG dependency): a golden crescent
 * inside a violet orb, a sparkle, and a planet orbiting on a tilted ring.
 * Mirrors assets/logo.svg used for the app icon.
 */
export function CosmicLogo({ size = 40, animated = true }: Props) {
  const spin = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (!animated) return;
    spin.value = withRepeat(withTiming(1, { duration: 14000, easing: Easing.linear }), -1);
    pulse.value = withRepeat(
      withSequence(withTiming(1, { duration: 2800 }), withTiming(0, { duration: 2800 })),
      -1,
    );
  }, [animated, spin, pulse]);

  const orbitStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value * 360}deg` }] }));
  const haloStyle = useAnimatedStyle(() => ({
    opacity: 0.18 + pulse.value * 0.14,
  }));

  const orb = size * 0.72;
  const moon = orb * 0.56;
  const planet = Math.max(4, size * 0.13);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={[
          styles.abs,
          { width: size, height: size, borderRadius: size / 2, backgroundColor: colors.primary },
          haloStyle,
        ]}
      />
      <View
        style={[
          styles.orb,
          glow(colors.primary, 0.4),
          { width: orb, height: orb, borderRadius: orb / 2 },
        ]}>
        {/* Crescent: gold disc with an offset orb-coloured disc on top. */}
        <View style={{ width: moon, height: moon }}>
          <View style={[styles.abs, { width: moon, height: moon, borderRadius: moon / 2, backgroundColor: colors.gold }]} />
          <View
            style={[
              styles.abs,
              {
                width: moon,
                height: moon,
                borderRadius: moon / 2,
                backgroundColor: '#4C2AB8',
                left: moon * 0.32,
                top: -moon * 0.14,
              },
            ]}
          />
        </View>
        <Animated.Text style={[styles.sparkle, { fontSize: orb * 0.26, right: orb * 0.14, top: orb * 0.1 }]}>✦</Animated.Text>
      </View>
      {/* Tilted orbit ring with a planet riding on it. */}
      <View style={[styles.abs, { width: size, height: size, transform: [{ scaleY: 0.38 }, { rotate: '-20deg' }] }]}>
        <View style={[styles.ring, { width: size, height: size, borderRadius: size / 2 }]} />
        <Animated.View style={[styles.abs, { width: size, height: size }, orbitStyle]}>
          <View
            style={[
              styles.planet,
              { width: planet, height: planet * 2.6, borderRadius: planet / 2, left: size / 2 - planet / 2, top: -planet * 1.3 },
            ]}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  abs: { position: 'absolute' },
  orb: {
    backgroundColor: '#4C2AB8',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sparkle: { position: 'absolute', color: '#FFF6D6' },
  ring: { borderWidth: 1.5, borderColor: 'rgba(245, 196, 81, 0.55)' },
  planet: { position: 'absolute', backgroundColor: colors.gold },
});
