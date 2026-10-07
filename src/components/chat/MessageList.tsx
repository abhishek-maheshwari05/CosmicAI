import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react-native';
import { FlatList, type ListRenderItem, type NativeScrollEvent, type NativeSyntheticEvent, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { motion } from '../../theme/motion';
import { useShallow } from 'zustand/react/shallow';
import { useConversationStore } from '../../store/conversationStore';
import { colors, radius, spacing } from '../../theme';
import { buildTimeline, type TimelineItem } from '../../utils/timeline';
import { PressableScale } from '../common/PressableScale';
import { DateSeparator } from './DateSeparator';
import { MessageRow } from './MessageRow';
import { TypingIndicator } from './TypingIndicator';

const renderItem: ListRenderItem<TimelineItem> = ({ item }) => {
  switch (item.kind) {
    case 'date':
      return <DateSeparator label={item.label} />;
    case 'typing':
      return <TypingIndicator />;
    case 'message':
      return <MessageRow id={item.id} isFirstInGroup={item.isFirstInGroup} isLastInGroup={item.isLastInGroup} />;
  }
};

const keyExtractor = (item: TimelineItem) => item.key;

/**
 * Inverted, virtualised timeline. Inversion means "latest" is offset 0, so the
 * list starts at the bottom without a post-layout scroll, and
 * maintainVisibleContentPosition keeps the viewport stable when rows above are
 * deleted or new rows arrive while the user is reading history.
 */
export function MessageList() {
  const listRef = useRef<FlatList<TimelineItem>>(null);
  const [showJump, setShowJump] = useState(false);

  // Only ids + timestamps/senders drive layout; content changes are handled per row.
  const layoutKeys = useConversationStore(
    useShallow(s => s.ids.map(id => `${id}|${s.byId[id].sender}|${s.byId[id].authorName ?? ''}|${s.byId[id].createdAt}`)),
  );
  const byIdRef = useConversationStore.getState;
  const isTyping = useConversationStore(s => s.isAiTyping);

  const data = useMemo(() => {
    const { ids, byId } = byIdRef();
    return buildTimeline(ids.map(id => byId[id]), isTyping);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutKeys, isTyping]);

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowJump(e.nativeEvent.contentOffset.y > 400);
  }, []);

  return (
    <>
      <FlatList
        ref={listRef}
        inverted
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
        maintainVisibleContentPosition={{ minIndexForVisible: 0, autoscrollToTopThreshold: 120 }}
        onScroll={onScroll}
        scrollEventThrottle={64}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={11}
      />
      {showJump ? (
        <Animated.View entering={motion.fadeIn} exiting={motion.fadeOut} style={styles.jumpWrap}>
          <PressableScale
            style={styles.jump}
            onPress={() => listRef.current?.scrollToOffset({ offset: 0, animated: true })}
            accessibilityLabel="Scroll to latest message">
            <ChevronDown size={20} color={colors.text} strokeWidth={2} />
          </PressableScale>
        </Animated.View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing.lg, paddingBottom: spacing.sm },
  jumpWrap: { position: 'absolute', right: spacing.lg, bottom: spacing.lg },
  jump: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
