import EmptyPageState from '@/components/EmptyPageState';
import AdUnitDrawerOpenButton from '@pages/AdUnitPage/AdUnitDrawerOpenButton';

function AdUnitEmptyState() {
  return (
    <EmptyPageState
      title="No AdUnit yet"
      description="Create a new AdUnit to get started"
    >
      <AdUnitDrawerOpenButton size="md" />
    </EmptyPageState>
  );
}

export default AdUnitEmptyState;
