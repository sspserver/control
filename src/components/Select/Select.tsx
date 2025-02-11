import type { SelectItemProp } from '@/components/Select/SelectItem';
import type { SelectProps as RootSelectProps } from '@radix-ui/react-select';
import ButtonSpinner from '@/components/Icons/ButtonSpinner';
import Label from '@tailus-ui/Label';
import SelectUi from '@tailus-ui/Select';
import React from 'react';
import SelectItem from './SelectItem';

export type SelectProps = {
  loading?: boolean;
  label?: string;
  value?: string;
  items: SelectItemProp[];
  onChange?: (value: string) => void;
} & RootSelectProps;

function Select({ items, value, label, loading, onChange }: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (<Label size="sm">{label}</Label>)}
      <SelectUi.Root onValueChange={onChange}>
        <SelectUi.Trigger size="sm" className="justify-between">
          {loading && (
            <ButtonSpinner
              className="animate-spin"
              width="22"
              height="22"
            />
          )}
          <SelectUi.Value defaultValue={value} />
          <SelectUi.Icon />
        </SelectUi.Trigger>
        <SelectUi.Portal>
          <SelectUi.Content fancy className="z-50">
            <SelectUi.Viewport>
              {
                items.map(({ name, value }) => (
                  <SelectItem name={name} value={value} key={value} />
                ))
              }
            </SelectUi.Viewport>
          </SelectUi.Content>
        </SelectUi.Portal>
      </SelectUi.Root>
    </div>
  );
}

export default Select;
