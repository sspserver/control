'use client';

import ApplicationCard from '@/components/ApplicationsContent/ApplicationCard/ApplicationCard';

import ApplicationsEmptyState from '@/components/ApplicationsContent/ApplicationsEmptyState';
import useApplicationsContent from './useApplicationsContent';

function ApplicationsContent() {
  const {
    applicationsList,
    applicationsListError,
    isListApplicationsLoading,
    applicationStatisticsMapById,
    changeApplicationHandler,
  } = useApplicationsContent();

  if (!applicationsList) {
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

  if (!applicationsList.length) {
    return (<ApplicationsEmptyState />);
  }

  return (
    <div className="grid sm:grid-cols-4 gap-3 w-full">
      {applicationsList?.map(application => (
        <ApplicationCard onChange={changeApplicationHandler} id={application.ID} statistics={applicationStatisticsMapById?.get(application.ID)} title={application.title} uri={application.URI} active={application.active} key={application.ID} />
      ))}
    </div>
  );
}

export default ApplicationsContent;
