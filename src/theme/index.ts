import { Platform } from 'react-native';

/**
 * Neutral dark palette with a single violet accent. Colour is reserved for
 * meaning (accent = interactive, green = online, red = error) so the content
 * and recommendation cards carry the visual weight.
 */
export const colors = {
  background: '#0E0E14',
  surface: '#17171F',
  surfaceAlt: '#1F1F29',
  surfacePressed: '#262632',
  border: 'rgba(255, 255, 255, 0.07)',
  borderStrong: 'rgba(255, 255, 255, 0.12)',
  text: '#EDEDF2',
  textSecondary: '#B4B4C2',
  textMuted: '#7D7D8F',
  primary: '#7C6CF2',
  primaryPressed: '#6A5AE0',
  primarySoft: 'rgba(124, 108, 242, 0.14)',
  userBubble: '#5B4BD6',
  humanBubble: '#1A2230',
  human: '#5AB4E8',
  gold: '#E8BE5A',
  danger: '#EF6B6B',
  success: '#3FCF8E',
  overlay: 'rgba(0, 0, 0, 0.6)',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
export const radius = { sm: 8, md: 12, lg: 18, xl: 24, pill: 999 };

export const type = {
  title: { fontSize: 17, fontWeight: '600' as const, letterSpacing: -0.2 },
  body: { fontSize: 15, lineHeight: 22 },
  label: { fontSize: 13, fontWeight: '600' as const },
  caption: { fontSize: 12 },
  micro: { fontSize: 11, fontWeight: '500' as const },
};

/**
 * Soft shadow. iOS only: Android `elevation` draws grey artifacts under
 * translucent surfaces, so we rely on borders there.
 */
export const glow = (color: string, intensity = 0.45) =>
  Platform.OS === 'ios'
    ? { shadowColor: color, shadowOpacity: intensity, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } }
    : {};
