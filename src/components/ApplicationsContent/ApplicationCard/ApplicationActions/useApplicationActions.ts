import {
  listApplicationsDocumentRefetchQueries,
} from '@/components/ApplicationsContent/useApplicationsContent';
import {
  useDeleteApplicationMutation,
  usePauseApplicationMutation,
  useRunApplicationMutation,
} from '@/generated/graphql';
import { configPathRoutes } from '@configs/routes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function useApplicationActions(id: string, pause: boolean, onChange: (id: string) => void) {
  const { push } = useRouter();
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [deleteApplication, { loading: isDeleteApplicationLoading }] = useDeleteApplicationMutation({
    refetchQueries: listApplicationsDocumentRefetchQueries,
  });
  const [runApplication, { loading: isRunApplicationLoading }] = useRunApplicationMutation({
    refetchQueries: listApplicationsDocumentRefetchQueries,
  });
  const [pauseApplication, { loading: isPauseApplicationLoading }] = usePauseApplicationMutation({
    refetchQueries: listApplicationsDocumentRefetchQueries,
  });
  const clickPlayPauseButtonHandler = async () => {
    const variables = { variables: { id } };
    if (pause) {
      await runApplication(variables);
    } else {
      await pauseApplication(variables);
    }
    onChange(id);
  };
  const clickDeleteButtonHandler = () => deleteApplication({ variables: { id } });
  const clickToggleDeleteDialogButtonHandler = (value: boolean) => () => setOpenDeleteDialog(value);
  const clickEditButtonHandler = () => push(`${configPathRoutes.applications}/${id}`);
  const isUpdateApplicationLoading = isRunApplicationLoading || isPauseApplicationLoading;

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
