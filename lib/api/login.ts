import type { ApolloError } from '@apollo/client';
import { gqlLoginMutation } from '../graphql/mutations/login';
import client from './client';

export const login = async (username: string, password: string) => {
  try {
    const { data } = await client.mutate({
      mutation: gqlLoginMutation,
      variables: { username, password },
    });
    const token = data?.login?.token || null;
    const isAdmin = data?.login?.isAdmin || false;
    const roles = data?.login?.roles || [];
    const expiresAt = data?.login?.expiresAt || null;

    return { username, token, isAdmin, roles, expiresAt };
  } catch (error) {
    const apolloError = error as ApolloError;

    return { username, token: null, isAdmin: false, roles: [], expiresAt: null, errors: apolloError?.graphQLErrors };
  }
};
