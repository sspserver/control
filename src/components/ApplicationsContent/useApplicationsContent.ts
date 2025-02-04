import { Ordering, StatisticCondition, StatisticKey, StatisticOrderingKey, useListApplicationsQuery, useStatisticsLazyQuery } from '@/generated/graphql';
import { useCallback, useMemo } from 'react';

export const listApplicationsQueryOptions = {
  variables: {
    order: {
      ID: Ordering.Asc,
    },
  },
};

function useApplicationsContent() {
  // const { data: responseApplicationsList, error: applicationsListError, loading: isListApplicationsLoading, refetch } = useQuery<ListApplicationsQuery>(ListApplicationsDocument, {
  //   fetchPolicy: 'network-only',
  //   variables: {
  //     size: 10,
  //     page: 1,
  //     order: {
  //       ID: 'ASC',
  //     },
  //   },
  // });

  const { data: responseApplicationsList, error: applicationsListError, loading: isListApplicationsLoading } = useListApplicationsQuery();
  // const { data: responseApplicationsList, error: applicationsListError, loading: isListApplicationsLoading } = useQuery<ListApplicationsQuery>(ListApplicationsDocument, {
  //   fetchPolicy: 'network-only',
  //   variables: {
  //     size: 10,
  //     page: 1,
  //     order: {
  //       ID: 'ASC',
  //     },
  //   },
  // });
  const applicationsList = responseApplicationsList?.result?.list;
  const applicationsId = useMemo(() => applicationsList?.map<number>(application => Number(application.ID)) ?? [], [applicationsList]);
  const [getApplicationStatistics, {
    data: responseApplicationStatistics,
  }] = useStatisticsLazyQuery();
  const loadApplicationStatistics = useCallback(() => {
    getApplicationStatistics({
      fetchPolicy: 'network-only',
      variables: {
        filter: {
          conditions: [
            { key: StatisticKey.AppId, op: StatisticCondition.In, value: applicationsId },
          ],
        },
        group: [StatisticKey.AppId, StatisticKey.Datemark],
        order: [
          { key: StatisticOrderingKey.AppId, order: Ordering.Asc },
          { key: StatisticOrderingKey.Datemark, order: Ordering.Asc },
        ],
        page: { size: 300 },
      },
    });
  }, []);
  const changeApplicationHandler = useCallback((id: string) => {

  }, []);

  // useEffect(() => {
  //   loadApplicationStatistics();
  // }, [loadApplicationStatistics, applicationsId]);

  console.log('xxx statisticsResponse', responseApplicationsList, responseApplicationStatistics);

  return {
    applicationsList,
    applicationsListError,
    isListApplicationsLoading,
    changeApplicationHandler,
  };
}

export default useApplicationsContent;
