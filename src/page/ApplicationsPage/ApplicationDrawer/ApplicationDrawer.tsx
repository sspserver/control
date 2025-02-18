'use client';

import ApplicationCreateForm from '@/page/ApplicationsPage/ApplicationCreateForm';
import useApplicationDrawer from '@/page/ApplicationsPage/ApplicationDrawer/useApplicationDrawer';
import Drawer from '@tailus-ui/Drawer';
import React, { Fragment } from 'react';

function ApplicationDrawer() {
  const {
    isDrawerOpen,
    drawerContentClassNames,
    drawerOverlayClassName,
    clickApplicationDrawerSubmitHandler,
    clickApplicationDrawerCloseHandler,
  } = useApplicationDrawer();

  return (
    <Fragment>
      <Drawer.Root shouldScaleBackground dismissible fixed handleOnly withControler={false} repositionInputs fancy direction="right" open={isDrawerOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className={drawerOverlayClassName} />
          <Drawer.Content
            className={drawerContentClassNames}
            data-vaul-custom-container="true"
          >
            <ApplicationCreateForm onSubmit={clickApplicationDrawerSubmitHandler} onCancel={clickApplicationDrawerCloseHandler} />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Fragment>
  );
}

export default ApplicationDrawer;
