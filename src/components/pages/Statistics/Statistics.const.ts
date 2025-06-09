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
