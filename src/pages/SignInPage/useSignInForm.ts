import type { GraphQLFormattedError } from 'graphql/index';
import type React from 'react';
import type { UserCredentials } from './SignInForm.types';
import CustomGraphQLError from '@lib/errors/CustomGraphQLError';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { defaultUserCredentials, signInDefaultOptions } from './SignInForm.const';

function useSignInForm() {
  const { push } = useRouter();
  const [userCredentials, setUserCredentials] = useState<UserCredentials>(defaultUserCredentials);
  const [error, setError] = useState<ReadonlyArray<GraphQLFormattedError>>([]);
  const signInFormErrors = useMemo(() => error.reduce<Record<string, string>>((acc, { message, path = [] }) => ({ ...acc, [path?.join('.')]: message }), {}), [
    error,
  ]);
  const [isLoading, setLoading] = useState(false);
  // const { data: _session } = useSession();
  // const session = _session as any;
  // const isHalfAuthorized = !!session;
  // const accessToken: string = useSearchParams().get('access_token') || '';
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

      if (result && result.error) {
        const graphQLError = CustomGraphQLError.toGraphQLFormattedError(result.error);

        setError(graphQLError);
      } else {
        push(options.callbackUrl);
      }
    } catch (err) {
      console.error('error: ', err);
      // TODO: implement the Toast component
      // snackbar.error(err+'');
    }

    setLoading(false);
  };

  // useEffect(() => {
  //   (async () => {
  //     if (!isHalfAuthorized && !!accessToken) {
  //       setIsSubmit(true);
  //       const options = {
  //         ...signInDefaultOptions,
  //         token: accessToken,
  //         csrfToken: await getCsrfToken(),
  //       };
  //       const result = await signIn('token', options);
  //
  //       if (result && result.error) {
  //         const graphQLError = CustomGraphQLError.toGraphQLFormattedError(result.error);
  //
  //         setError(graphQLError);
  //         // snackbar.error(result.error);
  //       } else {
  //         // window.location.href = result?.url || options.callbackUrl;
  //       }
  //     }
  //   })().catch((err) => {
  //     console.error('error: ', err);
  //     // snackbar.error(err+'');
  //   }).finally(() => {
  //     setIsSubmit(false);
  //   });
  // }, [accessToken, isHalfAuthorized]);

  return {
    isLoading,
    userCredentials,
    signInFormErrors,
    submitSigInFormHandler,
    changeUserCredentialInputHandler,
  };
}

export default useSignInForm;
