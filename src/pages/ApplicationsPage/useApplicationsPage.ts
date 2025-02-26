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
import useStatisticFilter from '../../components/StatisticFilter/StatisticFilterProvider/useStatisticFilter';

const listApplicationsQueryOptions = {
  variables: {
    order: {
      createdAt: Ordering.Desc,
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
  const {
    date,
  } = useStatisticFilter();
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
  const loadApplicationStatistics = useCallback((value: number[], from?: Date, to?: Date) => {
    const today = new Date().toISOString();
    const startDate = from ? from.toISOString() : today;
    const endDate = to ? to.toISOString() : today;

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
              value,
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
  }, [getApplicationStatistics]);
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

  useEffect(() => {
    loadApplicationStatistics(applicationsId, date?.from, date?.to);
  }, [loadApplicationStatistics, date, applicationsId]);

  return {
    applicationsList,
    applicationsListError,
    isListApplicationsLoading,
    applicationStatisticsMapById,
  };
}

export default useApplicationsPage;
