'use client';

import type { ListApplicationsQuery } from '@/generated/graphql';
import { ListApplicationsDocument } from '@/generated/graphql';
import { useQuery } from '@apollo/client';

function ApplicationsContent() {
  const response = useQuery<ListApplicationsQuery>(ListApplicationsDocument, {
    fetchPolicy: 'network-only',
    variables: {
      size: 10,
      page: 1,
      order: {
        ID: 'ASC',
      },
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

export default ApplicationsContent;
