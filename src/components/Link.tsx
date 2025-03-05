import type { ButtonProps } from '@tailus-ui/Button/Button.types';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Button from './tailus-ui/Button';

type LinkProps = {
  onClick: () => void;
  link?: string;
  label: ReactNode;
  isActive?: boolean;
  mainNav?: boolean;
} & Partial<ButtonProps>;

function Link({ onClick, link, label, isActive = false, mainNav = true, ...props }: LinkProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.90 }}
    >
      <Button.Root
        variant={isActive && !mainNav ? 'soft' : 'ghost'}
        component="a"
        intent="gray"
        href={link}
        onClick={onClick}
        className="cursor-pointer"
        {...props}
      >
        <Button.Label>{label}</Button.Label>
      </Button.Root>
    </motion.button>

  );
};

export default Link;
