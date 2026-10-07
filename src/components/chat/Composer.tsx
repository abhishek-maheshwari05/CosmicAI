import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConversationStore } from '../../store/conversationStore';
import { colors, radius, spacing } from '../../theme';
import { PressableScale } from '../common/PressableScale';
import { ReplyPreview } from './ReplyPreview';

export function Composer() {
  const [text, setText] = useState('');
  const inputRef = useRef<React.ComponentRef<typeof TextInput>>(null);
  const send = useConversationStore(s => s.send);
  const replyingToId = useConversationStore(s => s.replyingToId);
  const insets = useSafeAreaInsets();
  const canSend = text.trim().length > 0;

  useEffect(() => {
    if (replyingToId) inputRef.current?.focus();
  }, [replyingToId]);

  const onSend = () => {
    if (!canSend) return;
    send(text);
    setText('');
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
      {replyingToId ? <ReplyPreview messageId={replyingToId} /> : null}
      <View style={styles.row}>
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={setText}
          placeholder="Ask the stars anything..."
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          multiline
          maxLength={1000}
          accessibilityLabel="Message"
        />
        <PressableScale
          onPress={onSend}
          disabled={!canSend}
          style={[styles.send, !canSend && styles.sendDisabled]}
          accessibilityRole="button"
          accessibilityLabel="Send message">
          <Text style={styles.sendText}>➤</Text>
        </PressableScale>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  row: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: spacing.md, paddingTop: spacing.sm, gap: spacing.sm },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 120,
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: 11,
    paddingBottom: 11,
    fontSize: 15,
  },
  send: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  sendDisabled: { opacity: 0.4 },
  sendText: { color: '#fff', fontSize: 18 },
});
