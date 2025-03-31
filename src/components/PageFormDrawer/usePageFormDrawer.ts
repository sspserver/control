import { useRouter } from 'next/navigation';
import React from 'react';

const waitTimeToNavigateBack = 200;

function usePageFormDrawer() {
  const { back } = useRouter();
  const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(true);
  const clickApplicationDrawerCloseHandler = () => {
    setDrawerOpen(false);
    setTimeout(back, waitTimeToNavigateBack);
  };
  const clickApplicationDrawerSubmitHandler = () => clickApplicationDrawerCloseHandler();

  return {
    isDrawerOpen,
    clickApplicationDrawerSubmitHandler,
    clickApplicationDrawerCloseHandler,
  };
}

export default usePageFormDrawer;
