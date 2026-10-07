import type { Message } from '../types/conversation';
import { formatDayLabel, startOfDay } from './date';

/**
 * The list renders "timeline items" rather than raw messages. Deriving
 * separators and grouping here keeps every row component dumb and memoisable.
 */
export type TimelineItem =
  | { kind: 'date'; key: string; label: string }
  | { kind: 'message'; key: string; id: string; isFirstInGroup: boolean; isLastInGroup: boolean }
  | { kind: 'typing'; key: string };

const GROUP_WINDOW_MS = 5 * 60 * 1000;

const sameGroup = (a: Message | undefined, b: Message | undefined) =>
  !!a &&
  !!b &&
  a.sender === b.sender &&
  a.sender !== 'system' &&
  a.authorName === b.authorName &&
  Math.abs(b.createdAt - a.createdAt) < GROUP_WINDOW_MS &&
  startOfDay(a.createdAt) === startOfDay(b.createdAt);

/** Returns items newest-first, ready for an inverted list. */
export function buildTimeline(messages: Message[], isTyping: boolean): TimelineItem[] {
  const items: TimelineItem[] = [];
  if (isTyping) items.push({ kind: 'typing', key: 'typing' });

  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    const prev = messages[i - 1];
    const next = messages[i + 1];
    items.push({
      kind: 'message',
      key: msg.id,
      id: msg.id,
      isFirstInGroup: !sameGroup(prev, msg),
      isLastInGroup: !sameGroup(msg, next),
    });
    if (!prev || startOfDay(prev.createdAt) !== startOfDay(msg.createdAt)) {
      const day = startOfDay(msg.createdAt);
      items.push({ kind: 'date', key: `date-${day}`, label: formatDayLabel(day) });
    }
  }
  return items;
}
