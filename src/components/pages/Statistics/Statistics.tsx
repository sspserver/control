'use client';

import {
  StatisticKey,
} from '@/generated/graphql';
import AdFormatsSelect from '@components/AdFormatsSelect';
import AdUnitSelect from '@components/AdUnitSelect';
import ApplicationsSelect from '@components/ApplicationsSelect';
import CountriesSelect from '@components/CountriesSelect';
import { CustomDatePicker } from '@components/DatePicker/DatePicker';

import StatisticsTable from '@components/pages/Statistics/StatisticsTable/StatisticsTable';
import useStatistics from '@components/pages/Statistics/useStatistics';
import RTBSourceSelect from '@components/RTBSourceSelect';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import Button from '@tailus-ui/Button';
import Multiselect from '@tailus-ui/Multiselect';
import React from 'react';
import ButtonLoading from '../../tailus-ui/Button/ButtonLoading';
import { groupByData } from './Statistics.const';
import StatisticsChart from './StatisticsChart/StatisticsChart';

function Statistics() {
  const {
    isStatisticsDataLoading,
    orderDirection,
    orderField,
    dataStatistic,
    endMonth,
    isAdvancedFilterOpen,
    date,
    pageInfo,
    groupBy,
    statisticFilterData,
    changeStatisticFilterDate,
    clickButtonAdvancedFilterHandler,
    selectGroupByChangeHandler,
    selectDateCalendarHandler,
    clickApplyButtonHandler,
    changeStatisticTableOrderHandler,
    changePageHandler,
  } = useStatistics();

  return (
    <div>

      <div className="pt-4">
        <div className="flex justify-between gap-4 pb-4 items-end">
          <Button.Root size="sm" variant="outlined" onClick={clickButtonAdvancedFilterHandler}>
            <Button.Icon>
              {isAdvancedFilterOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button.Icon>
          </Button.Root>
          <div>
            <div className="pb-2">
              Date
            </div>
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
          </div>
          <div className="flex-1">
            <Multiselect
              label="Group by"
              data={groupByData}
              values={groupBy}
              onChange={selectGroupByChangeHandler}
            />
          </div>
          <div className="flex-1">
            <RTBSourceSelect
              values={statisticFilterData?.[StatisticKey.SourceId]}
              label="RTB"
              onChange={changeStatisticFilterDate(StatisticKey.SourceId)}
            />
          </div>
          {!isAdvancedFilterOpen && (
            <div>
              <ButtonLoading
                loading={isStatisticsDataLoading}
                className="inline-block"
                onClick={clickApplyButtonHandler}
              >
                Apply
              </ButtonLoading>
            </div>
          )}
        </div>
        {isAdvancedFilterOpen && (
          <div className="flex justify-between gap-4 pb-4 items-end">
            <div className="flex-1">
              <ApplicationsSelect
                values={statisticFilterData?.[StatisticKey.AppId]}
                label="Applications"
                onChange={changeStatisticFilterDate(StatisticKey.AppId)}
              />
            </div>
            <div className="flex-1">
              <AdUnitSelect
                values={statisticFilterData?.[StatisticKey.ZoneId]}
                label="AdUnit"
                onChange={changeStatisticFilterDate(StatisticKey.ZoneId)}
              />
            </div>
            <div className="flex-1">
              <CountriesSelect
                values={statisticFilterData?.[StatisticKey.Country]}
                label="Countries"
                onChange={changeStatisticFilterDate(StatisticKey.Country)}
              />
            </div>
            <div className="flex-1">
              <AdFormatsSelect
                values={statisticFilterData?.[StatisticKey.FormatId]}
                label="AdFormats"
                onChange={changeStatisticFilterDate(StatisticKey.FormatId)}
              />
            </div>
            {isAdvancedFilterOpen && (
              <div>
                <ButtonLoading
                  className="inline-block"
                  onClick={clickApplyButtonHandler}
                >
                  Apply
                </ButtonLoading>
              </div>
            )}
          </div>
        )}
      </div>
      <StatisticsChart data={dataStatistic} />
      {!!dataStatistic.length && (
        <StatisticsTable
          onPageChange={changePageHandler}
          orderField={orderField}
          orderDirection={orderDirection}
          onOrderChange={changeStatisticTableOrderHandler}
          data={dataStatistic}
          pageInfo={pageInfo}
        />
      )}
    </div>
  );
}

export default Statistics;
