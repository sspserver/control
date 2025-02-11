import { drawer } from '@tailus/themer';
import { useRouter } from 'next/navigation';
import React from 'react';

const waitTimeToNavigateBack = 200;

function useApplicationDrawer() {
  const { back } = useRouter();
  const { content, overlay } = drawer({ fancy: true, withControler: false, direction: 'right' });
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const clickApplicationDrawerCloseHandler = () => {
    setIsOpen(false);
    setTimeout(back, waitTimeToNavigateBack);
  };
  const drawerContentClassNames = content({ className: 'flex flex-col  right-2 top-2 bottom-2 fixed outline-none z-20 shadow-lg rounded-lg max-xl:w-1/2 xl:w-1/2 max-sm:w-11/12' });
  const drawerOverlayClassName = overlay({ className: 'z-10 fixed inset-0 blur-sm bg-black/40' });

  return {
    clickApplicationDrawerCloseHandler,
    drawerContentClassNames,
    drawerOverlayClassName,
    isOpen,
  };
}

export default useApplicationDrawer;
