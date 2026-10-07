import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const AVATAR_SIZE = 30;

export function Avatar({ emoji, color }: { emoji: string; color: string }) {
  return (
    <View style={[styles.avatar, { backgroundColor: color }]}>
      <Text style={styles.emoji}>{emoji}</Text>
    </View>
  );
}

/** Keeps grouped messages aligned when the avatar is hidden. */
export const AvatarSpacer = () => <View style={styles.spacer} />;

const styles = StyleSheet.create({
  avatar: { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 15 },
  spacer: { width: AVATAR_SIZE },
});
