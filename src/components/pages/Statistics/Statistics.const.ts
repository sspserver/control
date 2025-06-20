import { StatisticKey } from '@/generated/graphql';

export const groupByData = [
  {
    name: 'Date',
    value: StatisticKey.Datemark,
  },
  {
    name: 'RTB',
    value: StatisticKey.SourceId,
  },
  {
    name: 'Application',
    value: StatisticKey.AppId,
  },
  {
    name: 'Ad Unit',
    value: StatisticKey.ZoneId,
  },
  {
    name: 'Ad Format',
    value: StatisticKey.FormatId,
  },
  {
    name: 'Country',
    value: StatisticKey.Country,
  },
];

export const statisticValueToFix: Record<string, number> = {
  revenue: 5,
  CTR: 5,
  eCPM: 5,
  eCPC: 5,
};
