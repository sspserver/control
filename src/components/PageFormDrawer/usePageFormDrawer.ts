import { drawer } from '@tailus/themer';
import { useRouter } from 'next/navigation';
import React from 'react';

const waitTimeToNavigateBack = 200;

function usePageFormDrawer() {
  const { back } = useRouter();
  const [isDrawerOpen, setDrawerOpen] = React.useState<boolean>(true);
  const { content, overlay } = drawer({
    fancy: true,
    withControler: false,
    direction: 'right',
  });
  const clickApplicationDrawerCloseHandler = () => {
    setDrawerOpen(false);
    setTimeout(back, waitTimeToNavigateBack);
  };
  const clickApplicationDrawerSubmitHandler = () => clickApplicationDrawerCloseHandler();
  const drawerContentClassNames = content({
    className:
            'flex h-full flex-col right-2 top-2 bottom-2 fixed outline-none z-20 shadow-lg rounded-lg max-xl:w-1/2 xl:w-1/2 max-sm:w-11/12',
  });
  const drawerOverlayClassName = overlay({
    className: 'z-10 fixed inset-0 blur-sm bg-black/40',
  });

  return {
    isDrawerOpen,
    drawerContentClassNames,
    drawerOverlayClassName,
    clickApplicationDrawerSubmitHandler,
    clickApplicationDrawerCloseHandler,
  };
}

export default usePageFormDrawer;
