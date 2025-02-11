import type { SelectProps } from '@/components/Select/Select';
import useCategoriesSelect from '@/components/CategoriesSelect/useCategoriesSelect';
import Select from '@/components/Select';
import React from 'react';

type CategoriesSelectProps = Partial<SelectProps>;

function CategoriesSelect({ onChange }: CategoriesSelectProps) {
  const {
    listCategories,
    isListCategoriesLoading,
  } = useCategoriesSelect();

  return (
    <Select
      loading={isListCategoriesLoading}
      label="Categories"
      items={listCategories}
      onChange={onChange}
    />
  );
}

export default CategoriesSelect;
