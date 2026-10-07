import { create } from 'zustand';
import * as api from '../services/conversationApi';
import type { FeedbackReason, Message } from '../types/conversation';
import { createId } from '../utils/id';

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

/**
 * Messages are normalised (`ids` + `byId`). Rows subscribe to `byId[id]` only,
 * so liking one message or flipping a status re-renders exactly one row and
 * never rebuilds the whole list.
 */
interface ConversationState {
  loadState: LoadState;
  ids: string[];
  byId: Record<string, Message>;
  isAiTyping: boolean;
  replyingToId: string | null;

  load: () => Promise<void>;
  send: (text: string) => Promise<void>;
  retry: (id: string) => Promise<void>;
  deleteMessage: (id: string) => void;
  setReplyingTo: (id: string | null) => void;
  setRating: (id: string, rating: 'like' | 'dislike') => void;
  toggleReason: (id: string, reason: FeedbackReason) => void;
}

const patch = (state: ConversationState, id: string, change: Partial<Message>) =>
  state.byId[id] ? { byId: { ...state.byId, [id]: { ...state.byId[id], ...change } } } : {};

export const useConversationStore = create<ConversationState>((set, get) => {
  /** Shared by send + retry: deliver an already-inserted local message. */
  const deliver = async (id: string) => {
    const msg = get().byId[id];
    if (!msg) return;
    set(s => patch(s, id, { status: 'sending' }));
    try {
      const { deliveredAt } = await api.sendMessage(msg.text);
      set(s => patch(s, id, { status: 'sent', createdAt: deliveredAt }));
    } catch {
      set(s => patch(s, id, { status: 'failed' }));
      return;
    }
    set({ isAiTyping: true });
    try {
      const reply = await api.fetchAiReply(msg.text);
      set(s => ({ ids: [...s.ids, reply.id], byId: { ...s.byId, [reply.id]: reply } }));
    } finally {
      set({ isAiTyping: false });
    }
  };

  return {
    loadState: 'idle',
    ids: [],
    byId: {},
    isAiTyping: false,
    replyingToId: null,

    load: async () => {
      set({ loadState: 'loading' });
      try {
        const messages = await api.fetchConversation();
        set({
          loadState: 'ready',
          ids: messages.map(m => m.id),
          byId: Object.fromEntries(messages.map(m => [m.id, m])),
        });
      } catch {
        set({ loadState: 'error' });
      }
    },

    send: async text => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const message: Message = {
        id: createId(),
        sender: 'user',
        text: trimmed,
        createdAt: Date.now(),
        status: 'sending',
        replyToId: get().replyingToId ?? undefined,
      };
      // Optimistic insert.
      set(s => ({ ids: [...s.ids, message.id], byId: { ...s.byId, [message.id]: message }, replyingToId: null }));
      await deliver(message.id);
    },

    retry: id => deliver(id),

    deleteMessage: id =>
      set(s => {
        const rest = { ...s.byId };
        delete rest[id];
        return {
          ids: s.ids.filter(x => x !== id),
          byId: rest,
          replyingToId: s.replyingToId === id ? null : s.replyingToId,
        };
      }),

    setReplyingTo: id => set({ replyingToId: id }),

    setRating: (id, rating) =>
      set(s => {
        const current = s.byId[id]?.feedback;
        const next = current?.rating === rating ? null : rating; // tap again to clear
        return patch(s, id, { feedback: { rating: next, reasons: next === 'dislike' ? current?.reasons ?? [] : [] } });
      }),

    toggleReason: (id, reason) =>
      set(s => {
        const fb = s.byId[id]?.feedback;
        if (!fb) return {};
        const reasons = fb.reasons.includes(reason) ? fb.reasons.filter(r => r !== reason) : [...fb.reasons, reason];
        return patch(s, id, { feedback: { ...fb, reasons } });
      }),
  };
});

/** Selector helpers keep components decoupled from the store's shape. */
export const useMessage = (id: string) => useConversationStore(s => s.byId[id]);
