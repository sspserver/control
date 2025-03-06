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
import useStatisticFilter from '../../StatisticFilter/StatisticFilterProvider/useStatisticFilter';

const listAdUnitQueryOptions = {
  variables: {
    order: {
      createdAt: Ordering.Desc,
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
    date,
  } = useStatisticFilter();
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
  const loadAdUnitStatistics = useCallback((value: number[], from?: Date, to?: Date) => {
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
              key: StatisticKey.ZoneId,
              op: StatisticCondition.In,
              value,
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
  }, [getStatistics]);
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

  useEffect(() => {
    loadAdUnitStatistics(adUnitIds, date?.from, date?.to);
  }, [loadAdUnitStatistics, date, adUnitIds]);

  return {
    adUnitList,
    adUnitListError,
    isAdUnitListLoading,
    adUnitStatisticsMapById,
  };
}

export default useAdUnitPage;
