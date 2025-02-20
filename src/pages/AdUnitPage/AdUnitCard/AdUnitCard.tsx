import type { StatisticAdItem } from '@/generated/graphql';
import { ActiveStatus } from '@/generated/graphql';
import { LabelCopyCodeButton } from '@components/Button';
import CardChart from '@components/CardChart';
import React from 'react';
import AdUnitActions from './AdUnitActions';

type AdUnitCardProps = {
  title: string;
  active: string;
  subTitle?: string;
  id: string;
  onChange: (id: string) => void;
  statistics?: StatisticAdItem[];
};

function AdUnitCard({
  id,
  title,
  subTitle,
  active,
  onChange,
  statistics = [],
}: AdUnitCardProps) {
  const isAdUnitCardActive = active === ActiveStatus.Active;

  return (
    <CardChart
      title={title}
      subTitle={(
        <div className="-ml-1">
          <LabelCopyCodeButton code={subTitle ?? ''} size="xs" className="pl-2 text-left text-xs">{subTitle}</LabelCopyCodeButton>
        </div>
      )}
      active={isAdUnitCardActive}
      statistics={statistics}
      actions={(
        <AdUnitActions
          onChange={onChange}
          pause={!isAdUnitCardActive}
          id={id}
        />
      )}
    />
  );
}

export default AdUnitCard;
