import Statistics from '@components/pages/Statistics';
import { Title } from '@tailus-ui/typography';
import { Fragment } from 'react';

function StatisticsPage() {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title as="h2" size="lg" weight="medium">
          Statistics
        </Title>
      </div>
      <Statistics />
    </Fragment>
  );
}

export default StatisticsPage;
