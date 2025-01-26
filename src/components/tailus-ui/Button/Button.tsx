import type { ButtonIconProps, ButtonLabelProps, ButtonRootProps } from './Button.types';
import { button, buttonIcon as icon } from '@tailus/themer';
import React from 'react';
import { cloneElement } from '@lib/utils';

export const Icon: React.FC<ButtonIconProps> = ({
  className,
  children,
  size = 'md',
  type = 'leading',
}) => {
  return (
    <>
      {
        cloneElement(children as React.ReactElement, icon({ size, type, className }))
      }
    </>
  );
};

export const Label = ({ ref: forwardedRef, className, children, ...props }: ButtonLabelProps) => {
  return (
    <span className={className} {...props} ref={forwardedRef}>{children}</span>
  );
};

export const Root = (
  { ref: forwardedRef, className, intent = 'primary', variant = 'solid', size = 'md', disabled, href, children, ...props }: ButtonRootProps) => {
  const Component = href ? 'a' : 'button';
  const iconOnly = React.Children.toArray(children).some(child =>
    React.isValidElement(child) && child.type === Icon && child.props.type === 'only',
  );
  const buttonSize = iconOnly ? 'iconOnlyButtonSize' : 'size';

  return (
    <Component ref={forwardedRef} href={href} className={button[variant as keyof typeof button]({ intent, [buttonSize]: size, className })} {...props} disabled={disabled}>
      {children}
    </Component>
  );
};

Root.displayName = 'Root';
Icon.displayName = 'Icon';
Label.displayName = 'Label';

// export type Root = typeof Root;
// export type Icon = typeof Icon;
// export type Label = typeof Label;

export default {
  Root,
  Icon,
  Label,
};
