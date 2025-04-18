import { PlusIcon, XMarkIcon } from '@heroicons/react/16/solid';
import Button from '@tailus-ui/Button/Button';
import Separator from '@tailus-ui/Separator';
import { motion } from 'framer-motion';
import * as React from 'react';
import useMultiselectPlaceholder from './useMultiselectPlaceholder';

type MultiselectPlaceholderProps = {
  placeholder: React.ReactNode;
  items: {
    name: string;
    value: number | string;
  }[];
  onRemove: (value: number | string) => (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function MultiselectPlaceholder({
  placeholder,
  items,
  onRemove,
}: MultiselectPlaceholderProps) {
  const {
    placeholderContainerId,
    hiddenItemsCount,
    isShowHiddenItemsCount,
    hasItems,
  } = useMultiselectPlaceholder(items);
  if (!hasItems) {
    return placeholder;
  }

  return (
    <div className="contents">
      <div className="w-full overflow-hidden relative rounded-r-[--btn-radius]">
        <div
          id={placeholderContainerId}
          className="flex gap-1 justify-start"
        >
          {items.map(({ name, value }) =>
            (
              <Button.Root
                className="text-nowrap"
                variant="soft"
                size="xs"
                key={value}
                onClick={onRemove(value)}
              >
                <Button.Label>
                  {name}
                </Button.Label>
                <Button.Icon
                  className="size-5"
                  type="trailing"
                  size="xs"
                >
                  <XMarkIcon />
                </Button.Icon>
              </Button.Root>
            ),
          )}
        </div>
      </div>
      {isShowHiddenItemsCount && (<Separator orientation="vertical" />)}
      {isShowHiddenItemsCount && (
        <motion.div
          className="pl-2 pr-1 flex gap-1 text-primary-300"
          key={hiddenItemsCount}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.2 }}
        >
          <PlusIcon width={18} />
          {hiddenItemsCount}
        </motion.div>
      )}
    </div>
  );
}

export default MultiselectPlaceholder;
