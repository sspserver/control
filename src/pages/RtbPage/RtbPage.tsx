'use client';

import useRtbPage from '@/pages/RtbPage/useRtbPage';
import PageLoadSpinner from '@components/PageLoadSpinner';
import RtbCard from '@pages/RtbPage/RtbCard';
import RtbEmptyState from '@pages/RtbPage/RtbEmptyState';

function RtbPage() {
  const {
    rtbList,
    rtbListError,
    isRtbListLoading,
    rtbStatisticsMapById,
  } = useRtbPage();

  if (!rtbList && !rtbListError && !isRtbListLoading) {
    return (
      <p>
        No data
      </p>
    );
  }

  if (rtbListError) {
    return (
      <p>
        Error:
        {rtbListError.message}
      </p>
    );
  }

  if (isRtbListLoading) {
    return <PageLoadSpinner />;
  }

  if (!rtbList?.length) {
    return (<RtbEmptyState />);
  }

  return (
    <div className="grid sm:grid-cols-4 gap-3 w-full">
      {rtbList.map(rtb => (
        <RtbCard
          key={rtb.ID}
          id={rtb.ID}
          statistics={rtbStatisticsMapById?.get(rtb.ID)}
          title={rtb.title}
          url={rtb.URL}
          active={rtb.active}
        />
      ))}
    </div>
  );
}

export default RtbPage;
