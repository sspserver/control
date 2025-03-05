import { customDateSelectOptions } from '@components/DatePicker/DatePicker.const';
import { statisticsFilterFields } from '@components/StatisticFilter/StatisticFilter.const';
import * as Tabs from '@radix-ui/react-tabs';
import Button from '@tailus-ui/Button';
import Calendar from '@tailus-ui/Calendar';
import Drawer from '@tailus-ui/Drawer';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import React from 'react';
import useMobileStatisticFilter from './useMobileStatisticFilter';

function MobileStatisticFilter() {
  const {
    isOpen,
    date,
    filterField,
    endMonth,
    spanFieldRef,
    spanDateRef,
    spanDateLeft,
    spanDateWidth,
    spanFieldLeft,
    spanFieldWidth,
    isCustomDate,
    customSelectDate,
    drawerAnimationEndHandler,
    changeFilterDateSelectHandler,
    selectDateCalendarHandler,
    changeFilterFieldSelectHandler,
    clickFilterOpenClickHandler,
  } = useMobileStatisticFilter();

  return (
    <div
      className="fixed inset-x-0 bottom-14 z-8 max-w-max mx-auto md:hidden"
    >
      <Drawer.Root
        fancy
        shouldScaleBackground
        onClose={clickFilterOpenClickHandler}
        onAnimationEnd={drawerAnimationEndHandler}
      >
        <Drawer.Trigger asChild>
          <motion.button
            whileTap={{ scale: 0.95 }}
            animate={{ y: isOpen ? 60 : 0 }}
            onClick={clickFilterOpenClickHandler}
          >
            <Button.Root
              variant="outlined"
              size="lg"
              component="div"
              className="mx-auto rounded-full pr-2 pl-8"
            >
              <Button.Label>Filter</Button.Label>
              <Button.Icon
                type="trailing"
                className="size-8 p-1.5 rounded-full bg-primary-600 ml-5 text-white"
              >
                <SlidersHorizontal />
              </Button.Icon>
            </Button.Root>
          </motion.button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="blur-md" />
          <Drawer.Content fancy>
            <div className="max-w-md mx-auto mt-2">
              <Drawer.Title>Date</Drawer.Title>
              <Tabs.Root
                defaultValue={customSelectDate}
                onValueChange={changeFilterDateSelectHandler}
                className="text-[--title-text-color]"
                data-shade="800"
              >
                <Tabs.List className="relative -mx-3.5 mb-5 flex h-9 p-1">
                  <motion.span
                    animate={{
                      left: spanDateLeft,
                      width: spanDateWidth,
                      transition: { type: 'spring', bounce: 0.2, duration: 0.5 },
                    }}
                    className="absolute inset-y-1 -z-[1] block rounded-full border border-gray-950/5 bg-gray-100 dark:border-white/5 dark:bg-gray-500/25"
                    ref={spanDateRef}
                  />
                  {customDateSelectOptions.slice(0, 3).map(({ name, value }) => (
                    <Tabs.Trigger
                      key={value}
                      value={value}
                      id={`date_${value}`}
                      className="flex h-full items-center gap-2 px-2.5 text-sm duration-200 data-[state=inactive]:opacity-50"
                    >
                      <span className="uppercase">{name}</span>
                    </Tabs.Trigger>
                  ))}
                  <Tabs.Trigger
                    value="custom"
                    id="date_custom"
                    className="flex h-full items-center gap-2 px-2.5 text-sm duration-200 data-[state=inactive]:opacity-50"
                  >
                    <span className="uppercase">CUSTOM</span>
                  </Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>

              {isCustomDate && (
                <motion.div
                  className="overflow-hidden"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  initial={{ height: '0px', opacity: 0 }}
                  exit={{ height: '0px', opacity: 0 }}
                >
                  <Calendar
                    fancy
                    mode="range"
                    endMonth={endMonth}
                    selected={date}
                    onSelect={selectDateCalendarHandler}
                    classNames={{
                      day: 'flex-1 text-center',
                      day_button: 'mx-auto',
                      weekday: 'flex-1',
                    }}
                  />
                </motion.div>
              )}

              <Drawer.Title>Field</Drawer.Title>
              <Tabs.Root
                defaultValue={filterField}
                onValueChange={changeFilterFieldSelectHandler}
                className="text-[--title-text-color]"
                data-shade="800"
              >
                <Tabs.List className="relative -mx-3.5 mb-5 flex h-9 p-1">
                  <motion.span
                    animate={{
                      left: spanFieldLeft,
                      width: spanFieldWidth,
                      transition: { type: 'spring', bounce: 0.2, duration: 0.5 },
                    }}
                    className="absolute inset-y-1 -z-[1] block rounded-full border border-gray-950/5 bg-gray-100 dark:border-white/5 dark:bg-gray-500/25"
                    ref={spanFieldRef}
                  />
                  {statisticsFilterFields.map(({ name, value }) => (
                    <Tabs.Trigger
                      key={value}
                      value={value}
                      id={`tab_${value}`}
                      className="flex h-full items-center gap-2 px-2.5 text-sm duration-200 data-[state=inactive]:opacity-50"
                    >
                      <span className="uppercase">{name}</span>
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </Tabs.Root>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}

export default MobileStatisticFilter;
