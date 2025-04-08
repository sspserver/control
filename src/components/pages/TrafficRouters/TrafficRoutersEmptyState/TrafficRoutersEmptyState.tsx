import EmptyPageState from '@components/EmptyPageState';
import TrafficRoutersDrawerOpenButton from '@components/pages/TrafficRouters/TrafficRoutersDrawerOpenButton';

function TrafficRoutersEmptyState() {
  return (
    <EmptyPageState
      title="No Traffic Routers yet"
      description="Create a new Traffic Router to get started"
    >
      <TrafficRoutersDrawerOpenButton size="md" />
    </EmptyPageState>
  );
}

export default TrafficRoutersEmptyState;
