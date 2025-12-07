'use client';

import dynamic from 'next/dynamic';
import Loading from '@/app/(root)/loading';

const StatisticsDynamic = dynamic(
  () => import('./Statistics'),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export default StatisticsDynamic;
