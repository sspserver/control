import type { FormikHelpers } from 'formik/dist/types';
import type { AccountFormState } from './AccountForm.types';

import { useGetAccountQuery, useUpdateAccountMutation } from '@/generated/graphql';
import { useToastProviderContext } from '@components/Toast';
import { extractQLErrorFromNetworkError } from '@lib/errors/extractQLErrorFromNetworkError';
import graphQLErrorToMap from '@lib/errors/graphQLErrorToMap';
import { useSession } from 'next-auth/react';
import { toastSuccessMessage } from './AccountForm.const';

function useAccountForm() {
  const { showToast } = useToastProviderContext();
  const { data } = useSession();
  const userId = data?.user?.ID;
  const { loading: accountLoading, error: accountLoadError, data: responseAccountData } = useGetAccountQuery({
    variables: {
      id: userId,
    },
  });
  const [updateAccount, { loading: isUpdateAccountLoading }] = useUpdateAccountMutation();
  const {
    title,
    description,
    logoURI,
    policyURI,
    termsOfServiceURI,
    clientURI,
  } = responseAccountData?.result?.data ?? {};
  const accountData = {
    title,
    description,
    logoURI,
    policyURI,
    termsOfServiceURI,
    clientURI,
  };
  const submitAccountEditFormHandler = async (
    data: AccountFormState,
    { setErrors }: FormikHelpers<AccountFormState>,
  ) => {
    const { title, description } = toastSuccessMessage;
    let requestErrors;

    try {
      const { errors } = await updateAccount({
        variables: {
          id: userId,
          data,
        },
      });
      requestErrors = errors;
    } catch (error) {
      console.error(error);
      requestErrors = extractQLErrorFromNetworkError(error);
    }

    if (!requestErrors) {
      const toastTitle = `${title} updated`;
      const toastDescription = `${description} updated`;

      showToast({
        ...toastSuccessMessage,
        title: toastTitle,
        description: toastDescription,
      });
    } else {
      const formErrors = graphQLErrorToMap<AccountFormState>(requestErrors);

      setErrors(formErrors);
    }
  };

  return {
    accountLoading,
    accountData,
    accountLoadError,
    isUpdateAccountLoading,
    submitAccountEditFormHandler,
  };
}

export default useAccountForm;
