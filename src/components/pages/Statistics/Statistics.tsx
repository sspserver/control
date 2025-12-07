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
import { Fragment } from 'react';
import {
  StatisticKey,
} from '@/generated/graphql';
import ButtonLoading from '../../tailus-ui/Button/ButtonLoading';
import { groupByData } from './Statistics.const';
import StatisticsChart from './StatisticsChart/StatisticsChart';

function Statistics() {
  const {
    isStatisticsDataLoading,
    orderDirection,
    orderField,
    dataStatistic,
    dataStatisticChart,
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
      <div className="mt-4">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-0 -mb-px">
            {groupByData.map((item) => {
              const isActive = groupBy.includes(item.value);
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    if (!isActive) {
                      selectGroupByChangeHandler([item.value]);
                      clickApplyButtonHandler([item.value]);
                    }
                  }}
                  className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 rounded-t-lg ${
                    isActive
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400 bg-gray-50 dark:bg-gray-700'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="pt-4">
        <div className="flex justify-between gap-4 pb-4 items-end max-sm:flex-wrap">
          <div className="flex  justify-between gap-4 items-end max-sm:w-full">
            <div>
              <Button.Root size="sm" variant="outlined" onClick={clickButtonAdvancedFilterHandler}>
                <Button.Icon type="only">
                  {isAdvancedFilterOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Button.Icon>
              </Button.Root>
            </div>
            <div className="flex-1">
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
          </div>
          <div className="flex-1 w-full">
            <RTBSourceSelect
              values={statisticFilterData?.[StatisticKey.SourceId]}
              label="RTB"
              onChange={changeStatisticFilterData(StatisticKey.SourceId)}
            />
          </div>
          <div className="order-last">
            <ButtonLoading
              loading={isStatisticsDataLoading}
              className="inline-block"
              onClick={() => clickApplyButtonHandler()}
            >
              Apply
            </ButtonLoading>
          </div>
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
              <div className="flex-1 max-w-[50%]">
                <CountriesSelect
                  values={statisticFilterData?.[StatisticKey.Country]}
                  label="Countries"
                  onChange={changeStatisticFilterData(StatisticKey.Country)}
                />
              </div>
              <div className="flex-1 max-w-[50%]">
                <AdFormatsSelect
                  values={statisticFilterData?.[StatisticKey.FormatId]}
                  label="AdFormats"
                  onChange={changeStatisticFilterData(StatisticKey.FormatId)}
                />
              </div>
            </div>
          </Fragment>
        )}
      </div>

      <StatisticsChart data={dataStatisticChart} />

      {!!dataStatistic.length && (
        <StatisticsTable
          groupByField={groupBy[0] || StatisticKey.Datemark}
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
