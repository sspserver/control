import ActionsPausePlayButton from '@components/ActionsPausePlayButton';
import ConfirmDialog from '@components/ConfirmDialog';
import useTrafficRouteActions from '@components/pages/TrafficRouters/TrafficRouteActions/useTrafficRouteActions';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import Button from '@tailus-ui/Button/Button';
import Dialog from '@tailus-ui/Dialog/Dialog';

type TrafficRouteActionsProps = {
  id: string;
  pause: boolean;
};

function TrafficRouteActions({ id, pause }: TrafficRouteActionsProps) {
  const {
    isUpdateRtbLoading,
    isOpenDeleteDialog,
    isDeleteTrafficRouterLoading,

    clickEditButtonHandler,
    clickDeleteButtonHandler,
    clickPlayPauseButtonHandler,
    clickToggleDeleteDialogButtonHandler,
  } = useTrafficRouteActions(id, pause);

  return (
    <div className="flex gap-1.5 justify-end">
      <Button.Root variant="soft" size="xs" intent="gray" onClick={clickEditButtonHandler}>
        <Button.Icon size="xs" type="only">
          <PencilIcon />
        </Button.Icon>
      </Button.Root>
      <ActionsPausePlayButton
        pause={pause}
        loading={isUpdateRtbLoading}
        onClick={clickPlayPauseButtonHandler}
        variant="soft"
        size="xs"
        intent="gray"
      />
      <Dialog.Root open={isOpenDeleteDialog}>
        <Button.Root
          variant="soft"
          size="xs"
          intent="gray"
          onClick={clickToggleDeleteDialogButtonHandler(true)}
        >
          <Button.Icon size="xs" type="only">
            <TrashIcon className="text-danger-600" />
          </Button.Icon>
        </Button.Root>
        <ConfirmDialog
          loading={isDeleteTrafficRouterLoading}
          title="Delete Traffic Router"
          description="Are you sure you want to delete this Traffic Router?"
          onCancel={clickToggleDeleteDialogButtonHandler(false)}
          onApply={clickDeleteButtonHandler}
        />
      </Dialog.Root>
    </div>
  );
}

export default TrafficRouteActions;
