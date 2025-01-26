import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { separator, type SeparatorProps } from '@tailus/themer';
import React from 'react';

type SeparatorVariantProps = {} & React.ComponentProps<typeof SeparatorPrimitive.Root> & Pick<SeparatorProps, 'fancy' | 'dashed'>;

function Separator({ ref, fancy, dashed, className, ...props }: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & SeparatorVariantProps & { ref: React.RefObject<React.ComponentRef<typeof SeparatorPrimitive.Root>> }) {
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

Separator.displayName = 'Separator';

export default Separator;
