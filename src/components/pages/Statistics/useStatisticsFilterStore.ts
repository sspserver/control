import type { StatisticKey } from '@/generated/graphql';
import { useState } from 'react';
import { getStatisticsFilterDataFromLocalStorage } from './Statistics.utils';
import {
  storeNameFromDate,
  storeNameGroupBy,
  storeNameLineFields,
  storeNameToDate,
} from './useStatisticsFilterStore.const';

type StoredFields = {
  from: Date | undefined;
  to: Date | undefined;
  groupBy: StatisticKey[];
  lineFields: (string | number)[];
};

function useStatisticsFilterStore() {
  const localStorageData = getStatisticsFilterDataFromLocalStorage();
  const [storedFields, setStoredFields] = useState<StoredFields>(localStorageData);
  const storeDateHandler = (date?: { from?: Date; to?: Date }) => {
    const { from, to } = date || {};

    setStoredFields(prev => ({
      ...prev,
      from: from || undefined,
      to: to || undefined,
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
  const storeGroupByHandler = (groupBy: StatisticKey[]) => {
    setStoredFields(prev => ({ ...prev, groupBy }));
    localStorage.setItem(storeNameGroupBy, JSON.stringify(groupBy));
  };
  const storeLineFieldsHandler = (lineFields: (string | number)[]) => {
    setStoredFields(prev => ({ ...prev, lineFields }));
    localStorage.setItem(storeNameLineFields, JSON.stringify(lineFields));
  };
  const { from, to } = storedFields;
  const date = { from, to };

  return {
    date,
    ...storedFields,
    storeDateHandler,
    storeGroupByHandler,
    storeLineFieldsHandler,
  };
}

export default useStatisticsFilterStore;
