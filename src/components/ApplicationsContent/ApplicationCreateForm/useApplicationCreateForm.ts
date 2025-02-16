import type { ApplicationCreateFormState } from '@/components/ApplicationsContent/ApplicationCreateForm/ApplicationCreateForm.types';
import type { Application } from '@/generated/graphql';
import { toastSuccessMessage } from '@/components/ApplicationsContent/ApplicationCreateForm/ApplicationCreateForm.const';
import { listApplicationsDocumentRefetchQueries } from '@/components/ApplicationsContent/useApplicationsContent';
import { useToastProviderContext } from '@/components/Toast';
import {
  useCreateApplicationMutation,
  useGetApplicationQuery,
  useUpdateApplicationMutation,
} from '@/generated/graphql';
import { useParams } from 'next/navigation';

function useApplicationCreateForm(onSubmit: () => void) {
  const { showToast } = useToastProviderContext();
  const { ID: pathParamId } = useParams();
  const id = Number(pathParamId);
  const isCreateMode = Number.isNaN(id);
  const [createApplication, { loading: isCreateApplicationLoading }]
    = useCreateApplicationMutation({
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      refetchQueries: listApplicationsDocumentRefetchQueries,
    });
  const [updateApplication, { loading: isUpdateApplicationLoading }]
    = useUpdateApplicationMutation({
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
      refetchQueries: listApplicationsDocumentRefetchQueries,
    });
  const {
    data: responseDataApplication,
    error: applicationError,
    loading: isApplicationsLoading,
  } = useGetApplicationQuery({
    fetchPolicy: 'network-only',
    variables: {
      id,
    },
    skip: !id,
  });
  const {
    ID,
    creatorID,
    createdAt,
    updatedAt,
    deletedAt,
    ...responseApplication
  } = (responseDataApplication?.result?.data ?? {}) as Application;
  const submitApplicationCreateEditFormHandler = async (
    input: ApplicationCreateFormState,
    { setSubmitting, setValues },
  ) => {
    const variables = { id, input };
    const { title, description } = toastSuccessMessage;

    if (isCreateMode) {
      await createApplication({
        variables,
      });
      showToast({
        ...toastSuccessMessage,
        title: `${title} created`,
        description: `${description} created`,
      });
    } else {
      await updateApplication({ variables });
      showToast({
        ...toastSuccessMessage,
        title: `${title} updated`,
        description: `${description} updated`,
      });
    }

    onSubmit();
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
