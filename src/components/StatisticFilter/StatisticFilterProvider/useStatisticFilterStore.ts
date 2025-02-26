import type {
  StatisticFilterDateType,
  StatisticFilterStoredFields,
} from './StatisticFilterProvider.types';
import { useEffect, useState } from 'react';
import {
  defaultFilterField,
  defaultFilterStoredFields,
  storeNameFilterField,
  storeNameFromDate,
  storeNameToDate,
} from './StatisticFilterProvider.const';

function useStatisticFilterStore() {
  const today = new Date();
  const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const [{
    storeFromDate,
    storeToDate,
    storeFilterField,
  }, setStoredFields] = useState<StatisticFilterStoredFields>(defaultFilterStoredFields);
  const storeFromDateParsed = storeFromDate ? new Date(storeFromDate) : null;
  const storeToDateParsed = storeToDate ? new Date(storeToDate) : null;
  const fromDate = storeFromDateParsed ?? today;
  const toDate = storeToDateParsed ?? lastWeek;
  const storeDate = { from: fromDate, to: toDate };
  const storeDateHandler = (value?: StatisticFilterDateType) => {
    const { from, to } = value ?? {};
    setStoredFields(state => ({
      ...state,
      storeFromDate: from?.toISOString(),
      storeToDate: to?.toISOString(),
    }));

    if (from) {
      localStorage.setItem(storeNameFromDate, from.toISOString());
    } else {
      localStorage.removeItem(storeNameFromDate);
    }

    if (to) {
      localStorage.setItem(storeNameToDate, to.toISOString());
    } else {
      localStorage.removeItem(storeNameToDate);
    }
  };
  const storeFilterFieldHandler = (value: string) => {
    setStoredFields(state => ({ ...state, storeFilterField: value }));
    localStorage.setItem(storeNameFilterField, value);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStoredFields({
        storeFromDate: localStorage.getItem(storeNameFromDate),
        storeToDate: localStorage.getItem(storeNameToDate),
        storeFilterField: localStorage.getItem(storeNameFilterField) ?? defaultFilterField,
      });
    }
  }, []);

  return {
    storeDate,
    storeFilterField,
    storeDateHandler,
    storeFilterFieldHandler,
  };
}

export default useStatisticFilterStore;
