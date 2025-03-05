import ApplicationDrawerOpenButton from '@/pages/ApplicationsPage/ApplicationDrawerOpenButton';
import ApplicationsPage from '@/pages/ApplicationsPage/ApplicationsPage';
import StatisticFilter from '@components/StatisticFilter';
import { Title } from '@tailus-ui/typography';
import { Fragment } from 'react';

function Applications() {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title as="h2" size="lg" weight="medium">
          Applications
        </Title>
        <ApplicationDrawerOpenButton />
      </div>
      <StatisticFilter />
      <ApplicationsPage />
    </Fragment>
  );
}

export default Applications;
