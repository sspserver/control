import * as TabsPrimitive from '@radix-ui/react-tabs';
import {
  type TabsIndicatorProps as IndicatorProps,
  type TabsListProps as ListProps,
  tabs,
} from '@tailus/themer';
import React from 'react';

const { list, trigger, indicator } = tabs();

const TabsContext = React.createContext<Omit<ListProps, 'variant'>>({
  intent: 'primary',
  size: 'md',
  triggerVariant: 'plain',
});

const TabsRoot = TabsPrimitive.Root;

const TabsList = ({ ref: forwardedRef, className, variant = 'soft', triggerVariant = 'plain', intent = 'primary', size = 'md', ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & ListProps & { ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.List>> | null }) => {
  variant = variant || 'soft';

  return (
    <TabsContext value={{ triggerVariant, intent, size }}>
      <TabsPrimitive.List
        {...props}
        ref={forwardedRef}
        className={list({ listVariant: variant, size, triggerVariant, className })}
      />
    </TabsContext>
  );
};

const TabsTrigger = ({ ref: forwardedRef, className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger> & { ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.Trigger>> | null }) => {
  const { triggerVariant, size, intent } = React.useContext(TabsContext);

  return (
    <TabsPrimitive.Trigger
      {...props}
      ref={forwardedRef}
      className={trigger({ triggerVariant, size, intent, className })}
    />
  );
};

const TabsIndicator = ({ ref: forwardedRef, className, variant = 'bottom', ...props }: React.ComponentProps<'span'> & Pick<IndicatorProps, 'variant'> & { ref?: React.Ref<React.ComponentRef<'span'>> | null }) => {
  const { intent } = React.useContext(TabsContext);

  return (
    <span
      {...props}
      aria-hidden
      ref={forwardedRef}
      className={indicator({ indicatorVariant: variant, intent, className })}
    />
  );
};

const TabsContent = TabsPrimitive.Content;

export default {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  Indicator: TabsIndicator,
};

export {
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
};
