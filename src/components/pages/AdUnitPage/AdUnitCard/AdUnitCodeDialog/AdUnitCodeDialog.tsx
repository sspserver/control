import { LabelCopyCodeButton } from '@components/Button';
import ButtonSpinner from '@components/Icons/ButtonSpinner';
import useAdUnitCodeDialog from '@components/pages/AdUnitPage/AdUnitCard/AdUnitCodeDialog/useAdUnitCodeDialog';
import Button from '@tailus-ui/Button';
import CodeSnippet from '@tailus-ui/CodeSnippet/CodeSnippet';
import Dialog from '@tailus-ui/Dialog';
import Tabs from '@tailus-ui/Tabs';

import React from 'react';

type AdUnitCodeDialogProps = {
  code?: string;
  name?: string;
  onClose?: () => void;

};

function AdUnitCodeDialog({
  code,
  name,
  onClose,
}: AdUnitCodeDialogProps) {
  const {
    directUrl,
    directCode,
    bannerCode,
    tabState,
    spanRef,
    tabsListRef,
    tabsTriggerRef,
    isLoadingNetworkFormOptions,
    changeTabsStateHandler,
  } = useAdUnitCodeDialog(code);

  return (
    <Dialog.Root open modal>
      <Dialog.Portal>
        <Dialog.Overlay className="blur z-40" />
        <Dialog.Content
          fancy
          onEscapeKeyDown={onClose}
          onPointerDownOutside={onClose}
          className="z-50 max-w-lg"
        >
          <Dialog.Title>
            Ad Unit
            {` ${name} `}
            code
          </Dialog.Title>

          {isLoadingNetworkFormOptions
            ? (
                <div>
                  <ButtonSpinner
                    className="animate-spin"
                    width="14"
                    height="14"
                  />
                </div>
              )
            : (
                <Tabs.Root
                  className="space-y-4 mt-4"
                  defaultValue={tabState}
                  onValueChange={changeTabsStateHandler}
                >
                  <Tabs.List
                    ref={tabsListRef}
                    variant="bottomOutlined"
                    triggerVariant="plain"
                    size="md"
                    className="gap-2"
                  >
                    <Tabs.Indicator ref={spanRef} variant="bottom" />
                    <Tabs.Trigger ref={tabsTriggerRef} value="banner" id="banner">
                      Banner
                    </Tabs.Trigger>
                    <Tabs.Trigger ref={tabsTriggerRef} value="popunder" id="popunder">
                      Popunder
                    </Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="banner" className="text-[--caption-text-color]">
                    <CodeSnippet lang="js" code={bannerCode} />
                  </Tabs.Content>
                  <Tabs.Content value="popunder" className="text-[--caption-text-color]">
                    <LabelCopyCodeButton
                      code={directUrl}
                      size="md"
                      variant="outlined"
                      intent="primary"
                      className="pl-2 text-left text-sm truncate"
                    >
                      {directUrl}
                    </LabelCopyCodeButton>
                    <CodeSnippet lang="js" code={directCode} className="mt-4" />
                  </Tabs.Content>
                </Tabs.Root>
              )}

          <Dialog.Actions className="-mx-[--card-padding] border-t px-[--card-padding] pt-[--card-padding]">
            <Button.Root variant="outlined" intent="gray" size="sm" onClick={onClose}>
              <Button.Label>Close</Button.Label>
            </Button.Root>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AdUnitCodeDialog;
