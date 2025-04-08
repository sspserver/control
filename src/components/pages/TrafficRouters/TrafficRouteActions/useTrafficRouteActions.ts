import { useApolloClient, useMutation } from '@apollo/client';
import { useToastProviderContext } from '@components/Toast';
import { configPathRoutes } from '@configs/routes';
import { PauseIcon, PlayIcon } from '@heroicons/react/16/solid';
import {
  gqlTrafficRoutersDeleteMutation,
  gqlTrafficRoutersPauseMutation,
  gqlTrafficRoutersRunMutation,
} from '@lib/graphql/queries/trafficRouters';
import { useRouter } from 'next/navigation';
import { createElement, useCallback, useState } from 'react';

function useTrafficRouteActions(id: string, pause: boolean) {
  const { showToast } = useToastProviderContext();
  const { push } = useRouter();
  const client = useApolloClient();
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const updateRtbSourceCacheStrategy = useCallback(() => {
    client.cache.modify({
      optimistic: true,
      fields: {
        listTrafficRouters(cache) {
          return cache?.list ?? [];
        },
      },
    });
  }, [client]);
  const [
    deleteTrafficRouter,
    {
      loading: isDeleteTrafficRouterLoading,
    },
  ] = useMutation(gqlTrafficRoutersDeleteMutation, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    onCompleted: updateRtbSourceCacheStrategy,
  });
  const [runTrafficRouter, { loading: isRunTrafficRouterLoading }]
        = useMutation(gqlTrafficRoutersRunMutation, {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
          onCompleted: updateRtbSourceCacheStrategy,
        });
  const [pauseTrafficRouter, { loading: isPauseTrafficRouterLoading }]
      = useMutation(gqlTrafficRoutersPauseMutation, {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
        onCompleted: updateRtbSourceCacheStrategy,
      });
  const clickPlayPauseButtonHandler = async () => {
    const variables = { variables: { id } };

    if (pause) {
      await runTrafficRouter(variables);

      showToast({
        title: 'Traffic Router was started',
        description: 'The Traffic Router was successfully started',
        icon: createElement(PlayIcon, { className: 'w-4 h-4 text-success-600' }),
      });
    } else {
      await pauseTrafficRouter(variables);
      showToast({
        title: 'Traffic Router was paused',
        description: 'The Traffic Router was successfully paused',
        icon: createElement(PauseIcon, { className: 'w-4 h-4 text-warning-600' }),
      });
    }
    // onChange(id);
  };
  const clickDeleteButtonHandler = () =>
    deleteTrafficRouter({ variables: { id } });
  const clickToggleDeleteDialogButtonHandler = (value: boolean) => () =>
    setOpenDeleteDialog(value);
  const clickEditButtonHandler = () =>
    push(`${configPathRoutes.trafficRouters}/${id}`);
  const isUpdateRtbLoading = isRunTrafficRouterLoading || isPauseTrafficRouterLoading || isDeleteTrafficRouterLoading;

  return {
    isOpenDeleteDialog,
    isDeleteTrafficRouterLoading,
    isUpdateRtbLoading,
    clickEditButtonHandler,
    clickPlayPauseButtonHandler,
    clickDeleteButtonHandler,
    clickToggleDeleteDialogButtonHandler,
  };
}

export default useTrafficRouteActions;
