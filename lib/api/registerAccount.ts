import type { ApolloError } from '@apollo/client';
import { RegisterAccountDocument } from '@/generated/graphql';
import client from './client';

export type RegisterAccountInput = {
  ownerID: string | number;
  name: string;
  description: string;
};

export const registerAccount = async (input: RegisterAccountInput) => {
  try {
    const { data } = await client.mutate({
      mutation: RegisterAccountDocument,
      variables: {
        ownerID: input.ownerID,
        input: {
          name: input.name,
          description: input.description,
        },
      },
    });

    const account = data?.registerAccount?.account;

    if (!account) {
      return {
        status: false,
        message: 'Failed to create account',
        errors: null,
      };
    }

    return {
      status: true,
      message: 'Account created successfully',
      data: {
        account,
      },
      errors: null,
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    return {
      status: false,
      message: apolloError?.message || 'Failed to create account',
      errors: apolloError?.graphQLErrors,
    };
  }
};
