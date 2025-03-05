import { configPathRoutes } from '@configs/routes';
import { AppWindowIcon, BoxesIcon, CogIcon, GavelIcon } from 'lucide-react';

const { rtb, applications, adUnit, settings } = configPathRoutes;
export const mainMenuItems = [
  {
    name: 'RTB',
    path: rtb,
    Icon: GavelIcon,
  },
  {
    name: 'Applications',
    path: applications,
    Icon: AppWindowIcon,
  },
  {
    name: 'AdUnit',
    path: adUnit,
    Icon: BoxesIcon,
  },
  {
    name: 'Settings',
    path: settings,
    Icon: CogIcon,
  },
];
