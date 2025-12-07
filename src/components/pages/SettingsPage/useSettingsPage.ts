import { useSession } from 'next-auth/react';
import { useGetAccountQuery } from '@/generated/graphql';

function useSettingsPage() {
  const { data } = useSession();
  const { loading: accountLoading, error: accountLoadError, data: responseAccountData } = useGetAccountQuery({
    variables: {
      id: data?.account?.ID,
    },
  });
  const accountData = responseAccountData?.result?.data;
  const submitAccountEditFormHandler = () => {};

  return {
    accountLoading,
    accountData,
    accountLoadError,
    submitAccountEditFormHandler,
  };
}

export default useSettingsPage;
