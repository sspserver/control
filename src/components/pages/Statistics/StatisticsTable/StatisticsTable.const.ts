import { StatisticKey } from '@/generated/graphql';

export const tableFieldsSeparator = new Set(['clicks', 'errors']);

export const tableGroupFields = [
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

export const tableFields = [
  {
    name: 'Revenue',
    value: 'REVENUE',
  },
  {
    name: 'Imp',
    value: 'impressions',
  },
  {
    name: 'Views',
    value: 'views',
  },
  {
    name: 'Directs',
    value: 'directs',
  },
  {
    name: 'Clicks',
    value: 'clicks',
  },
  {
    name: 'Bid',
    value: 'BIDS',
  },
  {
    name: 'Skips',
    value: 'skips',
  },
  {
    name: 'Nobids',
    value: 'nobids',
  },
  {
    name: 'Errors',
    value: 'errors',
  },
  {
    name: 'CTR',
    value: 'CTR',
  },
  {
    name: 'eCPM',
    value: 'eCPM',
  },
  {
    name: 'eCPC',
    value: 'eCPC',
  },
];
