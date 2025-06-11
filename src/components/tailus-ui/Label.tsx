import type { LabelProps } from '@tailus/themer';
import * as LabelPrimitive from '@radix-ui/react-label';
import {
  form,

} from '@tailus/themer';
import React from 'react';

type FormLabelProps = {
  className?: string;
  ref?: React.RefObject<React.ComponentRef<typeof LabelPrimitive.Root>>;
} & Omit<LabelProps, 'asTextarea' | 'floating' | 'variant'> & React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

const Label = ({ ref: forwardedRef, className, size = 'md', ...props }: FormLabelProps) => {
  const { label } = form();

  return (
    <LabelPrimitive.Root
      ref={forwardedRef}
      className={label({ size, className })}
      {...props}
    />
  );
};

export default Label;
