import { buildTimeline } from '../src/utils/timeline';
import type { Message } from '../src/types/conversation';

const DAY = 86_400_000;
const msg = (id: string, sender: Message['sender'], createdAt: number): Message => ({ id, sender, text: id, createdAt });

describe('buildTimeline', () => {
  const now = Date.now();
  const messages = [
    msg('a', 'user', now - DAY),
    msg('b', 'ai', now - 1000),
    msg('c', 'ai', now - 500),
    msg('d', 'user', now),
  ];

  it('returns newest-first with date separators between days', () => {
    const items = buildTimeline(messages, false);
    expect(items.map(i => i.key)).toEqual(['d', 'c', 'b', expect.stringMatching(/^date-/), 'a', expect.stringMatching(/^date-/)]);
  });

  it('groups consecutive messages from the same sender', () => {
    const items = buildTimeline(messages, false);
    const b = items.find(i => i.key === 'b');
    const c = items.find(i => i.key === 'c');
    expect(b).toMatchObject({ isFirstInGroup: true, isLastInGroup: false });
    expect(c).toMatchObject({ isFirstInGroup: false, isLastInGroup: true });
  });

  it('puts the typing indicator at the newest position', () => {
    expect(buildTimeline(messages, true)[0].kind).toBe('typing');
  });
});
