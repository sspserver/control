export const storeNameFromDate = 'from_date';
export const storeNameToDate = 'to_date';
export const storeNameFilterField = 'filter_field';
export const defaultFilterField = 'impressions';

const today = new Date();
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

export const defaultFilterStoredFields = {
  storeFromDate: today.toISOString(),
  storeToDate: lastWeek.toISOString(),
  storeFilterField: defaultFilterField,
};
