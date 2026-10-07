import { Alert } from 'react-native';
import type { Recommendation } from '../../types/conversation';

/** Placeholder action. Real implementations would navigate or open a sheet. */
export const showRecommendationAlert = (label: string) => (item: Recommendation) =>
  Alert.alert(`${label}: ${item.title}`, item.subtitle ?? 'This experience is coming soon.');
