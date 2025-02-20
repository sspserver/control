import ActionsPausePlayButton from '@components/ActionsPausePlayButton';
import ConfirmDialog from '@components/ConfirmDialog';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import Button from '@tailus-ui/Button/Button';
import Dialog from '@tailus-ui/Dialog';
import useAdUnitActions from './useAdUnitActions';

type AdUnitActionsProps = {
  pause?: boolean;
  id: string;
  onChange: (id: string) => void;
};

function AdUnitActions({ id, pause = false, onChange }: AdUnitActionsProps) {
  const {
    isOpenDeleteDialog,
    isDeleteAdUnitLoading,
    isUpdateAdUnitLoading,
    clickEditButtonHandler,
    clickPlayPauseButtonHandler,
    clickDeleteButtonHandler,
    clickToggleDeleteDialogButtonHandler,
  } = useAdUnitActions(
    id,
    pause,
    onChange,
  );

  return (
    <div className="flex gap-1.5">
      <Button.Root variant="soft" size="xs" intent="gray" onClick={clickEditButtonHandler}>
        <Button.Icon size="xs" type="only">
          <PencilIcon />
        </Button.Icon>
      </Button.Root>
      <ActionsPausePlayButton pause={pause} loading={isUpdateAdUnitLoading} onClick={clickPlayPauseButtonHandler} variant="soft" size="xs" intent="gray" />
      <Dialog.Root open={isOpenDeleteDialog}>
        <Button.Root variant="soft" size="xs" intent="gray" onClick={clickToggleDeleteDialogButtonHandler(true)}>
          <Button.Icon size="xs" type="only">
            <TrashIcon className="text-danger-600" />
          </Button.Icon>
        </Button.Root>
        <ConfirmDialog
          loading={isDeleteAdUnitLoading}
          title="Delete AdUnit"
          description="Are you sure you want to delete this AdUnit?"
          onCancel={clickToggleDeleteDialogButtonHandler(false)}
          onApply={clickDeleteButtonHandler}
        />
      </Dialog.Root>
    </div>
  );
}

export default AdUnitActions;
