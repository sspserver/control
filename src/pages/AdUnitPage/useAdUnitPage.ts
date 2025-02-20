import {
  ListZonesDocument,
  Ordering,
  StatisticCondition,
  StatisticKey,
  StatisticOrderingKey,
  useListZonesQuery,
  useStatisticsLazyQuery,
} from '@/generated/graphql';
import { useCallback, useEffect, useMemo } from 'react';

const listAdUnitQueryOptions = {
  variables: {
    order: {
      ID: Ordering.Asc,
    },
  },
};

export const listAdZoneDocumentRefetchQueries = [
  {
    query: ListZonesDocument,
    variables: listAdUnitQueryOptions.variables,
  },
];

function useAdUnitPage() {
  const {
    data: responseAdUnitList,
    error: adUnitListError,
    loading: isAdUnitListLoading,
  } = useListZonesQuery(listAdUnitQueryOptions);
  const adUnitList = responseAdUnitList?.result?.list;
  const adUnitIds = useMemo(
    () =>
      adUnitList?.map<number>(adUnit => Number(adUnit.ID))
      ?? [],
    [adUnitList],
  );
  const [getStatistics, { data: responseStatistics }]
      = useStatisticsLazyQuery();
  const loadAdUnitStatistics = useCallback(() => {
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
              key: StatisticKey.ZoneId,
              op: StatisticCondition.In,
              value: adUnitIds,
            },
          ],
        },
        group: [StatisticKey.ZoneId, StatisticKey.Datemark],
        order: [
          { key: StatisticOrderingKey.ZoneId, order: Ordering.Asc },
          { key: StatisticOrderingKey.Datemark, order: Ordering.Asc },
        ],
        page: { size: 300 },
      },
    });
  }, [adUnitIds, getStatistics]);
  const adUnitStatisticsMapById = useMemo(() => responseStatistics?.result.list?.reduce((acc, statistic) => {
    const { keys } = statistic;
    const adUnitId = keys?.find(key => key.key === StatisticKey.ZoneId)?.value;

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
    loadAdUnitStatistics();
  }, [loadAdUnitStatistics, adUnitIds]);

  return {
    adUnitList,
    adUnitListError,
    isAdUnitListLoading,
    adUnitStatisticsMapById,
  };
}

export default useAdUnitPage;
