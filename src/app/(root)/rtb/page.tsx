import StatisticFilter from '@components/StatisticFilter';
import RtbPage from '@pages/RtbPage';
import RtbDrawerOpenButton from '@pages/RtbPage/RtbDrawerOpenButton';
import { Title } from '@tailus-ui/typography';
import React, { Fragment } from 'react';

function Rtb() {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title as="h2" size="lg" weight="medium" className="flex items-center gap-2">
          <span>RTB</span>
          {/* <span>/</span> */}
          {/* <Button.Root */}
          {/*  component="a" */}
          {/*  variant="ghost" */}
          {/*  intent="primary" */}
          {/*  className="btnAngled rounded-none pr-4 pl-4 -ml-2" */}
          {/*  size="md" */}
          {/*  href={configPathRoutes.rtbStatistics} */}
          {/* > */}
          {/*  <Button.Label>Statistics</Button.Label> */}
          {/*  <Button.Icon type="trailing"> */}
          {/*    <ChartBarSquareIcon /> */}
          {/*  </Button.Icon> */}
          {/* </Button.Root> */}
        </Title>
        <RtbDrawerOpenButton />
      </div>
      <StatisticFilter />
      <RtbPage />
    </Fragment>
  );
}

export default Rtb;
