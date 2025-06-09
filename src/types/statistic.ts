import type { Ordering, StatisticAdItem } from '@/generated/graphql';

export type StatisticCustomAdItem = Omit<StatisticAdItem, 'bids'> & {
  date: string;
};

export type StatisticCustomAdItemKeys = keyof Omit<StatisticCustomAdItem, 'date'>;

export type StatisticsCustomAd = StatisticCustomAdItem[];

export type StatisticPageInfo = { __typename?: 'PageInfo'; total: number; page: number; count: number };

export type TablePagination = {
  startPage: number;
  size: number;
};

export type TableOrder = Record<string, Ordering>;
