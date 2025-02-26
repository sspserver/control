'use client';

import type {
  StatisticFilterContextType,
} from './StatisticFilterProvider.types';
import { createContext, useContext } from 'react';

export const StatisticFilterContext = createContext<StatisticFilterContextType>({} as StatisticFilterContextType);

function useStatisticFilter() {
  return useContext(StatisticFilterContext);
}

export default useStatisticFilter;
