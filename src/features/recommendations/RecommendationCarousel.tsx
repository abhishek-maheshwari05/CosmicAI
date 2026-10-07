import React, { memo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { Recommendation } from '../../types/conversation';
import { spacing } from '../../theme';
import { ASSISTANT_INSET } from '../../components/chat/messages/layout';
import { CARD_WIDTH } from './cards/BaseRecommendationCard';
import { RecommendationRenderer } from './RecommendationRenderer';

const ITEM_SPAN = CARD_WIDTH + spacing.sm;

const Separator = () => <View style={styles.separator} />;

export const RecommendationCarousel = memo(function RecommendationCarousel({ items }: { items: Recommendation[] }) {
  if (!items.length) return null;
  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={r => r.id}
      renderItem={({ item }) => <RecommendationRenderer item={item} />}
      ItemSeparatorComponent={Separator}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      snapToInterval={ITEM_SPAN}
      decelerationRate="fast"
      getItemLayout={(_, index) => ({ length: ITEM_SPAN, offset: ITEM_SPAN * index, index })}
      initialNumToRender={3}
    />
  );
});

const styles = StyleSheet.create({
  content: { paddingLeft: ASSISTANT_INSET, paddingRight: spacing.lg, paddingVertical: spacing.xs },
  separator: { width: spacing.sm },
});
