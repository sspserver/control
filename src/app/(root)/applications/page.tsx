import ApplicationDrawerOpenButton from '@/page/ApplicationsPage/ApplicationDrawerOpenButton';
import ApplicationsPage from '@/page/ApplicationsPage/ApplicationsPage';
import { Title } from '@tailus-ui/typography';
import { Fragment } from 'react';

function Applications() {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title as="h1" size="xl">
          Applications
        </Title>
        <ApplicationDrawerOpenButton size="xs" />
      </div>
      <br />
      <ApplicationsPage />
    </Fragment>
  );
}

export default Applications;
