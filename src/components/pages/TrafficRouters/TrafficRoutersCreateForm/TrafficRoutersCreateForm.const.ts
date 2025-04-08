import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import { createElement } from 'react';

export const defaultFormTitle = 'Traffic Router';

export const trafficRoutersFormTab = {
  main: 'main',
  targeting: 'targeting',
};

export const trafficRoutersFormTabs = [
  {
    name: 'Main',
    value: trafficRoutersFormTab.main,
  },
  {
    name: 'Targeting',
    value: trafficRoutersFormTab.targeting,
  },
];

export const toastSuccessMessage = {
  title: 'Traffic Route was',
  description: 'The Traffic Route was successfully',
  icon: createElement(CheckIcon, { className: 'w-5 h-5 text-success-600' }),
};

export const tabTargetFieldNames = ['secure', 'adBlock', 'privateBrowsing', 'IP', 'RTBSourceIDs'];
