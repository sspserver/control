import type { FormikHelpers } from 'formik/dist/types';
import type { AccountFormState } from './AccountForm.types';

import { useToastProviderContext } from '@components/Toast';
import { extractQLErrorFromNetworkError } from '@lib/errors/extractQLErrorFromNetworkError';
import graphQLErrorToMap from '@lib/errors/graphQLErrorToMap';
import { useSession } from 'next-auth/react';
import { useGetAccountQuery, useUpdateAccountMutation } from '@/generated/graphql';
import { toastSuccessMessage } from './AccountForm.const';

function useAccountForm() {
  const { showToast } = useToastProviderContext();
  const { data } = useSession();
  const accountId = data?.account?.ID;
  const { loading: accountLoading, error: accountLoadError, data: responseAccountData } = useGetAccountQuery({
    variables: {
      id: accountId,
    },
    skip: !accountId,
  });
  const [updateAccount, { loading: isUpdateAccountLoading }] = useUpdateAccountMutation();
  const {
    name,
    description,
  } = responseAccountData?.result?.data ?? {};
  const accountData = {
    name,
    description,
  };
  const submitAccountEditFormHandler = async (
    formData: AccountFormState,
    { setErrors }: FormikHelpers<AccountFormState>,
  ) => {
    const { title, description: toastDescription } = toastSuccessMessage;
    let requestErrors;

    try {
      const { errors } = await updateAccount({
        variables: {
          id: accountId,
          data: {
            name: formData.name,
            description: formData.description,
          },
        },
      });
      requestErrors = errors;
    } catch (error) {
      console.error(error);
      requestErrors = extractQLErrorFromNetworkError(error);
    }

    if (!requestErrors) {
      showToast({
        ...toastSuccessMessage,
        title: `${title} updated`,
        description: `${toastDescription} updated`,
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
