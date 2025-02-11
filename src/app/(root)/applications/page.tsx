import ApplicationDrawerOpenButton from '@/components/ApplicationsContent/ApplicationDrawerOpenButton';
import ApplicationsContent from '@/components/ApplicationsContent/ApplicationsContent';
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
      <ApplicationsContent />
    </Fragment>
  );
}

export default Applications;
