import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import { createElement } from 'react';

export const toastSuccessMessage = {
  title: 'Account was',
  description: 'The Account was successfully',
  icon: createElement(CheckIcon, { className: 'w-5 h-5 text-success-600' }),
};
