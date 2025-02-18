import ApplicationActionsPausePlayButton
  from '@/page/ApplicationsPage/ApplicationCard/ApplicationActions/ApplicationActionsPausePlayButton';
import useApplicationActions from '@/page/ApplicationsPage/ApplicationCard/ApplicationActions/useApplicationActions';
import ApplicationDialog from '@/page/ApplicationsPage/ApplicationCard/ApplicationDialog';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import Button from '@tailus-ui/Button/Button';
import Dialog from '@tailus-ui/Dialog';

type ApplicationActionsProps = {
  pause?: boolean;
  id: string;
  onChange: (id: string) => void;
};

function ApplicationActions({ id, pause = false, onChange }: ApplicationActionsProps) {
  const {
    isOpenDeleteDialog,
    isDeleteApplicationLoading,
    isUpdateApplicationLoading,
    clickEditButtonHandler,
    clickPlayPauseButtonHandler,
    clickDeleteButtonHandler,
    clickToggleDeleteDialogButtonHandler,
  } = useApplicationActions(
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
      <ApplicationActionsPausePlayButton pause={pause} loading={isUpdateApplicationLoading} onClick={clickPlayPauseButtonHandler} variant="soft" size="xs" intent="gray" />
      <Dialog.Root open={isOpenDeleteDialog}>
        <Button.Root variant="soft" size="xs" intent="gray" onClick={clickToggleDeleteDialogButtonHandler(true)}>
          <Button.Icon size="xs" type="only">
            <TrashIcon className="text-danger-600" />
          </Button.Icon>
        </Button.Root>
        <ApplicationDialog
          loading={isDeleteApplicationLoading}
          title="Delete Application"
          description="Are you sure you want to delete this application?"
          onCancel={clickToggleDeleteDialogButtonHandler(false)}
          onApply={clickDeleteButtonHandler}
        />
      </Dialog.Root>
    </div>
  );
}

export default ApplicationActions;
