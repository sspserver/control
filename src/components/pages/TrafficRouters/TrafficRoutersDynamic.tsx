'use client';

import Loading from '@/app/(root)/loading';
import dynamic from 'next/dynamic';

const TrafficRoutersDynamic = dynamic(
  () => import('./TrafficRouters'),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);

export default TrafficRoutersDynamic;
