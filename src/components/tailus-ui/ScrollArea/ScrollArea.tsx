import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { scrollArea } from '@tailus/themer';
import React from 'react';

const { root, bar, thumb } = scrollArea();

const ScrollAreaRoot = ({ ref: forwardedRef, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & { ref?: React.RefObject<React.ComponentRef<typeof ScrollAreaPrimitive.Root>> }) => (
  <ScrollAreaPrimitive.Root
    {...props}
    ref={forwardedRef}
    className={root({ className: props.className })}
  />
);

const ScrollAreaViewport = ScrollAreaPrimitive.Viewport;

const ScrollAreaScrollBar = (
  { ref: forwardedRef, className, children, orientation = 'vertical', ...props }: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar> & { ref?: React.RefObject<React.ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>> },
) => {
  return (
    <ScrollAreaPrimitive.Scrollbar
      {...props}
      orientation={orientation}
      ref={forwardedRef}
      className={bar({ className })}
    >
      {children ?? (
        <ScrollAreaPrimitive.Thumb className={thumb({ className })} />
      )}
    </ScrollAreaPrimitive.Scrollbar>
  );
};
ScrollAreaScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName;

const ScrollAreaThumb = ({ ref: forwardedRef, ...props }: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Thumb> & { ref: React.RefObject<React.ElementRef<typeof ScrollAreaPrimitive.Thumb>> }) => (
  <ScrollAreaPrimitive.Thumb
    {...props}
    ref={forwardedRef}
    className={thumb({ className: props.className })}
  />
);

const ScrollAreaCorner = ScrollAreaPrimitive.Corner;

export default {
  Root: ScrollAreaRoot,
  Viewport: ScrollAreaViewport,
  Scrollbar: ScrollAreaScrollBar,
  Thumb: ScrollAreaThumb,
  Corner: ScrollAreaCorner,
};

export {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollBar,
  ScrollAreaThumb,
  ScrollAreaViewport,
};
