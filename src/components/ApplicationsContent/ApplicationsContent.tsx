'use client';

import ApplicationCard from '@/components/ApplicationsContent/ApplicationCard/ApplicationCard';
import useApplicationsContent from './useApplicationsContent';

function ApplicationsContent() {
  const {
    applicationsList,
    applicationsListError,
    isListApplicationsLoading,
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

  return (
    <div className="grid sm:grid-cols-4 gap-3 w-full">
      {applicationsList?.map(application => (
        <ApplicationCard onChange={changeApplicationHandler} id={application.ID} title={application.title} uri={application.URI} active={application.active} key={application.ID} />
      ))}
    </div>
  );
}

export default ApplicationsContent;
