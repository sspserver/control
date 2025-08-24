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
    info: 'Total revenue generated',
  },
  {
    name: 'Imps',
    value: 'impressions',
    type: 'int',
    info: 'Number of Ad impressions',
  },
  {
    name: 'Views',
    value: 'views',
    type: 'int',
    info: 'Number of real Ad views which were displayed on the screen',
  },
  {
    name: 'Directs',
    value: 'directs',
    type: 'int',
    info: 'Number of Ad directs',
  },
  {
    name: 'Clicks',
    value: 'clicks',
    type: 'int',
    info: 'Number of Ad clicks',
  },
  {
    name: 'Bids',
    value: 'bids',
    type: 'int',
    info: 'Number of RTB bids from all sources',
  },
  {
    name: 'Skips',
    value: 'skips',
    type: 'int',
    info: 'Number of ad skips from RTBs',
  },
  {
    name: 'Nobids',
    value: 'nobids',
    type: 'int',
    info: 'Number of RTB bids with no response',
  },
  {
    name: 'Errors',
    value: 'errors',
    type: 'int',
    info: 'Number of RTB errors returned',
  },
  {
    name: 'CTR',
    value: 'CTR',
    type: 'float.2',
    info: 'Click-through rate',
  },
  {
    name: 'eCPM',
    value: 'eCPM',
    type: 'float.2',
    info: 'Effective cost per mille',
  },
  {
    name: 'eCPC',
    value: 'eCPC',
    type: 'float.2',
    info: 'Effective cost per click',
  },
];
