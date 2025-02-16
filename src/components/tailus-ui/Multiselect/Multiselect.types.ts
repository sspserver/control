type SelectItemType = {
  name: string;
  value: number;
};

export type SelectTypeItems = {
  group: SelectItemType[];
} & SelectItemType;

export type MultiselectProps = {
  label?: string;
  placeholder?: string;
  parentClassName?: string;
  data: SelectTypeItems[];
  values: number[];
  onChange: (value: number[]) => void;
  loading?: boolean;
};
