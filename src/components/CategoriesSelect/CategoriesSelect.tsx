import type { SelectProps } from '@/components/Select/Select';
import Multiselect from '@tailus-ui/Multiselect';

import React from 'react';
import useCategoriesSelect from '@/components/CategoriesSelect/useCategoriesSelect';

type CategoriesSelectProps = {
  values: (number | string)[];
  onChange: (values: (number | string)[]) => void;
} & Partial<SelectProps>;

function CategoriesSelect({ ...props }: CategoriesSelectProps) {
  const {
    listCategories,
    isListCategoriesLoading,
  } = useCategoriesSelect();

  return (
    <Multiselect
      label="Categories"
      loading={isListCategoriesLoading}
      data={listCategories}
      {...props}
    />
  );
}

export default CategoriesSelect;
