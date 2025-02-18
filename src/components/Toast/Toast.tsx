import type { ToastRootProps } from '@tailus-ui/Toast/Toast';
import type { ReactElement, ReactNode } from 'react';
import TailusToast from '@tailus-ui/Toast';
import { Caption, Title } from '@tailus-ui/typography';

export type ToastProps = {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  icon?: ReactElement;
} & ToastRootProps;

function Toast({ title, icon, description, actions, ...rootProps }: ToastProps) {
  return (
    <TailusToast.Root {...rootProps}>
      {title && (
        <TailusToast.Title className="flex items-center gap-1 pb-2">
          {icon && <span>{icon}</span>}
          <Title size="base" as="h6" className="text-sm" weight="medium">
            {title}
          </Title>
        </TailusToast.Title>
      )}
      {description && (
        <TailusToast.Description>
          <Caption size="xs">
            {description}
          </Caption>
        </TailusToast.Description>
      )}
      {/* <TailusToast.Action altText="actions" /> */}
      {/* <TailusToast.Close title="close">close</TailusToast.Close> */}
    </TailusToast.Root>
  );
}

export default Toast;
