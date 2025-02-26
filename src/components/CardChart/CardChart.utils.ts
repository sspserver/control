import type { StatisticAdItem } from '@/generated/graphql';
import { fakeEmptyChartData } from '@components/GradientAreaChart/GradientAreaChart.const';

export function getFakeEmptyChartData(fieldName: string) {
  return fakeEmptyChartData.map(item => ({
    [fieldName as keyof StatisticAdItem]: item.field,
  }));
}

export function getCustomDatePick(value: string) {
  const today = new Date();
  let from, to;

  switch (value) {
    case 'today':
      from = to = today;
      break;
    case 'yesterday':
      from = to = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
      break;
    case 'last-week':
      from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      to = today;
      break;
    case 'last-month':
      from = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      to = today;
      break;
    case 'last-3-months':
      from = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
      to = today;
      break;
    case 'last-12-months':
      from = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      to = today;
      break;
    case 'month-to-date':
      from = new Date(today.getFullYear(), today.getMonth(), 1);
      to = today;
      break;
    case 'life-time':
      from = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
      to = today;
      break;
    default:
      break;
  }

  return {
    from,
    to,
  };
}
