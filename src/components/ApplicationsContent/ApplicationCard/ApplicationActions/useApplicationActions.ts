import { listApplicationsDocumentRefetchQueries } from '@/components/ApplicationsContent/useApplicationsContent';
import { useToastProviderContext } from '@/components/Toast';
import {
  useDeleteApplicationMutation,
  usePauseApplicationMutation,
  useRunApplicationMutation,
} from '@/generated/graphql';
import { configPathRoutes } from '@configs/routes';
import { PauseIcon, PlayIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { createElement, useState } from 'react';

function useApplicationActions(
  id: string,
  pause: boolean,
  onChange: (id: string) => void,
) {
  const { showToast } = useToastProviderContext();
  const { push } = useRouter();
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [
    deleteApplication,
    {
      loading: isDeleteApplicationLoading,
    },
  ] = useDeleteApplicationMutation({
    refetchQueries: listApplicationsDocumentRefetchQueries,
  });
  const [runApplication, { loading: isRunApplicationLoading }]
    = useRunApplicationMutation({
      refetchQueries: listApplicationsDocumentRefetchQueries,
    });
  const [pauseApplication, { loading: isPauseApplicationLoading }]
    = usePauseApplicationMutation({
      refetchQueries: listApplicationsDocumentRefetchQueries,
    });
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
    onChange(id);
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
