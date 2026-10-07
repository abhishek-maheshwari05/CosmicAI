import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ChatHeader } from '../components/chat/ChatHeader';
import { Composer } from '../components/chat/Composer';
import { MessageActionSheet } from '../components/chat/MessageActionSheet';
import { MessageActionsContext } from '../components/chat/MessageActionsContext';
import { MessageList } from '../components/chat/MessageList';
import { showDialog } from '../components/dialog/dialogStore';
import { EmptyState, ErrorState, LoadingState } from '../components/states/StateView';
import { mockServerConfig, type LoadScenario } from '../services/conversationApi';
import { useConversationStore } from '../store/conversationStore';
import { colors } from '../theme';

export function ConversationScreen() {
  const loadState = useConversationStore(s => s.loadState);
  const isEmpty = useConversationStore(s => s.ids.length === 0);
  const load = useConversationStore(s => s.load);
  const [actionTargetId, setActionTargetId] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, [load]);

  const openSimulator = useCallback(() => {
    const run = (scenario: LoadScenario) => {
      mockServerConfig.loadScenario = scenario;
      load();
    };
    showDialog({
      title: 'Simulate server response',
      message: 'Reload the conversation using a mock scenario.',
      actions: [
        { text: 'Success', onPress: () => run('success') },
        { text: 'Empty conversation', style: 'cancel', onPress: () => run('empty') },
        { text: 'Network failure', style: 'cancel', onPress: () => run('error') },

        { text: 'Cancel', style: 'cancel' },
      ],
    });
  }, [load]);

  const actions = useMemo(() => ({ openActions: setActionTargetId }), []);

  let body: React.ReactNode;
  if (loadState === 'idle' || loadState === 'loading') body = <LoadingState />;
  else if (loadState === 'error') body = <ErrorState onRetry={load} />;
  else body = isEmpty ? <EmptyState /> : <MessageList />;

  return (
    <MessageActionsContext.Provider value={actions}>
      <View style={styles.container}>
        <ChatHeader onMenu={openSimulator} />
        <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.body}>{body}</View>
          {loadState === 'ready' ? <Composer /> : null}
        </KeyboardAvoidingView>
      </View>
      <MessageActionSheet messageId={actionTargetId} onClose={() => setActionTargetId(null)} />
    </MessageActionsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { flex: 1 },
});
