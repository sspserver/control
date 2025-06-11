import type { CalendarProps as CalendarVariants } from '@tailus/themer';
import type { PropsBase, PropsRange } from 'react-day-picker';
import CalendarChevron from '@tailus-ui/Calendar/CalendarChevron';
import { calendar } from '@tailus/themer';
import cn from 'classnames';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { twMerge } from 'tailwind-merge';

export type CalendarProps = PropsBase & PropsRange & CalendarVariants;

const Calendar = ({
  className,
  classNames,
  intent,
  fancy,
  handDrawn,
  showOutsideDays = true,
  required,
  ...props
}: CalendarProps) => {
  const range = props.mode ? props.mode === 'range' : false;
  const {
    month,
    caption,
    caption_label,
    nav,
    nav_button,
    table,
    head_row,
    head_cell,
    row,
    cell,
    day,
    day_selected,
    day_today,
    day_outside,
    day_disabled,
    day_range_middle,
    day_hidden,
  } = calendar({ range });

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={twMerge(className)}
      classNames={{
        root: 'relative',
        month: month({ range, fancy, class: 'text-center' }),
        month_caption: caption({ class: 'h-8' }),
        caption_label: caption_label({ class: classNames?.caption_label }),
        nav: nav({ class: 'z-10' }),
        button_next: nav_button({ class: classNames?.button_next }),
        button_previous: nav_button({ class: classNames?.button_previous }),
        month_grid: table({ range, class: classNames?.month_grid }),
        weekdays: head_row({ range, class: classNames?.weekdays }),
        weekday: head_cell({ range, class: classNames?.weekday }),
        week: row({ range, class: cn('[&>.day-range-start.day-range-end]:rounded-[--calendar-radius]', classNames?.week) }),
        day: cell({ range, class: classNames?.day }),
        day_button: day({ intent, range, class: classNames?.day_button }),
        today: day_today({ intent, class: classNames?.today }),
        range_start: 'day-range-start rounded-r-none rounded-[--calendar-radius]',
        range_end: 'day-range-end rounded-l-none rounded-[--calendar-radius]',
        range_middle: day_range_middle({ intent, class: classNames?.range_middle }),
        selected: day_selected({ intent, handDrawn, class: classNames?.selected }),
        outside: day_outside({ intent: 'neutral', class: classNames?.outside }),
        disabled: day_disabled({ class: classNames?.disabled }),
        hidden: day_hidden({ class: classNames?.hidden }),
        // ...classNames,
      }}
      components={{
        Chevron: CalendarChevron,
      }}
      {...props}
    />
  );
};

export default Calendar;

Calendar.displayName = 'Calendar';
