import type { TrafficRouterConnection } from '@/generated/graphql';
import { Ordering } from '@/generated/graphql';
import { useQuery } from '@apollo/client';
import { gqlTrafficRouters } from '@lib/graphql/queries/trafficRouters';

function useTrafficRouters() {
  const {
    data: trafficRoutersListResponse,
    error: trafficRoutersListError,
    loading: isTrafficRoutersLoading,
  } = useQuery<{ listTrafficRouters: TrafficRouterConnection }>(gqlTrafficRouters, {
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        createdAt: Ordering.Desc,
      },
    },
  });
  const trafficRoutersList = trafficRoutersListResponse?.listTrafficRouters?.list;

  return {
    trafficRoutersList,
    trafficRoutersListError,
    isTrafficRoutersLoading,
  };
}

export default useTrafficRouters;
