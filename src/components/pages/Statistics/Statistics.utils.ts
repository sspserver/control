import type { StatisticsCustomAd } from '@/types/statistic';
import {
  defaultStoredFields,
  storeNameFromDate,
  storeNameGroupBy,
  storeNameLineFields,
  storeNameToDate,
} from './useStatisticsFilterStore.const';

export function getStatisticsFilterDataFromLocalStorage() {
  const localStorageNameFromDate = localStorage.getItem(storeNameFromDate);
  const from = localStorageNameFromDate ? new Date(localStorageNameFromDate) : defaultStoredFields.from;
  const localStorageNameToDate = localStorage.getItem(storeNameToDate);
  const to = localStorageNameToDate ? new Date(localStorageNameToDate) : defaultStoredFields.to;
  const localStorageGroupBy = localStorage.getItem(storeNameGroupBy);
  const groupBy = localStorageGroupBy ? JSON.parse(localStorageGroupBy) : defaultStoredFields.groupBy;
  const localStorageLineFields = localStorage.getItem(storeNameLineFields);
  const lineFields = localStorageLineFields ? JSON.parse(localStorageLineFields) : defaultStoredFields.lineFields;

  return {
    from,
    to,
    groupBy,
    lineFields,
  };
}

export function getHasStatisticDataField(
  field: string,
  data?: StatisticsCustomAd,
): boolean {
  const [firstDataItem = {}] = data ?? [];

  return Object.prototype.hasOwnProperty.call(firstDataItem, field);
}
