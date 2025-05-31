import { Ordering } from '@/generated/graphql';
import ChevronDownIcon from '@heroicons/react/16/solid/ChevronDownIcon';

import ChevronUpIcon from '@heroicons/react/16/solid/ChevronUpIcon';
import Button from '@tailus-ui/Button/Button';
import classNames from 'classnames';
import React, { useMemo } from 'react';

type ColumOrderProps = {
  children: React.ReactNode;
  direction?: Ordering | null;
  active?: boolean;
  onChange?: (value?: Ordering) => void;
  className?: string;
  align?: 'left' | 'right';
};

function ColumOrder({
  children,
  direction,
  active,
  align,
  onChange,
  className,
}: ColumOrderProps) {
  const isAlignRight = align === 'right';
  const wrapperClassNames = isAlignRight ? 'justify-end -mr-4' : '-ml-4';
  const isOrderingAsc = direction === Ordering.Asc;
  const isOrderingDesc = direction === Ordering.Desc;
  const clickOrderHandler = () => onChange?.(isOrderingAsc ? Ordering.Desc : Ordering.Asc);
  const arrows = useMemo(() => active && (
    <Button.Icon size="sm" type="leading">
      <div key={direction}>
        {isOrderingAsc && <ChevronUpIcon key="up" width={16} height={16} />}
        {isOrderingDesc && <ChevronDownIcon key="down" width={16} height={16} />}
      </div>
    </Button.Icon>
  ), [active, direction, isOrderingAsc, isOrderingDesc]);

  return (
    <div className={classNames(className, wrapperClassNames, 'flex')}>
      <Button.Root
        variant="ghost"
        intent="info"
        size="sm"
        onClick={clickOrderHandler}
      >
        {!isAlignRight && arrows}
        <Button.Label>
          {children}
        </Button.Label>
        {isAlignRight && arrows}
      </Button.Root>
    </div>
  );
}

export default ColumOrder;
