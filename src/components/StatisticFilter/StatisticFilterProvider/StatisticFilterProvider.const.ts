import { CustomDateOption } from '@lib/date/getCustomDatePick';

export const storeNameFromDate = 'from_date';
export const storeNameToDate = 'to_date';
export const storeNameFilterField = 'filter_field';
export const storeNameActiveStatus = 'active_status';
export const storeNameCalendarRangeOption = 'calendar_range_option';
export const defaultFilterField = 'impressions';

export const defaultFilterStoredFields = {
  storeCalendarRangeOption: CustomDateOption.LastWeek,
  storeFilterField: defaultFilterField,
};
