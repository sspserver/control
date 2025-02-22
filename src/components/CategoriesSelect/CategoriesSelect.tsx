import type { SelectProps } from '@/components/Select/Select';
import useCategoriesSelect from '@/components/CategoriesSelect/useCategoriesSelect';

import FormElementErrorLabel from '@components/FormElementErrorLabel';
import Multiselect from '@tailus-ui/Multiselect';
import React, { Fragment } from 'react';

type CategoriesSelectProps = {
  values: (number | string)[];
  onChange: (values: (number | string)[]) => void;
} & Partial<SelectProps>;

function CategoriesSelect({ onChange, values, error }: CategoriesSelectProps) {
  const {
    listCategories,
    isListCategoriesLoading,
  } = useCategoriesSelect();

  return (
    <Fragment>
      <Multiselect label="Categories" loading={isListCategoriesLoading} onChange={onChange} data={listCategories} values={values} />
      <FormElementErrorLabel error={error} />
    </Fragment>
  );
}

export default CategoriesSelect;
