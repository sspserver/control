export enum CustomDateOption {
  Custom = 'custom',
  Today = 'today',
  Yesterday = 'yesterday',
  LastWeek = 'last-week',
  LastMonth = 'last-month',
  CurrentMonth = 'current-month',
  Last3Months = 'last-3-months',
  Last7Days = 'last-7-days',
}

export const customDateSelectOptions = [
  {
    name: 'Custom',
    value: CustomDateOption.Custom,
  },
  {
    name: 'Today',
    value: CustomDateOption.Today,
  },
  {
    name: 'Yesterday',
    value: CustomDateOption.Yesterday,
  },
  {
    name: 'Current Month',
    value: CustomDateOption.CurrentMonth,
  },
  {
    name: 'Last Week',
    value: CustomDateOption.LastWeek,
  },
  {
    name: 'Last Month',
    value: CustomDateOption.LastMonth,
  },
  {
    name: 'Last 7 days',
    value: CustomDateOption.Last7Days,
  },
  {
    name: 'Last 30 days',
    value: CustomDateOption.Last3Months,
  },
  // {
  //   name: 'Last 12 Months',
  //   value: 'last-12-months',
  // },
  // {
  //   name: 'Month to date',
  //   value: 'month-to-date',
  // },
  // {
  //   name: 'Life time',
  //   value: 'life-time',
  // },
];

export function getCustomDatePick(value: string) {
  const today = new Date();
  let from, to;
  const dayOfWeek = today.getDay();
  const daysSinceMonday = (dayOfWeek + 6) % 7;

  switch (value) {
    case CustomDateOption.Today:
      from = to = today;
      break;
    case CustomDateOption.Yesterday:
      from = to = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
      break;
    case CustomDateOption.LastWeek:
      from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysSinceMonday - 7);
      to = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysSinceMonday - 1);
      break;
    case CustomDateOption.LastMonth:
      from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      to = new Date(today.getFullYear(), today.getMonth(), 0);
      break;
    case CustomDateOption.CurrentMonth:
      from = new Date(today.getFullYear(), today.getMonth(), 1);
      to = today;
      break;
    case CustomDateOption.Last3Months:
      from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 90);
      to = today;
      break;
    case CustomDateOption.Last7Days:
      from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
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
