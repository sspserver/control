import type { Session } from 'next-auth';

import { ApolloLink, HttpLink, Observable } from '@apollo/client';
import { ApolloClient, InMemoryCache, SSRMultipartLink } from '@apollo/client-integration-nextjs';
import { onError } from '@apollo/client/link/error';
import { getPublicEnv } from '@configs/api';
import { configPathRoutes } from '@configs/routes';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

// Load Apollo Client error messages in development
if (process.env.NODE_ENV === 'development') {
  import('@apollo/client/dev').then(({ loadErrorMessages, loadDevMessages }) => {
    loadDevMessages();
    loadErrorMessages();
  }).catch((err) => {
    console.error('Failed to load Apollo Client error messages:', err);
  });
}

const userUnagreedMessage = 'you must accept the agreements before proceeding';

function useApolloProvider(session: Session | null) {
  const router = useRouter();
  const agreementCheckLink = new ApolloLink((operation, forward) => {
    const { pathname } = window.location;
    const isAgreementRoute = pathname === configPathRoutes.agreement;

    if (!session?.user?.isAcceptAgreement && typeof window !== 'undefined' && !isAgreementRoute) {
      const callbackUrl = encodeURIComponent(pathname);

      window.location.href = `${configPathRoutes.agreement}?callbackUrl=${callbackUrl}`;

      return new Observable(() => {});
    }
    return forward(operation);
  });
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

          if (error.message === userUnagreedMessage) {
            router.push(configPathRoutes.agreement);
          }
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

    const env = getPublicEnv();

    return new HttpLink({
      uri: env.NEXT_PUBLIC_API_URL || env.API_URL,
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
      : ApolloLink.from([errorLink, agreementCheckLink, httpLink]),
  });
}

export default useApolloProvider;
