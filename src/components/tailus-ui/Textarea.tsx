import FormElementErrorLabel from '@components/FormElementErrorLabel';
import Label from '@tailus-ui/Label';
import {
  form,
  type InputProps,
} from '@tailus/themer';
import React, { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

export type TextAreaProps = {
  label?: React.ReactNode;
  error?: React.ReactNode;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & InputProps;

export const Textarea = ({ ref: forwardedRef, error, className, label, variant = 'mixed', fancy = false, size = 'md', ...props }: TextAreaProps & { ref?: React.RefObject<HTMLTextAreaElement> }) => {
  const { input, label: labelForm, textarea } = form();

  if ((variant === 'bottomOutlined' || variant === 'plain') && fancy) {
    throw new Error('Fancy is not supported with the bottomOutlined or plain variant !');
  }

  return (
    <Fragment>
      {label && (<Label size="sm" className={labelForm()} htmlFor={props.id}>{label}</Label>)}
      <div className="pt-2">
        <textarea
          ref={forwardedRef as React.RefObject<HTMLTextAreaElement>}
          className={input({ variant, fancy, size, class: twMerge(textarea(), className) })}
          {...props}
        />
      </div>
      <FormElementErrorLabel error={error} />
    </Fragment>
  );
};

export default Textarea;
