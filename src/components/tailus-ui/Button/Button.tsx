import type { ButtonIconProps, ButtonLabelProps, ButtonRootProps } from './Button.types';
import { cloneElement } from '@lib/utils';
import { button, buttonIcon as icon } from '@tailus/themer';
import React from 'react';

export const Icon: React.FC<ButtonIconProps> = ({
  className,
  children,
  size = 'md',
  type = 'leading',
}) => {
  return (
    <>
      {
        cloneElement(children as React.ReactElement<{ className?: string }>, icon({ size, type, className }))
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
  { ref: forwardedRef, className, component, intent = 'primary', variant = 'solid', size = 'md', disabled, href, children, ...props }: ButtonRootProps) => {
  const MainComponent = component || 'button';
  const iconOnly = React.Children.toArray(children).some((child: React.ReactNode) => {
    if (React.isValidElement(child) && child.type === Icon) {
      const iconChild = child as React.ReactElement<ButtonIconProps>;
      return iconChild.props.type === 'only';
    }
    return false;
  });
  const buttonSize = iconOnly ? 'iconOnlyButtonSize' : 'size';

  return (
    <MainComponent ref={forwardedRef} href={href} className={button[variant as keyof typeof button]({ intent, [buttonSize]: size, className })} {...props} disabled={disabled}>
      {children}
    </MainComponent>
  );
};

Root.displayName = 'Root';
Icon.displayName = 'Icon';
Label.displayName = 'Label';

export default {
  Root,
  Icon,
  Label,
};
