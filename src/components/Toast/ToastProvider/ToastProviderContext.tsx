import type { ToastProps } from '@/components/Toast/Toast';
import { createContext } from 'react';

export type ToastProviderContextProps = {
  showToast: (toast: ToastProps) => void;
};
export const ToastProviderContext = createContext<ToastProviderContextProps>({} as ToastProviderContextProps);
