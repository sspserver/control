import type { SelectProps as RootSelectProps } from '@radix-ui/react-select';
import type { TriggerProps } from '@tailus/themer';
import ButtonSpinner from '@/components/Icons/ButtonSpinner';
import FormElementErrorLabel from '@components/FormElementErrorLabel';
import Label from '@tailus-ui/Label';
import SelectUi from '@tailus-ui/Select';
import classNames from 'classnames';
import React from 'react';
import SelectItem from './SelectItem';

type SelectItemType = {
  name: string;
  value: string;
};

type SelectTypeItems = {
  group?: SelectItemType[];
} & SelectItemType;

export type SelectProps = {
  loading?: boolean;
  label?: string;
  value?: string;
  items: SelectTypeItems[];
  onChange?: (value: string) => void;
  classNameTrigger?: string;
  selectItemClassName?: string;
  error?: React.ReactNode;
} & RootSelectProps & TriggerProps;

function Select({ size = 'sm', classNameTrigger, selectItemClassName, variant, error, items, value, label, loading, onChange }: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (<Label size="sm">{label}</Label>)}
      <SelectUi.Root onValueChange={onChange} value={value}>
        <SelectUi.Trigger variant={variant} size={size} className={classNames('justify-between', classNameTrigger)}>
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
                items.map(({ group, name, value }) => {
                  if (group) {
                    return (
                      <SelectUi.Group key={name}>
                        <SelectUi.Label title={name}>{name}</SelectUi.Label>
                        {group.map(({ name, value }) => (
                          <SelectItem className={selectItemClassName} name={name} value={value} key={value} />
                        ))}
                      </SelectUi.Group>
                    );
                  }

                  return (
                    <SelectItem className={selectItemClassName} name={name} value={value} key={value} />
                  );
                })
              }
            </SelectUi.Viewport>
          </SelectUi.Content>
        </SelectUi.Portal>
      </SelectUi.Root>
      <FormElementErrorLabel error={error} />
    </div>
  );
}

export default Select;
