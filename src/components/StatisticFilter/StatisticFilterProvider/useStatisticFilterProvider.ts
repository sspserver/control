'use client';

import useStatisticFilterStore from './useStatisticFilterStore';

function useStatisticFilterProvider() {
  const {
    storeDate: date,
    storeFilterField: filterField,
    storeActiveStatus: filterActiveStatus,
    storeCalendarRangeOption: calendarRangeOption,
    storeDateHandler: changeFilterDateHandler,
    storeFilterFieldHandler: changeFilterFieldHandler,
    storeActiveStatusHandler: changeFilterActiveStatusHandler,
    storeDateRangeOptionHandler: changeFilterDateRangeOptionHandler,
  } = useStatisticFilterStore();

  return {
    date,
    filterField,
    calendarRangeOption,
    filterActiveStatus,
    changeFilterFieldHandler,
    changeFilterDateHandler,
    changeFilterActiveStatusHandler,
    changeFilterDateRangeOptionHandler,
  };
}

export default useStatisticFilterProvider;
