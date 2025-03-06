'use client';

import type { ButtonProps } from '@tailus/themer';
import DrawerOpenButton from '@components/DrawerOpenButton';
import { configPathRoutes } from '@configs/routes';

type AdUnitDrawerOpenButtonButtonProps = {
  className?: string;
} & ButtonProps;

function AdUnitDrawerOpenButton(props: AdUnitDrawerOpenButtonButtonProps) {
  return (
    <DrawerOpenButton title="Add a AdUnit" path={configPathRoutes.createAdUnit} size="xs" {...props} />
  );
}

export default AdUnitDrawerOpenButton;
