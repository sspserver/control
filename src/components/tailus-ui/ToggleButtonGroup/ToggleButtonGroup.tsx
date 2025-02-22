import { cloneElement } from '@lib/utils';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { toggle, type ToggleRootProps } from '@tailus/themer';
import React, { createContext, useContext } from 'react';

const { group, root: item, icon } = toggle();

const RootContext = createContext<ToggleRootProps>({
  variant: 'soft',
  intent: 'primary',
  size: 'md',
});

const ToggleGroupRoot = (
  { ref: forwardedRef, className, variant = 'soft', intent = 'primary', size = 'md', ...props }: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & ToggleRootProps & { ref?: React.RefObject<React.ComponentRef<typeof ToggleGroupPrimitive.Root>> },
) => {
  return (
    <RootContext value={{ variant, intent, size }}>
      <ToggleGroupPrimitive.Root className={group({ size, className })} ref={forwardedRef} {...props} />
    </RootContext>
  );
};

// Creating the ToggleGroupItem component with forwardRef to pass the ref
const ToggleGroupItem = (
  { ref: forwardedRef, className, variant, intent, size, withLabel, ...props }: React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & ToggleRootProps & { ref?: React.RefObject<React.ComponentRef<typeof ToggleGroupPrimitive.Item>> },
) => {
  const {
    variant: rootVariant,
    intent: rootIntent,
    size: rootSize,
  } = useContext(RootContext);

  variant = variant || rootVariant;
  intent = intent || rootIntent;
  size = size || rootSize;

  return (
    <ToggleGroupPrimitive.Item
      className={item({ variant, intent, size, withLabel, className })}
      ref={forwardedRef}
      {...props}
    />
  );
};

type ToggleIconProps = {
  className?: string;
  children: React.ReactNode;
  size?: ToggleRootProps['size'];
};

const ToggleGroupIcon = ({ className, children, size }: ToggleIconProps) => {
  const { size: rootSize } = useContext(RootContext);
  size = size || rootSize;
  return cloneElement(children as React.ReactElement<{ className?: string }>, icon({ size, className }));
};

export default {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
  Icon: ToggleGroupIcon,
};

export {
  ToggleGroupIcon,
  ToggleGroupItem,
  ToggleGroupRoot,
};
