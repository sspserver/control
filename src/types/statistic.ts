import type { Ordering, StatisticAdItem, StatisticItemKey } from '@/generated/graphql';

export type StatisticCustomAdItem = Partial<StatisticAdItem> & {
  date?: string;
  groupByKey?: string;
  groupByValue?: string;
  keys?: StatisticItemKey[];
};

export type StatisticCustomAdItemKeys = keyof Omit<StatisticCustomAdItem, 'date'>;

export type StatisticsCustomAd = StatisticCustomAdItem[];

export type StatisticPageInfo = { __typename?: 'PageInfo'; total: number; page: number; count: number };

export type TablePagination = {
  startPage: number;
  size: number;
};

export type TableOrder = Record<string, Ordering>;
