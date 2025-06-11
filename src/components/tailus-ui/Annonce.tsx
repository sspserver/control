import type { AnnonceConcernProps, AnnonceRootProps } from '@tailus/themer';
import { annonceConcern, annonceRoot } from '@tailus/themer';
import React from 'react';

export type AnnonceRootVariantsProps = {
  className?: string;
  href?: string;
  children: React.ReactNode;
} & AnnonceRootProps;

export const AnnonceRoot: React.FC<AnnonceRootVariantsProps> = ({
  className,
  href,
  variant = 'outlined',
  size = 'md',
  children,
  ...props
}) => {
  const Component = href ? 'a' : 'div';

  return (
    <Component
      href={href}
      className={annonceRoot({ variant, size, className })}
      {...props}
    >
      {children}
    </Component>
  );
};

export type AnnonceConcernVariantsProps = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement> & AnnonceConcernProps;

export const AnnonceConcern: React.FC<AnnonceConcernVariantsProps> = ({
  className,
  intent = 'primary',
  size = 'md',
  children,
  ...props
}) => (
  <span
    className={annonceConcern({ intent, size, className })}
    {...props}
  >
    {children}
  </span>
);

export type AnnonceMessageProps = {
  className?: string;
  children: React.ReactNode;
};

export const AnnonceMessage: React.FC<AnnonceMessageProps> = ({
  className,
  children,
  ...props
}) => (
  <p
    className={className}
    {...props}
  >
    {children}
  </p>
);

export default {
  Root: AnnonceRoot,
  Concern: AnnonceConcern,
  Message: AnnonceMessage,
};
