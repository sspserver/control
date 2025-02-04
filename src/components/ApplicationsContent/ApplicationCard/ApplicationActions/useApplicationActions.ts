import { listApplicationsQueryOptions } from '@/components/ApplicationsContent/useApplicationsContent';
import {
  ListApplicationsDocument,
  usePauseApplicationMutation,
  useRunApplicationMutation,
} from '@/generated/graphql';

function useApplicationActions(id: string, pause: boolean, onChange: (id: string) => void) {
  const [runApplication, { loading: isRunApplicationLoading }] = useRunApplicationMutation({
    refetchQueries: [{ query: ListApplicationsDocument, variables: listApplicationsQueryOptions }],
  });
  const [pauseApplication, { loading: isPauseApplicationLoading }] = usePauseApplicationMutation({
    refetchQueries: [{ query: ListApplicationsDocument, variables: listApplicationsQueryOptions }],
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
  const clickDeleteButtonHandler = () => {};
  const isUpdateApplicationLoading = isRunApplicationLoading || isPauseApplicationLoading;

  return {
    isUpdateApplicationLoading,
    clickPlayPauseButtonHandler,
    clickDeleteButtonHandler,
  };
}

export default useApplicationActions;
