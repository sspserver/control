import { ActiveStatus } from '@/generated/graphql';
import { useStatisticFilter as useStatisticFilterContext } from './StatisticFilterProvider';

function useStatisticFilter() {
  const {
    date,
    filterField,
    calendarRangeOption,
    filterActiveStatus,
    changeFilterFieldHandler: changeFilterFieldSelectHandler,
    changeFilterDateHandler: selectDateCalendarHandler,
    changeFilterDateRangeOptionHandler: changeDateRangeOptionsCalendarHandler,
    changeFilterActiveStatusHandler,
  } = useStatisticFilterContext();
  const endMonth = new Date();
  const isFilterActiveStatusActive = filterActiveStatus === ActiveStatus.Active;
  const changeActiveStatusButtonHandler = (value: boolean) => changeFilterActiveStatusHandler(value ? ActiveStatus.Active : null);

  return {
    date,
    endMonth,
    filterField,
    calendarRangeOption,
    isFilterActiveStatusActive,
    selectDateCalendarHandler,
    changeFilterFieldSelectHandler,
    changeActiveStatusButtonHandler,
    changeDateRangeOptionsCalendarHandler,
  };
}

export default useStatisticFilter;
