import type { ActiveStatus } from '@/generated/graphql';
import type {
  StatisticFilterDateType,
  StatisticFilterStoredFields,
} from './StatisticFilterProvider.types';
import { useEffect, useState } from 'react';
import {
  defaultFilterField,
  defaultFilterStoredFields,
  storeNameActiveStatus,
  storeNameCalendarRangeOption,
  storeNameFilterField,
  storeNameFromDate,
  storeNameToDate,
} from './StatisticFilterProvider.const';
import { getInitFilterDate } from './StatisticFilterProvider.utils';

function useStatisticFilterStore() {
  const [{
    storeFromDate,
    storeToDate,
    storeFilterField,
    storeActiveStatus,
    storeCalendarRangeOption = '',
  }, setStoredFields] = useState<StatisticFilterStoredFields>(defaultFilterStoredFields);
  const storeDate = getInitFilterDate(storeCalendarRangeOption, storeFromDate, storeToDate);
  const storeDateRangeOptionHandler = (storeCalendarRangeOption?: string) => {
    setStoredFields(state => ({ ...state, storeCalendarRangeOption }));
    localStorage.setItem(storeNameCalendarRangeOption, storeCalendarRangeOption ?? '');
  };
  const storeDateHandler = (date?: StatisticFilterDateType) => {
    const { from, to } = date ?? {};
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
  const storeActiveStatusHandler = (value: string | null) => {
    setStoredFields(state => ({ ...state, storeActiveStatus: value as ActiveStatus }));
    if (value) {
      localStorage.setItem(storeNameActiveStatus, value);
    } else {
      localStorage.removeItem(storeNameActiveStatus);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStoredFields({
        storeCalendarRangeOption: localStorage.getItem(storeNameCalendarRangeOption) ?? '',
        storeFromDate: localStorage.getItem(storeNameFromDate),
        storeToDate: localStorage.getItem(storeNameToDate),
        storeFilterField: localStorage.getItem(storeNameFilterField) ?? defaultFilterField,
        storeActiveStatus: (localStorage.getItem(storeNameActiveStatus) as ActiveStatus) ?? undefined,
      });
    }
  }, []);

  return {
    storeDate,
    storeFilterField,
    storeActiveStatus,
    storeCalendarRangeOption,
    storeDateHandler,
    storeFilterFieldHandler,
    storeActiveStatusHandler,
    storeDateRangeOptionHandler,
  };
}

export default useStatisticFilterStore;
