import type { FormikHelpers } from 'formik/dist/types';
import type { RTBCreateFormState } from './RtbCreateForm.types';
import {
  useGetRtbSourceQuery,
  useNewRtbSourceMutation,
  useUpdateRtbSourceMutation,
} from '@/generated/graphql';
import { listRtbDocumentRefetchQueries } from '@components/pages/RtbPage/useRtbPage';
import { useToastProviderContext } from '@components/Toast';
import { extractQLErrorFromNetworkError } from '@lib/errors/extractQLErrorFromNetworkError';
import graphQLErrorToMap from '@lib/errors/graphQLErrorToMap';
import { useParams } from 'next/navigation';
import { toastSuccessMessage } from './RtbCreateForm.const';

function useRtbCreateForm(onSubmit?: () => void) {
  const { showToast } = useToastProviderContext();
  const { ID: pathParamId } = useParams() ?? {};
  const id = Number(pathParamId);
  const isCreateMode = Number.isNaN(id);
  const [createRtb, { loading: isCreateRtbLoading }]
    = useNewRtbSourceMutation({
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      refetchQueries: listRtbDocumentRefetchQueries,
    });
  const [updateRtb, { loading: isUpdateRtbLoading }]
    = useUpdateRtbSourceMutation({
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      refetchQueries: listRtbDocumentRefetchQueries,
    });
  const {
    data: responseDataRtb,
    loading: isRtbLoading,
  } = useGetRtbSourceQuery({
    fetchPolicy: 'network-only',
    variables: {
      id,
    },
    skip: !id,
  });
  const {
    title,
    description,
    protocol,
    auctionType,
    method,
    URL,
    requestType,
    RPS,
    timeout,
    accuracy,
    priceCorrectionReduce,
    minBid,
    maxBid,
    formats,
    deviceTypes,
    devices,
    OS,
    browsers,
    carriers,
    countries,
    secure,
    adBlock,
    privateBrowsing,
    IP,
  } = responseDataRtb?.result?.data ?? {};
  const rtbData = {
    title,
    description,
    protocol,
    URL,
    auctionType,
    method,
    requestType,
    RPS,
    timeout,
    accuracy,
    priceCorrectionReduce,
    minBid,
    maxBid,
    formats,
    deviceTypes,
    devices,
    OS,
    browsers,
    carriers,
    countries,
    secure,
    adBlock,
    privateBrowsing,
    IP,
  };
  const submitRtbCreateEditFormHandler = async (
    input: RTBCreateFormState,
    { setErrors }: FormikHelpers<RTBCreateFormState>,
  ) => {
    const variables = { id, input };
    const { title, description } = toastSuccessMessage;
    let requestErrors;

    if (isCreateMode) {
      try {
        const { errors } = await createRtb({
          variables,
        });
        requestErrors = errors;
      } catch (error) {
        console.error(error);
        requestErrors = extractQLErrorFromNetworkError(error);
      }
    } else {
      const { errors } = await updateRtb({ variables });
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
      const formErrors = graphQLErrorToMap<RTBCreateFormState>(requestErrors);

      setErrors(formErrors);
    }
  };
  const isLoading = isCreateRtbLoading || isUpdateRtbLoading || isRtbLoading;

  return {
    rtbData,
    isLoading,
    isCreateMode,
    submitRtbCreateEditFormHandler,
  };
}

export default useRtbCreateForm;
