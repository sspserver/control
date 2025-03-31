import Label from '@tailus-ui/Label';
import { Caption } from '@tailus-ui/typography';
import {
  form,
  type InputProps as InputVariants,
} from '@tailus/themer';
import cn from 'classnames';
import React from 'react';

export type InputProps = {
  ref?: React.RefObject<HTMLInputElement>;
  label?: React.ReactNode;
  error?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & InputVariants;

const Input = ({ ref: forwardedRef, label, error, variant = 'mixed', fancy = true, className, size = 'md', ...props }: InputProps) => {
  const { input, label: labelForm } = form();
  const errorTextColor = 'text-red-400';
  const inputClassName = cn(className, {
    'border-red-400': !!error,
  });
  const inputLabelClassName = cn({
    [errorTextColor]: !!error,
  });

  if ((variant === 'bottomOutlined' || variant === 'plain') && fancy) {
    throw new Error('Fancy is not supported with the bottomOutlined or plain variant !');
  }

  return (
    <div className="space-y-2">
      {label && (
        <Label
          size="sm"
          className={labelForm({ className: inputLabelClassName })}
          htmlFor={props.id}
        >
          {label}
        </Label>
      )}
      <input
        ref={forwardedRef}
        className={input({ variant, fancy: true, size, className: inputClassName })}
        {...props}
      />
      {error && (<Caption size="xs" className={errorTextColor}>{error}</Caption>)}
    </div>
  );
};

export default Input;
