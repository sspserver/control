import type { ApolloError } from '@apollo/client';
import { gqlCurrentAccountTotalQuery } from '../graphql/queries/currentAccountTotal';
import client from './client';

export const currentAccountTotal = async (token: string) => {
  try {
    const { data } = await client.query({
      query: gqlCurrentAccountTotalQuery,
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    const account = data?.account?.account ?? {};
    const user = data?.user?.user ?? {};
    const session = data?.session ?? {};

    return { user, account, session };
  } catch (error) {
    const apolloError = error as ApolloError;

    return { user: null, account: null, session: null, errors: apolloError?.graphQLErrors };
  }
};
