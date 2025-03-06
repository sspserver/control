import type { Session } from 'next-auth';
import { ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support';
import { apiUrl } from '@configs/api';
import { useMemo } from 'react';

function useApolloProvider(session: Session | null) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.error(`[Network error]:`, networkError);
    }

    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        // eslint-disable-next-line no-console
        console.debug('GraphQL error', error);
        // TODO: check the unauthorized error code
        // if (error?.code === 401) {
        try {
          // eslint-disable-next-line no-console
          console.debug('Signing out due to 401 error');
          // signOut({ redirect: true });
          return;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('Error signing out', e);
        } finally {
          // eslint-disable-next-line no-console
          console.debug('signOut() called');
        }
      }
      // }
    }
  });
  const httpLink = useMemo(() => {
    const headers: Record<string, string> = {};

    if (session && session.session?.accessToken) {
      headers.Authorization = `Bearer ${session.session.accessToken}`;
    }

    if (!process.env.API_URL && process.env.NEXT_PUBLIC_TUNNEL_TOKEN) {
      headers['X-Tunnel-Authorization'] = `tunnel ${process.env.NEXT_PUBLIC_TUNNEL_TOKEN}`;
    }

    return new HttpLink({
      uri: apiUrl,
      headers,
    });
  }, [session]);

  return () => new ApolloClient({
    cache: new InMemoryCache(),
    link: typeof window === 'undefined'
      ? ApolloLink.from([
          new SSRMultipartLink({ stripDefer: true }),
          errorLink,
          httpLink,
        ])
      : ApolloLink.from([errorLink, httpLink]),
  });
}

export default useApolloProvider;
