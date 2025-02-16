import { ToastProviderContext } from '@/components/Toast/ToastProvider/ToastProviderContext';
import React from 'react';

function useToastProviderContext() {
  const context = React.useContext(ToastProviderContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}

export default useToastProviderContext;
