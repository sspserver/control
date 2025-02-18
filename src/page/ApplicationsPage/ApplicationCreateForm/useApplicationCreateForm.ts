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
    // error: applicationError,
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

    if (isCreateMode) {
      const { errors } = await createApplication({
        variables,
      });
      if (!errors) {
        showToast({
          ...toastSuccessMessage,
          title: `${title} created`,
          description: `${description} created`,
        });
        onSubmit();
      } else {
        const formErrors = graphQLErrorToMap<ApplicationCreateFormState>(errors);

        setErrors(formErrors);
      }
    } else {
      const { errors } = await updateApplication({ variables });

      if (!errors) {
        showToast({
          ...toastSuccessMessage,
          title: `${title} updated`,
          description: `${description} updated`,
        });
        onSubmit();
      } else {
        // setErrors(errors);
      }
    }
  };
  const isLoading = isCreateApplicationLoading || isUpdateApplicationLoading;

  return {
    isLoading,
    isCreateMode,
    // applicationError,
    applicationData,
    isApplicationsLoading,
    submitApplicationCreateEditFormHandler,
  };
}

export default useApplicationCreateForm;
