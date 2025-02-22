import { AnyIPv4IPv6, AnyOnlyExclude, AuctionType, RtbRequestFormatType } from '@/generated/graphql';
import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import { createElement } from 'react';

export const toastSuccessMessage = {
  title: 'RTB was',
  description: 'The RTB was successfully',
  icon: createElement(CheckIcon, { className: 'w-5 h-5 text-success-600' }),
};

export const protocolOptions = [
  {
    value: 'direct',
    name: 'Direct (In dev)',
  },
  {
    value: 'openrtb',
    name: 'OpenRTB v2.x',
  },
  {
    value: 'openrtb3',
    name: 'OpenRTB v3.x',
  },
];

export const auctionTypeOptions = [
  {
    value: AuctionType.FirstPrice,
    name: 'First price',
  },
  {
    value: AuctionType.SecondPrice,
    name: 'Second price',
  },
  {
    value: AuctionType.Undefined,
    name: 'Undefined',
  },
];

export const methodOptions = [
  {
    value: 'GET',
    name: 'GET',
  },
  {
    value: 'POST',
    name: 'POST',
  },
  {
    value: 'PUT',
    name: 'PUT',
  },
];

export const requestTypeOptions = [
  {
    name: 'JSON',
    value: RtbRequestFormatType.Json,
  },
  {
    name: 'XML',
    value: RtbRequestFormatType.Xml,
  },
];

export const secureOptions = [
  {
    name: 'Any',
    value: AnyOnlyExclude.Any,
  },
  {
    name: 'Only',
    value: AnyOnlyExclude.Only,
  },
  {
    name: 'Exclude',
    value: AnyOnlyExclude.Exclude,
  },
];

export const ipOptions = [
  {
    value: AnyIPv4IPv6.Any,
    name: 'Any',
  },
  {
    value: AnyIPv4IPv6.IPv4,
    name: 'IPv4',
  },
  {
    value: AnyIPv4IPv6.IPv6,
    name: 'IPv6',
  },
];

export const adBlockOptions = [
  {
    value: AnyOnlyExclude.Any,
    name: 'All',
  },
  {
    value: AnyOnlyExclude.Only,
    name: 'AdBlock only',
  },
  {
    value: AnyOnlyExclude.Exclude,
    name: 'Not AdBlock',
  },
];

export const privateBrowsingOptions = [
  {
    value: AnyOnlyExclude.Any,
    name: 'All',
  },
  {
    value: AnyOnlyExclude.Only,
    name: 'Private browsing only',
  },
  {
    value: AnyOnlyExclude.Exclude,
    name: 'Not private browsing',
  },
];
