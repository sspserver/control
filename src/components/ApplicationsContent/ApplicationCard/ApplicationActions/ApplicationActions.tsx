import useApplicationActions from '@/components/ApplicationsContent/ApplicationCard/ApplicationActions/useApplicationActions';
import ApplicationDialog from '@/components/ApplicationsContent/ApplicationCard/ApplicationDialog';
import { PauseIcon, PlayIcon, TrashIcon } from '@heroicons/react/16/solid';
import Button from '@tailus-ui/Button/Button';
import Dialog from '@tailus-ui/Dialog';

type ApplicationActionsProps = {
  pause?: boolean;
  id: string;
  onChange: (id: string) => void;
};

function ApplicationActions({ id, pause = false, onChange }: ApplicationActionsProps) {
  const {
    isUpdateApplicationLoading,
    clickPlayPauseButtonHandler,
    clickDeleteButtonHandler,
  } = useApplicationActions(
    id,
    pause,
    onChange,
  );

  return (
    <div className="flex gap-1.5">
      <Button.Root onClick={clickPlayPauseButtonHandler} variant="soft" size="xs" intent="gray">
        <Button.Icon size="xs" type="only">
          {pause ? <PauseIcon className="text-warning-600" /> : <PlayIcon className="text-success-600" />}
        </Button.Icon>
      </Button.Root>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button.Root variant="soft" size="xs" intent="gray">
            <Button.Icon size="xs" type="only">
              <TrashIcon className="text-danger-600" />
            </Button.Icon>
          </Button.Root>
        </Dialog.Trigger>
        <ApplicationDialog
          loading={isUpdateApplicationLoading}
          title="Delete Application"
          description="Are you sure you want to delete this application?"
          onApply={clickDeleteButtonHandler}
        />
      </Dialog.Root>
    </div>
  );
}

export default ApplicationActions;
