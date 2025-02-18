import type { ButtonProps as ButtonVariantsProps, ButtonIconProps as TailusButtonIconProps } from '@tailus/themer';
import type React from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  href?: string;
  component?: React.ElementType;
} & React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & ButtonVariantsProps;

export type ButtonIconProps = {} & React.HTMLAttributes<HTMLElement> & TailusButtonIconProps;
export type ButtonRootProps = ButtonProps & { ref?: React.RefObject<HTMLButtonElement & HTMLAnchorElement> };
export type ButtonLabelProps = React.HTMLAttributes<HTMLElement> & { ref?: React.RefObject<HTMLElement> };
