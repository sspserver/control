import useStatisticFilter from '@components/StatisticFilter/useStatisticFilter';
import { CustomDateOption, getCustomDatePick } from '@lib/date/getCustomDatePick';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

function useMobileStatisticFilter() {
  const {
    date,
    filterField,
    endMonth,
    calendarRangeOption,
    isFilterActiveStatusActive,
    selectDateCalendarHandler,
    changeFilterFieldSelectHandler,
    changeActiveStatusButtonHandler,
    changeDateRangeOptionsCalendarHandler,
  } = useStatisticFilter();
  const [isOpen, setIsOpen] = useState(false);
  const clickFilterOpenClickHandler = () => setIsOpen(!isOpen);
  const spanFieldRef = useRef<HTMLSpanElement>(null);
  const spanDateRef = useRef<HTMLSpanElement>(null);
  const [spanDateLeft, setSpanDateLeft] = useState(0);
  const [spanDateWidth, setSpanDateWidth] = useState(0);
  const [spanFieldLeft, setSpanFieldLeft] = useState(0);
  const [spanFieldWidth, setSpanFieldWidth] = useState(0);
  const isCustomDate = calendarRangeOption === CustomDateOption.Custom;
  const changeFilterDateSelectHandler = (value: string) => {
    const date = getCustomDatePick(value);
    selectDateCalendarHandler(date);
    changeDateRangeOptionsCalendarHandler(value);
  };
  const drawerAnimationEndHandler = useCallback(() => {
    const activeFieldTrigger = document.getElementById(`tab_${filterField}`) as HTMLElement;
    const activeDateTrigger = document.getElementById(`date_${calendarRangeOption}`) as HTMLElement;

    if (activeDateTrigger) {
      setSpanDateLeft(activeDateTrigger.offsetLeft);
      setSpanDateWidth(activeDateTrigger.offsetWidth);
      activeDateTrigger?.focus();
    }

    if (activeFieldTrigger) {
      setSpanFieldLeft(activeFieldTrigger.offsetLeft);
      setSpanFieldWidth(activeFieldTrigger.offsetWidth);
      activeFieldTrigger?.focus();
    }
  }, [calendarRangeOption, filterField]);
  const [prevScroll, setPrevScroll] = useState(0);
  const { scrollY } = useScroll();
  function update(latest: number, prev: number): void {
    if (latest < prev) {
      setIsOpen(false);
    } else if (latest > 100 && latest > prev) {
      setIsOpen(true);
    }
  }

  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    update(latest, prevScroll);
    setPrevScroll(latest);
  });

  useEffect(() => {
    setTimeout(drawerAnimationEndHandler, 100);
  }, [isOpen, calendarRangeOption, filterField, drawerAnimationEndHandler]);

  return {
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
    calendarRangeOption,
    drawerAnimationEndHandler,
    isFilterActiveStatusActive,
    changeFilterDateSelectHandler,
    selectDateCalendarHandler,
    changeFilterFieldSelectHandler,
    clickFilterOpenClickHandler,
    changeActiveStatusButtonHandler,
  };
}

export default useMobileStatisticFilter;
