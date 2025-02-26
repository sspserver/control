'use client';

import AdUnitCard from '@pages/AdUnitPage/AdUnitCard';
import AdUnitEmptyState from '@pages/AdUnitPage/AdUnitEmptyState';
import useAdUnitPage from '@pages/AdUnitPage/useAdUnitPage';

function AdUnitPage() {
  const {
    adUnitList,
    adUnitListError,
    isAdUnitListLoading,
    adUnitStatisticsMapById,
  } = useAdUnitPage();

  if (!adUnitList && !adUnitListError && !isAdUnitListLoading) {
    return (
      <p>
        No data
      </p>
    );
  }

  if (adUnitListError) {
    return (
      <p>
        Error:
        {adUnitListError.message}
      </p>
    );
  }

  if (isAdUnitListLoading) {
    return <p>Loading...</p>;
  }

  if (!adUnitList?.length) {
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
