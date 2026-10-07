import { defaultAiReply, mockAiReplies, mockConversation } from '../data/mockConversation';
import type { ApiMessage, Message } from '../types/conversation';
import { createId } from '../utils/id';

/**
 * Mock transport. Swap this module for a real HTTP/WebSocket client — the
 * store only depends on the function signatures below.
 */

export type LoadScenario = 'success' | 'empty' | 'error';

/** Dev-only knobs so reviewers can exercise every state from the UI. */
export const mockServerConfig = {
  loadScenario: 'success' as LoadScenario,
  sendFailureRate: 0.2,
  latencyMs: 1000,
};

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(() => resolve(), ms));

export const normalizeMessage = (raw: ApiMessage, index: number): Message => ({
  id: raw.id,
  sender: raw.type,
  text: raw.text,
  authorName: raw.authorName,
  recommendations: raw.recommendations,
  createdAt: raw.createdAt ? Date.parse(raw.createdAt) : Date.now() - (100 - index) * 60_000,
  status: raw.type === 'user' ? 'sent' : undefined,
  feedback: raw.type === 'ai' ? { rating: null, reasons: [] } : undefined,
});

export async function fetchConversation(): Promise<Message[]> {
  await delay(mockServerConfig.latencyMs);
  switch (mockServerConfig.loadScenario) {
    case 'error':
      throw new Error('Unable to load conversation.');
    case 'empty':
      return [];
    default:
      return mockConversation.map(normalizeMessage);
  }
}

export async function sendMessage(text: string): Promise<{ deliveredAt: number }> {
  await delay(mockServerConfig.latencyMs);
  // Typing "fail" forces an error so the retry flow is easy to demo.
  if (/fail/i.test(text) || Math.random() < mockServerConfig.sendFailureRate) {
    throw new Error('Network request failed');
  }
  return { deliveredAt: Date.now() };
}

export async function fetchAiReply(prompt: string): Promise<Message> {
  await delay(mockServerConfig.latencyMs * 1.4);
  const hit = mockAiReplies.find(r => r.match.test(prompt));
  return {
    id: createId(),
    sender: 'ai',
    text: hit?.text ?? defaultAiReply,
    recommendations: hit?.recommendations?.map(r => ({ ...r, id: createId() })),
    createdAt: Date.now(),
    feedback: { rating: null, reasons: [] },
  };
}
