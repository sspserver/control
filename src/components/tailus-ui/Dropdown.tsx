import { cloneElement } from '@lib/utils';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import {
  defaultMenuProps,
  menu,
  type MenuProps,
  menuSeparator as separator,
  type MenuSeparatorProps as SeparatorProps,
} from '@tailus/themer';
import React from 'react';

const DropdownMenuRoot = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuLabel = DropdownMenuPrimitive.Label;
const DropdownMenuCheckboxItem = DropdownMenuPrimitive.CheckboxItem;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuRadioItem = DropdownMenuPrimitive.RadioItem;
const DropdownMenuItemIndicator = DropdownMenuPrimitive.ItemIndicator;

const MenuContext = React.createContext(defaultMenuProps);

const DropdownMenuContent = ({ ref: forwardedRef, className, variant, intent, mixed, fancy, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & MenuProps & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.Content>> }) => {
  const {
    variant: contextVariant,
    intent: contextIntent,
    mixed: contextMixed,
    fancy: contextFancy,
  } = React.useContext(MenuContext);

  variant = variant || contextVariant || 'soft';
  intent = intent || contextIntent;
  fancy = fancy || contextFancy;
  mixed = mixed || contextMixed;

  if (fancy && mixed) {
    throw new Error('The fancy and mixed props cannot be used together.');
  }

  const contextValues = { variant, intent, fancy, mixed };
  const { content } = menu[variant]();

  return (
    <MenuContext value={contextValues}>
      <DropdownMenuPrimitive.Content
        {...props}
        ref={forwardedRef}
        className={content({ mixed, fancy, intent, className })}
      />
    </MenuContext>
  );
};

const DropdownMenuArrow = DropdownMenuPrimitive.Arrow;

const DropdownMenuItem = ({ ref: forwardedRef, className, variant, intent, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & MenuProps & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.Item>> }) => {
  const contextValues = React.useContext(MenuContext);

  variant = variant || contextValues.variant || 'soft';
  intent = intent || contextValues.intent;

  const { item } = menu[variant]({ intent });

  return (
    <DropdownMenuPrimitive.Item
      {...props}
      ref={forwardedRef}
      className={item({ intent, className })}
    />
  );
};

const DropdownMenuSeparator = ({ ref: forwardedRef, className, fancy, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> & SeparatorProps & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.Separator>> }) => {
  const { fancy: contextVariant } = React.useContext(MenuContext);
  fancy = fancy || contextVariant;

  return (
    <DropdownMenuPrimitive.Separator
      {...props}
      ref={forwardedRef}
      className={separator({ fancy, className })}
    />
  );
};

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuSubTrigger = ({ ref: forwardedRef, className, variant, intent, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & MenuProps & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>> }) => {
  const contextValues = React.useContext(MenuContext);
  variant = variant || contextValues.variant || 'soft';
  intent = intent || contextValues.intent;

  const { subTrigger } = menu[variant]({});

  return (
    <DropdownMenuPrimitive.SubTrigger
      {...props}
      ref={forwardedRef}
      className={subTrigger({ intent, className })}
    />
  );
};

const DropdownMenuSubContent = ({ ref: forwardedRef, className, variant, intent, fancy, mixed, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> & MenuProps & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.SubContent>> }) => {
  const {
    variant: contextVariant,
    intent: contextIntent,
    fancy: contextFancy,
    mixed: contextMixed,
  } = React.useContext(MenuContext);

  variant = variant || contextVariant || 'soft';
  intent = intent || contextIntent;
  fancy = fancy || contextFancy;
  mixed = mixed || contextMixed;
  const { content } = menu[variant]({ intent });

  if (fancy && mixed) {
    throw new Error('The fancy and mixed props cannot be used together.');
  }

  return (
    <DropdownMenuPrimitive.SubContent
      {...props}
      ref={forwardedRef}
      className={content({ mixed, fancy, intent, className })}
    />
  );
};

type DropdownMenuIconProps = {
  className?: string;
  children: React.ReactElement<{ className?: string }>;
} & MenuProps;

const DropdownMenuIcon = ({ className, children }: DropdownMenuIconProps) => {
  const { icon } = menu.soft({});
  return cloneElement(
    children,
    icon({ className }),
  );
};

const DropdownMenuRightIcon = ({ ref: forwardedRef, className, ...props }: React.ComponentPropsWithoutRef<'div'> & MenuProps & { ref?: React.RefObject<React.ElementRef<'div'>> }) => {
  const { icon } = menu.solid({});
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={icon({ className })}
    />
  );
};

export default {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Portal: DropdownMenuPortal,
  Content: DropdownMenuContent,
  Arrow: DropdownMenuArrow,
  Item: DropdownMenuItem,
  Group: DropdownMenuGroup,
  Label: DropdownMenuLabel,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  ItemIndicator: DropdownMenuItemIndicator,
  Separator: DropdownMenuSeparator,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
  Icon: DropdownMenuIcon,
  RightIcon: DropdownMenuRightIcon,
};

export {
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuIcon,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRightIcon,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
