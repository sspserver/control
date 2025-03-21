'use client';

import PageLoadSpinner from '@components/PageLoadSpinner';
import AdUnitCard from '@components/pages/AdUnitPage/AdUnitCard';
import AdUnitEmptyState from '@components/pages/AdUnitPage/AdUnitEmptyState';
import useAdUnitPage from '@components/pages/AdUnitPage/useAdUnitPage';

function AdUnitPage() {
  const {
    adUnitList,
    adUnitListError,
    isAdUnitListLoading,
    adUnitStatisticsMapById,
  } = useAdUnitPage();
  const isAdUnitListEmpty = (!adUnitList && !adUnitListError && !isAdUnitListLoading) || !adUnitList?.length;

  if (adUnitListError) {
    return (
      <p>
        Error:
        {adUnitListError.message}
      </p>
    );
  }

  if (isAdUnitListLoading) {
    return <PageLoadSpinner />;
  }

  if (isAdUnitListEmpty) {
    return (<AdUnitEmptyState />);
  }

  return (
    <div className="grid sm:grid-cols-4 gap-3 w-full">
      {adUnitList.map(adUnit => (
        <AdUnitCard
          key={adUnit.ID}
          id={adUnit.ID}
          statistics={adUnitStatisticsMapById?.get(adUnit.ID)}
          title={adUnit.title}
          subTitle={adUnit.codename}
          active={adUnit.active}
        />
      ))}
    </div>
  );
}

export default AdUnitPage;
