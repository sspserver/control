import type { MultiselectProps } from '@tailus-ui/Multiselect/Multiselect.types';

import Checkbox from '@/components/Checkbox';

import ButtonSpinner from '@/components/Icons/ButtonSpinner';
import FormElementErrorLabel from '@components/FormElementErrorLabel';
import { Portal } from '@radix-ui/react-portal';
import Label from '@tailus-ui/Label';
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
    selectedPlaceholder,
    isGroupAllSelected,
    selectCommandItemHandler,
    changePopoverRootOpenHandler,
    selectGroupCommandItemHandler,
  } = useMultiselect(data, values, onChange);
  const commandItemClassNames = item({ fancy: true, intent: 'primary', className: 'rounded-[9] pl-4 hover:bg-gray-100 active:bg-gray-200/75 dark:hover:bg-gray-500/10 cursor-pointer' });
  const popoverContentClassNames = content({ fancy: true, className: 'pointer-events-auto z-20 p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]' });

  return (
    <div className="space-y-2">
      {label && (<Label size="sm">{label}</Label>)}
      <PopoverRoot modal open={isOpen} onOpenChange={changePopoverRootOpenHandler}>
        <PopoverTrigger className="pl-0.5 w-full">
          <Button.Root
            component="div"
            role="combobox"
            variant="outlined"
            size="sm"
            intent="gray"
            className="p-0 w-full pl-2 pr-2 justify-between"
          >
            {selectedPlaceholder || placeholder}
            <div className="flex items-center">
              {loading && (
                <ButtonSpinner
                  className="animate-spin"
                  width="22"
                  height="22"
                />
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
            </div>
          </Button.Root>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            fancy
            className={popoverContentClassNames}
            onFocus={(e) => {
              e.stopPropagation();
            }}
            onWheel={(e) => {
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
            }}
          >
            <Command>
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
                              >
                                <Checkbox label={name} checked={isChecked} />
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      );
                    }

                    const isChecked = values.includes(value);
                    return (
                      <CommandItem
                        key={value}
                        value={`${value}`}
                        onSelect={selectCommandItemHandler}
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
      </PopoverRoot>
      <FormElementErrorLabel error={error} />
    </div>
  );
}

export default Multiselect;
