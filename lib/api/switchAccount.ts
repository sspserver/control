import { gqlSwitchAccountMutation } from '../graphql/mutations/switchAccount';
import client from './client';

export const switchAccount = async (accountID: number, token: string) => {
  const { data } = await client.mutate({
    mutation: gqlSwitchAccountMutation,
    variables: { accountID },
    context: { headers: { Authorization: `Bearer ${token}` } },
  });
  const newToken = data?.switchAccount?.token || null;
  const isAdmin = data?.switchAccount?.isAdmin || false;
  const roles = data?.switchAccount?.roles || [];
  const expiresAt = data?.switchAccount?.expiresAt || null;

  return { token: newToken, isAdmin, roles, expiresAt };
};
