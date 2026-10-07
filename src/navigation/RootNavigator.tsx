import { DarkTheme, NavigationContainer, type Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ConversationScreen } from '../screens/ConversationScreen';
import { colors } from '../theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme: Theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.background, card: colors.background, primary: colors.primary, text: colors.text, border: colors.border },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Conversation"
          component={ConversationScreen}
          options={{ title: 'Cosmic AI ✨', headerShadowVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
