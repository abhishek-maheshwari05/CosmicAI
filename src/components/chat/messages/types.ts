import type { Message } from '../../../types/conversation';

export interface MessageRendererProps {
  message: Message;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
}
