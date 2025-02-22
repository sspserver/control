import ActionsPausePlayButton from '@components/ActionsPausePlayButton';
import ConfirmDialog from '@components/ConfirmDialog';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import Button from '@tailus-ui/Button/Button';
import Dialog from '@tailus-ui/Dialog';
import useRtbActions from './useRtbActions';

type RtbActionsProps = {
  pause?: boolean;
  id: string;
  onChange: (id: string) => void;
};

function RtbActions({ id, pause = false, onChange }: RtbActionsProps) {
  const {
    isOpenDeleteDialog,
    isDeleteRtbLoading,
    isUpdateRtbLoading,
    clickEditButtonHandler,
    clickPlayPauseButtonHandler,
    clickDeleteButtonHandler,
    clickToggleDeleteDialogButtonHandler,
  } = useRtbActions(
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
      <ActionsPausePlayButton pause={pause} loading={isUpdateRtbLoading} onClick={clickPlayPauseButtonHandler} variant="soft" size="xs" intent="gray" />
      <Dialog.Root open={isOpenDeleteDialog}>
        <Button.Root variant="soft" size="xs" intent="gray" onClick={clickToggleDeleteDialogButtonHandler(true)}>
          <Button.Icon size="xs" type="only">
            <TrashIcon className="text-danger-600" />
          </Button.Icon>
        </Button.Root>
        <ConfirmDialog
          loading={isDeleteRtbLoading}
          title="Delete RTB"
          description="Are you sure you want to delete this RTB?"
          onCancel={clickToggleDeleteDialogButtonHandler(false)}
          onApply={clickDeleteButtonHandler}
        />
      </Dialog.Root>
    </div>
  );
}

export default RtbActions;
