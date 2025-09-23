import { StatisticKey } from '@/generated/graphql';

export const storeNameFromDate = 'statisticsFromDate';
export const storeNameToDate = 'statisticsToDate';
export const storeNameGroupBy = 'statisticsGroupBy';
export const storeNameLineFields = 'statisticsLineFields';

const today = new Date();
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

const defaultFilterDate = {
  from: lastWeek,
  to: today,
};

const defaultGroupBy: StatisticKey[] = [StatisticKey.Datemark];

export const defaultStoredFields = {
  ...defaultFilterDate,
  groupBy: defaultGroupBy,
  lineFields: [
    'impressions',
    'revenue',
  ],
};
