import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { avatar, type AvatarFallbackProps, type AvatarRootProps, fallback, image } from '@tailus/themer';
import React from 'react';

const AvatarRoot = ({ ref, className, size = 'md', status = 'online', bottomStatus = false, topStatus = false, ...props }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & AvatarRootProps & { ref?: React.RefObject<React.ComponentRef<typeof AvatarPrimitive.Root>> }) => {
  return (
    <AvatarPrimitive.Root
      {...props}
      ref={ref}
      className={avatar({ size, status: status && status, topStatus, bottomStatus, className })}
    />
  );
};

const AvatarFallback = ({ ref, className, variant = 'solid', intent = 'primary', ...props }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & AvatarFallbackProps & { ref?: React.RefObject<React.ComponentRef<typeof AvatarPrimitive.Fallback>> }) => {
  return (
    <AvatarPrimitive.Fallback
      {...props}
      ref={ref}
      className={fallback[variant]({ intent, className })}
    />
  );
};

const AvatarImage = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & { ref?: React.RefObject<React.ComponentRef<typeof AvatarPrimitive.Image>> }) => {
  return (
    <AvatarPrimitive.Image
      {...props}
      ref={ref}
      className={image({ className })}
    />
  );
};

export default {
  Root: AvatarRoot,
  Fallback: AvatarFallback,
  Image: AvatarImage,
};

export {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
};
