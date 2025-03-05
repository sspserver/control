'use client';

import type { ButtonProps } from '@tailus/themer';
import DrawerOpenButton from '@components/DrawerOpenButton';
import { configPathRoutes } from '@configs/routes';

type RtbDrawerOpenButtonProps = {
  className?: string;
} & ButtonProps;

function RtbDrawerOpenButton(props: RtbDrawerOpenButtonProps) {
  return (
    <DrawerOpenButton title="Create a RTB" path={configPathRoutes.rtbCreate} size="xs" {...props} />
  );
}

export default RtbDrawerOpenButton;
