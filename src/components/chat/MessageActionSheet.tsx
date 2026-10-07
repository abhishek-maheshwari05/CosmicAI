import Clipboard from '@react-native-clipboard/clipboard';
import { Copy, Reply, Trash2, type LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConversationStore, useMessage } from '../../store/conversationStore';
import { colors, radius, spacing, type } from '../../theme';
import { duration, easeOut, motion } from '../../theme/motion';
import { showDialog } from '../dialog/dialogStore';
import { showToast } from '../dialog/Toast';

interface Action {
  key: string;
  label: string;
  icon: LucideIcon;
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
    { key: 'reply', label: 'Reply', icon: Reply, run: () => setReplyingTo(message.id) },
    {
      key: 'copy',
      label: 'Copy text',
      icon: Copy,
      run: () => {
        Clipboard.setString(message.text);
        showToast('Copied to clipboard');
      },
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: Trash2,
      destructive: true,
      run: () =>
        // Let the sheet's modal finish dismissing before presenting another (iOS).
        setTimeout(
          () =>
            showDialog({
              tone: 'danger',
              title: 'Delete message?',
              message: 'This message will be removed from the conversation.',
              actions: [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteMessage(message.id) },
              ],
            }),
          250,
        ),
    },
  ];

  return (
    <Modal transparent visible animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <Animated.View entering={motion.fadeIn} style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close actions" />
      </Animated.View>
      <Animated.View
        entering={SlideInDown.duration(duration.slow).easing(easeOut)}
        style={[styles.sheet, { paddingBottom: insets.bottom + spacing.md }]}>
        <View style={styles.handle} />
        <View style={styles.preview}>
          <Text style={styles.previewText} numberOfLines={3}>
            {message.text}
          </Text>
        </View>
        <View style={styles.group}>
          {actions.map((a, i) => {
            const tint = a.destructive ? colors.danger : colors.text;
            return (
              <Pressable
                key={a.key}
                style={({ pressed }) => [styles.action, i > 0 && styles.divider, pressed && styles.actionPressed]}
                onPress={() => {
                  onClose();
                  a.run();
                }}
                accessibilityRole="button">
                <Text style={[styles.label, { color: tint }]}>{a.label}</Text>
                <a.icon size={18} color={tint} strokeWidth={2} />
              </Pressable>
            );
          })}
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: colors.overlay },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  handle: { alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: colors.borderStrong, marginBottom: spacing.lg },
  preview: { backgroundColor: colors.surfaceAlt, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  previewText: { ...type.caption, lineHeight: 18, color: colors.textSecondary },
  group: { backgroundColor: colors.surfaceAlt, borderRadius: radius.md, overflow: 'hidden' },
  action: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, height: 50 },
  divider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.borderStrong },
  actionPressed: { backgroundColor: colors.surfacePressed },
  label: { fontSize: 16 },
});
