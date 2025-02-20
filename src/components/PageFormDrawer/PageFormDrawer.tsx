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
    drawerContentClassNames,
    drawerOverlayClassName,
    clickApplicationDrawerSubmitHandler,
    clickApplicationDrawerCloseHandler,
  } = usePageFormDrawer();

  return (
    <Drawer.Root shouldScaleBackground dismissible fixed handleOnly withControler={false} repositionInputs fancy direction="right" open={isDrawerOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className={drawerOverlayClassName} />
        <Drawer.Content
          className={drawerContentClassNames}
          data-vaul-custom-container="true"
        >
          {createElement(children.type, {
            ...children.props,
            onSubmit: clickApplicationDrawerSubmitHandler,
            onCancel: clickApplicationDrawerCloseHandler,
          })}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default PageFormDrawer;
