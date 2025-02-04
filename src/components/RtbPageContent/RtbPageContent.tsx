'use client';

import useRtbPageContent from '@/components/RtbPageContent/useRtbPageContent';

function RtbPageContent() {
  const response = useRtbPageContent();

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

export default RtbPageContent;
