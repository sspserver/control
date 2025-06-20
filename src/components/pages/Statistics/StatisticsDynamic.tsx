'use client';

import Loading from '@/app/(root)/loading';
import dynamic from 'next/dynamic';

const StatisticsDynamic = dynamic(
  () => import('./Statistics'),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export default StatisticsDynamic;
