'use client';

import type { RefObject } from 'react';
import Progress from '@tailus-ui/Progress/Progress';
import { useEffect, useRef, useState } from 'react';
import useLoadingNavigateBar from './useLoadingNavigateBar';

function LoadingNavigateBar() {
  const progressRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const loading = useLoadingNavigateBar();
  const [progress, setProgress] = useState(40);

  useEffect(() => {
    let timer: number;

    if (loading) {
      timer = window.setTimeout(() => setProgress(100), 800);
    } else {
      setProgress(0);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  if (!loading) {
    return null;
  }

  return (
    <Progress.Root
      ref={progressRef}
      className="w-full fixed top-0 left-0 z-50"
      data-orientation="horizontal"
      value={progress}
      size="md"
      variant="fancy"
    >
      <Progress.Indicator
        ref={progressRef}
        intent="primary"
        loading="primary"
        complete="primary"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
}

export default LoadingNavigateBar;
