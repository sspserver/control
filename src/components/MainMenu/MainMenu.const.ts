import { configPathRoutes } from '@configs/routes';

const { rtb, applications, adUnit, settings } = configPathRoutes;
export const mainMenuItems = [
  {
    name: 'RTB',
    path: rtb,
  },
  {
    name: 'Applications',
    path: applications,
  },
  {
    name: 'AdUnit',
    path: adUnit,
  },
  {
    name: 'Settings',
    path: settings,
  },
];
