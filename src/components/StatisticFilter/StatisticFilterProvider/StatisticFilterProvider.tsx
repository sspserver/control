import type {
  StatisticFilterProviderProps,
} from './StatisticFilterProvider.types';
import { StatisticFilterContext } from './useStatisticFilter';
import useStatisticFilterProvider from './useStatisticFilterProvider';

function StatisticFilterProvider({ children }: StatisticFilterProviderProps) {
  const value = useStatisticFilterProvider();

  return (
    <StatisticFilterContext value={value}>
      {children}
    </StatisticFilterContext>
  );
}

export default StatisticFilterProvider;
