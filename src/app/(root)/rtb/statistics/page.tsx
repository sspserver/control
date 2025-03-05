import StatisticFilter from '@components/StatisticFilter';
import { configPathRoutes } from '@configs/routes';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import RtbPage from '@pages/RtbPage';
import RtbDrawerOpenButton from '@pages/RtbPage/RtbDrawerOpenButton';
import Button from '@tailus-ui/Button/Button';
import { Title } from '@tailus-ui/typography';
import React, { Fragment } from 'react';

function RtbStatistics() {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title as="h2" size="lg" weight="medium" className="flex items-center gap-2">
          <Button.Root
            component="a"
            variant="ghost"
            intent="primary"
            className="btnAngled rounded-none pr-4 pl-4 -mr-2"
            size="md"
            href={configPathRoutes.rtb}
          >
            <Button.Icon type="leading">
              <ChevronLeftIcon />
            </Button.Icon>
            <Button.Label>RTB</Button.Label>
          </Button.Root>
          <span>/</span>
          <span>Statistics</span>
        </Title>
        <RtbDrawerOpenButton />
      </div>
      <StatisticFilter />
      <RtbPage />
    </Fragment>
  );
}

export default RtbStatistics;
