import type { LinkProps as LinkVariants, TextAlignProp, TextWeightProp } from '@tailus/themer';
import {
  link,

} from '@tailus/themer';
import React from 'react';

type LinkSize = LinkVariants['size'];
type LinkVariant = LinkVariants['variant'];
type LinkIntent = LinkVariants['intent'];
type LinkVisited = LinkVariants['visited'];
type LinkSizeProp = LinkSize | {
  initial?: LinkSize;
  sm?: LinkSize;
  md?: LinkSize;
  lg?: LinkSize;
  xl?: LinkSize;
  xxl?: LinkSize;
};

type LinkVariantProp = LinkVariant | {
  initial?: LinkVariant;
  sm?: LinkVariant;
  md?: LinkVariant;
  lg?: LinkVariant;
  xl?: LinkVariant;
  xxl?: LinkVariant;
};

type LinkIntentProp = LinkIntent | {
  initial?: LinkIntent;
  sm?: LinkIntent;
  md?: LinkIntent;
  lg?: LinkIntent;
  xl?: LinkIntent;
  xxl?: LinkIntent;
};

type LinkVisitedProp = LinkVisited | {
  initial?: LinkVisited;
  sm?: LinkVisited;
  md?: LinkVisited;
  lg?: LinkVisited;
  xl?: LinkVisited;
  xxl?: LinkVisited;
};

export type LinkProps = {
  children: React.ReactNode;
  className?: string;
  size?: LinkSizeProp;
  align?: TextAlignProp;
  weight?: TextWeightProp;
  variant?: LinkVariantProp;
  intent?: LinkIntentProp;
  visited?: LinkVisitedProp;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link: React.FC<LinkProps> = ({
  size,
  weight,
  align,
  variant,
  intent,
  visited,
  children,
  className,
  ...props
}) => {
  return (
    <a
      className={link({
        size,
        variant,
        visited,
        intent,
        weight,
        align,
        className,
      })}
      {...props}
    >
      {children}
    </a>
  );
};
