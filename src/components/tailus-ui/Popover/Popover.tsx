import * as Popover from '@radix-ui/react-popover';
import { popover, type PopoverProps } from '@tailus/themer';
import React from 'react';

const PopoverRoot = Popover.Root;
const PopoverTrigger = Popover.Trigger;
const PopoverAnchor = Popover.Anchor;
const PopoverPortal = Popover.Portal;

const PopoverContent = ({ ref: forwardedRef, className, fancy, mixed, ...props }: React.ComponentPropsWithoutRef<typeof Popover.Content> & PopoverProps & { ref?: React.RefObject<React.ComponentRef<typeof Popover.Content>> }) => {
  const { content } = popover();

  if (fancy && mixed) {
    throw new Error('The fancy and mixed props cannot be used together.');
  }

  return (
    <Popover.Content
      {...props}
      ref={forwardedRef}
      className={content({ fancy, mixed, className })}
    />
  );
};

const PopoverClose = ({ ref: forwardedRef, className, ...props }: React.ComponentPropsWithoutRef<typeof Popover.Close> & { ref: React.RefObject<React.ElementRef<typeof Popover.Close>> }) => {
  const { close } = popover();

  return (
    <Popover.Close
      {...props}
      ref={forwardedRef}
      className={close({ className })}
    />
  );
};

const PopoverArrow = ({ ref: forwardedRef, className, ...props }: React.ComponentPropsWithoutRef<typeof Popover.Arrow> & { ref: React.RefObject<React.ElementRef<typeof Popover.Arrow>> }) => {
  const { arrow } = popover();
  return (
    <Popover.Arrow
      {...props}
      ref={forwardedRef}
      className={arrow({ className })}
    />
  );
};

export {
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
};

export default {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Portal: PopoverPortal,
  Content: PopoverContent,
  Close: PopoverClose,
  Arrow: PopoverArrow,
};
