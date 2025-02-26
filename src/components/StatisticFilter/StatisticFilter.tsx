'use client';

import { CustomDatePicker } from '@components/DatePicker/DatePicker';
import Select from '@components/Select';
import { statisticsFilterFields } from '@components/StatisticFilter/StatisticFilter.const';
import useStatisticFilter from '@components/StatisticFilter/useStatisticFilter';
import { Root, Separator } from '@radix-ui/react-toolbar';
import { card } from '@tailus/themer';
import React from 'react';

function StatisticFilter() {
  const {
    date,
    filterField,
    endMonth,
    selectDateCalendarHandler,
    changeFilterFieldSelectHandler,
  } = useStatisticFilter();
  const rootClassNames = card({ variant: 'elevated', fancy: true, className: 'items-center p-2 gap-2   max-sm:flex-col flex mt-2' });

  return (
    <Root className={rootClassNames} aria-label="Page filter">
      <div className="w-1/4 max-sm:w-full">
        <Select
          size="sm"
          variant="soft"
          value={filterField}
          items={statisticsFilterFields}
          onChange={changeFilterFieldSelectHandler}
        />
      </div>
      <Separator className="bg-[--ui-border-color] w-px h-6 max-sm:hidden" />
      <div className="max-sm:w-full">
        <CustomDatePicker
          fancy
          selected={date}
          mode="range"
          onSelect={selectDateCalendarHandler}
          endMonth={endMonth}
          classNameButton="max-sm:w-full"
        />
      </div>
    </Root>
  );
}

export default StatisticFilter;
