'use client';

import type { ButtonProps } from '@tailus/themer';
import DrawerOpenButton from '@components/DrawerOpenButton';
import { configPathRoutes } from '@configs/routes';

type TrafficRoutersDrawerOpenButtonProps = {
  className?: string;
} & ButtonProps;

function TrafficRoutersDrawerOpenButton(props: TrafficRoutersDrawerOpenButtonProps) {
  return (
    <DrawerOpenButton title="Create a Traffic Router" path={configPathRoutes.trafficRouterCreate} size="xs" {...props} />
  );
}

export default TrafficRoutersDrawerOpenButton;
