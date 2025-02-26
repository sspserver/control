'use client';

import ApplicationCard from '@/pages/ApplicationsPage/ApplicationCard/ApplicationCard';

import ApplicationsEmptyState from '@/pages/ApplicationsPage/ApplicationsEmptyState';
import useApplicationsPage from './useApplicationsPage';

function ApplicationsPage() {
  const {
    applicationsList,
    applicationsListError,
    isListApplicationsLoading,
    applicationStatisticsMapById,
  } = useApplicationsPage();

  if (!applicationsList && !applicationsListError && !isListApplicationsLoading) {
    return (
      <p>
        No data
      </p>
    );
  }

  if (applicationsListError) {
    return (
      <p>
        Error:
        {applicationsListError.message}
      </p>
    );
  }

  if (isListApplicationsLoading) {
    return <p>Loading...</p>;
  }

  if (!applicationsList?.length) {
    return (<ApplicationsEmptyState />);
  }

  return (
    <div className="grid sm:grid-cols-4 gap-3 w-full">
      {applicationsList?.map(application => (
        <ApplicationCard id={application.ID} statistics={applicationStatisticsMapById?.get(application.ID)} title={application.title} uri={application.URI} active={application.active} key={application.ID} />
      ))}
    </div>
  );
}

export default ApplicationsPage;
