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
    value: 'revenue',
    type: 'money',
  },
  {
    name: 'Imp',
    value: 'impressions',
    type: 'int',
  },
  {
    name: 'Views',
    value: 'views',
    type: 'int',
  },
  {
    name: 'Directs',
    value: 'directs',
    type: 'int',
  },
  {
    name: 'Clicks',
    value: 'clicks',
    type: 'int',
  },
  {
    name: 'Bid',
    value: 'bids',
    type: 'int',
  },
  {
    name: 'Skips',
    value: 'skips',
    type: 'int',
  },
  {
    name: 'Nobids',
    value: 'nobids',
    type: 'int',
  },
  {
    name: 'Errors',
    value: 'errors',
    type: 'int',
  },
  {
    name: 'CTR',
    value: 'CTR',
    type: 'float.2',
  },
  {
    name: 'eCPM',
    value: 'eCPM',
    type: 'float.2',
  },
  {
    name: 'eCPC',
    value: 'eCPC',
    type: 'float.2',
  },
];
