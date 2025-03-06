import type { FormikHelpers } from 'formik/dist/types';
import type { NetworkOptionsFormState } from './NetworkForm.types';

import { useMutation, useQuery } from '@apollo/client';
import { useToastProviderContext } from '@components/Toast';
import { extractQLErrorFromNetworkError } from '@lib/errors/extractQLErrorFromNetworkError';
import getGraphQlErrorStructure from '@lib/errors/getGraphQlErrorStructure';
import graphQLErrorToMap from '@lib/errors/graphQLErrorToMap';
import { gqlNetworkFormOptionsMutation, gqlNetworkFormOptionsQuery } from '@lib/graphql/queries/networkFormOptions';
import { toastSuccessMessage } from './NetworkForm.const';

function useNetworkForm() {
  const { showToast } = useToastProviderContext();
  const {
    data: networkFormOptionsResponse,
    loading: isLoadingNetworkFormOptions,
    error: networkFormOptionsError,
  } = useQuery(gqlNetworkFormOptionsQuery);
  const [updateNetworkFormOptions,
    // { data, loading, error }
  ] = useMutation(gqlNetworkFormOptionsMutation);
  const {
    directCode,
    directUrl,
    rtbDomain,
    templateCode,
  } = networkFormOptionsResponse ?? {};
  const networkFormOptionsData = {
    directCode: directCode?.data?.value,
    directUrl: directUrl?.data?.value,
    sspDomain: rtbDomain?.data?.value,
    templateCode: templateCode?.data?.value,
  };
  const submitNetworkOptionsEditFormHandler = async (
    data: NetworkOptionsFormState,
    { setErrors }: FormikHelpers<NetworkOptionsFormState>,
  ) => {
    const { title, description } = toastSuccessMessage;
    let requestErrors;

    try {
      const { errors } = await updateNetworkFormOptions({
        variables: data,
      });
      requestErrors = errors;
    } catch (error) {
      console.error(error);
      requestErrors = extractQLErrorFromNetworkError(error) ?? getGraphQlErrorStructure((error as Error).message);
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
      const formErrors = graphQLErrorToMap<NetworkOptionsFormState>(requestErrors);

      setErrors(formErrors);
    }
  };

  return {
    networkFormOptionsData,
    isLoadingNetworkFormOptions,
    networkFormOptionsError,
    submitNetworkOptionsEditFormHandler,
  };
}

export default useNetworkForm;
