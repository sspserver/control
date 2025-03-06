import AdUnitPage from '@components/pages/AdUnitPage';
import AdUnitDrawerOpenButton from '@components/pages/AdUnitPage/AdUnitDrawerOpenButton';
import StatisticFilter from '@components/StatisticFilter';
import { Title } from '@tailus-ui/typography';
import { Fragment } from 'react';

function AdUnit() {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title as="h2" size="lg" weight="medium">
          AdUnit
        </Title>
        <AdUnitDrawerOpenButton />
      </div>
      <StatisticFilter />
      <AdUnitPage />
    </Fragment>
  );
}

export default AdUnit;
