'use client';

import type { ButtonProps } from '@tailus/themer';
import { configPathRoutes } from '@configs/routes';
import { PlusIcon } from '@heroicons/react/16/solid';
import Button from '@tailus-ui/Button';
import { useRouter } from 'next/navigation';

type ApplicationDrawerOpenButtonProps = {
  className?: string;
} & ButtonProps;

function ApplicationDrawerOpenButton({ size, ...props }: ApplicationDrawerOpenButtonProps) {
  const { push } = useRouter();
  const clickCreateApplicationButtonHandler = () => push(configPathRoutes.crateApplications);

  return (
    <Button.Root size={size} variant="outlined" intent="gray" onClick={clickCreateApplicationButtonHandler} {...props}>
      <Button.Icon type="leading" size={size}>
        <PlusIcon />
      </Button.Icon>
      <Button.Label>Add a Application</Button.Label>
    </Button.Root>
  );
}

export default ApplicationDrawerOpenButton;
