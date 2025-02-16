import * as ToastPrimitive from '@radix-ui/react-toast';
import { toast, type ToastProps } from '@tailus/themer';
import * as React from 'react';

const { root, title, description, viewport } = toast();

const ToastProvider = ToastPrimitive.Provider;
const ToastAction = ToastPrimitive.Action;
const ToastClose = ToastPrimitive.Close;

export type ToastRootProps = React.ComponentProps<typeof ToastPrimitive.Root> &
  ToastProps & {
    ref?: React.RefObject<React.ComponentRef<typeof ToastPrimitive.Root>>;
  };

const ToastRoot = ({
  ref: forwardedRef,
  fancy = true,
  mixed = false,
  withAction = false,
  className,
  ...props
}: ToastRootProps) => {
  if (mixed && fancy) {
    throw new Error(
      'The properties \'fancy\' and \'mixed\' cannot be used together.',
    );
  }

  return (
    <ToastPrimitive.Root
      ref={forwardedRef}
      className={root({ fancy, mixed, withAction, className })}
      {...props}
    />
  );
};

const ToastTitle = ({
  ref: forwardedRef,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> & {
  ref?: React.RefObject<React.ComponentRef<typeof ToastPrimitive.Title>>;
}) => {
  return (
    <ToastPrimitive.Title
      ref={forwardedRef}
      className={title({ class: props.className })}
      {...props}
    />
  );
};

const ToastDescription = ({
  ref: forwardedRef,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> & {
  ref?: React.RefObject<React.ComponentRef<typeof ToastPrimitive.Description>>;
}) => {
  return (
    <ToastPrimitive.Description
      ref={forwardedRef}
      className={description({ class: props.className })}
      {...props}
    />
  );
};

const ToastViewport = ({
  ref: forwardedRef,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> & {
  ref?: React.RefObject<React.ComponentRef<typeof ToastPrimitive.Viewport>>;
}) => {
  return (
    <ToastPrimitive.Viewport
      ref={forwardedRef}
      className={viewport({ class: props.className })}
      {...props}
    />
  );
};

export default {
  Provider: ToastProvider,
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Viewport: ToastViewport,
  Action: ToastAction,
  Close: ToastClose,
};

export {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
};
