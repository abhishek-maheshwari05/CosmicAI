import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DialogHost } from './src/components/dialog/DialogHost';
import { ToastHost } from './src/components/dialog/Toast';
import './src/features/recommendations'; // registers recommendation types
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <RootNavigator />
      <DialogHost />
      <ToastHost />
    </SafeAreaProvider>
  );
}
