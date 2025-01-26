import {
  form,
  type InputProps as InputVariants,
} from '@tailus/themer';
import React from 'react';

export type InputProps = {} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & InputVariants;

export const Input = ({ ref: forwardedRef, variant = 'mixed', fancy = false, className, size = 'md', ...props }: InputProps & { ref: React.RefObject<HTMLInputElement> }) => {
  const { input } = form();

  if ((variant === 'bottomOutlined' || variant === 'plain') && fancy) {
    throw new Error('Fancy is not supported with the bottomOutlined or plain variant !');
  }

  return (
    <input
      ref={forwardedRef}
      className={input({ variant, fancy, size, className })}
      {...props}
    />
  );
};

export default Input;
