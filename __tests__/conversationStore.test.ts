import { mockServerConfig } from '../src/services/conversationApi';
import { useConversationStore } from '../src/store/conversationStore';

jest.useFakeTimers();

const flush = async (ms: number) => {
  await jest.advanceTimersByTimeAsync(ms);
};

describe('conversationStore', () => {
  beforeEach(async () => {
    mockServerConfig.loadScenario = 'success';
    mockServerConfig.sendFailureRate = 0;
    const p = useConversationStore.getState().load();
    await flush(1000);
    await p;
  });

  it('loads the mock conversation', () => {
    expect(useConversationStore.getState().ids.length).toBeGreaterThan(0);
  });

  it('optimistically adds a message, then marks it sent', async () => {
    const p = useConversationStore.getState().send('hello');
    const { ids, byId } = useConversationStore.getState();
    const id = ids[ids.length - 1];
    expect(byId[id].status).toBe('sending');
    await flush(1000);
    expect(useConversationStore.getState().byId[id].status).toBe('sent');
    await flush(2000);
    await p;
  });

  it('marks a message failed when the send request errors', async () => {
    const p = useConversationStore.getState().send('please fail');
    const id = useConversationStore.getState().ids.at(-1)!;
    await flush(1000);
    await p;
    expect(useConversationStore.getState().byId[id].status).toBe('failed');
  });

  it('deletes a message and clears a reply pointing at it', () => {
    const id = useConversationStore.getState().ids[1];
    useConversationStore.getState().setReplyingTo(id);
    useConversationStore.getState().deleteMessage(id);
    const s = useConversationStore.getState();
    expect(s.ids).not.toContain(id);
    expect(s.replyingToId).toBeNull();
  });

  it('expands dislike reasons and toggles chips', () => {
    useConversationStore.getState().setRating('3', 'dislike');
    useConversationStore.getState().toggleReason('3', 'too_long');
    expect(useConversationStore.getState().byId['3'].feedback).toEqual({ rating: 'dislike', reasons: ['too_long'] });
  });
});
