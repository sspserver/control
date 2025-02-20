import EmptyPageState from '@/components/EmptyPageState';
import ApplicationDrawerOpenButton from '@/pages/ApplicationsPage/ApplicationDrawerOpenButton';

function ApplicationsEmptyState() {
  return (
    <EmptyPageState
      title="No Applications yet"
      description="Create a new application to get started"
    >
      <ApplicationDrawerOpenButton size="md" className="mx-auto" />
    </EmptyPageState>
  );
}

export default ApplicationsEmptyState;
