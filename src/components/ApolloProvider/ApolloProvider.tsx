import type { Session } from 'next-auth';
import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import React from 'react';
import useApolloProvider from '@/components/ApolloProvider/useApolloProvider';

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
