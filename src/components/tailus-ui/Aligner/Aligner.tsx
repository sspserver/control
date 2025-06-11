import type { AlignerProps as AlignerVariants } from '@tailus/themer';
import { aligner } from '@tailus/themer';
import React from 'react';

export type AlignerProps = {} & React.HTMLAttributes<HTMLDivElement> & AlignerVariants;

export const Aligner = ({ ref: forwardedRef, className, children, fromRight, ...props }: AlignerProps & { ref?: React.RefObject<HTMLDivElement> }) => {
  return (
    <div
      className={aligner({ fromRight, className })}
      ref={forwardedRef}
      children={children}
      {...props}
    />
  );
};

export default Aligner;
