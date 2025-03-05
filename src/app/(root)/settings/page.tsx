import SettingsPage from '@pages/SettingsPage';
import { Title } from '@tailus-ui/typography';
import { Fragment } from 'react';

function Settings() {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title as="h2" size="lg" weight="medium">
          Settings
        </Title>
      </div>
      <SettingsPage />
    </Fragment>
  );
}

export default Settings;
