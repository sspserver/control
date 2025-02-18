import type { StatisticAdItem } from '@/generated/graphql';
import Select from '@/components/Select';
import { ActiveStatus } from '@/generated/graphql';
import ApplicationActions from '@/page/ApplicationsPage/ApplicationCard/ApplicationActions';
import { fakeEmptyChartData } from '@page/ApplicationsPage/ApplicationCard/GradientAreaChart.const';
import Card from '@tailus-ui/Card';
import IndicatorBadge from '@tailus-ui/IndicatorBadge';
import { Caption, Link, Title } from '@tailus-ui/typography';
import React from 'react';
import GradientAreaChart from './GradientAreaChart';

type ApplicationCardProps = {
  title: string;
  uri: string;
  active: string;
  id: string;
  onChange: (id: string) => void;
  statistics?: StatisticAdItem[];
};

const statisticsLabels = [
  { value: 'impressions', name: 'Impressions' },
  { value: 'clicks', name: 'Clicks' },
  { value: 'CTR', name: 'CTR' },
  { value: 'profit', name: 'Profit' },
];

function ApplicationCard({
  id,
  title,
  uri,
  active,
  onChange,
  statistics = [],
}: ApplicationCardProps) {
  const [selectedStatisticLabel, setSelectedStatisticLabel] = React.useState('impressions');
  const isApplicationActive = active === ActiveStatus.Active;
  const indicatorBadgeIntent = isApplicationActive ? 'accent' : 'warning';
  const amountImpressions = statistics?.reduce((acc, item) => acc + item.impressions, 0);
  const hasStatistics = !!statistics.length;
  const urlHostname = URL?.parse(uri)?.hostname;
  const chartData = hasStatistics ? statistics : fakeEmptyChartData;
  const chartIntent = hasStatistics ? 'primary' : 'gray';

  return (
    <Card fancy variant="elevated" className="p-3 pb-3 pt-3">
      <div className="flex justify-between items-center gap-2 pb-2">
        <div className="flex truncate items-center gap-2">
          <IndicatorBadge intent={indicatorBadgeIntent} />
          <Title size="base" className="truncate" title={title}>
            {title}
          </Title>
        </div>
        <ApplicationActions
          onChange={onChange}
          pause={!isApplicationActive}
          id={id}
        />
      </div>

      <Caption title={uri} className="truncate" as="div" size="xs">
        <Link href={uri} size="xs" variant="animated" target="_blank">{urlHostname ?? uri}</Link>
      </Caption>

      <div className="flex justify-between items-center">
        <Title className="flex items-center gap-3" as="span">
          {amountImpressions}
          {/* <Badge */}
          {/*  intent="success" */}
          {/*  variant="soft" */}
          {/*  size="xs" */}
          {/*  className=" flex gap-1.5 items-center" */}
          {/* > */}
          {/*  <TrendingUp className="size-3.5" /> */}
          {/*  36% */}
          {/* </Badge> */}
        </Title>
        {hasStatistics && (
          <Select
            size="sm"
            variant="plain"
            value={selectedStatisticLabel}
            items={statisticsLabels}
            classNameTrigger="text-xs"
            selectItemClassName="text-xs"
            onChange={setSelectedStatisticLabel}
          />
        )}
      </div>
      <GradientAreaChart data={chartData} intent={chartIntent} dataKey={selectedStatisticLabel} />
    </Card>
  );
}

export default ApplicationCard;
