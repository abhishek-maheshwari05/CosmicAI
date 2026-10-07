import type { LucideIcon } from 'lucide-react-native';
import { create } from 'zustand';

export interface DialogAction {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
}

interface DialogOptions {
  title: string;
  message?: string;
  /** Optional icon shown above the title. */
  icon?: LucideIcon;
  /** Tint for the icon tile. */
  accent?: string;
  /** `danger` styles the dialog for destructive confirmations. */
  tone?: 'default' | 'danger';
  actions?: DialogAction[];
}

interface DialogState {
  current: DialogOptions | null;
  show: (options: DialogOptions) => void;
  hide: () => void;
}

/**
 * Themed replacement for `Alert.alert`. Any module (including non-React code
 * like recommendation actions) can call `showDialog`; <DialogHost /> renders it.
 */
export const useDialogStore = create<DialogState>(set => ({
  current: null,
  show: options => set({ current: options }),
  hide: () => set({ current: null }),
}));

export const showDialog = (options: DialogOptions) => useDialogStore.getState().show(options);
