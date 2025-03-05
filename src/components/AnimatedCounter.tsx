'use client';

import type {
  KeyframeOptions,
} from 'framer-motion';
import {
  animate,
  useInView,
  useIsomorphicLayoutEffect,
} from 'framer-motion';
import { useRef } from 'react';

type AnimatedCounterProps = {
  from: number;
  to: number;
  animationOptions?: KeyframeOptions;
};

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const AnimatedCounter = ({
  from,
  to,
  animationOptions,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }
    if (!inView) {
      return;
    }

    element.textContent = String(from);

    if (window.matchMedia('(prefers-reduced-motion)').matches) {
      element.textContent = String(Intl.NumberFormat().format(to));
      return;
    }

    const controls = animate(from, to, {
      duration: getRandomNumber(0.4, 1.2),
      ease: 'easeOut',
      type: 'spring',
      ...animationOptions,
      onUpdate(value) {
        element.textContent = Intl.NumberFormat().format(value); // .toFixed(2);
      },
    });

    return () => {
      controls.stop();
    };
  }, [ref, inView, from, to]);

  return <span ref={ref} />;
};

export default AnimatedCounter;
