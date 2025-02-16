import type { ToastProps } from '@/components/Toast/Toast';
import Toast from '@/components/Toast/Toast';
import { ToastProviderContext } from '@/components/Toast/ToastProvider/ToastProviderContext';
import TailusToast, { ToastProvider as ToastProviderRoot } from '@tailus-ui/Toast/Toast';
import React from 'react';

type ToastProviderProps = {
  children: React.ReactNode;
};

function ToastProvider({ children }: ToastProviderProps) {
  const [toasters, setToast] = React.useState<ToastProps[]>([]);
  const showToast = (toast: ToastProps) => setToast(state => [...state, toast]);
  const value = {
    showToast,
  };

  return (
    <ToastProviderRoot duration={1500} swipeDirection="right">
      <ToastProviderContext value={value}>
        {children}
        {toasters.map((props, index) => {
          const key = `key${props.title}-${index}`;

          return (
            <Toast
              key={key}
              fancy
              {...props}
            />
          );
        })}
        <TailusToast.Viewport />
      </ToastProviderContext>
    </ToastProviderRoot>
  );
}

export default ToastProvider;
