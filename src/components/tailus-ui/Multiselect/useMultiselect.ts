import type { SelectTypeItems } from '@tailus-ui/Multiselect/Multiselect.types';
import * as React from 'react';

function useMultiselect(
  data: SelectTypeItems[],
  values: number[],
  onChange: (values: number[]) => void,
) {
  const [isOpen, setOpen] = React.useState(false);
  const selectedItems = data.flatMap(({ group }) => (group)).filter(({ value }) => values.includes(value));
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

  return {
    isOpen,
    selectedPlaceholder,
    selectCommandItemHandler,
    changePopoverRootOpenHandler,
  };
}

export default useMultiselect;
