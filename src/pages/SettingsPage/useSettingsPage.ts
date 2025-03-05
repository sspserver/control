import { useGetAccountQuery } from '@/generated/graphql';
import { useSession } from 'next-auth/react';

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
