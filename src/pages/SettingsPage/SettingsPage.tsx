'use client';

import NetworkForm from '@pages/SettingsPage/NetworkForm';
import React from 'react';
import AccountForm from './AccountForm';

function SettingsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      <AccountForm />
      <NetworkForm />
    </div>
  );
}

export default SettingsPage;
