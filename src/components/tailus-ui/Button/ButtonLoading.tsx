import type { ButtonProps } from '@tailus-ui/Button/Button.types';
import ButtonIconLoading from '@tailus-ui/Button/ButtonIconLoading';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import Button from './Button';

type ButtonIconProps = {
  loading?: boolean;
} & ButtonProps;

function ButtonLoading({ loading, children, className, ...props }: ButtonIconProps) {
  const buttonRootClassNames = loading ? 'pointer-events-none' : '';

  return (
    <Button.Root className={`${buttonRootClassNames} overflow-hidden relative ${className}`} {...props}>
      <AnimatePresence>
        <motion.div
          key="spinner"
          transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
          animate={{ y: loading ? 0 : -30, opacity: 1 }}
          initial={{ y: -30, opacity: 0 }}
          exit={{ y: -30, opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <ButtonIconLoading size="md" type="leading" className="text-white" />
        </motion.div>
        <motion.div
          key="button"
          transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
          animate={{ y: loading ? 30 : 0 }}
          exit={{ y: 30, opacity: 0 }}
        >
          <Button.Label>{children}</Button.Label>
        </motion.div>
      </AnimatePresence>
    </Button.Root>
  );
}

export default ButtonLoading;
