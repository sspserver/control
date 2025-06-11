import { Ordering, StatisticOrderingKey } from '@/generated/graphql';
import { useRef } from 'react';

function useStatisticsTable(
  orderField: string | null,
  onOrderChange: (field: StatisticOrderingKey, direction?: Ordering) => void,
) {
  const orderFieldCounterRef = useRef<number>(0);
  const changeColumnOrderHandler = (field: StatisticOrderingKey) => (state?: Ordering) => {
    const resetOrderCount = 1;
    const orderFieldCounter = orderFieldCounterRef.current;
    const isCurrentFieldEqual = orderField === field;

    if (isCurrentFieldEqual && orderFieldCounter >= resetOrderCount) {
      orderFieldCounterRef.current = 0;
      onOrderChange(StatisticOrderingKey.Datemark, Ordering.Desc);
    } else {
      onOrderChange(field, state);

      orderFieldCounterRef.current = isCurrentFieldEqual ? orderFieldCounter + 1 : 0;
    }
  };

  return {
    changeColumnOrderHandler,
  };
}

export default useStatisticsTable;
