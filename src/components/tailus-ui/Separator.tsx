import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { separator, type SeparatorProps } from '@tailus/themer';
import React from 'react';

type SeparatorVariantProps = {} & React.ComponentProps<typeof SeparatorPrimitive.Root> & Pick<SeparatorProps, 'fancy' | 'dashed'>;

type SeparatorRootProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & SeparatorVariantProps & { ref?: React.RefObject<React.ComponentRef<typeof SeparatorPrimitive.Root>> };

const SeparatorRoot = ({ ref, fancy, dashed, className, ...props }: SeparatorRootProps) => {
  if (fancy && dashed) {
    throw new Error('A separator cannot be both fancy and dashed');
  }

  return (
    <SeparatorPrimitive.Root
      className={separator({ fancy, dashed, orientation: props.orientation, className })}
      {...props}
      ref={ref}
    />
  );
};

SeparatorRoot.displayName = 'Separator';

export default SeparatorRoot;
