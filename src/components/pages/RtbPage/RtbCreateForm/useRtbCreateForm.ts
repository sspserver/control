import type {
  RtbSource,
  UpdateRtbSourceMutation,
} from '@/generated/graphql';
import type { ApolloCache, FetchResult } from '@apollo/client';
import type { FormikHelpers } from 'formik/dist/types';
import type { RTBCreateFormState } from './RtbCreateForm.types';
import {
  useGetRtbSourceQuery,
  useNewRtbSourceMutation,
  useUpdateRtbSourceMutation,
} from '@/generated/graphql';
import { useToastProviderContext } from '@components/Toast';
import { extractQLErrorFromNetworkError } from '@lib/errors/extractQLErrorFromNetworkError';
import graphQLErrorToMap from '@lib/errors/graphQLErrorToMap';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { rtbCreateFormTab, tabBidsFieldNames, toastSuccessMessage } from './RtbCreateForm.const';

function useRtbCreateForm(onSubmit?: () => void) {
  const { showToast } = useToastProviderContext();
  const { ID: pathParamId } = useParams() ?? {};
  const id = Number(pathParamId);
  const isCreateMode = Number.isNaN(id);
  const [tabState, setTabState] = useState(rtbCreateFormTab.main);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [createRtb, { loading: isCreateRtbLoading }]
    = useNewRtbSourceMutation({
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      update(cache: ApolloCache<unknown>, { data }) {
        cache.modify({
          optimistic: true,
          fields: {
            listRTBSources(cache) {
              let newCache = cache?.list ?? [];
              const newItem = data?.result?.data;

              if (newItem != null) {
                newCache = [...newCache, newItem];
              }

              return newCache;
            },
          },
        });
      },
    });
  const [updateRtb, { loading: isUpdateRtbLoading }]
    = useUpdateRtbSourceMutation({
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      update(cache: ApolloCache<UpdateRtbSourceMutation>, { data }: FetchResult<UpdateRtbSourceMutation>) {
        cache.modify({
          optimistic: true,
          fields: {
            listRTBSources(cache) {
              const newCache = Array.isArray(cache) ? cache : cache?.list;
              const newItem = data?.result?.data;

              return newCache?.map(
                (item: RtbSource) => item.ID === newItem?.ID ? newItem : item,
              );
            },
          },
        });
      },
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
  } = (responseDataRtb?.result?.data ?? {}) as RTBCreateFormState;
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
      const errorKeys = new Set(Object.keys(formErrors));
      const isTabBidsHasError = tabBidsFieldNames.find(name => errorKeys.has(name));

      if (isTabBidsHasError) {
        setTabState(rtbCreateFormTab.bids);
      }

      setErrors(formErrors);
    }
  };
  const isLoading = isCreateRtbLoading || isUpdateRtbLoading || isRtbLoading;

  useEffect(() => {
    const activeTrigger = document.getElementById(tabState) as HTMLElement;
    if (spanRef.current) {
      spanRef.current.style.left = `${activeTrigger.offsetLeft}px`;
      spanRef.current.style.width = `${activeTrigger.offsetWidth}px`;
    }
  }, [tabState]);

  return {
    tabState,
    setTabState,
    spanRef,
    rtbData,
    isLoading,
    isCreateMode,
    submitRtbCreateEditFormHandler,
  };
}

export default useRtbCreateForm;
