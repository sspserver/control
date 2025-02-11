import type {
  ApplicationCreateFormState,
} from '@/components/ApplicationsContent/ApplicationCreateForm/ApplicationCreateForm.types';
import {
  listApplicationsDocumentRefetchQueries,
} from '@/components/ApplicationsContent/useApplicationsContent';
import {
  Application,
  useCreateApplicationMutation,
  useGetApplicationQuery,
  useUpdateApplicationMutation,
} from '@/generated/graphql';
import { useParams } from 'next/navigation';

function useApplicationCreateForm() {
  const { ID: pathParamId } = useParams();
  const id = Number(pathParamId);
  const isCreateMode = Number.isNaN(id);
  const [createApplication, { loading: isCreateApplicationLoading }] = useCreateApplicationMutation({ fetchPolicy: 'network-only', errorPolicy: 'all', refetchQueries: listApplicationsDocumentRefetchQueries });
  const [updateApplication, { loading: isUpdateApplicationLoading }] = useUpdateApplicationMutation({ fetchPolicy: 'network-only', errorPolicy: 'all', refetchQueries: listApplicationsDocumentRefetchQueries });
  const { data: responseDataApplication, error: applicationError, loading: isApplicationsLoading } = useGetApplicationQuery({
    fetchPolicy: 'network-only',
    variables: {
      id,
    },
    skip: !id,
  });
  const { ID, creatorID, createdAt, updatedAt, deletedAt, ...responseApplication } = (responseDataApplication?.result?.data ?? {}) as Application;
  const submitApplicationCreateEditFormHandler = async (input: ApplicationCreateFormState, { setSubmitting, setValues }) => {
    const variables = { id, input };

    if (isCreateMode) {
      await createApplication({
        variables,
      });
    } else {
      await updateApplication({ variables });
    }
  };
  const isLoading = isCreateApplicationLoading || isUpdateApplicationLoading;

  return {
    isLoading,
    isCreateMode,
    applicationError,
    responseApplication,
    isApplicationsLoading,
    submitApplicationCreateEditFormHandler,
  };
}

export default useApplicationCreateForm;
