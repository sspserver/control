import { ApplicationType, PlatformType } from '@/generated/graphql';

export const applicationTypes = [
  {
    name: 'Undefined',
    value: ApplicationType.Undefined,
  },
  {
    name: 'Web',
    value: ApplicationType.Site,
  },
  {
    name: 'Application',
    value: ApplicationType.App,
  },
  {
    name: 'Game',
    value: ApplicationType.Game,
  },
];

export const applicationPlatforms = [
  {
    name: 'Undefined',
    value: PlatformType.Undefined,
  },
  {
    name: 'Web',
    value: PlatformType.Web,
  },
  {
    name: 'Desktop',
    value: PlatformType.Desktop,
  },
  {
    name: 'Mobile',
    value: PlatformType.Mobile,
  },
  {
    name: 'SmartPhone',
    value: PlatformType.SmartPhone,
  },
  {
    name: 'Tablet',
    value: PlatformType.Tablet,
  },
  {
    name: 'Smart TV',
    value: PlatformType.SmartTv,
  },
  {
    name: 'Game Station',
    value: PlatformType.GameStation,
  },
  {
    name: 'Smart Watch',
    value: PlatformType.SmartWatch,
  },
  {
    name: 'VR',
    value: PlatformType.Vr,
  },
  {
    name: 'Smart Glasses',
    value: PlatformType.SmartGlasses,
  },
  {
    name: 'Smart Billboard',
    value: PlatformType.SmartBillboard,
  },
];
