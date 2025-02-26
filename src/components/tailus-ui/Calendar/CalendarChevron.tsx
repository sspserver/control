import ChevronLeftIcon from '@heroicons/react/16/solid/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/16/solid/ChevronRightIcon';
import * as React from 'react';

type CalendarChevronProps = {
  orientation?: 'up' | 'down' | 'left' | 'right';
};

function CalendarChevron({ orientation }: CalendarChevronProps) {
  if (orientation === 'left') {
    return <ChevronLeftIcon className="size-5 rtl:rotate-180" />;
  }

  return <ChevronRightIcon className="size-5 rtl:rotate-180" />;
}

export default CalendarChevron;
