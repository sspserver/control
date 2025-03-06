import {
  useDeleteRtbSourceMutation,
  usePauseRtbSourceMutation,
  useRunRtbSourceMutation,
} from '@/generated/graphql';
import { listRtbDocumentRefetchQueries } from '@components/pages/RtbPage/useRtbPage';
import { useToastProviderContext } from '@components/Toast';
import { configPathRoutes } from '@configs/routes';
import { PauseIcon, PlayIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { createElement, useState } from 'react';

function useRtbActions(
  id: string,
  pause: boolean,
  // onChange: (id: string) => void,
) {
  const { showToast } = useToastProviderContext();
  const { push } = useRouter();
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [
    deleteRtb,
    {
      loading: isDeleteRtbLoading,
    },
  ] = useDeleteRtbSourceMutation({
    refetchQueries: listRtbDocumentRefetchQueries,
  });
  const [runRtb, { loading: isRunRtbLoading }]
    = useRunRtbSourceMutation({
      refetchQueries: listRtbDocumentRefetchQueries,
    });
  const [pauseRtb, { loading: isPauseRtbLoading }]
    = usePauseRtbSourceMutation({
      refetchQueries: listRtbDocumentRefetchQueries,
    });
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
