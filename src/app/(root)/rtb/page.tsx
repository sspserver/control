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
        {/* <SectionFilter /> */}
        <RtbDrawerOpenButton />
      </div>
      <br />
      <RtbPage />
    </Fragment>
  );
}

export default Rtb;
