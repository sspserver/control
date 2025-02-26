import { getCustomDatePick } from '@components/CardChart/CardChart.utils';
import CalendarIcon from '@heroicons/react/16/solid/CalendarIcon';
import Button from '@tailus-ui/Button';
import Calendar, { type CalendarProps } from '@tailus-ui/Calendar';

import Popover from '@tailus-ui/Popover';
import ToggleGroup from '@tailus-ui/ToggleButtonGroup';
import { format } from 'date-fns';

type CustomCalendarProps = {
  onSelect?: (value?: { from: Date | undefined; to?: Date }) => void;
  classNameButton?: string;
} & CalendarProps;

export const CustomDatePicker = ({ onSelect, selected, classNameButton, ...args }: CustomCalendarProps) => {
  const handleValueChange = (value: string) => {
    const date = getCustomDatePick(value);

    onSelect?.(date);
  };

  return (
    <Popover.Root defaultOpen={false}>
      <Popover.Trigger asChild>
        <Button.Root variant="outlined" intent="gray" size="sm" className={classNameButton}>
          <Button.Icon type="leading">
            <CalendarIcon />
          </Button.Icon>
          <Button.Label className="text-sm">
            {selected?.from
              ? (
                  selected?.to
                    ? (
                        <>
                          {format(selected?.from, 'LLL dd, y')}
                          {' '}
                          -
                          {' '}
                          {format(selected?.to, 'LLL dd, y')}
                        </>
                      )
                    : (
                        format(selected?.from, 'LLL dd, y')
                      )
                )
              : (
                  <span>Select a date</span>
                )}
          </Button.Label>
        </Button.Root>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={6} fancy className="flex gap-[calc(var(--feedback-padding)*2)] max-w-fit">
          <ToggleGroup.Root
            className="grid gap-0 relative before:absolute before:-inset-y-[--feedback-padding] before:-right-[--feedback-padding] before:w-0.5 before:border-r before:bg-gray-white dark:before:bg-gray-950 dark:before:border-gray-800 before:mx-auto"
            type="single"
            // value="last-week"
            onValueChange={handleValueChange}
            defaultValue="last-week"
          >
            <ToggleGroup.Item withLabel className="w-full justify-start" value="today">Today</ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="yesterday">Yesterday</ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="last-week">Last Week</ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="last-month">Last Month</ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="last-3-months">Last 3 Months</ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="last-12-months">Last 12 Months</ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="month-to-date">Month to date</ToggleGroup.Item>
            <ToggleGroup.Item withLabel className="w-full justify-start" value="life-time">Life time</ToggleGroup.Item>
          </ToggleGroup.Root>
          <Calendar
            {...args}
            selected={selected}
            onSelect={onSelect}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
