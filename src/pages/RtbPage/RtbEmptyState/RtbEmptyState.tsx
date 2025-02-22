import EmptyPageState from '@/components/EmptyPageState';
import RtbDrawerOpenButton from '@pages/RtbPage/RtbDrawerOpenButton';

function RtbEmptyState() {
  return (
    <EmptyPageState
      title="No RTB yet"
      description="Create a new RTB to get started"
    >
      <RtbDrawerOpenButton size="md" />
    </EmptyPageState>
  );
}

export default RtbEmptyState;
