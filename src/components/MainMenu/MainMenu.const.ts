import { configPathRoutes } from '@configs/routes';
import { AppWindowIcon, BoxesIcon, ChartBar, CogIcon, GavelIcon, TrafficConeIcon } from 'lucide-react';

const { statistics, rtb, applications, adUnit, trafficRouters, settings } = configPathRoutes;
export const mainMenuItems = [
  {
    name: 'Statistics',
    path: statistics,
    Icon: ChartBar,
  },
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
    name: 'Traffic Routers',
    path: trafficRouters,
    Icon: TrafficConeIcon,
  },
  {
    name: 'Settings',
    path: settings,
    Icon: CogIcon,
  },
];
