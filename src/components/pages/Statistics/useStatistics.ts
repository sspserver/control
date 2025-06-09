import type { StatisticAdKeyCondition } from '@/generated/graphql';
import type { StatisticsCustomAd, TablePagination } from '@/types/statistic';
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
import { useCallback, useEffect, useMemo, useState } from 'react';

const today = new Date();
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

const defaultFilterDate = {
  from: lastWeek,
  to: today,
};
const defaultOrderField = StatisticOrderingKey.Datemark;
const defaultOrderDirection = Ordering.Desc;

const defaultPageSize = 20;

function useStatistics() {
  const [orderField, setOrderField] = useState<StatisticOrderingKey | null>(defaultOrderField);
  const [pagination, setPagination] = useState<TablePagination>({ startPage: 1, size: defaultPageSize });
  const [orderDirection, setOrderDirection] = useState<Ordering | null | undefined>(defaultOrderDirection);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [date, setDate] = useState<StatisticFilterDateType>(defaultFilterDate);
  const [groupBy, setGroupBy] = useState<StatisticKey[]>([StatisticKey.Datemark]);
  const [statisticFilterData, setStatisticFilterData] = useState<Partial<Record<`${StatisticKey}`, string[]>> | null>();
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
  const changePageHandler = (startPage: number) => setPagination(state => ({ ...state, startPage }));
  const changeStatisticFilterDate = (key: `${StatisticKey}`) => (value: (string | number)[]) => {
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
  const selectGroupByChangeHandler = (value: (string | number)[]) => setGroupBy(value as StatisticKey[]);
  const selectDateCalendarHandler = (date?: StatisticFilterDateType) => {
    const { from, to } = date ?? {};

    setDate(state => ({
      ...state,
      from,
      to,
    }));
  };
  const [getStatistics, {
    loading: isStatisticsDataLoading,
    data: currentStatisticsData,
    previousData: previousStatisticsData,
  }]
        = useStatisticsLazyQuery();
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
  const dataStatistic: StatisticsCustomAd = useMemo(() => responseStatisticsData?.result?.list?.map(({ keys, ...item }) => ({
    date: keys?.find(({ key }) => key === StatisticKey.Datemark)?.value ?? '',
    ...item,
  })) ?? [], [responseStatisticsData?.result?.list]);
  const pageInfo = responseStatisticsData?.result?.pageInfo;

  useEffect(() => {
    loadStatistics();
  }, [pagination, orderDirection, orderField]);

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
    changeStatisticFilterDate,
    clickButtonAdvancedFilterHandler,
    selectGroupByChangeHandler,
    selectDateCalendarHandler,
    changePageHandler,
    clickApplyButtonHandler,
    changeStatisticTableOrderHandler,
  };
}

export default useStatistics;
