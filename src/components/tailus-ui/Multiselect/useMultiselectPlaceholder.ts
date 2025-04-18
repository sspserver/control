import {
  getAmountOfVisibleChildren,
  multiselectPlaceholderContainerId,
} from '@tailus-ui/Multiselect/MultiselectPlaceholder.utils';
import * as React from 'react';
import { useCallback, useEffect, useId } from 'react';

function useMultiselectPlaceholder(items: {
  name: string;
  value: number | string;
}[]) {
  const generateId = useId();
  const placeholderContainerId = `${multiselectPlaceholderContainerId}-${generateId}`;
  const itemsLength = items.length;
  const hasItems = !!itemsLength;
  const [hiddenItemsCount, setHiddenItemsCount] = React.useState(0);
  const isShowHiddenItemsCount = hiddenItemsCount > 0;
  const calculateHiddenItemsCount = useCallback(() => {
    if (hasItems) {
      const visibleAmount = getAmountOfVisibleChildren(placeholderContainerId);

      setHiddenItemsCount(itemsLength - visibleAmount);
    }
  }, [hasItems, itemsLength, placeholderContainerId]);

  useEffect(() => {
    calculateHiddenItemsCount();

    window.addEventListener('resize', calculateHiddenItemsCount);

    return () => {
      window.removeEventListener('resize', calculateHiddenItemsCount);
    };
  }, [calculateHiddenItemsCount, itemsLength]);

  return {
    placeholderContainerId,
    hiddenItemsCount,
    isShowHiddenItemsCount,
    hasItems,
  };
}

export default useMultiselectPlaceholder;
