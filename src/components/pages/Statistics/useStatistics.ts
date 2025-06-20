import type { StatisticAdKeyCondition } from '@/generated/graphql';
import type { StatisticCustomAdItem, StatisticsCustomAd, TablePagination } from '@/types/statistic';
import type {
  StatisticFilterDateType,
} from '@components/StatisticFilter/StatisticFilterProvider/StatisticFilterProvider.types';
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

function useStatistics() {
  const {
    date,
    groupBy,
    storeDateHandler,
    storeGroupByHandler,
  } = useStatisticsFilterStore();
  const [orderField, setOrderField] = useState<StatisticOrderingKey | null>(defaultOrderField);
  const { pageSize, changePageSizeStorageHandler } = usePaginationControl();
  const [pagination, setPagination] = useState<TablePagination>({ startPage: 1, size: pageSize });
  const [orderDirection, setOrderDirection] = useState<Ordering | null | undefined>(defaultOrderDirection);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [statisticFilterData, setStatisticFilterData] = useState<Partial<Record<`${StatisticKey}`, string[]>> | null>(null);
  const requestOrder = useMemo(() => {
    if (orderDirection && orderField) {
      return {
        key: orderField,
        order: orderDirection,
      };
    }

    return {
      key: defaultOrderField,
      order: defaultOrderDirection,
    };
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
  const selectGroupByChangeHandler = (value: (string | number)[]) => storeGroupByHandler(value as StatisticKey[]);
  const selectDateCalendarHandler = (date?: StatisticFilterDateType) => storeDateHandler(date);
  const [getStatistics, {
    loading: isStatisticsDataLoading,
    data: currentStatisticsData,
    previousData: previousStatisticsData,
  }] = useStatisticsLazyQuery();
  const responseStatisticsData = currentStatisticsData || previousStatisticsData;
  const loadStatistics = useCallback(() => {
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
          // conditions: [
          //   {
          //     key: StatisticKey.AppId,
          //     op: StatisticCondition.In,
          //     value: [],
          //   },
          // ],
        },
        group: groupBy,
        // group: [StatisticKey.AppId, StatisticKey.Datemark],
        order: [requestOrder],
        // [
        //   // { key: StatisticOrderingKey.AppId, order: Ordering.Asc },
        //   { key: StatisticOrderingKey.Datemark, order: Ordering.Asc },
        // ],
        page: pagination, // { size: 300 },
      },
    });
  }, [date?.from, date?.to, getStatistics, groupBy, pagination, requestOrder, statisticFilterData]);
  const clickApplyButtonHandler = () => loadStatistics();
  const dataStatistic: StatisticsCustomAd = useMemo(() => responseStatisticsData?.result?.list?.reduce<StatisticsCustomAd>((acc, { keys, ...item }) => {
    const date = keys?.find(({ key }) => key === StatisticKey.Datemark)?.value;
    const statisticItem: StatisticCustomAdItem = item;

    if (date) {
      statisticItem.date = date;
    }

    acc.push(statisticItem);

    return acc;
  }, []) ?? [], [responseStatisticsData?.result?.list]);
  const pageInfo = responseStatisticsData?.result?.pageInfo;

  useEffect(() => {
    loadStatistics();
  }, [date?.from, date?.to, pagination, orderDirection, orderField]);

  return {
    isStatisticsDataLoading,
    orderDirection,
    orderField,
    isAdvancedFilterOpen,
    date,
    groupBy,
    pageInfo,
    statisticFilterData,
    dataStatistic,
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
