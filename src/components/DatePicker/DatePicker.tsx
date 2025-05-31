import type { CalendarProps } from '@tailus-ui/Calendar';
import CalendarIcon from '@heroicons/react/16/solid/CalendarIcon';

import { CustomDateOption, customDateSelectOptions, getCustomDatePick } from '@lib/date/getCustomDatePick';
import Button from '@tailus-ui/Button';
import Calendar from '@tailus-ui/Calendar';
import Popover from '@tailus-ui/Popover';
import ToggleGroup from '@tailus-ui/ToggleButtonGroup';
import { format } from 'date-fns';

type CustomCalendarProps = {
  rangeOption?: string;
  onSelect?: (value?: { from: Date | undefined; to?: Date }) => void;
  onChangeRange?: (value?: string) => void;
  classNameButton?: string;
} & CalendarProps;

export const CustomDatePicker = ({
  onSelect,
  rangeOption,
  onChangeRange,
  selected,
  classNameButton,
  ...args
}: CustomCalendarProps) => {
  const selectDateCalendarHandler = (value?: { from: Date | undefined; to?: Date | undefined }) => {
    onSelect?.(value);
    onChangeRange?.(CustomDateOption.Custom);
  };
  const changeRangeDataHandler = (value: string) => {
    const date = getCustomDatePick(value);

    onChangeRange?.(value);
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
            value={rangeOption}
            onValueChange={changeRangeDataHandler}
            defaultValue={rangeOption}
          >
            {customDateSelectOptions.map(({ name, value }) => (
              <ToggleGroup.Item
                withLabel
                className="w-full justify-start"
                value={value}
                key={value}
              >
                {name}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
          <Calendar
            {...args}
            selected={selected}
            onSelect={selectDateCalendarHandler}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
