import type React from 'react';
import type { ActiveStatus } from '@/generated/graphql';

export type StatisticFilterDateType = {
  from: Date | undefined;
  to?: Date;
};

export type StatisticFilterContextType = {
  filterActiveStatus?: ActiveStatus;
  filterField: string;
  calendarRangeOption: string;
  changeFilterFieldHandler: (value: string) => void;
  changeFilterDateRangeOptionHandler: (value?: string) => void;
  changeFilterDateHandler: (date?: StatisticFilterDateType) => void;
  changeFilterActiveStatusHandler: (value: ActiveStatus | `${ActiveStatus}` | string | null) => void;
  date?: StatisticFilterDateType;
};

export type StatisticFilterProviderProps = {
  children: React.ReactNode;
};

export type StatisticFilterStoredFields = {
  storeActiveStatus?: ActiveStatus;
  storeCalendarRangeOption?: string;
  storeFromDate?: string | null;
  storeToDate?: string | null;
  storeFilterField: string;
};
