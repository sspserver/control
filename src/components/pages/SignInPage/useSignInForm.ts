import type { GraphQLFormattedError } from 'graphql/index';
import type React from 'react';
import type { UserCredentials } from './SignInForm.types';
import { useToastProviderContext } from '@components/Toast';
import { ShieldExclamationIcon } from '@heroicons/react/16/solid';
import CustomGraphQLError from '@lib/errors/CustomGraphQLError';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { createElement, useMemo, useState } from 'react';
import { defaultUserCredentials, signInDefaultOptions } from './SignInForm.const';

function useSignInForm() {
  const { showToast } = useToastProviderContext();
  const searchParams = useSearchParams();
  const [userCredentials, setUserCredentials] = useState<UserCredentials>(defaultUserCredentials);
  const [error, setError] = useState<ReadonlyArray<GraphQLFormattedError>>([]);
  const signInFormErrors = useMemo(() => error.reduce<Record<string, string>>((acc, { message, path = [] }) => ({ ...acc, [path?.join('.')]: message }), {}), [
    error,
  ]);
  const [isLoading, setLoading] = useState(false);
  const changeUserCredentialInputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setError([]);

    setUserCredentials(state => ({
      ...state,
      [name]: value,
    }));
  };
  const submitSigInFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const options = {
        ...signInDefaultOptions,
        ...userCredentials,
        csrfToken: await getCsrfToken(),
      };
      setLoading(true);

      const result = await signIn('credentials', options);
      const callbackUrl = searchParams.get('callbackUrl') ?? options.callbackUrl;

      if (result && result.error) {
        let graphQLError = CustomGraphQLError.toGraphQLFormattedError(result.error);

        if (!graphQLError.length) {
          graphQLError = [
            {
              message: 'Something went wrong',
              path: ['login'],
            },
          ];
        }

        setError(graphQLError);
      } else {
        location.href = callbackUrl;
      }
    } catch (error) {
      console.error(error);
      showToast({
        title: 'Something went wrong',
        description: 'Please try again later',
        icon: createElement(ShieldExclamationIcon, { className: 'w-4 h-4 text-danger-600' }),
      });
    }

    setLoading(false);
  };

  return {
    isLoading,
    userCredentials,
    signInFormErrors,
    submitSigInFormHandler,
    changeUserCredentialInputHandler,
  };
}

export default useSignInForm;
