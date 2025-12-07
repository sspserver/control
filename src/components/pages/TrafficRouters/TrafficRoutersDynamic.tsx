'use client';

import dynamic from 'next/dynamic';
import Loading from '@/app/(root)/loading';

const TrafficRoutersDynamic = dynamic(
  () => import('./TrafficRouters'),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export default TrafficRoutersDynamic;
