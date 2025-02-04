import Button from '@tailus-ui/Button';
import Dialog from '@tailus-ui/Dialog';

type ApplicationDialogProps = {
  loading?: boolean;
  onApply: () => void;
  title: string;
  description: string;
};

function ApplicationDialog({
  onApply,
  title,
  description,
}: ApplicationDialogProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content className="max-w-sm">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description className="mt-2">{description}</Dialog.Description>
        <Dialog.Actions>
          <Dialog.Close asChild>
            <Button.Root variant="outlined" size="sm" intent="gray">
              <Button.Label>Cancel</Button.Label>
            </Button.Root>
          </Dialog.Close>
          <Dialog.Close>
            <Button.Root size="sm" onClick={onApply}>
              <Button.Label>Sign In</Button.Label>
            </Button.Root>
          </Dialog.Close>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default ApplicationDialog;
