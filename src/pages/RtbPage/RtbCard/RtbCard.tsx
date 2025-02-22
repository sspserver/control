import type { StatisticAdItem } from '@/generated/graphql';
import { ActiveStatus } from '@/generated/graphql';
import CardChart from '@components/CardChart';
import React from 'react';
import RtbActions from './RtbActions';

type RtbCardProps = {
  title: string;
  active: string;
  url: string;
  subTitle?: React.ReactNode;
  id: string;
  onChange: (id: string) => void;
  statistics?: StatisticAdItem[];
};

function RtbCard({
  id,
  title,
  url,
  active,
  onChange,
  statistics = [],
}: RtbCardProps) {
  const isRtbActive = active === ActiveStatus.Active;

  return (
    <CardChart
      title={title}
      url={url}
      active={isRtbActive}
      statistics={statistics}
      actions={(
        <RtbActions
          onChange={onChange}
          pause={!isRtbActive}
          id={id}
        />
      )}
    />
  );
}

export default RtbCard;
