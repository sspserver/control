import type { FormikHelpers } from 'formik/dist/types';
import type { AdUnitCreateFormState } from './AdUnitCreateForm.types';
import { useToastProviderContext } from '@/components/Toast';
import {
  useCreateZoneMutation,
  useGetZoneQuery,
  useUpdateZoneMutation,
} from '@/generated/graphql';
import { extractQLErrorFromNetworkError } from '@lib/errors/extractQLErrorFromNetworkError';
import graphQLErrorToMap from '@lib/errors/graphQLErrorToMap';
import { listAdZoneDocumentRefetchQueries } from '@pages/AdUnitPage/useAdUnitPage';
import { useParams } from 'next/navigation';
import { toastSuccessMessage } from './AdUnitCreateForm.const';

function useAdUnitCreateForm(onSubmit?: () => void) {
  const { showToast } = useToastProviderContext();
  const { ID: pathParamId } = useParams() ?? {};
  const id = Number(pathParamId);
  const isCreateMode = Number.isNaN(id);
  const [createAdUnit, { loading: isCreateAdUnitLoading }]
    = useCreateZoneMutation({
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      refetchQueries: listAdZoneDocumentRefetchQueries,
    });
  const [updateAdUnit, { loading: isUpdateAdUnitLoading }]
    = useUpdateZoneMutation({
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      refetchQueries: listAdZoneDocumentRefetchQueries,
    });
  const {
    data: responseDataAdUnit,
    loading: isAdUnitLoading,
  } = useGetZoneQuery({
    fetchPolicy: 'network-only',
    variables: {
      id,
    },
    skip: !id,
  });
  const {
    title,
    description,
    codename,
    minECPM,
    fixedPurchasePrice,
  } = responseDataAdUnit?.result?.data ?? {};
  const adUnitData = {
    title,
    description,
    codename,
    minECPM,
    fixedPurchasePrice,
  };
  const submitAdUnitCreateEditFormHandler = async (
    input: AdUnitCreateFormState,
    { setErrors }: FormikHelpers<AdUnitCreateFormState>,
  ) => {
    const variables = { id, input };
    const { title, description } = toastSuccessMessage;
    let requestErrors;

    if (isCreateMode) {
      try {
        const { errors } = await createAdUnit({
          variables,
        });
        requestErrors = errors;
      } catch (error) {
        console.error(error);
        requestErrors = extractQLErrorFromNetworkError(error);
      }
    } else {
      const { errors } = await updateAdUnit({ variables });
      requestErrors = errors;
    }

    if (!requestErrors) {
      const toastTitle = isCreateMode ? `${title} created` : `${title} updated`;
      const toastDescription = isCreateMode ? `${description} created` : `${description} updated`;

      showToast({
        ...toastSuccessMessage,
        title: toastTitle,
        description: toastDescription,
      });

      onSubmit?.();
    } else {
      const formErrors = graphQLErrorToMap<AdUnitCreateFormState>(requestErrors);

      setErrors(formErrors);
    }
  };
  const isLoading = isCreateAdUnitLoading || isUpdateAdUnitLoading || isAdUnitLoading;

  return {
    isLoading,
    isCreateMode,
    adUnitData,
    submitAdUnitCreateEditFormHandler,
  };
}

export default useAdUnitCreateForm;
