import { getCustomDatePick } from '@components/CardChart/CardChart.utils';
import useStatisticFilter from '@components/StatisticFilter/useStatisticFilter';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function useMobileStatisticFilter() {
  const {
    date,
    filterField,
    endMonth,
    selectDateCalendarHandler,
    changeFilterFieldSelectHandler,
  } = useStatisticFilter();
  const [isOpen, setIsOpen] = useState(false);
  const [customSelectDate, setCustomSelectDate] = useState('today');
  const clickFilterOpenClickHandler = () => setIsOpen(!isOpen);
  const spanFieldRef = useRef<HTMLSpanElement>(null);
  const spanDateRef = useRef<HTMLSpanElement>(null);
  const [spanDateLeft, setSpanDateLeft] = useState(0);
  const [spanDateWidth, setSpanDateWidth] = useState(0);

  const [spanFieldLeft, setSpanFieldLeft] = useState(0);
  const [spanFieldWidth, setSpanFieldWidth] = useState(0);
  const isCustomDate = customSelectDate === 'custom';
  const changeFilterDateSelectHandler = (value: string) => {
    const date = getCustomDatePick(value);
    selectDateCalendarHandler(date);
    setCustomSelectDate(value);
  };
  const drawerAnimationEndHandler = () => {
    const activeFieldTrigger = document.getElementById(`tab_${filterField}`) as HTMLElement;
    const activeDateTrigger = document.getElementById(`date_${customSelectDate}`) as HTMLElement;

    if (activeDateTrigger) {
      setSpanDateLeft(activeDateTrigger.offsetLeft);
      setSpanDateWidth(activeDateTrigger.offsetWidth);
    }

    if (activeFieldTrigger) {
      setSpanFieldLeft(activeFieldTrigger.offsetLeft);
      setSpanFieldWidth(activeFieldTrigger.offsetWidth);
    }
  };
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
  }, [isOpen, customSelectDate, filterField]);

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
    customSelectDate,
    drawerAnimationEndHandler,
    changeFilterDateSelectHandler,
    selectDateCalendarHandler,
    changeFilterFieldSelectHandler,
    clickFilterOpenClickHandler,
  };
}

export default useMobileStatisticFilter;
