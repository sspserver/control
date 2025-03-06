'use client';

import PageFormDrawer from '@components/PageFormDrawer';
import ApplicationCreateForm from '@components/pages/ApplicationsPage/ApplicationCreateForm';
import React from 'react';

function ApplicationDrawer() {
  return (
    <PageFormDrawer>
      <ApplicationCreateForm />
    </PageFormDrawer>
  );
}

export default ApplicationDrawer;
