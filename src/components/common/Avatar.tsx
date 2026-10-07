import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AVATAR_SIZE = 28;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase() ?? '')
    .join('');

/** Initials avatar tinted with the sender's colour. */
export function Avatar({ name, color }: { name: string; color: string }) {
  return (
    <View style={[styles.avatar, { backgroundColor: color + '26' }]}>
      <Text style={[styles.text, { color }]}>{initials(name)}</Text>
    </View>
  );
}

/** Keeps grouped messages aligned when the avatar is hidden. */
export const AvatarSpacer = () => <View style={styles.spacer} />;

const styles = StyleSheet.create({
  avatar: { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 11, fontWeight: '700' },
  spacer: { width: AVATAR_SIZE },
});
