import ApplicationActions from '@/components/ApplicationsContent/ApplicationCard/ApplicationActions';
import { ActiveStatus } from '@/generated/graphql';
import { Badge } from '@tailus-ui/Badge';
import Card from '@tailus-ui/Card';
import IndicatorBadge from '@tailus-ui/IndicatorBadge';
import { Caption, Title } from '@tailus-ui/typography';
import { TrendingUp } from 'lucide-react';
import GradientAreaChart from './GradientAreaChart';

type ApplicationCardProps = {
  title: string;
  uri: string;
  active: string;
  id: string;
  onChange: (id: string) => void;
};

function ApplicationCard({ id, title, uri, active, onChange }: ApplicationCardProps) {
  const isApplicationActive = active === ActiveStatus.Active;
  const indicatorBadgeIntent = isApplicationActive ? 'accent' : 'warning';

  return (
    <Card fancy variant="elevated" className="p-4 pb-3 pt-3">
      <div className="flex justify-between items-center gap-2">
        <Title size="base" className="flex items-center gap-2">
          <IndicatorBadge intent={indicatorBadgeIntent} />
          {title}
        </Title>
        <ApplicationActions onChange={onChange} pause={!isApplicationActive} id={id} />
      </div>

      <Caption as="span" size="sm">{uri}</Caption>
      <Title className="mt-2 flex items-center gap-3" as="span">
        639400
        <Badge intent="success" variant="soft" size="xs" className="h-fit flex gap-1.5 items-center">
          <TrendingUp className="size-3.5" />
          36%
        </Badge>
      </Title>

      <GradientAreaChart intent="primary" dataKey="Primary" />
    </Card>
  );
}

export default ApplicationCard;
