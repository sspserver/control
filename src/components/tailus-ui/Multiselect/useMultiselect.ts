import type { SelectTypeItems } from '@tailus-ui/Multiselect/Multiselect.types';
import * as React from 'react';

function useMultiselect(
  data: SelectTypeItems[],
  values: (number | string)[],
  onChange: (values: (number | string)[]) => void,
) {
  const [isOpen, setOpen] = React.useState(false);
  const selectedItems = data.flatMap(({ group, ...restProps }) => (group || { ...restProps })).filter(({ value }) => values.includes(Number(value)));
  const selectedPlaceholder = selectedItems.map(({ name }) => name).join(', ');
  const changePopoverRootOpenHandler = () => setOpen(!isOpen);
  const selectCommandItemHandler = (value: string) => {
    const id = Number(value);
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

  return {
    isOpen,
    selectedPlaceholder,
    isGroupAllSelected,
    selectCommandItemHandler,
    changePopoverRootOpenHandler,
    selectGroupCommandItemHandler,
  };
}

export default useMultiselect;
