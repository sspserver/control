import { gqlCurrentAccountQuery } from '../graphql/queries/currentAccount';
import client from './client';

export const currentAccount = async (token: string) => {
  const { data } = await client.query({
    query: gqlCurrentAccountQuery,
    context: { headers: { Authorization: `Bearer ${token}` } },
  });
  const account = data?.account?.account || {};
  const user = data?.user?.user || {};

  return { user, account };
};
