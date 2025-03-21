import type { StatisticAdItem } from '@/generated/graphql';
import { fakeEmptyChartData } from '@components/GradientAreaChart/GradientAreaChart.const';

export function getFakeEmptyChartData(fieldName: string) {
  return fakeEmptyChartData.map(item => ({
    [fieldName as keyof StatisticAdItem]: item.field,
  }));
}
