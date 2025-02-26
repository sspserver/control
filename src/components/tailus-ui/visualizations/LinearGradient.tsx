import { type AreaProps as AreaVariants, gradientStop } from '@tailus/themer';
import React from 'react';

export const LinearGradient: React.FC<Omit<AreaVariants, 'gradient'> & { id: string; className?: string }> = ({ intent, className, id }) => {
  return (
    <linearGradient x1={0} y1={0} x2={0} y2={1} id={id}>
      <stop className={gradientStop({ intent, className })} offset="5%" stopColor="currentColor" stopOpacity={0.8} />
      <stop className="text-white dark:text-gray-950 " offset="95%" stopColor="currentColor" stopOpacity={0} />
    </linearGradient>
  );
};

LinearGradient.displayName = 'LinearGradient';

export default LinearGradient;
