import type { ApolloError } from '@apollo/client';
import { gqlResetUserPasswordMutation } from '../graphql/mutations/resetPassword';
import client from './client';

export const resetUserPassword = async (email: string) => {
  try {
    const { data } = await client.mutate({
      mutation: gqlResetUserPasswordMutation,
      variables: { email },
    });

    const status = data?.resetUserPassword?.status || false;
    const message = data?.resetUserPassword?.message || '';

    return { status, message, errors: null };
  } catch (error) {
    const apolloError = error as ApolloError;

    return {
      status: false,
      message: 'Failed to send password reset email',
      errors: apolloError?.graphQLErrors,
    };
  }
};
