import TrafficRoutersDrawerOpenButton from '@components/pages/TrafficRouters/TrafficRoutersDrawerOpenButton';
import TrafficRoutersDynamic from '@components/pages/TrafficRouters/TrafficRoutersDynamic';
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
      <TrafficRoutersDynamic />
    </Fragment>
  );
}

export default TrafficRoutersPage;
