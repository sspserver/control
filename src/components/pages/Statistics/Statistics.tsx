'use client';

import type {
  StatisticAdKeyCondition,
} from '@/generated/graphql';
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
import AdFormatsSelect from '@components/AdFormatsSelect';
import AdUnitSelect from '@components/AdUnitSelect';
import ApplicationsSelect from '@components/ApplicationsSelect';
import CountriesSelect from '@components/CountriesSelect';
import { CustomDatePicker } from '@components/DatePicker/DatePicker';

import RTBSourceSelect from '@components/RTBSourceSelect';
import Multiselect from '@tailus-ui/Multiselect';
import React, { useCallback } from 'react';
import ButtonLoading from '../../tailus-ui/Button/ButtonLoading';

const today = new Date();
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

const defaultFilterDate = {
  from: lastWeek,
  to: today,
};

const groupByData = [
  {
    name: 'Date',
    value: StatisticKey.Datemark,
  },
  {
    name: 'RTB',
    value: StatisticKey.SourceId,
  },
  {
    name: 'Application',
    value: StatisticKey.AppId,
  },
  {
    name: 'Ad Unit',
    value: StatisticKey.ZoneId,
  },
  {
    name: 'Ad Format',
    value: StatisticKey.FormatId,
  },
  {
    name: 'Country',
    value: StatisticKey.Country,
  },
];

// Date, Group, RTB. hide all

function Statistics() {
  const [date, setDate] = React.useState<StatisticFilterDateType>(defaultFilterDate);
  const [groupBy, setGroupBy] = React.useState<StatisticKey[]>([StatisticKey.Datemark]);
  const [statisticFilterData, setStatisticFilterData] = React.useState<Partial<Record<`${StatisticKey}`, string[]>> | null>();
  const changeStatisticFilterDate = (key: `${StatisticKey}`) => (value: (string | number)[]) => {
    setStatisticFilterData(state => ({
      ...state,
      [key]: value,
    }));
  };
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
  const [getApplicationStatistics, { data: responseApplicationStatistics }]
      = useStatisticsLazyQuery();
  const loadApplicationStatistics = useCallback(() => {
    const today = new Date().toISOString();
    const startDate = date?.to?.toISOString() ?? today;
    const endDate = date?.from?.toISOString() ?? today;
    const conditions: StatisticAdKeyCondition[] = groupBy.filter(item => item !== StatisticKey.Datemark).map(key => ({
      key,
      op: StatisticCondition.In,
      value: statisticFilterData?.[key] ?? [],
    }));
    const group = [...groupBy.map(item => item as StatisticKey), StatisticKey.Datemark];

    getApplicationStatistics({
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
        group,
        // group: [StatisticKey.AppId, StatisticKey.Datemark],
        order: [
          // { key: StatisticOrderingKey.AppId, order: Ordering.Asc },
          { key: StatisticOrderingKey.Datemark, order: Ordering.Asc },
        ],
        page: { size: 300 },
      },
    });
  }, [date?.from, date?.to, getApplicationStatistics, groupBy, statisticFilterData]);

  const clickApplyButtonHandler = () => loadApplicationStatistics();

  // useEffect(() => {
  //   loadApplicationStatistics();
  // }, []);

  console.log('xxx responseApplicationStatistics', responseApplicationStatistics);

  return (
    <div>
      <div>
        <CustomDatePicker
          fancy
          selected={date}
          mode="range"
          // onChangeRange={() => {}}
          // rangeOption={calendarRangeOption}
          // onChangeRange={selectDateCalendarHandler}
          onSelect={selectDateCalendarHandler}
          endMonth={endMonth}
          classNameButton="max-sm:w-full"
        />
        <Multiselect
          label="Group by"
          data={groupByData}
          values={groupBy}
          onChange={selectGroupByChangeHandler}
        />
        <RTBSourceSelect
          values={statisticFilterData?.[StatisticKey.SourceId]}
          label="RTB"
          onChange={changeStatisticFilterDate(StatisticKey.SourceId)}
        />
        <ApplicationsSelect
          values={statisticFilterData?.[StatisticKey.AppId]}
          label="Applications"
          onChange={changeStatisticFilterDate(StatisticKey.AppId)}
        />
        <AdUnitSelect
          values={statisticFilterData?.[StatisticKey.ZoneId]}
          label="AdUnit"
          onChange={changeStatisticFilterDate(StatisticKey.ZoneId)}
        />
        <CountriesSelect
          values={statisticFilterData?.[StatisticKey.Country]}
          label="Countries"
          onChange={changeStatisticFilterDate(StatisticKey.Country)}
        />
        <AdFormatsSelect
          values={statisticFilterData?.[StatisticKey.FormatId]}
          label="AdFormats"
          onChange={changeStatisticFilterDate(StatisticKey.FormatId)}
        />
      </div>

      <ButtonLoading
        onClick={clickApplyButtonHandler}
      >
        Apply
      </ButtonLoading>

    </div>
  );
}

export default Statistics;
