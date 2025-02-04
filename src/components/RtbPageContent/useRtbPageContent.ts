import type { StatisticsQuery } from '@/generated/graphql';
import { StatisticsDocument } from '@/generated/graphql';
import { useQuery } from '@apollo/client';

function useRtbPageContent() {
  const response = useQuery<StatisticsQuery>(StatisticsDocument, {
    fetchPolicy: 'network-only',
    variables: {
      group: 'AD_ID2',
      order: [{ key: 'AD_ID', order: 'ASC' }],
      page: { size: 30 },
    },
  });

  return response;
}

export default useRtbPageContent;
