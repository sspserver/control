import type { ButtonIconProps as TailusButtonIconProps } from '@tailus/themer';
import type { ButtonProps as ButtonVariantsProps } from '@tailus/themer/dist/components/button';
import type React from 'react';

export type ButtonProps = {
  disabled?: boolean;
  href?: string;
} & React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & ButtonVariantsProps;

export type ButtonIconProps = {} & React.HTMLAttributes<HTMLElement> & TailusButtonIconProps;
export type ButtonRootProps = ButtonProps & { ref?: React.RefObject<HTMLButtonElement & HTMLAnchorElement> };
export type ButtonLabelProps = React.HTMLAttributes<HTMLElement> & { ref?: React.RefObject<HTMLElement> };
