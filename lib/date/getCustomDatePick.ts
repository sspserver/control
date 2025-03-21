export enum CustomDateOption {
  Custom = 'custom',
  Today = 'today',
  Yesterday = 'yesterday',
  LastWeek = 'last-week',
  LastMonth = 'last-month',
  Last3Months = 'last-3-months',
}

export const customDateSelectOptions = [
  {
    name: 'Today',
    value: CustomDateOption.Today,
  },
  {
    name: 'Yesterday',
    value: CustomDateOption.Yesterday,
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
    name: 'Last 3 Months',
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
      from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysSinceMonday);
      to = today;
      break;
    case CustomDateOption.LastMonth:
      from = new Date(today.getFullYear(), today.getMonth(), 1);
      to = today;
      break;
    case CustomDateOption.Last3Months:
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
