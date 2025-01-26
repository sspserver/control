'use client';

import type { Session } from 'next-auth';
import { ApolloLink, HttpLink } from '@apollo/client';

import { onError } from '@apollo/client/link/error';
import { ApolloClient, ApolloNextAppProvider, InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import {
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { SessionProvider, signOut } from 'next-auth/react';
import React from 'react';

type AppProvidersProps = {
  children: React.ReactNode;
  session: Session | null;
};

const makeClient = session  => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.error(`[Network error]:`, networkError);
    }
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        console.debug('GraphQL error', error);
        if (error?.code === 401) {
          try {
            console.debug('Signing out due to 401 error');
            signOut({ redirect: true });
            return;
          } catch (e) {
            console.log('Error signing out', e);
          } finally {
            console.debug('signOut() called');
          }
        }
      }
    }
  });
  const headers: Record<string, string> = {};

  if (session && session.session?.accessToken) {
    headers.Authorization = `Bearer ${session.session.accessToken}`;
  }
  if (!process.env.API_URL && process.env.NEXT_PUBLIC_TUNNEL_TOKEN) {
    headers['X-Tunnel-Authorization'] = `tunnel ${process.env.NEXT_PUBLIC_TUNNEL_TOKEN}`;
  }
  const httpLink = new HttpLink({
    uri: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
    headers,
  });

  console.log('xxx session makeClient 1', errorLink,  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: typeof window === 'undefined'
      ? ApolloLink.from([
          new SSRMultipartLink({ stripDefer: true }),
          errorLink,
          httpLink,
        ])
      : ApolloLink.from([errorLink, httpLink]),
  });
};

function AppProviders({
  children,
  session,
}: AppProvidersProps) {
  // const apolloNextAppProviderClient = makeClient(session);

  console.log('xxx apolloNextAppProviderClient')

  return (
    <SessionProvider session={session}>
      <ApolloNextAppProvider makeClient={() => makeClient(session)}>{children}</ApolloNextAppProvider>
    </SessionProvider>
  );
}

export default AppProviders;
