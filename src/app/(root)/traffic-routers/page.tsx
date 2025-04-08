import TrafficRouters from '@components/pages/TrafficRouters';
import TrafficRoutersDrawerOpenButton from '@components/pages/TrafficRouters/TrafficRoutersDrawerOpenButton';
import { Title } from '@tailus-ui/typography';
import React, { Fragment } from 'react';

function TrafficRoutersPage() {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title as="h2" size="lg" weight="medium" className="flex items-center gap-2">
          <span>Traffic routers</span>
        </Title>
        <TrafficRoutersDrawerOpenButton />
      </div>
      <TrafficRouters />
    </Fragment>
  );
}

export default TrafficRoutersPage;
