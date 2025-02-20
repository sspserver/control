import type { ButtonProps } from '@tailus/themer';
import { PlusIcon } from '@heroicons/react/16/solid';
import Button from '@tailus-ui/Button/Button';
import { useRouter } from 'next/navigation';

type DrawerOpenButtonProps = {
  title: string;
  path: string;
  className?: string;
} & ButtonProps;

function DrawerOpenButton({ title, path, size, ...props }: DrawerOpenButtonProps) {
  const { push } = useRouter();
  const clickCreateApplicationButtonHandler = () => push(path);

  return (
    <Button.Root size={size} variant="outlined" intent="gray" onClick={clickCreateApplicationButtonHandler} {...props}>
      <Button.Icon type="leading" size={size}>
        <PlusIcon />
      </Button.Icon>
      <Button.Label>{title}</Button.Label>
    </Button.Root>
  );
}

export default DrawerOpenButton;
