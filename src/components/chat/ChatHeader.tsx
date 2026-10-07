import { Ellipsis } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useConversationStore } from '../../store/conversationStore';
import { colors, spacing, type } from '../../theme';
import { CosmicLogo } from '../brand/CosmicLogo';
import { IconButton } from '../common/IconButton';

export function ChatHeader({ onMenu }: { onMenu: () => void }) {
  const insets = useSafeAreaInsets();
  const isTyping = useConversationStore(s => s.isAiTyping);
  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <CosmicLogo size={34} animated={false} />
      <View style={styles.titles}>
        <Text style={styles.title}>Cosmic AI</Text>
        <View style={styles.statusRow}>
          <View style={[styles.dot, isTyping && styles.dotTyping]} />
          <Text style={styles.status}>{isTyping ? 'Typing…' : 'AI Astrologer'}</Text>
        </View>
      </View>
      <IconButton icon={Ellipsis} onPress={onMenu} label="Simulation options" size={20} color={colors.textSecondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderStrong,
  },
  titles: { flex: 1 },
  title: { ...type.title, color: colors.text },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 1, gap: 5 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success },
  dotTyping: { backgroundColor: colors.primary },
  status: { ...type.caption, color: colors.textMuted },
});
