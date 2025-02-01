import type { ButtonProps } from '@tailus-ui/Button/Button.types';
import Button from './Button';

type ButtonIconProps = {
  loading?: boolean;
} & ButtonProps;

function ButtonLoading({ loading, children, ...props }: ButtonIconProps) {
  return (
    <Button.Root className="pointer-events-none" {...props}>
      {
        loading && (
          <Button.Icon size="md" type="leading">
            <svg
              className="animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 50 50"
            >
              <path
                fill="currentColor"
                d="M41.9 23.9c-.3-6.1-4-11.8-9.5-14.4c-6-2.7-13.3-1.6-18.3 2.6c-4.8 4-7 10.5-5.6 16.6c1.3 6 6 10.9 11.9 12.5c7.1 2 13.6-1.4 17.6-7.2c-3.6 4.8-9.1 8-15.2 6.9c-6.1-1.1-11.1-5.7-12.5-11.7c-1.5-6.4 1.5-13.1 7.2-16.4c5.9-3.4 14.2-2.1 18.1 3.7c1 1.4 1.7 3.1 2 4.8c.3 1.4.2 2.9.4 4.3c.2 1.3 1.3 3 2.8 2.1c1.3-.8 1.2-2.5 1.1-3.8c0-.4.1.7 0 0"
              />
            </svg>
          </Button.Icon>
        )
      }
      <Button.Label>{children}</Button.Label>
    </Button.Root>
  );
}

export default ButtonLoading;
