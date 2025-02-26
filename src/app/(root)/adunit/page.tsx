import StatisticFilter from '@components/StatisticFilter';
import AdUnitPage from '@pages/AdUnitPage';
import AdUnitDrawerOpenButton from '@pages/AdUnitPage/AdUnitDrawerOpenButton';
import { Title } from '@tailus-ui/typography';
import { Fragment } from 'react';

function AdUnit() {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title as="h1" size="xl">
          AdUnit
        </Title>
        <AdUnitDrawerOpenButton />
      </div>
      <StatisticFilter />
      <br />
      <AdUnitPage />
    </Fragment>
  );
}

export default AdUnit;
