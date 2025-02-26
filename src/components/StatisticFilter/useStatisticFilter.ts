import { useStatisticFilter as useStatisticFilterContext } from './StatisticFilterProvider';

function useStatisticFilter() {
  const {
    date,
    filterField,
    changeFilterFieldHandler: changeFilterFieldSelectHandler,
    changeFilterDateHandler: selectDateCalendarHandler,
  } = useStatisticFilterContext();
  const endMonth = new Date();

  return {
    date,
    endMonth,
    filterField,
    selectDateCalendarHandler,
    changeFilterFieldSelectHandler,
  };
}

export default useStatisticFilter;
