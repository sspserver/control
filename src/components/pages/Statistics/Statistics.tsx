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
import React, { Fragment } from 'react';
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
    pagination,
    statisticFilterData,
    changeStatisticFilterData,
    clickButtonAdvancedFilterHandler,
    selectGroupByChangeHandler,
    selectDateCalendarHandler,
    clickApplyButtonHandler,
    changeStatisticTableOrderHandler,
    changePageHandler,
    changePageSizeHandler,
  } = useStatistics();

  return (
    <div>
      <div className="pt-4">
        <div className="flex justify-between gap-4 pb-4 items-end">
          <Button.Root size="sm" variant="outlined" onClick={clickButtonAdvancedFilterHandler}>
            <Button.Icon type="only">
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
          <div className="flex-1 max-w-sm">
            <Multiselect
              label="Group by"
              data={groupByData}
              values={groupBy}
              onChange={selectGroupByChangeHandler}
            />
          </div>
          <div className="flex-1  max-w-sm">
            <RTBSourceSelect
              values={statisticFilterData?.[StatisticKey.SourceId]}
              label="RTB"
              onChange={changeStatisticFilterData(StatisticKey.SourceId)}
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
          <Fragment>
            <div className="flex justify-between gap-4 pb-4 items-end">
              <div className="flex-1 max-w-[50%]">
                <ApplicationsSelect
                  values={statisticFilterData?.[StatisticKey.AppId]}
                  label="Applications"
                  onChange={changeStatisticFilterData(StatisticKey.AppId)}
                />
              </div>
              <div className="flex-1 max-w-[50%]">
                <AdUnitSelect
                  values={statisticFilterData?.[StatisticKey.ZoneId]}
                  label="AdUnit"
                  onChange={changeStatisticFilterData(StatisticKey.ZoneId)}
                />
              </div>
            </div>
            <div className="flex justify-between gap-4 pb-4 items-end">
              <div className="flex-1 max-w-[45%]">
                <CountriesSelect
                  values={statisticFilterData?.[StatisticKey.Country]}
                  label="Countries"
                  onChange={changeStatisticFilterData(StatisticKey.Country)}
                />
              </div>
              <div className="flex-1 max-w-[45%]">
                <AdFormatsSelect
                  values={statisticFilterData?.[StatisticKey.FormatId]}
                  label="AdFormats"
                  onChange={changeStatisticFilterData(StatisticKey.FormatId)}
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
          </Fragment>
        )}
      </div>
      <StatisticsChart data={dataStatistic} />
      {!!dataStatistic.length && (
        <StatisticsTable
          onPageChange={changePageHandler}
          onPageSizeChange={changePageSizeHandler}
          orderField={orderField}
          orderDirection={orderDirection}
          onOrderChange={changeStatisticTableOrderHandler}
          data={dataStatistic}
          pageInfo={pageInfo}
          pageSize={pagination.size}
        />
      )}
    </div>
  );
}

export default Statistics;
