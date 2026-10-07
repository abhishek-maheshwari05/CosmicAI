import type { ComponentType } from 'react';
import type { Sender } from '../../../types/conversation';
import { AssistantMessage } from './AssistantMessage';
import { HumanMessage } from './HumanMessage';
import { SystemEvent } from './SystemEvent';
import type { MessageRendererProps } from './types';
import { UserMessage } from './UserMessage';

/** Same registry idea as recommendations: sender → renderer. */
export const messageRenderers: Record<Sender, ComponentType<MessageRendererProps>> = {
  user: UserMessage,
  ai: AssistantMessage,
  human: HumanMessage,
  system: SystemEvent,
};

export type { MessageRendererProps };
