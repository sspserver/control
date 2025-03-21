import * as ProgressPrimitive from '@radix-ui/react-progress';
import { type IndicatorProps as IndicatorVariants, progress, type RootProps } from '@tailus/themer';
import React from 'react';

const { root, indicator } = progress();

const ProgressRoot = ({ ref: forwardedRef, className, size = 'md', variant = 'soft', ...props }: React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & RootProps & { ref: React.RefObject<React.ComponentRef<typeof ProgressPrimitive.Root>> }) => {
  return (
    <ProgressPrimitive.Root
      {...props}
      ref={forwardedRef}
      className={root({ size, variant, className })}
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: 'translateZ(0)',
      }}
    />
  );
};

type IndicatorProps = {} & React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator> & IndicatorVariants;

const ProgressIndicator = ({ ref: forwardedRef, className, intent = 'primary', indeterminate = 'gray', withHighlight = false, innerShadow = false, loading = 'primary', complete = 'success', withStripes = false, ...props }: IndicatorProps & { ref: React.RefObject<React.ElementRef<typeof ProgressPrimitive.Indicator>> }) => {
  if (withHighlight && withStripes) {
    throw new Error('The highlight and stripes styles cannot be applied together!');
  }

  return (
    <ProgressPrimitive.Indicator
      {...props}
      ref={forwardedRef}
      className={indicator({
        intent,
        indeterminate,
        complete,
        withStripes,
        loading,
        withHighlight,
        innerShadow,
        className,
      })}
    />
  );
};

const Progress = {
  Root: ProgressRoot,
  Indicator: ProgressIndicator,
};

export default Progress;

export {
  ProgressIndicator,
  ProgressRoot,
};
