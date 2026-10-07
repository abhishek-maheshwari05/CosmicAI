import type { Message } from '../../types/conversation';

export const senderLabel = (m: Pick<Message, 'sender' | 'authorName'>) => {
  switch (m.sender) {
    case 'user':
      return 'You';
    case 'ai':
      return 'Cosmic AI';
    case 'human':
      return m.authorName ?? 'Astrologer';
    default:
      return 'System';
  }
};
