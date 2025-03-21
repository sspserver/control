import type { ApolloCache } from '@apollo/client';
import {
  useDeleteRtbSourceMutation,
  usePauseRtbSourceMutation,
  useRunRtbSourceMutation,
} from '@/generated/graphql';
import { useToastProviderContext } from '@components/Toast';
import { configPathRoutes } from '@configs/routes';
import { PauseIcon, PlayIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { createElement, useMemo, useState } from 'react';

function useRtbActions(
  id: string,
  pause: boolean,
  // onChange: (id: string) => void,
) {
  const { showToast } = useToastProviderContext();
  const { push } = useRouter();
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const updateRtbSourceCacheStrategy = useMemo(() => ({
    update(cache: ApolloCache<unknown>) {
      cache.modify({
        optimistic: true,
        fields: {
          listRTBSources(cache) {
            return cache?.list ?? [];
          },
        },
      });
    },
  }), []);
  const [
    deleteRtb,
    {
      loading: isDeleteRtbLoading,
    },
  ] = useDeleteRtbSourceMutation(updateRtbSourceCacheStrategy);
  const [runRtb, { loading: isRunRtbLoading }]
    = useRunRtbSourceMutation(updateRtbSourceCacheStrategy);
  const [pauseRtb, { loading: isPauseRtbLoading }]
    = usePauseRtbSourceMutation(updateRtbSourceCacheStrategy);
  const clickPlayPauseButtonHandler = async () => {
    const variables = { variables: { id } };
    if (pause) {
      await runRtb(variables);
      showToast({
        title: 'RTB was started',
        description: 'The RTB was successfully started',
        icon: createElement(PlayIcon, { className: 'w-4 h-4 text-success-600' }),
      });
    } else {
      await pauseRtb(variables);
      showToast({
        title: 'RTB was paused',
        description: 'The RTB was successfully paused',
        icon: createElement(PauseIcon, { className: 'w-4 h-4 text-warning-600' }),
      });
    }
    // onChange(id);
  };
  const clickDeleteButtonHandler = () =>
    deleteRtb({ variables: { id } });
  const clickToggleDeleteDialogButtonHandler = (value: boolean) => () =>
    setOpenDeleteDialog(value);
  const clickEditButtonHandler = () =>
    push(`${configPathRoutes.rtb}/${id}`);
  const isUpdateRtbLoading
    = isRunRtbLoading || isPauseRtbLoading;

  return {
    isOpenDeleteDialog,
    isDeleteRtbLoading,
    isUpdateRtbLoading,
    clickEditButtonHandler,
    clickPlayPauseButtonHandler,
    clickDeleteButtonHandler,
    clickToggleDeleteDialogButtonHandler,
  };
}

export default useRtbActions;
