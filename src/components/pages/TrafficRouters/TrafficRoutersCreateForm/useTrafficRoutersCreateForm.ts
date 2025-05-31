import type { MutationHookOptions } from '@apollo/client';
import type {
  TrafficRoutersCreateFormState,
} from '@components/pages/TrafficRouters/TrafficRoutersCreateForm/TrafficRoutersCreateForm.types';

import type { FormikHelpers } from 'formik/dist/types';
import { ActiveStatus } from '@/generated/graphql';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { rtbCreateFormTab } from '@components/pages/RtbPage/RtbCreateForm/RtbCreateForm.const';
import {
  tabTargetFieldNames,
  toastSuccessMessage,
  trafficRoutersFormTab,
} from '@components/pages/TrafficRouters/TrafficRoutersCreateForm/TrafficRoutersCreateForm.const';
import { useToastProviderContext } from '@components/Toast';
import { extractQLErrorFromNetworkError } from '@lib/errors/extractQLErrorFromNetworkError';
import graphQLErrorToMap from '@lib/errors/graphQLErrorToMap';
import {
  gqlGetTrafficRouters,
  gqlTrafficRoutersCreateMutation,
  gqlupdateTrafficRouterMutation,
} from '@lib/graphql/queries/trafficRouters';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

function useTrafficRoutersCreateForm(onSubmit?: () => void) {
  const { showToast } = useToastProviderContext();
  const { ID: pathParamId } = useParams() ?? {};
  const id = Number(pathParamId);
  const client = useApolloClient();
  const isCreateMode = Number.isNaN(id);
  const [tabState, setTabState] = useState(trafficRoutersFormTab.main);
  const spanRef = useRef<HTMLSpanElement>(null);
  const updateTrafficRoutersSourceCacheStrategy = useMemo(() => ({
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    onCompleted: () => {
      client.cache.modify({
        optimistic: true,
        fields: {
          listTrafficRouters(_) {
            return {};
          },
        },
      });
    },
  } as MutationHookOptions), [client]);
  const [updateTrafficRoutersCreateResponse] = useMutation(gqlupdateTrafficRouterMutation, updateTrafficRoutersSourceCacheStrategy);
  const [createTrafficRoutersCreateResponse] = useMutation(gqlTrafficRoutersCreateMutation, updateTrafficRoutersSourceCacheStrategy);
  const { data: responseDataTrafficRouter, loading: isTrafficRouterLoading } = useQuery(gqlGetTrafficRouters, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    variables: {
      id,
    },
    skip: isCreateMode,
  });
  const trafficRouterData = (responseDataTrafficRouter?.result?.data ?? {}) as TrafficRoutersCreateFormState;
  const submitTrafficRouterCreateEditFormHandler = async (
    input: TrafficRoutersCreateFormState,
    { setErrors }: FormikHelpers<TrafficRoutersCreateFormState>,
  ) => {
    const variables = { id, ...input };
    const { title, description } = toastSuccessMessage;
    let requestErrors;

    try {
      if (isCreateMode) {
        const { errors } = await createTrafficRoutersCreateResponse({
          variables: {
            active: ActiveStatus.Paused,
            ...variables,
          },
        });

        requestErrors = errors;
      } else {
        const { errors } = await updateTrafficRoutersCreateResponse({
          variables,
        });

        requestErrors = errors;
      }
    } catch (error) {
      console.error(error);
      requestErrors = extractQLErrorFromNetworkError(error);
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
      const formErrors = graphQLErrorToMap<TrafficRoutersCreateFormState>(requestErrors);
      const errorKeys = new Set(Object.keys(formErrors));
      const isTabBidsHasError = tabTargetFieldNames.find(name => errorKeys.has(name));

      if (isTabBidsHasError) {
        setTabState(rtbCreateFormTab.targeting);
      }

      setErrors(formErrors);
    }
  };
  const isLoading = isTrafficRouterLoading;

  useEffect(() => {
    const activeTrigger = document.getElementById(tabState) as HTMLElement;
    if (spanRef.current) {
      spanRef.current.style.left = `${activeTrigger.offsetLeft}px`;
      spanRef.current.style.width = `${activeTrigger.offsetWidth}px`;
    }
  }, [tabState]);

  return {
    isCreateMode,
    tabState,
    setTabState,
    spanRef,
    trafficRouterData,
    isLoading,
    submitTrafficRouterCreateEditFormHandler,
  };
}

export default useTrafficRoutersCreateForm;
