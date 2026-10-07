import { ArrowUp } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConversationStore } from '../../store/conversationStore';
import { colors, radius, spacing, type } from '../../theme';
import { ReplyPreview } from './ReplyPreview';

export function Composer() {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
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
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <View style={[styles.field, focused && styles.fieldFocused]}>
        {replyingToId ? <ReplyPreview messageId={replyingToId} /> : null}
        <View style={styles.row}>
          <TextInput
            ref={inputRef}
            value={text}
            onChangeText={setText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Message Cosmic AI"
            placeholderTextColor={colors.textMuted}
            selectionColor={colors.primary}
            style={styles.input}
            multiline
            maxLength={1000}
            accessibilityLabel="Message"
          />
          <Pressable
            onPress={onSend}
            disabled={!canSend}
            hitSlop={6}
            style={({ pressed }) => [styles.send, !canSend && styles.sendDisabled, pressed && styles.sendPressed]}
            accessibilityRole="button"
            accessibilityLabel="Send message"
            accessibilityState={{ disabled: !canSend }}>
            <ArrowUp size={18} color={canSend ? '#fff' : colors.textMuted} strokeWidth={2.5} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  field: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  fieldFocused: { borderColor: colors.borderStrong },
  row: { flexDirection: 'row', alignItems: 'flex-end', paddingLeft: spacing.lg, paddingRight: 6, paddingVertical: 6 },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 120,
    color: colors.text,
    fontSize: type.body.fontSize,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: spacing.sm,
  },
  send: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  sendDisabled: { backgroundColor: colors.surfaceAlt },
  sendPressed: { backgroundColor: colors.primaryPressed },
});
