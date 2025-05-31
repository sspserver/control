import type { TrafficRouterConnection } from '@/generated/graphql';
import { Ordering } from '@/generated/graphql';
import { useLazyQuery } from '@apollo/client';
import { gqlTrafficRouters } from '@lib/graphql/queries/trafficRouters';
import { useEffect, useMemo, useRef, useState } from 'react';

type TrafficRouterPagination = {
  startPage: number;
  size: number;
};

const defaultOrderField = 'createdAt';
const defaultOrderDirection = Ordering.Desc;

const defaultPageSize = 10;

function useTrafficRouters() {
  const orderFieldCounterRef = useRef<number>(0);
  const [orderDirection, setOrderDirection] = useState<Ordering | null | undefined>(defaultOrderDirection);
  const [orderField, setOrderField] = useState<string | null>(defaultOrderField);
  const [countPageSize, setCountPageSize] = useState<number>(0);
  const [pagination, setPagination] = useState<TrafficRouterPagination>({ startPage: 0, size: defaultPageSize });
  const requestOrder = useMemo(() => {
    if (orderDirection && orderField) {
      return {
        [orderField]: orderDirection,
      };
    }
    return {
      [defaultOrderField]: defaultOrderDirection,
    };
  }, [orderDirection, orderField]);
  const [
    getTrafficRouters,
    {
      data: trafficRoutersListResponse,
      error: trafficRoutersListError,
      loading: isTrafficRoutersLoading,
      previousData,
    },
  ] = useLazyQuery<{ listTrafficRouters: TrafficRouterConnection }>(gqlTrafficRouters);
  const loadTrafficRouters = async () => {
    try {
      const response = await getTrafficRouters({
        fetchPolicy: 'cache-and-network',
        variables: {
          page: pagination,
          order: requestOrder,
        },
      });
      const pageCount = response?.data?.listTrafficRouters?.pageInfo?.count ?? 0;

      setCountPageSize(pageCount);
    } catch (error) {
      console.error(error);
    }
  };
  const changeColumnOrderHandler = (field: string) => (state?: Ordering) => {
    const resetOrderCount = 1;
    const orderFieldCounter = orderFieldCounterRef.current;
    const isCurrentFieldEqual = orderField === field;

    if (isCurrentFieldEqual && orderFieldCounter >= resetOrderCount) {
      orderFieldCounterRef.current = 0;
      setOrderField(defaultOrderField);
    } else {
      setOrderDirection(state);
      setOrderField(field);

      orderFieldCounterRef.current = isCurrentFieldEqual ? orderFieldCounter + 1 : 0;
    }
  };
  const pageInfo = trafficRoutersListResponse?.listTrafficRouters?.pageInfo;
  const trafficRoutersList = trafficRoutersListResponse?.listTrafficRouters?.list || previousData?.listTrafficRouters?.list;
  const changePageHandler = (startPage: number) => setPagination(state => ({ ...state, startPage }));
  const isPaginationLoading = !!previousData;

  useEffect(() => {
    loadTrafficRouters();
  }, [
    pagination,
    orderDirection,
    orderField,
  ]);

  return {
    orderDirection,
    orderField,
    pagination,
    pageInfo,
    countPageSize,
    trafficRoutersList,
    trafficRoutersListError,
    isTrafficRoutersLoading,
    isPaginationLoading,
    changePageHandler,
    changeColumnOrderHandler,
  };
}

export default useTrafficRouters;
