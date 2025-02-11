import type { ButtonIconProps } from '@tailus-ui/Button/Button.types';
import ButtonSpinner from '@/components/Icons/ButtonSpinner';
import Button from './Button';

type ButtonIconLoadingProps = ButtonIconProps;

function ButtonIconLoading(props: ButtonIconLoadingProps) {
  return (
    <Button.Icon {...props}>
      <ButtonSpinner
        className="animate-spin"
        width="1.5em"
        height="1.5em"
      />
    </Button.Icon>
  );
}

export default ButtonIconLoading;
