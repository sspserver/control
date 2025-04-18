'use client';

import PageLoadSpinner from '@components/PageLoadSpinner';

import ApplicationCard from '@components/pages/ApplicationsPage/ApplicationCard/ApplicationCard';
import ApplicationsEmptyState from '@components/pages/ApplicationsPage/ApplicationsEmptyState';
import useApplicationsPage from './useApplicationsPage';

function ApplicationsPage() {
  const {
    applicationsList,
    applicationsListError,
    isListApplicationsLoading,
    applicationStatisticsMapById,
  } = useApplicationsPage();
  const isListApplicationsEmpty = (!applicationsList && !applicationsListError && !isListApplicationsLoading) || !applicationsList?.length;

  if (applicationsListError) {
    return (
      <p>
        Error:
        {applicationsListError.message}
      </p>
    );
  }

  if (isListApplicationsLoading) {
    return <PageLoadSpinner />;
  }

  if (isListApplicationsEmpty) {
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
