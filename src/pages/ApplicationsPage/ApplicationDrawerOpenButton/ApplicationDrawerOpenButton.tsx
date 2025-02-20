'use client';

import type { ButtonProps } from '@tailus/themer';
import DrawerOpenButton from '@components/DrawerOpenButton';
import { configPathRoutes } from '@configs/routes';

type ApplicationDrawerOpenButtonProps = {
  className?: string;
} & ButtonProps;

function ApplicationDrawerOpenButton(props: ApplicationDrawerOpenButtonProps) {
  return (
    <DrawerOpenButton title="Add a Application" path={configPathRoutes.crateApplications} size="xs" {...props} />
  );
}

export default ApplicationDrawerOpenButton;
