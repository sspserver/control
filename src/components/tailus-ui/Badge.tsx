import type { BadgeProps } from '@tailus/themer';
import { badge } from '@tailus/themer';
import React from 'react';

export type BadgeVariantsProps = {} & React.HTMLAttributes<HTMLDivElement> & BadgeProps;

export const Badge: React.FC<BadgeVariantsProps> = ({
  className,
  children,
  intent = 'primary',
  size = 'md',
  variant = 'soft',
  ...props
}) => {
  return (
    <span className={badge[variant]({ intent, size, className })} {...props}>
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
export default Badge;
