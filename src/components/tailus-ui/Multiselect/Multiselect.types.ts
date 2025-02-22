import type React from 'react';

type SelectItemType = {
  name: string;
  value: number | string;
};

export type SelectTypeItems = {
  group?: SelectItemType[];
} & SelectItemType;

export type MultiselectProps = {
  label?: string;
  placeholder?: string;
  parentClassName?: string;
  data: SelectTypeItems[];
  values?: (number | string)[];
  onChange: (value: (number | string)[]) => void;
  loading?: boolean;
  error?: React.ReactNode;
};
