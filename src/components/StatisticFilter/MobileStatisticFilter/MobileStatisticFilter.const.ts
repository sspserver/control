import { CustomDateOption, customDateSelectOptions } from '@lib/date/getCustomDatePick';

export const mobileCustomDateSelectOptions = [
  ...customDateSelectOptions,
  {
    name: CustomDateOption.Custom.toLocaleLowerCase(),
    value: CustomDateOption.Custom,
  },
];
