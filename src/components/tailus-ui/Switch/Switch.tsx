import type { SwitchProps } from '@tailus/themer';
import * as Switch from '@radix-ui/react-switch';
import { fancySwitch, switchTheme } from '@tailus/themer';
import React, { use } from 'react';

export type SwitchVariantsProps = {
  fancy?: boolean;
} & SwitchProps;
const SwitchContext = React.createContext<SwitchVariantsProps>({ intent: 'primary', fancy: false });

const SwitchRoot = ({ ref: forwardedRef, className, intent = 'primary', fancy = false, ...props }: React.ComponentPropsWithoutRef<typeof Switch.Root> & SwitchVariantsProps & { ref?: React.RefObject<React.ComponentRef<typeof Switch.Root>> }) => {
  const { root } = fancy ? fancySwitch({ intent }) : switchTheme({ intent });
  return (
    <SwitchContext value={{ intent }}>
      <Switch.Root className={root({ intent, className })} {...props} ref={forwardedRef} />
    </SwitchContext>
  );
};

const SwitchThumb = ({ ref: forwardedRef, className, ...props }: React.ComponentPropsWithoutRef<typeof Switch.Thumb> & SwitchProps & { ref?: React.RefObject<React.ComponentRef<typeof Switch.Thumb>> }) => {
  const { intent } = use(SwitchContext);
  const { thumb } = switchTheme({ intent });
  return (
    <Switch.Thumb className={thumb({ intent, className })} {...props} ref={forwardedRef} />
  );
};

export {
  SwitchRoot,
  SwitchThumb,
};

export default {
  Root: SwitchRoot,
  Thumb: SwitchThumb,
};
