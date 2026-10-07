import { Easing, FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';

/**
 * Single source of truth for motion. Short, eased timings only. No springs or
 * overshoot, so the UI feels calm and consistent across platforms.
 */
export const duration = { fast: 150, base: 220, slow: 320 };
export const easeOut = Easing.out(Easing.cubic);

export const motion = {
  fadeIn: FadeIn.duration(duration.base).easing(easeOut),
  fadeOut: FadeOut.duration(duration.fast),
  /** Small upward rise for content arriving in the timeline. */
  rise: FadeInDown.duration(duration.base).easing(easeOut).withInitialValues({ transform: [{ translateY: 8 }] }),
};
