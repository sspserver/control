'use client';

import PageLoadSpinner from '@components/PageLoadSpinner';
import RtbCard from '@components/pages/RtbPage/RtbCard';
import RtbEmptyState from '@components/pages/RtbPage/RtbEmptyState';
import useRtbPage from '@components/pages/RtbPage/useRtbPage';

function RtbPage() {
  const {
    rtbList,
    rtbListError,
    isRtbListLoading,
    rtbStatisticsMapById,
  } = useRtbPage();
  const isListRtbEmpty = (!rtbList && !rtbListError && !isRtbListLoading) || !rtbList?.length;

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

  if (isListRtbEmpty) {
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
