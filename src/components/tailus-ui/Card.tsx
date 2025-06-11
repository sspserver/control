import type { CardProps as CardVariantsProps, GradientCardProps } from '@tailus/themer';
import { card, gradientCard } from '@tailus/themer';
import React from 'react';

type InnerProps = {} & React.HTMLAttributes<HTMLDivElement> & GradientCardProps;

const InnerCard: React.FC<InnerProps> = ({
  variant,
  children,
  className,
  ...props
}) => {
  const { inner } = gradientCard({ variant });

  if (variant !== 'soft' && variant !== 'elevated') {
    throw new Error(`Invalid variant prop: ${variant}`);
  }

  return (
    <div className={inner({ className })} {...props}>
      {children}
    </div>
  );
};

export type CardProps = {
  gradient?: boolean;
  href?: string;
} & React.HTMLAttributes<HTMLDivElement | HTMLAnchorElement> & CardVariantsProps;

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'mixed',
  fancy = false,
  children,
  gradient = false,
  href,
  ...props
}) => {
  const Component = href ? 'a' : 'div';
  const { outer } = gradientCard({ variant });

  if (fancy && gradient) {
    throw new Error('The fancy and gradient props cannot be used together.');
  }

  return (
    <>
      {gradient && (variant === 'elevated' || variant === 'soft')
        ? (
            <Component className={outer({ className })} href={href} {...props}>
              <InnerCard variant={variant}>
                {children}
              </InnerCard>
            </Component>

          )
        : (
            <Component className={card({ variant, fancy, className })} href={href} {...props}>
              {children}
            </Component>
          )}
    </>
  );
};

export default Card;
