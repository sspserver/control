import type { ButtonRootProps } from '@tailus-ui/Button/Button.types';
import ButtonSpinner from '@components/Icons/ButtonSpinner';
import { PauseIcon, PlayIcon } from '@heroicons/react/16/solid';
import Button from '@tailus-ui/Button/Button';

type ActionsPausePlayButtonProps = {
  pause: boolean;
  loading: boolean;
} & Omit<ButtonRootProps, 'children'>;

function ActionsPausePlayButton({ pause, loading, ...props }: ActionsPausePlayButtonProps) {
  const colorClassName = !pause ? 'text-warning-600' : 'text-success-600';

  return (
    <Button.Root {...props}>
      <Button.Icon className={colorClassName} size="xs" type="only">
        {loading
          ? (
              <ButtonSpinner
                className="animate-spin"
                width="14"
                height="14"
              />
            )
          : !pause ? <PauseIcon className={colorClassName} /> : <PlayIcon className={colorClassName} />}
      </Button.Icon>
    </Button.Root>
  );
}

export default ActionsPausePlayButton;
