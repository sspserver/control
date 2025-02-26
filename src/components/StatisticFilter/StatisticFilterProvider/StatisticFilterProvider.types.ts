import type React from 'react';

export type StatisticFilterDateType = {
  from: Date | undefined;
  to?: Date;
};

export type StatisticFilterContextType = {
  filterField: string;
  changeFilterFieldHandler: (value: string) => void;
  changeFilterDateHandler: (value?: StatisticFilterDateType) => void;
  date?: StatisticFilterDateType;
};

export type StatisticFilterProviderProps = {
  children: React.ReactNode;
};

export type StatisticFilterStoredFields = {
  storeFromDate?: string | null;
  storeToDate?: string | null;
  storeFilterField: string;
};
