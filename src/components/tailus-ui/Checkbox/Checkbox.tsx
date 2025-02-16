import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { checkbox, type CheckboxProps as CheckboxVariants, fancyCheckbox } from '@tailus/themer';
import React from 'react';

export type CheckboxProps = {
  className?: string;
  fancy?: boolean;
} & CheckboxVariants & { ref?: React.RefObject<React.ComponentRef<typeof CheckboxPrimitive.Root>> } & React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

const CheckboxRoot = ({ ref: forwardedRef, className, intent, fancy, ...props }: CheckboxProps) => {
  const classes = fancy ? fancyCheckbox({ intent, className }) : checkbox({ intent, className });
  return (
    <CheckboxPrimitive.Root
      ref={forwardedRef}
      className={classes}
      {...props}
    />
  );
};

const CheckboxIndicator = CheckboxPrimitive.Indicator;

export {
  CheckboxIndicator,
  CheckboxRoot,
};

export default {
  Root: CheckboxRoot,
  Indicator: CheckboxIndicator,
};
