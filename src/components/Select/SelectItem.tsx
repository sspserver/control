import { CheckIcon } from '@heroicons/react/20/solid';
import Select from '@tailus-ui/Select';

export type SelectItemProps = {
  name: string;
  value: string;
};

function SelectItem({ name, value }: SelectItemProps) {
  return (
    <Select.Item value={value} fancy className="hover:bg-gray-100 active:bg-gray-200/75  dark:hover:bg-gray-500/10 cursor-pointer">
      <Select.ItemIndicator>
        <CheckIcon />
      </Select.ItemIndicator>
      <Select.ItemText id={value} title={name}>
        {name}
      </Select.ItemText>
    </Select.Item>
  );
};

export default SelectItem;
