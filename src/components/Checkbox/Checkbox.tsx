import type { CheckboxProps as CheckboxUiProps } from '@tailus-ui/Checkbox/Checkbox';
import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import Aligner from '@tailus-ui/Aligner';
import CheckboxUi from '@tailus-ui/Checkbox';
import Label from '@tailus-ui/Label';
import { Caption } from '@tailus-ui/typography';

type CheckboxProps = {
  label?: string;
  description?: string;
} & CheckboxUiProps;

function Checkbox({ label, description, ...props }: CheckboxProps) {
  return (
    <Aligner className="max-w-md">
      <CheckboxUi.Root {...props}>
        <CheckboxUi.Indicator asChild>
          <CheckIcon className="size-3.5" strokeWidth={3} />
        </CheckboxUi.Indicator>
      </CheckboxUi.Root>
      {label && (
        <Label htmlFor={props.id} className="col-start-2 cursor-pointer">
          {label}
        </Label>
      )}
      {description && (<Caption as="p" size="sm" className="row-start-2 col-start-2">{description}</Caption>)}
    </Aligner>
  );
}

export default Checkbox;
