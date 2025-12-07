import type { ApolloCache } from '@apollo/client';
import { useToastProviderContext } from '@components/Toast';
import { configPathRoutes } from '@configs/routes';
import { PauseIcon, PlayIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { createElement, useMemo, useState } from 'react';
import {
  useDeleteApplicationMutation,
  usePauseApplicationMutation,
  useRunApplicationMutation,
} from '@/generated/graphql';

function useApplicationActions(
  id: string,
  pause: boolean,
  // onChange: (id: string) => void,
) {
  const { showToast } = useToastProviderContext();
  const { push } = useRouter();
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const updateApplicationCacheStrategy = useMemo(() => ({
    update(cache: ApolloCache<unknown>) {
      cache.modify({
        optimistic: true,
        fields: {
          listApplications(cache = []) {
            return cache?.list ?? [];
          },
        },
      });
    },
  }), []);
  const [
    deleteApplication,
    {
      loading: isDeleteApplicationLoading,
    },
  ] = useDeleteApplicationMutation(updateApplicationCacheStrategy);
  const [runApplication, { loading: isRunApplicationLoading }]
    = useRunApplicationMutation(updateApplicationCacheStrategy);
  const [pauseApplication, { loading: isPauseApplicationLoading }]
    = usePauseApplicationMutation(updateApplicationCacheStrategy);
  const clickPlayPauseButtonHandler = async () => {
    const variables = { variables: { id } };
    if (pause) {
      await runApplication(variables);
      showToast({
        title: 'Application was started',
        description: 'The application was successfully started',
        icon: createElement(PlayIcon, { className: 'w-4 h-4 text-success-600' }),
      });
    } else {
      await pauseApplication(variables);
      showToast({
        title: 'Application was paused',
        description: 'The application was successfully paused',
        icon: createElement(PauseIcon, { className: 'w-4 h-4 text-warning-600' }),
      });
    }
  };
  const clickDeleteButtonHandler = () =>
    deleteApplication({ variables: { id } });
  const clickToggleDeleteDialogButtonHandler = (value: boolean) => () =>
    setOpenDeleteDialog(value);
  const clickEditButtonHandler = () =>
    push(`${configPathRoutes.applications}/${id}`);
  const isUpdateApplicationLoading
    = isRunApplicationLoading || isPauseApplicationLoading;

  return {
    isOpenDeleteDialog,
    isDeleteApplicationLoading,
    isUpdateApplicationLoading,
    clickEditButtonHandler,
    clickPlayPauseButtonHandler,
    clickDeleteButtonHandler,
    clickToggleDeleteDialogButtonHandler,
  };
}

export default useApplicationActions;
