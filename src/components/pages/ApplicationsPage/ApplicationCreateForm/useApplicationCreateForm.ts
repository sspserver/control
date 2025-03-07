import type { Application } from '@/generated/graphql';
import type { FormikHelpers } from 'formik/dist/types';
import type {
  ApplicationCreateFormState,
} from './ApplicationCreateForm.types';
import {
  useCreateApplicationMutation,
  useGetApplicationQuery,
  useUpdateApplicationMutation,
} from '@/generated/graphql';
import { listApplicationsDocumentRefetchQueries } from '@components/pages/ApplicationsPage/useApplicationsPage';
import { useToastProviderContext } from '@components/Toast';
import { extractQLErrorFromNetworkError } from '@lib/errors/extractQLErrorFromNetworkError';
import graphQLErrorToMap from '@lib/errors/graphQLErrorToMap';
import { useParams } from 'next/navigation';
import { toastSuccessMessage } from './ApplicationCreateForm.const';

function useApplicationCreateForm(onSubmit?: () => void) {
  const { showToast } = useToastProviderContext();
  const { ID: pathParamId } = useParams() ?? {};
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
    categories,
    title,
    description,
    type,
    platform,
    URI,
  } = (responseDataApplication?.result?.data ?? {}) as Application;
  const applicationData = {
    title,
    description,
    URI,
    type,
    platform,
    categories,
  };
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

      onSubmit?.();
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
