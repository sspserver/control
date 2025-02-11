import type { ButtonProps } from '@tailus-ui/Button/Button.types';
import ButtonIconLoading from '@tailus-ui/Button/ButtonIconLoading';
import Button from './Button';

type ButtonIconProps = {
  loading?: boolean;
} & ButtonProps;

function ButtonLoading({ loading, children, ...props }: ButtonIconProps) {
  const buttonRootClassNames = loading ? 'pointer-events-none' : '';

  return (
    <Button.Root className={buttonRootClassNames} {...props}>
      {
        loading && (
          <ButtonIconLoading size="md" type="leading" />
        )
      }
      <Button.Label>{children}</Button.Label>
    </Button.Root>
  );
}

export default ButtonLoading;
