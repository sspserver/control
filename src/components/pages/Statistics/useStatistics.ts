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

// Default ordering for statistics table
const defaultOrderField = StatisticOrderingKey.Datemark;
const defaultOrderDirection = Ordering.Desc;

/**
 * Custom hook to manage statistics data, filters, pagination, and ordering.
 */
function useStatistics() {
  // Filter store for date and groupBy
  const {
    date,
    groupBy,
    storeDateHandler,
    storeGroupByHandler,
  } = useStatisticsFilterStore();

  // Table ordering state
  const [orderField, setOrderField] = useState<StatisticOrderingKey | null>(defaultOrderField);
  const [orderDirection, setOrderDirection] = useState<Ordering | null | undefined>(defaultOrderDirection);

  // Pagination state
  const { pageSize, changePageSizeStorageHandler } = usePaginationControl();
  const [pagination, setPagination] = useState<TablePagination>({ startPage: 1, size: pageSize });

  // Advanced filter UI state
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  // Statistic filter data (key-value pairs for filtering)
  const [statisticFilterData, setStatisticFilterData] = useState<Partial<Record<`${StatisticKey}`, string[]>> | null>(null);

  // Memoized ordering object for GraphQL query
  const requestOrder = useMemo(() => {
    if (orderDirection && orderField) {
      return { key: orderField, order: orderDirection };
    }
    return { key: defaultOrderField, order: defaultOrderDirection };
  }, [orderDirection, orderField]);

  // Handlers for pagination and page size
  const changePageSizeHandler = (size: number) => {
    setPagination(state => ({ ...state, size }));
    changePageSizeStorageHandler(size);
  };
  const changePageHandler = (startPage: number) => setPagination(state => ({ ...state, startPage }));

  // Handler to update filter data for a specific key
  const changeStatisticFilterData = (key: `${StatisticKey}`) => (value: (string | number)[]) => {
    setStatisticFilterData(state => ({
      ...state,
      [key]: value,
    }));
  };

  // Handler to change table ordering
  const changeStatisticTableOrderHandler = (field: StatisticOrderingKey, direction?: Ordering) => {
    setOrderField(field);
    setOrderDirection(direction);
  };

  // Handler to toggle advanced filter UI
  const clickButtonAdvancedFilterHandler = () => setIsAdvancedFilterOpen(state => !state);

  // End month for calendar (current date)
  const endMonth = new Date();

  // Handler for groupBy change
  const selectGroupByChangeHandler = (value: (string | number)[]) =>
    storeGroupByHandler(value as StatisticKey[]);

  // Handler for date change
  const selectDateCalendarHandler = (date?: StatisticFilterDateType) =>
    storeDateHandler(date);

  // GraphQL query hook for statistics
  const [getStatistics, {
    loading: isStatisticsDataLoading,
    data: currentStatisticsData,
    previousData: previousStatisticsData,
  }] = useStatisticsLazyQuery();

  // Use previous data if current is loading
  const responseStatisticsData = currentStatisticsData || previousStatisticsData;

  /**
   * Loads statistics data from the server based on current filters, ordering, and pagination.
   */
  const loadStatistics = useCallback((newGroupBy: StatisticKey[] | undefined = undefined) => {
    const today = new Date().toISOString();
    const startDate = date?.from?.toISOString() ?? today;
    const endDate = date?.to?.toISOString() ?? today;

    // Build filter conditions from selected filter data
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
  }, [date?.from, date?.to, getStatistics, groupBy, pagination, requestOrder, statisticFilterData]);

  // Handler for the Apply button (loads statistics)
  const clickApplyButtonHandler = (newGroupBy: StatisticKey[] | undefined = undefined) =>
    loadStatistics(newGroupBy);

  /**
   * Memoized statistics data for table rendering.
   * Transforms raw API data into custom format for UI.
   */
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

  // Pagination info from API response
  const pageInfo = responseStatisticsData?.result?.pageInfo;

  // Effect: reload statistics when filters, pagination, or ordering change
  useEffect(() => {
    loadStatistics(undefined);
  }, [date.from, date.to, pagination, orderDirection, orderField, loadStatistics]);

  // Expose state and handlers for use in components
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
