import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConversationStore, useMessage } from '../../store/conversationStore';
import { colors, radius, spacing } from '../../theme';

interface Action {
  key: string;
  label: string;
  icon: string;
  destructive?: boolean;
  run: () => void;
}

export function MessageActionSheet({ messageId, onClose }: { messageId: string | null; onClose: () => void }) {
  const message = useMessage(messageId ?? '');
  const setReplyingTo = useConversationStore(s => s.setReplyingTo);
  const deleteMessage = useConversationStore(s => s.deleteMessage);
  const insets = useSafeAreaInsets();

  if (!messageId || !message) return null;

  const actions: Action[] = [
    { key: 'reply', label: 'Reply', icon: '↩️', run: () => setReplyingTo(message.id) },
    { key: 'copy', label: 'Copy', icon: '📋', run: () => Clipboard.setString(message.text) },
    {
      key: 'delete',
      label: 'Delete',
      icon: '🗑️',
      destructive: true,
      run: () =>
        Alert.alert('Delete message?', 'This removes the message from this conversation.', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => deleteMessage(message.id) },
        ]),
    },
  ];

  return (
    <Modal transparent visible animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <Animated.View entering={FadeIn.duration(150)} style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close actions" />
      </Animated.View>
      <Animated.View entering={SlideInDown.springify().damping(18)} style={[styles.sheet, { paddingBottom: insets.bottom + spacing.md }]}>
        <View style={styles.handle} />
        <Text style={styles.preview} numberOfLines={2}>
          {message.text}
        </Text>
        {actions.map(a => (
          <Pressable
            key={a.key}
            style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
            onPress={() => {
              onClose();
              a.run();
            }}
            accessibilityRole="button">
            <Text style={styles.icon}>{a.icon}</Text>
            <Text style={[styles.label, a.destructive && styles.destructive]}>{a.label}</Text>
          </Pressable>
        ))}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.55)' },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  handle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border, marginBottom: spacing.md },
  preview: { color: colors.textMuted, fontSize: 13, marginBottom: spacing.sm },
  action: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderRadius: radius.sm },
  actionPressed: { backgroundColor: colors.surfaceAlt },
  icon: { fontSize: 18, width: 32 },
  label: { color: colors.text, fontSize: 16 },
  destructive: { color: colors.danger },
});
