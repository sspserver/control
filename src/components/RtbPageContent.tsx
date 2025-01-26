'use client';

import type { StatisticsQuery } from '@/generated/graphql';
import { StatisticsDocument } from '@/generated/graphql';
import { useQuery } from '@apollo/client';

function RtbPageContent() {
  const response = useQuery<StatisticsQuery>(StatisticsDocument, {
    fetchPolicy: 'network-only',
    variables: {
      group: 'AD_ID',
      order: [{ key: 'AD_ID', order: 'ASC' }],
      page: { size: 30 },
    },
  });

  return (
    <div>
      <span>Rtb</span>
      {response.loading && <p>Loading...</p>}
      {response.error && (
        <p>
          Error:
          {response.error.message}
        </p>
      )}
      {response.data && <pre>{JSON.stringify(response.data, null, 2)}</pre>}
    </div>
  );
}

export default RtbPageContent;
