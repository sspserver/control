import * as DialogPrimitive from '@radix-ui/react-dialog';
import Button from '@tailus-ui/Button';
import {
  dialog,
  type DialogProps,
  text,
  type TextAlignProp,
  type TextProps,
  type TextSizeProp,
  type TextWeightProp,
  title,
  type TitleSizeProp,
} from '@tailus/themer';
import React from 'react';

const DialogRoot = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = ({ ref: forwardedRef, className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay> & { ref?: React.RefObject<React.ComponentRef<typeof DialogPrimitive.Overlay>> }) => {
  const { overlay } = dialog();

  return (
    <DialogPrimitive.Overlay
      {...props}
      ref={forwardedRef}
      className={overlay({ className })}
    />
  );
};

const DialogContent = ({ ref: forwardedRef, className, fancy, mixed, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & DialogProps & { ref?: React.RefObject<React.ComponentRef<typeof DialogPrimitive.Content>> }) => {
  const { content } = dialog();

  if (fancy && mixed) {
    throw new Error('The fancy and mixed props cannot be used together.');
  }

  return (
    <DialogPrimitive.Content
      {...props}
      ref={forwardedRef}
      className={content({ fancy, mixed, className })}
    />
  );
};

const DialogTitle = ({ ref: forwardedRef, className, size = 'base', align, weight = 'medium', ...props }: React.ComponentProps<typeof DialogPrimitive.Title> & {
  size?: TitleSizeProp;
  align?: TextAlignProp;
  weight?: TextWeightProp;
} & { ref?: React.RefObject<React.ElementRef<typeof DialogPrimitive.Title>> }) => (
  <DialogPrimitive.Title
    {...props}
    ref={forwardedRef}
    className={
      title({
        size,
        align,
        weight,
        className,
      })
    }
  />
);

const DialogDescription = ({ ref: forwardedRef, className, size, weight, align, neutral, ...props }: React.ComponentProps<typeof DialogPrimitive.Description> & TextProps & {
  size?: TextSizeProp;
  align?: TextAlignProp;
  weight?: TextWeightProp;
} & { ref?: React.RefObject<React.ComponentRef<typeof DialogPrimitive.Description>> }) => (
  <DialogPrimitive.Description
    {...props}
    ref={forwardedRef}
    className={
      text({
        size,
        weight,
        align,
        neutral,
        className,
      })
    }
  />
);

const DialogActions = ({ ref: forwardedRef, className, ...props }: React.ComponentProps<'div'> & { ref?: React.RefObject<React.ElementRef<'div'>> }) => {
  const { actions } = dialog();
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={actions({ className })}
    />
  );
};

type DialogCloseButtonProps = React.ComponentProps<typeof Button.Root>;

const DialogCloseButton: React.FC<DialogCloseButtonProps> = ({ className, ...props }) => {
  const { close } = dialog();

  return (
    <Button.Root
      {...props}
      className={close({ className })}
      variant="ghost"
      size="sm"
    >
      <Button.Icon type="only" size="xs">
        {props.children}
      </Button.Icon>
    </Button.Root>
  );
};

export default {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Actions: DialogActions,
  CloseButton: DialogCloseButton,
  Close: DialogClose,
};

export {
  DialogActions,
  DialogClose,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
};
