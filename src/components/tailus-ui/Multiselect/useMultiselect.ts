import type { SelectTypeItems } from '@tailus-ui/Multiselect/Multiselect.types';
import * as React from 'react';

function useMultiselect(
  data: SelectTypeItems[],
  values: (number | string)[],
  onChange: (values: (number | string)[]) => void,
) {
  const [isOpen, setOpen] = React.useState(false);
  const selectedItems = data.flatMap(({ group, ...restProps }) => (group || { ...restProps })).filter(({ value }) => {
    const numberId = Number(value);
    const isIdNumber = !Number.isNaN(numberId);
    const id = isIdNumber ? numberId : value;

    return values.includes(id);
  });
  const changePopoverRootOpenHandler = () => setOpen(!isOpen);
  const selectCommandItemHandler = (value: string) => {
    const numberId = Number(value);
    const isIdNumber = !Number.isNaN(numberId);
    const id = isIdNumber ? numberId : value;
    const hasValue = values.includes(id);

    if (hasValue) {
      onChange(values.filter(item => item !== id));
    } else {
      onChange([...values, id]);
    }
  };
  const selectGroupCommandItemHandler = (group: SelectTypeItems[]) => () => {
    const groupValues = group.map(({ value }) => value);
    const hasAllValues = groupValues.every(value => values.includes(value));

    if (hasAllValues) {
      onChange(values.filter(value => !groupValues.includes(value)));
    } else {
      onChange([...values, ...groupValues]);
    }
  };
  const isGroupAllSelected = (group: SelectTypeItems[]) => {
    const groupValues = group.map(({ value }) => Number(value));
    return groupValues.every(value => values.includes(value));
  };
  const removeSelectedItemButtonClickHandler = (value: string | number) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChange(values.filter(item => item.toString() !== value.toString()));
  };

  return {
    isOpen,
    selectedItems,
    isGroupAllSelected,
    selectCommandItemHandler,
    changePopoverRootOpenHandler,
    selectGroupCommandItemHandler,
    removeSelectedItemButtonClickHandler,
  };
}

export default useMultiselect;
