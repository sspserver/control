import {
  ListApplicationsDocument,
  Ordering,
  StatisticCondition,
  StatisticKey,
  StatisticOrderingKey,
  useListApplicationsQuery,
  useStatisticsLazyQuery,
} from '@/generated/graphql';
import { useCallback, useEffect, useMemo } from 'react';

const listApplicationsQueryOptions = {
  variables: {
    order: {
      ID: Ordering.Asc,
    },
  },
};

export const listApplicationsDocumentRefetchQueries = [
  {
    query: ListApplicationsDocument,
    variables: listApplicationsQueryOptions.variables,
  },
];

function useApplicationsPage() {
  // const { data: responseApplicationsList, error: applicationsListError, loading: isListApplicationsLoading } = useQuery<ListApplicationsQuery>(ListApplicationsDocument, listApplicationsQueryOptions);

  // {
  //   fetchPolicy: 'network-only',
  //       variables: {
  //   size: 10,
  //       page: 1,
  //       order: {
  //     ID: 'ASC',
  //   },
  // },
  // }

  const {
    data: responseApplicationsList,
    error: applicationsListError,
    loading: isListApplicationsLoading,
  } = useListApplicationsQuery(listApplicationsQueryOptions);
  const applicationsList = responseApplicationsList?.result?.list;
  const applicationsId = useMemo(
    () =>
      applicationsList?.map<number>(application => Number(application.ID))
      ?? [],
    [applicationsList],
  );
  const [getApplicationStatistics, { data: responseApplicationStatistics }]
    = useStatisticsLazyQuery();
  const loadApplicationStatistics = useCallback(() => {
    // Data week  period
    const endDate = new Date().toISOString();
    const startDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    getApplicationStatistics({
      fetchPolicy: 'network-only',
      variables: {
        filter: {
          endDate,
          startDate,
          conditions: [
            {
              key: StatisticKey.AppId,
              op: StatisticCondition.In,
              value: applicationsId,
            },
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
  }, [applicationsId, getApplicationStatistics]);
  const applicationStatisticsMapById = useMemo(() => responseApplicationStatistics?.result.list?.reduce((acc, statistic) => {
    const { keys } = statistic;
    const appId = keys?.find(key => key.key === StatisticKey.AppId)?.value;

    if (appId) {
      if (!acc.has(appId)) {
        acc.set(appId, []);
      }

      const appStatistics = acc.get(appId);
      acc.set(appId, [...appStatistics, statistic]);
    }

    return acc;
  }, new Map()), [responseApplicationStatistics]);
  const changeApplicationHandler = useCallback((id: string) => {}, []);

  useEffect(() => {
    loadApplicationStatistics();
  }, [loadApplicationStatistics, applicationsId]);

  return {
    applicationsList,
    applicationsListError,
    isListApplicationsLoading,
    applicationStatisticsMapById,
    changeApplicationHandler,
  };
}

export default useApplicationsPage;
