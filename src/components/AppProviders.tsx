'use client';

import type { Session } from 'next-auth';
import { StatisticFilterProvider } from '@components/StatisticFilter';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import ApolloProvider from './ApolloProvider';
import { ToastProvider } from './Toast';

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
          <StatisticFilterProvider>
            {children}
          </StatisticFilterProvider>
        </ToastProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default AppProviders;
