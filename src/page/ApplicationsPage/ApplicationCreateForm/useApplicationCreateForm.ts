import type { Application } from '@/generated/graphql';
import type {
  ApplicationCreateFormState,
} from '@/page/ApplicationsPage/ApplicationCreateForm/ApplicationCreateForm.types';
import type { FormikHelpers } from 'formik/dist/types';
import { useToastProviderContext } from '@/components/Toast';
import {
  useCreateApplicationMutation,
  useGetApplicationQuery,
  useUpdateApplicationMutation,
} from '@/generated/graphql';
import { toastSuccessMessage } from '@/page/ApplicationsPage/ApplicationCreateForm/ApplicationCreateForm.const';
import { listApplicationsDocumentRefetchQueries } from '@/page/ApplicationsPage/useApplicationsPage';
import { extractQLErrorFromNetworkError } from '@lib/errors/extractQLErrorFromNetworkError';
import graphQLErrorToMap from '@lib/errors/graphQLErrorToMap';
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
    ...applicationData
  } = (responseDataApplication?.result?.data ?? {}) as Application;
  const submitApplicationCreateEditFormHandler = async (
    input: ApplicationCreateFormState,
    { setErrors }: FormikHelpers<ApplicationCreateFormState>,
  ) => {
    const variables = { id, input };
    const { title, description } = toastSuccessMessage;
    let requestErrors;

    if (isCreateMode) {
      try {
        const { errors } = await createApplication({
          variables,
        });
        requestErrors = errors;
      } catch (error) {
        console.error(error);
        requestErrors = extractQLErrorFromNetworkError(error);
      }
    } else {
      const { errors } = await updateApplication({ variables });
      requestErrors = errors;
    }

    if (!requestErrors) {
      const toastTitle = isCreateMode ? `${title} created` : `${title} updated`;
      const toastDescription = isCreateMode ? `${description} created` : `${description} updated`;

      showToast({
        ...toastSuccessMessage,
        title: toastTitle,
        description: toastDescription,
      });

      onSubmit();
    } else {
      const formErrors = graphQLErrorToMap<ApplicationCreateFormState>(requestErrors);

      setErrors(formErrors);
    }
  };
  const isLoading = isCreateApplicationLoading || isUpdateApplicationLoading;

  return {
    isLoading,
    isCreateMode,
    applicationData,
    isApplicationsLoading,
    submitApplicationCreateEditFormHandler,
  };
}

export default useApplicationCreateForm;
