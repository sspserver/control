'use client';

import useRtbPage from '@/page/RtbPage/useRtbPage';

function RtbPage() {
  const response = useRtbPage();

  return (
    <div>
      <span>Rtb</span>
      {response.loading && <p>Loading...</p>}
      {response.error && (
        <p>
          Error:
          {response.error.message}
        </p>
      )}
      {response.data && <pre>{JSON.stringify(response.data, null, 2)}</pre>}
    </div>
  );
}

export default RtbPage;
