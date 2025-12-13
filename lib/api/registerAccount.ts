import type { ApolloError } from '@apollo/client';
import { RegisterAccountDocument } from '@/generated/graphql';
import client from './client';

export type RegisterAccountInput = {
  username: string;
  password: string;
  accountTitle: string;
  accountDescription: string;
};

export const registerAccount = async (input: RegisterAccountInput) => {
  try {
    const { data } = await client.mutate({
      mutation: RegisterAccountDocument,
      variables: {
        input: {
          password: input.password,
          owner: {
            username: input.username,
          },
          account: {
            title: input.accountTitle,
            description: input.accountDescription,
          },
        },
      },
    });

    const account = data?.registerAccount?.account;
    const owner = data?.registerAccount?.owner;

    if (!account || !owner) {
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
        owner,
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
