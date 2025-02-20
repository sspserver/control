'use client';

import ApplicationCreateForm from '@/pages/ApplicationsPage/ApplicationCreateForm';
import PageFormDrawer from '@components/PageFormDrawer';
import React from 'react';

function ApplicationDrawer() {
  return (
    <PageFormDrawer>
      <ApplicationCreateForm />
    </PageFormDrawer>
  );
}

export default ApplicationDrawer;
