'use client';

import useStatisticFilterStore from './useStatisticFilterStore';

function useStatisticFilterProvider() {
  const {
    storeDate: date,
    storeFilterField: filterField,
    storeDateHandler: changeFilterDateHandler,
    storeFilterFieldHandler: changeFilterFieldHandler,
  } = useStatisticFilterStore();

  return {
    date,
    filterField,
    changeFilterFieldHandler,
    changeFilterDateHandler,
  };
}

export default useStatisticFilterProvider;
