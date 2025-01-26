import type React from 'react';
import type { UserCredentials } from './SignInForm.types';
import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { defaultUserCredentials, signInDefaultOptions } from './SignInForm.const';

function useSignInForm() {
  const {replace, push} = useRouter();
  const [userCredentials, setUserCredentials] = useState<UserCredentials>(defaultUserCredentials);
  const [error, setError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const { data: _session } = useSession();
  const session = _session as any;
  const isHalfAuthorized = !!session;
  const accessToken: string = useSearchParams().get('access_token') || '';
  const registered: boolean = !!useSearchParams().get('registered');
  const changeUserCredentialInputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    console.log('xxx name', name, value);

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
      setIsSubmit(true);

      const result = await signIn('credentials', options);

      console.log('xxx result', result)

      if (result && result.error) {
        setError(result.error);
        // snackbar.error(result.error);
      } else {
        // push(options.callbackUrl);
        window.location.href = options.callbackUrl;
      }
      setIsSubmit(false);
    } catch (err) {
      console.error('error: ', err);
      // snackbar.error(err+'');
    }
  };


  useEffect(() => {
    (async () => {
      if (!isHalfAuthorized && !!accessToken) {
        setIsSubmit(true);
        const options = {
          token: accessToken,
          redirect: false,
          callbackUrl: '/',
          csrfToken: await getCsrfToken(),
        };
        const result = await signIn('token', options);


        // console.log('xxx accessToken', result, accessToken)

        if (result && result.error) {
          setError(result.error);
          // snackbar.error(result.error);
        } else {
          // window.location.href = result?.url || options.callbackUrl;
        }
      }
    })().catch((err) => {
      console.error('error: ', err);
      // snackbar.error(err+'');
    }).finally(() => {
      setIsSubmit(false);
    });
  }, [accessToken, isHalfAuthorized]);

  return {
    userCredentials,
    submitSigInFormHandler,
    changeUserCredentialInputHandler,
  };
}

export default useSignInForm;
