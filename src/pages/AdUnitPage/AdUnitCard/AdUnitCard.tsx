import type { StatisticAdItem } from '@/generated/graphql';
import { ActiveStatus } from '@/generated/graphql';
import CardChart from '@components/CardChart/CardChart';
import React from 'react';
import AdUnitActions from './AdUnitActions';
import AdUnitCardSubTitleCode from './AdUnitCardSubTitleCode';

type AdUnitCardProps = {
  title: string;
  active: string;
  subTitle?: string;
  id: string;
  onChange?: (id: string) => void;
  statistics?: StatisticAdItem[];
};

function AdUnitCard({
  id,
  title,
  subTitle,
  active,
  // onChange,
  statistics = [],
}: AdUnitCardProps) {
  const isAdUnitCardActive = active === ActiveStatus.Active;

  return (
    <CardChart
      title={title}
      subTitle={<AdUnitCardSubTitleCode code={subTitle} name={title} />}
      active={isAdUnitCardActive}
      statistics={statistics}
      actions={(
        <AdUnitActions
          pause={!isAdUnitCardActive}
          id={id}
        />
      )}
    />
  );
}

export default AdUnitCard;
