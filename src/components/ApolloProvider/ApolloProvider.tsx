import type { Session } from 'next-auth';
import useApolloProvider from '@/components/ApolloProvider/useApolloProvider';
import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import React from 'react';

type ApolloNextAppProviderProps = {
  children: React.ReactNode;
  session: Session | null;
};

function ApolloProvider({ children, session }: ApolloNextAppProviderProps) {
  const apolloClient = useApolloProvider(session);
  return (
    <ApolloNextAppProvider makeClient={apolloClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

export default ApolloProvider;
