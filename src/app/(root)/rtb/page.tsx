import StatisticFilter from '@components/StatisticFilter';
import RtbPage from '@pages/RtbPage';
import RtbDrawerOpenButton from '@pages/RtbPage/RtbDrawerOpenButton';
import { Title } from '@tailus-ui/typography';
import { Fragment } from 'react';

function Rtb() {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <Title as="h1" size="xl">
          RTB
        </Title>
        <RtbDrawerOpenButton />
      </div>
      <StatisticFilter />
      <br />
      <RtbPage />
    </Fragment>
  );
}

export default Rtb;
