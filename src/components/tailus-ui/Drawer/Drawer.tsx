import type { DrawerProps, TextAlignProp, TextProps, TextSizeProp, TextWeightProp, TitleSizeProp } from '@tailus/themer';
import { drawer, text, title,
} from '@tailus/themer';
import React from 'react';

import { Drawer as Primitive } from 'vaul';

const Trigger = Primitive.Trigger;
const Portal = Primitive.Portal;
const Close = Primitive.Close;
const NestedRoot = Primitive.NestedRoot;

const DirectionContext = React.createContext<Omit<DrawerProps, 'fancy' | 'mixed'>>({ direction: 'bottom', withControler: true });

type RootProps = React.ComponentProps<typeof Primitive.Root> & DrawerProps & {
  ref?: React.Ref<React.ComponentRef<typeof Primitive.Root>>;
};

const Root = ({ ref, direction, withControler, ...props }: RootProps & { ref?: React.RefObject<React.ComponentRef<typeof Primitive.Root>> }) => {
  return (
    <DirectionContext value={{ direction, withControler }}>
      <Primitive.Root direction={direction} {...props} />
    </DirectionContext>
  );
};

const Content = ({ ref: forwardedRef, className, fancy, mixed, ...props }: React.ComponentProps <typeof Primitive.Content> & Omit<DrawerProps, 'direction'> & { ref?: React.RefObject<React.ComponentRef<typeof Primitive.Content>> }) => {
  const { content } = drawer();
  const { direction, withControler } = React.use(DirectionContext);

  if (fancy && mixed) {
    throw new Error('The fancy and mixed props cannot be used together.');
  }

  return (
    <Primitive.Content
      {...props}
      ref={forwardedRef}
      className={content({ fancy, mixed, direction, withControler, className })}
    />
  );
};

const Overlay = ({ ref: forwardedRef, className, ...props }: React.ComponentProps<typeof Primitive.Overlay> & { ref?: React.RefObject<React.ComponentRef<typeof Primitive.Overlay>> }) => {
  const { overlay } = drawer();

  return (
    <Primitive.Overlay
      {...props}
      ref={forwardedRef}
      className={overlay({ className })}
    />
  );
};

const Title = ({ ref: forwardedRef, className, size = 'base', align, weight = 'medium', ...props }: React.ComponentProps<typeof Primitive.Title> & {
  size?: TitleSizeProp;
  align?: TextAlignProp;
  weight?: TextWeightProp;
} & { ref?: React.RefObject<React.ComponentRef<typeof Primitive.Title>> }) => (
  <Primitive.Title
    {...props}
    ref={forwardedRef}
    className={title({ size, align, weight, className })}
  />
);

const Description = ({ ref: forwardedRef, className, size, weight, align, neutral, ...props }: React.ComponentProps<typeof Primitive.Description> & TextProps & {
  size?: TextSizeProp;
  align?: TextAlignProp;
  weight?: TextWeightProp;
} & { ref?: React.RefObject<React.ComponentRef<typeof Primitive.Description>> }) => (
  <Primitive.Description
    {...props}
    ref={forwardedRef}
    className={text({ size, weight, align, neutral, className })}
  />
);

export default {
  Root,
  NestedRoot,
  Trigger,
  Portal,
  Close,
  Content,
  Overlay,
  Title,
  Description,
};

export {
  Close,
  Content,
  Description,
  NestedRoot,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
};
