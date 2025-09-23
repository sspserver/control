import type { StatisticAdKeyCondition } from '@/generated/graphql';
import type { StatisticCustomAdItem, StatisticsCustomAd, TablePagination } from '@/types/statistic';
import type { StatisticFilterDateType } from '@components/StatisticFilter/StatisticFilterProvider/StatisticFilterProvider.types';

import {
  Ordering,
  StatisticCondition,
  StatisticKey,
  StatisticOrderingKey,
  useStatisticsLazyQuery,
} from '@/generated/graphql';
import useStatisticsFilterStore from '@components/pages/Statistics/useStatisticsFilterStore';
import usePaginationControl from '@components/Pagination/usePaginationControl';
import { useCallback, useEffect, useMemo, useState } from 'react';

const defaultOrderField = StatisticOrderingKey.Datemark;
const defaultOrderDirection = Ordering.Desc;
const chartOrderField = StatisticOrderingKey.Datemark;
const chartOrderDirection = Ordering.Asc;

function useStatistics() {
  const {
    date,
    groupBy,
    storeDateHandler,
    storeGroupByHandler,
  } = useStatisticsFilterStore();
  const [orderField, setOrderField] = useState<StatisticOrderingKey | null>(defaultOrderField);
  const [orderDirection, setOrderDirection] = useState<Ordering | null | undefined>(defaultOrderDirection);
  const { pageSize, changePageSizeStorageHandler } = usePaginationControl();
  const [pagination, setPagination] = useState<TablePagination>({ startPage: 1, size: pageSize });
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [statisticFilterData, setStatisticFilterData] = useState<Partial<Record<`${StatisticKey}`, string[]>> | null>(null);
  const requestOrder = useMemo(() => {
    if (orderDirection && orderField) {
      return { key: orderField, order: orderDirection };
    }
    return { key: defaultOrderField, order: defaultOrderDirection };
  }, [orderDirection, orderField]);
  const changePageSizeHandler = (size: number) => {
    setPagination(state => ({ ...state, size }));
    changePageSizeStorageHandler(size);
  };
  const changePageHandler = (startPage: number) => setPagination(state => ({ ...state, startPage }));
  const changeStatisticFilterData = (key: `${StatisticKey}`) => (value: (string | number)[]) => {
    setStatisticFilterData(state => ({
      ...state,
      [key]: value,
    }));
  };
  const changeStatisticTableOrderHandler = (field: StatisticOrderingKey, direction?: Ordering) => {
    setOrderField(field);
    setOrderDirection(direction);
  };
  const clickButtonAdvancedFilterHandler = () => setIsAdvancedFilterOpen(state => !state);
  const endMonth = new Date();
  const selectGroupByChangeHandler = (value: (string | number)[]) => storeGroupByHandler(value as StatisticKey[]); ;
  const selectDateCalendarHandler = (date?: StatisticFilterDateType) =>
    storeDateHandler(date);
  const [getStatistics, {
    loading: isStatisticsDataLoading,
    data: currentStatisticsData,
    previousData: previousStatisticsData,
  }] = useStatisticsLazyQuery();

  const [getStatisticsForChart, {
    loading: isStatisticsChartDataLoading,
    data: currentStatisticsChartData,
    previousData: previousStatisticsChartData,
  }] = useStatisticsLazyQuery();

  const responseStatisticsData = currentStatisticsData || previousStatisticsData;
  const responseStatisticsChartData = currentStatisticsChartData || previousStatisticsChartData;

  const loadStatistics = useCallback((newGroupBy: StatisticKey[] | undefined = undefined, loadChart: boolean = false) => {
    const today = new Date().toISOString();
    const startDate = date?.from?.toISOString() ?? today;
    const endDate = date?.to?.toISOString() ?? today;
    const conditions: StatisticAdKeyCondition[] = Object.keys(statisticFilterData ?? {}).map(key => ({
      key: key as StatisticKey,
      op: StatisticCondition.In,
      value: statisticFilterData?.[key as StatisticKey] ?? [],
    }));

    getStatistics({
      fetchPolicy: 'network-only',
      variables: {
        filter: {
          endDate,
          startDate,
          conditions,
        },
        group: newGroupBy || groupBy,
        order: [requestOrder],
        page: pagination,
      },
    });

    if (loadChart) {
      getStatisticsForChart({
        fetchPolicy: 'network-only',
        variables: {
          filter: {
            endDate,
            startDate,
            conditions,
          },
          group: newGroupBy || groupBy,
          order: [{ key: chartOrderField, order: chartOrderDirection }],
        },
      });
    }
  }, [date?.from, date?.to, getStatistics, getStatisticsForChart, groupBy, pagination, requestOrder, statisticFilterData]);

  const clickApplyButtonHandler = (newGroupBy: StatisticKey[] | undefined = undefined) =>
    loadStatistics(newGroupBy, true);

  const dataStatistic: StatisticsCustomAd = useMemo(() => {
    return responseStatisticsData?.result?.list?.reduce<StatisticsCustomAd>((acc, { keys, ...item }) => {
      const statisticItem: StatisticCustomAdItem = item;
      const [firstKey = { key: null, value: null }] = keys || [];

      statisticItem.keys = keys || [];
      statisticItem.groupByKey = firstKey.key || undefined;
      statisticItem.groupByValue = firstKey.value || undefined;
      statisticItem.date = keys?.find(({ key }) => key === StatisticKey.Datemark)?.value || undefined;

      acc.push(statisticItem);
      return acc;
    }, []) ?? [];
  }, [responseStatisticsData?.result?.list]);
  const dataStatisticChart: StatisticsCustomAd = useMemo(() => {
    return responseStatisticsChartData?.result?.list?.reduce<StatisticsCustomAd>((acc, { keys, ...item }) => {
      const statisticItem: StatisticCustomAdItem = item;
      const [firstKey = { key: null, value: null }] = keys || [];

      statisticItem.keys = keys || [];
      statisticItem.groupByKey = firstKey.key || undefined;
      statisticItem.groupByValue = firstKey.value || undefined;
      statisticItem.date = keys?.find(({ key }) => key === StatisticKey.Datemark)?.value || undefined;

      acc.push(statisticItem);
      return acc;
    }, []) ?? [];
  }, [responseStatisticsChartData?.result?.list]);
  const pageInfo = responseStatisticsData?.result?.pageInfo;

  useEffect(() => {
    loadStatistics(undefined, true);
  }, [date.from, date.to, statisticFilterData, loadStatistics]);

  useEffect(() => {
    loadStatistics(undefined, false);
  }, [pagination, orderDirection, orderField, loadStatistics]);

  return {
    isStatisticsDataLoading,
    isStatisticsChartDataLoading,
    orderDirection,
    orderField,
    isAdvancedFilterOpen,
    date,
    groupBy,
    pageInfo,
    statisticFilterData,
    dataStatistic,
    dataStatisticChart,
    endMonth,
    pagination,
    changeStatisticFilterData,
    clickButtonAdvancedFilterHandler,
    selectGroupByChangeHandler,
    selectDateCalendarHandler,
    changePageHandler,
    clickApplyButtonHandler,
    changeStatisticTableOrderHandler,
    changePageSizeHandler,
  };
}

export default useStatistics;
