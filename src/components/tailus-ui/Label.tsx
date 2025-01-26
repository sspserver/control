import * as LabelPrimitive from '@radix-ui/react-label';
import {
  form,
  type LabelProps,
} from '@tailus/themer';
import React from 'react';

export type FormLabelProps = {
  className?: string;
} & Omit<LabelProps, 'asTextarea' | 'floating' | 'variant'>;

const Label = ({ ref: forwardedRef, className, size = 'md', ...props }: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & FormLabelProps & { ref: React.RefObject<React.ElementRef<typeof LabelPrimitive.Root>> }) => {
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
