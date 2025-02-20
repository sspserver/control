import type { StatisticAdItem } from '@/generated/graphql';
import { ActiveStatus } from '@/generated/graphql';
import ApplicationActions from '@/pages/ApplicationsPage/ApplicationCard/ApplicationActions';
import CardChart from '@components/CardChart';
import React from 'react';

type ApplicationCardProps = {
  title: string;
  uri: string;
  active: string;
  id: string;
  onChange: (id: string) => void;
  statistics?: StatisticAdItem[];
};

function ApplicationCard({
  id,
  title,
  uri,
  active,
  onChange,
  statistics = [],
}: ApplicationCardProps) {
  const isApplicationActive = active === ActiveStatus.Active;
  const urlHostname = URL?.parse(uri)?.hostname;
  const subTitle = urlHostname ?? uri;

  return (
    <CardChart
      title={title}
      url={subTitle}
      active={isApplicationActive}
      statistics={statistics}
      actions={(
        <ApplicationActions
          onChange={onChange}
          pause={!isApplicationActive}
          id={id}
        />
      )}
    />
  );
}

export default ApplicationCard;
