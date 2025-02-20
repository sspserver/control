import { ButtonLoading } from '@tailus-ui/Button';
import Button from '@tailus-ui/Button/Button';
import Dialog from '@tailus-ui/Dialog/Dialog';

type ConfirmDialogProps = {
  title: string;
  description: string;
  onCancel?: () => void;
  onApply?: () => void;
  loading?: boolean;
};

function ConfirmDialog({ title, description, onCancel, onApply, loading }: ConfirmDialogProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="blur z-10" />
      <Dialog.Content className="max-w-sm z-20">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description className="mt-2">{description}</Dialog.Description>
        <Dialog.Actions>
          <Button.Root onClick={onCancel} variant="outlined" size="sm" intent="gray">
            <Button.Label>Cancel</Button.Label>
          </Button.Root>
          <ButtonLoading size="sm" onClick={onApply} loading={loading}>
            Apply
          </ButtonLoading>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default ConfirmDialog;
