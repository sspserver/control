import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';

import Checkbox from '@/components/Checkbox';

import ButtonSpinner from '@/components/Icons/ButtonSpinner';
import FormElementErrorLabel from '@components/FormElementErrorLabel';
import { FocusScope } from '@radix-ui/react-focus-scope';
import { Portal } from '@radix-ui/react-portal';
import Label from '@tailus-ui/Label';
import MultiselectPlaceholder from '@tailus-ui/Multiselect/MultiselectPlaceholder';
import useMultiselect from '@tailus-ui/Multiselect/useMultiselect';
import { select } from '@tailus/themer';
import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import Button from '../Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../Command';
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '../Popover';

const { content, item } = select.soft();

function Multiselect({
  label = 'Select an item',
  placeholder = 'Select an item',
  data,
  values = [],
  onChange,
  loading,
  error,
}: MultiselectProps) {
  const {
    isOpen,
    selectedItems,
    isGroupAllSelected,
    selectCommandItemHandler,
    changePopoverRootOpenHandler,
    selectGroupCommandItemHandler,
    removeSelectedItemButtonClickHandler,
  } = useMultiselect(data, values, onChange);
  const commandItemClassNames = item({ fancy: true, intent: 'primary', className: 'rounded-[9] pl-4 hover:bg-gray-100 active:bg-gray-200/75 dark:hover:bg-gray-500/10 cursor-pointer dark:data-[disabled]:text-[--display-text-color] data-[disabled]:opacity-60' });
  const popoverContentClassNames = content({ fancy: true, className: '!pointer-events-auto z-20 p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]' });

  return (
    <div className="space-y-2 pr-[1]">
      {label && (<Label size="sm">{label}</Label>)}
      <PopoverRoot
        modal
        open={isOpen}
        onOpenChange={changePopoverRootOpenHandler}
      >
        <PopoverTrigger asChild className="w-full">
          <Button.Root
            component="div"
            role="combobox"
            variant="outlined"
            size="sm"
            intent="gray"
            className="p-0 w-full pl-2  pr-2 gap-0 justify-between"
            onClick={event => event.stopPropagation()}
          >
            <MultiselectPlaceholder
              placeholder={placeholder}
              items={selectedItems}
              onRemove={removeSelectedItemButtonClickHandler}
            />
            <div className="flex items-center">
              {loading && (
                <ButtonSpinner
                  className="animate-spin"
                  width="22"
                  height="22"
                />
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 ml-2" />
            </div>
          </Button.Root>
        </PopoverTrigger>
        <FocusScope asChild loop trapped={isOpen}>
          <Portal
            className="pointer-events-auto"
          >
            <PopoverContent
              fancy
              className={popoverContentClassNames}
            >
              <Command disablePointerSelection>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No found</CommandEmpty>
                  {
                    data.map(({ group, value, name }) => {
                      if (group) {
                        return (
                          <CommandGroup key={name}>
                            <CommandItem title={name} onSelect={selectGroupCommandItemHandler(group)}>
                              <Checkbox label={name} checked={isGroupAllSelected(group)} />
                            </CommandItem>
                            {group.map(({ name, value }) => {
                              const isChecked = values.includes(value);
                              return (
                                <CommandItem
                                  key={value}
                                  value={`${value}`}
                                  onSelect={selectCommandItemHandler}
                                  className={commandItemClassNames}
                                  keywords={[name, `${value}`]}
                                >
                                  <Checkbox label={name} checked={isChecked} />
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        );
                      }

                      const isChecked = values.includes(Number(value));
                      return (
                        <CommandItem
                          key={value}
                          value={`${value}`}
                          onSelect={selectCommandItemHandler}
                          keywords={[name, `${value}`]}
                          className={commandItemClassNames}
                        >
                          <Checkbox label={name} checked={isChecked} />
                        </CommandItem>
                      );
                    })
                  }
                </CommandList>
              </Command>
            </PopoverContent>
          </Portal>
        </FocusScope>
      </PopoverRoot>
      <FormElementErrorLabel error={error} />
    </div>
  );
}

export default Multiselect;
