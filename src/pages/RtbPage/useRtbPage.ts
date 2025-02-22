import {
  ListRtbSourcesDocument,
  Ordering,
  StatisticCondition,
  StatisticKey,
  StatisticOrderingKey,
  useListRtbSourcesQuery,
  useStatisticsLazyQuery,
} from '@/generated/graphql';
import { useCallback, useEffect, useMemo } from 'react';

const listRtbQueryOptions = {
  variables: {
    order: {
      ID: Ordering.Asc,
    },
  },
};

export const listRtbDocumentRefetchQueries = [
  {
    query: ListRtbSourcesDocument,
    variables: listRtbQueryOptions.variables,
  },
];

function useRtbPage() {
  const {
    data: responseRtbList,
    error: rtbListError,
    loading: isRtbListLoading,
  } = useListRtbSourcesQuery(listRtbQueryOptions);
  const rtbList = responseRtbList?.result?.list;
  const rtbIds = useMemo(
    () =>
      rtbList?.map<number>(rtb => Number(rtb.ID))
      ?? [],
    [rtbList],
  );
  const [getStatistics, { data: responseStatistics }]
      = useStatisticsLazyQuery();
  const loadRtbStatistics = useCallback(() => {
    // Data week  period
    const endDate = new Date().toISOString();
    const startDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    getStatistics({
      fetchPolicy: 'network-only',
      variables: {
        filter: {
          endDate,
          startDate,
          conditions: [
            {
              key: StatisticKey.SourceId,
              op: StatisticCondition.In,
              value: rtbIds,
            },
          ],
        },
        group: [StatisticKey.SourceId, StatisticKey.Datemark],
        order: [
          { key: StatisticOrderingKey.SourceId, order: Ordering.Asc },
          { key: StatisticOrderingKey.Datemark, order: Ordering.Asc },
        ],
        page: { size: 300 },
      },
    });
  }, [rtbIds, getStatistics]);
  const rtbStatisticsMapById = useMemo(() => responseStatistics?.result.list?.reduce((acc, statistic) => {
    const { keys } = statistic;
    const adUnitId = keys?.find(key => key.key === StatisticKey.SourceId)?.value;

    if (adUnitId) {
      if (!acc.has(adUnitId)) {
        acc.set(adUnitId, []);
      }

      const appStatistics = acc.get(adUnitId);
      acc.set(adUnitId, [...appStatistics, statistic]);
    }

    return acc;
  }, new Map()), [responseStatistics]);
  // const changeHandler = useCallback((id: string) => {}, []);

  useEffect(() => {
    loadRtbStatistics();
  }, [loadRtbStatistics, rtbIds]);

  return {
    rtbList,
    rtbListError,
    isRtbListLoading,
    rtbStatisticsMapById,
  };
}

export default useRtbPage;
