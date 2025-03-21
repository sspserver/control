import type {
  StatisticFilterDateType,
} from '@components/StatisticFilter/StatisticFilterProvider/StatisticFilterProvider.types';
import { CustomDateOption, getCustomDatePick } from '@lib/date/getCustomDatePick';

const today = new Date();
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

export function getInitFilterDate(
  rangeOption?: string | null,
  fromDate?: string | null,
  toDate?: string | null,
) {
  let storeDate: StatisticFilterDateType = {
    from: lastWeek,
    to: today,
  };
  const isRangeOptionCustom = rangeOption === CustomDateOption.Custom;

  if (rangeOption && !isRangeOptionCustom) {
    storeDate = getCustomDatePick(rangeOption);
  } else if ((isRangeOptionCustom && fromDate && toDate) || (fromDate && toDate)) {
    storeDate = {
      from: new Date(fromDate),
      to: new Date(toDate),
    };
  }

  return storeDate;
}
