'use client';

import { CustomDatePicker } from '@components/DatePicker/DatePicker';
import Select from '@components/Select';
import MobileStatisticFilter from '@components/StatisticFilter/MobileStatisticFilter';
import { statisticsFilterFields } from '@components/StatisticFilter/StatisticFilter.const';
import useStatisticFilter from '@components/StatisticFilter/useStatisticFilter';
import { Root, Separator } from '@radix-ui/react-toolbar';
import Aligner from '@tailus-ui/Aligner';
import Label from '@tailus-ui/Label';
import Switch from '@tailus-ui/Switch';
import { card } from '@tailus/themer';
import React, { Fragment } from 'react';

const rootClassNames = card({
  variant: 'elevated',
  fancy: true,
  className: 'items-center p-2 gap-2 max-sm:flex-col flex mt-2 max-md:hidden',
});

function StatisticFilter() {
  const {
    date,
    filterField,
    endMonth,
    calendarRangeOption,
    isFilterActiveStatusActive,
    selectDateCalendarHandler,
    changeFilterFieldSelectHandler,
    changeActiveStatusButtonHandler,
    changeDateRangeOptionsCalendarHandler,
  } = useStatisticFilter();

  return (
    <Fragment>
      <MobileStatisticFilter />
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
            rangeOption={calendarRangeOption}
            onChangeRange={changeDateRangeOptionsCalendarHandler}
            onSelect={selectDateCalendarHandler}
            endMonth={endMonth}
            classNameButton="max-sm:w-full"
          />
        </div>
        <Separator className="bg-[--ui-border-color] w-px h-6 max-sm:hidden" />
        <div>
          <Aligner fromRight className="max-w-md">
            <Switch.Root
              id="active_status"
              checked={isFilterActiveStatusActive}
              onCheckedChange={changeActiveStatusButtonHandler}
            >
              <Switch.Thumb />
            </Switch.Root>
            <Label htmlFor="active_status">
              Only active
            </Label>
          </Aligner>
        </div>
      </Root>
    </Fragment>
  );
}

export default StatisticFilter;
