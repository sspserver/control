import { CheckIcon } from '@heroicons/react/20/solid';
import Select from '@tailus-ui/Select';
import classNames from 'classnames';

export type SelectItemProps = {
  name: string;
  value: string;
  className?: string;
};

function SelectItem({ name, value, className }: SelectItemProps) {
  const itemClassNames = classNames('hover:bg-gray-100 active:bg-gray-200/75  dark:hover:bg-gray-500/10 cursor-pointer', className);

  return (
    <Select.Item value={value} className={itemClassNames}>
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
