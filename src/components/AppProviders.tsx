'use client';

import type { Session } from 'next-auth';
import ApolloProvider from '@/components/ApolloProvider';
import { ToastProvider } from '@/components/Toast';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

type AppProvidersProps = {
  children: React.ReactNode;
  session: Session | null;
};

function AppProviders({
  children,
  session,
}: AppProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider session={session}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default AppProviders;
