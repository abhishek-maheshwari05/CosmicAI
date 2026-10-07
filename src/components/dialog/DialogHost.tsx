import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { colors, glow, radius, spacing, type } from '../../theme';
import { motion } from '../../theme/motion';
import { Button } from '../common/Button';
import { useDialogStore, type DialogAction } from './dialogStore';

/** Mounted once at the app root; renders whatever `showDialog` last asked for. */
export function DialogHost() {
  const dialog = useDialogStore(s => s.current);
  const hide = useDialogStore(s => s.hide);
  if (!dialog) return null;

  const accent = dialog.tone === 'danger' ? colors.danger : dialog.accent ?? colors.primary;
  const actions: DialogAction[] = dialog.actions?.length ? dialog.actions : [{ text: 'OK' }];
  const cancel = actions.find(a => a.style === 'cancel');
  const stacked = actions.length > 2;
  const Icon = dialog.icon;

  const press = (a?: DialogAction) => {
    hide();
    a?.onPress?.();
  };

  return (
    <Modal transparent visible animationType="none" onRequestClose={() => press(cancel)} statusBarTranslucent>
      <Animated.View entering={motion.fadeIn} exiting={motion.fadeOut} style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => press(cancel)} accessibilityLabel="Dismiss" />
      </Animated.View>
      <View style={styles.center} pointerEvents="box-none">
        <Animated.View entering={motion.rise} exiting={motion.fadeOut} style={[styles.card, glow('#000', 0.5)]} accessibilityViewIsModal>
          {Icon ? (
            <View style={[styles.iconTile, { backgroundColor: accent + '1F' }]}>
              <Icon size={22} color={accent} strokeWidth={2} />
            </View>
          ) : null}
          <Text style={styles.title}>{dialog.title}</Text>
          {dialog.message ? <Text style={styles.message}>{dialog.message}</Text> : null}
          <View style={[styles.actions, stacked && styles.actionsStacked]}>
            {(stacked ? actions : [...actions].sort(a => (a.style === 'cancel' ? -1 : 1))).map(a => (
              <Button
                key={a.text}
                title={a.text}
                onPress={() => press(a)}
                flex={!stacked}
                variant={a.style === 'cancel' ? 'secondary' : a.style === 'destructive' ? 'danger' : 'primary'}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: colors.overlay },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
  },
  iconTile: { width: 44, height: 44, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
  title: { ...type.title, color: colors.text },
  message: { fontSize: 14, lineHeight: 20, color: colors.textSecondary, marginTop: spacing.sm },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xl },
  actionsStacked: { flexDirection: 'column' },
});
