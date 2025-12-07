import type { ApolloCache } from '@apollo/client';
import { useToastProviderContext } from '@components/Toast';
import { configPathRoutes } from '@configs/routes';
import { PauseIcon, PlayIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { createElement, useMemo, useState } from 'react';
import {
  useActivateZoneMutation,
  useDeactivateZoneMutation,
  useDeleteZoneMutation,
} from '@/generated/graphql';

function useAdUnitActions(
  id: string,
  pause: boolean,
  // onChange: (id: string) => void,
) {
  const { showToast } = useToastProviderContext();
  const { push } = useRouter();
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const updateAdUnitCacheStrategy = useMemo(() => ({
    update(cache: ApolloCache<unknown>) {
      cache.modify({
        optimistic: true,
        fields: {
          listZones(cache = []) {
            return cache?.list ?? [];
          },
        },
      });
    },
  }), []);
  const [
    deleteAdUnit,
    {
      loading: isDeleteAdUnitLoading,
    },
  ] = useDeleteZoneMutation(updateAdUnitCacheStrategy);
  const [activateAdUnit, { loading: isActivateAdUnitLoading }]
    = useActivateZoneMutation(updateAdUnitCacheStrategy);
  const [deactivateAdUnit, { loading: isDeactivateAdUnitLoading }]
    = useDeactivateZoneMutation(updateAdUnitCacheStrategy);
  const clickPlayPauseButtonHandler = async () => {
    const variables = { variables: { id } };
    if (pause) {
      await activateAdUnit(variables);
      showToast({
        title: 'AdUnit was started',
        description: 'The AdUnit was successfully started',
        icon: createElement(PlayIcon, { className: 'w-4 h-4 text-success-600' }),
      });
    } else {
      await deactivateAdUnit(variables);
      showToast({
        title: 'AdUnit was paused',
        description: 'The AdUnit was successfully paused',
        icon: createElement(PauseIcon, { className: 'w-4 h-4 text-warning-600' }),
      });
    }
    // onChange(id);
  };
  const clickDeleteButtonHandler = () =>
    deleteAdUnit({ variables: { id } });
  const clickToggleDeleteDialogButtonHandler = (value: boolean) => () =>
    setOpenDeleteDialog(value);
  const clickEditButtonHandler = () =>
    push(`${configPathRoutes.adUnit}/${id}`);
  const isUpdateAdUnitLoading
    = isActivateAdUnitLoading || isDeactivateAdUnitLoading;

  return {
    isOpenDeleteDialog,
    isDeleteAdUnitLoading,
    isUpdateAdUnitLoading,
    clickEditButtonHandler,
    clickPlayPauseButtonHandler,
    clickDeleteButtonHandler,
    clickToggleDeleteDialogButtonHandler,
  };
}

export default useAdUnitActions;
