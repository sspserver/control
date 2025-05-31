import React from 'react';
import { twMerge } from 'tailwind-merge';

export function cloneElement(element: React.ReactElement<{ className?: string }>, classNames: string) {
  return React.cloneElement(element, {
    className: twMerge(element.props?.className, classNames),
  });
}
