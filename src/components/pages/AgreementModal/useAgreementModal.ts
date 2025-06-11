import { useMutation, useQuery } from '@apollo/client';
import { gqlAcceptAgreementMutation } from '@lib/graphql/mutations/agreement';
import { gqlGetAgreementQuery } from '@lib/graphql/queries/agreement';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

function useAgreementModal() {
  const { data } = useSession();
  const searchParams = useSearchParams();
  const [isAgreed, setIsAgreed] = useState(false);
  const changeAgreedCheckboxHandler = () => setIsAgreed(!isAgreed);
  const {
    data: nextAgreement,
    loading: isLoadingAgreement,
    // error: agreementFormOptionsError,
  } = useQuery(gqlGetAgreementQuery);
  const [
    acceptAgreement,
    {
      loading: isAcceptAgreementLoading,
      error: acceptAgreementError,
    },
  ] = useMutation(gqlAcceptAgreementMutation);
  const agreement = nextAgreement?.agreement ?? {};
  const clickButtonAcceptAgreementHandler = async () => {
    const { codename } = agreement;
    const date = new Date().toISOString().split('T')[0];
    const signature = data?.user?.username || '';
    const response = await acceptAgreement({
      variables: {
        codename,
        signature,
        date,
      },
    });

    if (response?.data?.acceptAgreement?.acceptedAt) {
      const currentToken = data?.session?.accessToken;
      if (currentToken) {
        await signIn('token', {
          token: currentToken,
          redirect: false,
        });
        const callbackUrl = searchParams.get('callbackUrl');

        if (callbackUrl) {
          window.location.href = decodeURIComponent(callbackUrl);
        } else {
          window.location.href = '/';
        }
      }
    }
  };

  return {
    isAgreed,
    agreement,
    isLoadingAgreement,
    isAcceptAgreementLoading,
    acceptAgreementError,
    changeAgreedCheckboxHandler,
    clickButtonAcceptAgreementHandler,
  };
}

export default useAgreementModal;
