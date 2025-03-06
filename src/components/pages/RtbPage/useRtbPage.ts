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
import useStatisticFilter from '../../StatisticFilter/StatisticFilterProvider/useStatisticFilter';

const listRtbQueryOptions = {
  variables: {
    order: {
      createdAt: Ordering.Desc,
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
    date,
  } = useStatisticFilter();
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
  const loadRtbStatistics = useCallback((value: number[], from?: Date, to?: Date) => {
    const today = new Date().toISOString();
    const startDate = from ? from.toISOString() : today;
    const endDate = to ? to.toISOString() : today;

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
              value,
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
  }, [getStatistics]);
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

  useEffect(() => {
    loadRtbStatistics(
      rtbIds,
      date?.from,
      date?.to,
    );
  }, [loadRtbStatistics, date, rtbIds]);

  return {
    rtbList,
    rtbListError,
    isRtbListLoading,
    rtbStatisticsMapById,
  };
}

export default useRtbPage;
