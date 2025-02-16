import { cloneElement } from '@lib/utils';
import * as SelectPrimitive from '@radix-ui/react-select';
import {
  caption,
  select,
  type SelectProps,
  type SeparatorProps,
  trigger,
  type TriggerProps,
} from '@tailus/themer';

import { ChevronDown, ChevronUp } from 'lucide-react';

import React from 'react';
import { twMerge } from 'tailwind-merge';

type SelectIconProps = {
  className?: string;
  children: React.ReactNode;
  size?: TriggerProps['size'];
};

const SelectGroup = SelectPrimitive.Group;

const SelectContext = React.createContext<SelectProps>({});
const { button, separator, itemIndicator, label } = select.soft();

const SelectScrollUpButton = ({ ref: forwardedRef, className, children, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & { ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>> }) => (
  <SelectPrimitive.ScrollUpButton
    {...props}
    ref={forwardedRef}
    className={button({ className })}
  >
    {children || <ChevronUp className="size-3" />}
  </SelectPrimitive.ScrollUpButton>
);

const SelectScrollDownButton = ({ ref: forwardedRef, className, children, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & { ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>> }) => (
  <SelectPrimitive.ScrollDownButton
    {...props}
    ref={forwardedRef}
    className={button({ className })}
  >
    {children || <ChevronDown className="size-3" />}
  </SelectPrimitive.ScrollDownButton>
);

const SelectTrigger = ({ ref: forwardedRef, size = 'md', variant = 'mixed', className, children, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & TriggerProps & { ref?: React.RefObject<React.ElementRef<typeof SelectPrimitive.Trigger>> }) => {
  const { parent } = trigger();
  return (
    <SelectPrimitive.Trigger
      {...props}
      ref={forwardedRef}
      className={parent({ size, variant, className })}
    >
      {children}
    </SelectPrimitive.Trigger>
  );
};

const SelectTriggerIcon = ({ className, size, children }: SelectIconProps) => {
  const { icon } = trigger();
  return cloneElement(children as React.ReactElement<{ className?: string }>, icon({ size, className }));
};

const SelectContent = ({ ref: forwardedRef, className, variant = 'solid', intent = 'primary', mixed = false, fancy = false, children, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & SelectProps & { ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.Content>> }) => {
  const {
    variant: contextVariant,
    intent: contextIntent,
    fancy: contextFancy,
    mixed: contextMixed,
  } = React.useContext(SelectContext);

  variant = variant || contextVariant || 'solid';
  intent = intent || contextIntent || 'primary';
  fancy = fancy || contextFancy || false;
  mixed = mixed || contextMixed || false;

  if (fancy && mixed) {
    throw new Error('The fancy and mixed props cannot be used together.');
  }

  const { content } = select[variant]();

  return (
    <SelectContext value={{ variant, fancy, mixed, intent }}>
      <SelectPrimitive.Content
        {...props}
        ref={forwardedRef}
        className={content({ mixed, fancy, intent, className })}
      >
        {children}
      </SelectPrimitive.Content>
    </SelectContext>
  );
};

const SelectItemIndicator = ({ ref: forwardedRef, className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator> & { ref?: React.RefObject<React.ElementRef<typeof SelectPrimitive.ItemIndicator>> }) => (
  <SelectPrimitive.ItemIndicator
    {...props}
    ref={forwardedRef}
    className={itemIndicator({ className })}
  />
);

const SelectItem = ({ ref: forwardedRef, className, variant, children, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & SelectProps & { ref?: React.RefObject<React.ElementRef<typeof SelectPrimitive.Item>> }) => {
  const {
    variant: contextVariant,
    intent,
  } = React.useContext(SelectContext);

  variant = contextVariant || 'solid';

  const { item } = select[variant]();

  return (
    <SelectPrimitive.Item
      {...props}
      ref={forwardedRef}
      className={item({ intent, className })}
    >
      {children}
    </SelectPrimitive.Item>
  );
};

const SelectLabel = ({ ref: forwardedRef, className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & { ref?: React.RefObject<React.ElementRef<typeof SelectPrimitive.Label>> }) => (
  <SelectPrimitive.Label
    {...props}
    ref={forwardedRef}
    className={twMerge(caption(), label(), className)}
  />
);

const SelectSeparator = ({ ref: forwardedRef, className, fancy = false, dashed = false, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & Pick<SeparatorProps, 'fancy' | 'dashed'> & { ref?: React.RefObject<React.ElementRef<typeof SelectPrimitive.Separator>> }) => {
  const {
    fancy: contextFancy,
  } = React.useContext(SelectContext);

  fancy = fancy || contextFancy || false;
  return (
    <SelectPrimitive.Separator
      {...props}
      ref={forwardedRef}
      className={separator({ fancy, dashed, className })}
    />
  );
};

function SelectIcon() {
  return (<SelectPrimitive.Icon><ChevronDown className="size-3" /></SelectPrimitive.Icon>);
}

export default {
  Root: SelectPrimitive.Root,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
  Separator: SelectSeparator,
  Portal: SelectPrimitive.Portal,
  Value: SelectPrimitive.Value,
  Icon: SelectIcon,
  ItemIndicator: SelectItemIndicator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
  Label: SelectLabel,
  Viewport: SelectPrimitive.Viewport,
  ItemText: SelectPrimitive.ItemText,
  TriggerIcon: SelectTriggerIcon,
};
