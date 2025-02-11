'use client';

import ApplicationCreateForm from '@/components/ApplicationsContent/ApplicationCreateForm';
import useApplicationDrawer from '@/components/ApplicationsContent/ApplicationDrawer/useApplicationDrawer';
import Drawer from '@tailus-ui/Drawer';
import React from 'react';

function ApplicationDrawer() {
  const {
    clickApplicationDrawerCloseHandler,
    drawerContentClassNames,
    drawerOverlayClassName,
    isOpen,
  } = useApplicationDrawer();
  return (
    <Drawer.Root shouldScaleBackground dismissible fixed repositionInputs withControler={false} fancy direction="right" open={isOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className={drawerOverlayClassName} />
        <Drawer.Content
          className={drawerContentClassNames}
          data-vaul-custom-container="true"
        >
          <ApplicationCreateForm onCancel={clickApplicationDrawerCloseHandler} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default ApplicationDrawer;
