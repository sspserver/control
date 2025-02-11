import Button, { ButtonLoading } from '@tailus-ui/Button';
import Dialog from '@tailus-ui/Dialog';

type ApplicationDialogProps = {
  loading?: boolean;
  onApply: () => void;
  onCancel: () => void;
  title: string;
  description: string;
};

function ApplicationDialog({
  onApply,
  onCancel,
  title,
  description,
  loading,
}: ApplicationDialogProps) {
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

export default ApplicationDialog;
