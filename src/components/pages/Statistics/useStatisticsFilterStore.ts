import type { StatisticKey } from '@/generated/graphql';
import { useState } from 'react';
import { getStatisticsFilterDataFromLocalStorage } from './Statistics.utils';
import {
  storeNameFromDate,
  storeNameGroupBy,
  storeNameLineFields,
  storeNameToDate,
} from './useStatisticsFilterStore.const';

// Type for the filter fields stored in state and localStorage
type StoredFields = {
  from: Date | undefined;
  to: Date | undefined;
  groupBy: StatisticKey[];
  lineFields: (string | number)[];
};

/**
 * Custom hook to manage statistics filter state and persist it in localStorage.
 */
function useStatisticsFilterStore() {
  // Initialize state from localStorage
  const localStorageData = getStatisticsFilterDataFromLocalStorage();
  const [storedFields, setStoredFields] = useState<StoredFields>(localStorageData);

  /**
   * Updates date range in state and localStorage.
   * @param date Object containing optional 'from' and 'to' Date values.
   */
  const storeDateHandler = (date?: { from?: Date; to?: Date }) => {
    const { from, to } = date || {};

    // Update state
    setStoredFields(prev => ({
      ...prev,
      from: from || undefined,
      to: to || undefined,
    }));

    // Persist to localStorage
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

  /**
   * Updates groupBy fields in state and localStorage.
   * @param groupBy Array of StatisticKey values.
   */
  const storeGroupByHandler = (groupBy: StatisticKey[]) => {
    setStoredFields(prev => ({ ...prev, groupBy }));
    localStorage.setItem(storeNameGroupBy, JSON.stringify(groupBy));
  };

  /**
   * Updates lineFields in state and localStorage.
   * @param lineFields Array of string or number values.
   */
  const storeLineFieldsHandler = (lineFields: (string | number)[]) => {
    setStoredFields(prev => ({ ...prev, lineFields }));
    localStorage.setItem(storeNameLineFields, JSON.stringify(lineFields));
  };

  // Destructure date fields for convenience
  const { from, to } = storedFields;
  const date = { from, to };

  // Expose state and handlers
  return {
    date,
    ...storedFields,
    storeDateHandler,
    storeGroupByHandler,
    storeLineFieldsHandler,
  };
}

export default useStatisticsFilterStore;
