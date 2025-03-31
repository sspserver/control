'use client';

import usePageFormDrawer from '@components/PageFormDrawer/usePageFormDrawer';
import Drawer from '@tailus-ui/Drawer/Drawer';
import React, { createElement } from 'react';

type PageFormDrawerProps = {
  children: React.ReactElement<{
    onSubmit?: () => void;
    onCancel?: () => void;
  }>;
};

function PageFormDrawer({ children }: PageFormDrawerProps) {
  const {
    isDrawerOpen,
    clickApplicationDrawerSubmitHandler,
    clickApplicationDrawerCloseHandler,
  } = usePageFormDrawer();

  return (
    <Drawer.Root
      shouldScaleBackground
      handleOnly
      withControler={false}
      fancy
      nested
      open={isDrawerOpen}
    >
      <Drawer.Portal>
        <Drawer.Overlay
          className="z-10 fixed inset-0 blur-sm bg-black/40"
        />
        <Drawer.Content
          className="z-20 p-0 pt-3 h-[calc(100vh-70px)]"
          data-vaul-custom-container="true"
          fancy
        >
          <div className="flex flex-col h-full mx-auto max-w-6xl px-5 space-y-6 py-4 ">
            {createElement(children.type, {
              ...children.props,
              onSubmit: clickApplicationDrawerSubmitHandler,
              onCancel: clickApplicationDrawerCloseHandler,
            })}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default PageFormDrawer;
