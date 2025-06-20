import StatisticsDynamic from '@components/pages/Statistics/StatisticsDynamic';
import { Title } from '@tailus-ui/typography';
import React, { Fragment } from 'react';

function StatisticsPage() {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title as="h2" size="lg" weight="medium">
          Statistics
        </Title>
      </div>
      <StatisticsDynamic />
    </Fragment>
  );
}

export default StatisticsPage;
