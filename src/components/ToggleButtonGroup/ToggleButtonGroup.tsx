import FormElementErrorLabel from '@components/FormElementErrorLabel';
import Label from '@tailus-ui/Label';
import ToggleGroup from '@tailus-ui/ToggleButtonGroup';
import React from 'react';

type ToggleButtonGroupProps = {
  label?: string;
  items: {
    name: string;
    value: string;
  }[];
  value?: string;
  error?: string;
  onValueChange?: (value: string) => void;
};

function ToggleButtonGroup({ items, label, onValueChange, error, value }: ToggleButtonGroupProps) {
  return (
    <div className="space-y-2">
      {label && (<Label size="sm">{label}</Label>)}
      <ToggleGroup.Root
        size="sm"
        variant="mixed"
        type="single"
        value={value}
        aria-label={label ?? ''}
        onValueChange={onValueChange}
      >
        {items.map(item => (
          <ToggleGroup.Item
            key={item.value}
            value={item.value}
            withLabel

          >
            {item.name}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
      <FormElementErrorLabel error={error} />
    </div>
  );
}

export default ToggleButtonGroup;
