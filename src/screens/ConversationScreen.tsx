import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Composer } from '../components/chat/Composer';
import { MessageActionSheet } from '../components/chat/MessageActionSheet';
import { MessageActionsContext } from '../components/chat/MessageActionsContext';
import { MessageList } from '../components/chat/MessageList';
import { EmptyState, ErrorState, LoadingState } from '../components/states/StateView';
import type { RootStackParamList } from '../navigation/types';
import { mockServerConfig, type LoadScenario } from '../services/conversationApi';
import { useConversationStore } from '../store/conversationStore';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Conversation'>;

export function ConversationScreen({ navigation }: Props) {
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
    Alert.alert('Simulate', 'Reload the conversation with a mock server scenario.', [
      { text: 'Success', onPress: () => run('success') },
      { text: 'Empty conversation', onPress: () => run('empty') },
      { text: 'Network failure', onPress: () => run('error') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, [load]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={openSimulator} hitSlop={12} accessibilityLabel="Simulation options">
          <Text style={styles.headerAction}>⋯</Text>
        </Pressable>
      ),
    });
  }, [navigation, openSimulator]);

  const actions = useMemo(() => ({ openActions: setActionTargetId }), []);

  let body: React.ReactNode;
  if (loadState === 'idle' || loadState === 'loading') body = <LoadingState />;
  else if (loadState === 'error') body = <ErrorState onRetry={load} />;
  else body = isEmpty ? <EmptyState /> : <MessageList />;

  return (
    <MessageActionsContext.Provider value={actions}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <View style={styles.body}>{body}</View>
        {loadState === 'ready' ? <Composer /> : null}
      </KeyboardAvoidingView>
      <MessageActionSheet messageId={actionTargetId} onClose={() => setActionTargetId(null)} />
    </MessageActionsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { flex: 1 },
  headerAction: { color: colors.text, fontSize: 24, paddingHorizontal: 4 },
});
