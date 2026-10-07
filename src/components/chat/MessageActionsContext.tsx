import { createContext, useContext } from 'react';

/**
 * Screen-level interactions that rows need but shouldn't receive as props
 * (props would break memoisation of renderItem and couple rows to the screen).
 */
interface MessageActions {
  openActions: (id: string) => void;
}

export const MessageActionsContext = createContext<MessageActions>({ openActions: () => {} });
export const useMessageActions = () => useContext(MessageActionsContext);
