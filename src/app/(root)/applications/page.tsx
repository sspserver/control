import ApplicationsContent from '@/components/ApplicationsContent/ApplicationsContent';
import { Title } from '@tailus-ui/typography';
import { Fragment } from 'react';

function Applications() {
  return (
    <Fragment>
      <Title as="h1" size="xl">
        Applications
      </Title>
      <br />
      <ApplicationsContent />
    </Fragment>
  );
}

export default Applications;
