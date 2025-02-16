import type { SelectProps } from '@/components/Select/Select';
import useCategoriesSelect from '@/components/CategoriesSelect/useCategoriesSelect';

import Multiselect from '@tailus-ui/Multiselect';
import React from 'react';

type CategoriesSelectProps = {
  values: number[];
  onChange: (values: number[]) => void;
} & Partial<SelectProps>;

function CategoriesSelect({ onChange, values }: CategoriesSelectProps) {
  const {
    listCategories,
    isListCategoriesLoading,
  } = useCategoriesSelect();

  return (
    <Multiselect label="Categories" loading={isListCategoriesLoading} onChange={onChange} data={listCategories} values={values} />
  );
}

export default CategoriesSelect;
