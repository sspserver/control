import Checkbox from '@components/Checkbox';
import FormElementErrorLabel from '@components/FormElementErrorLabel';
import ButtonSpinner from '@components/Icons/ButtonSpinner';
import useAgreementModal from '@components/pages/AgreementModal/useAgreementModal';
import ButtonLoading from '@tailus-ui/Button/ButtonLoading';
import Dialog from '@tailus-ui/Dialog/Dialog';
import Separator from '@tailus-ui/Separator';
import { Caption } from '@tailus-ui/typography';
import React from 'react';

function AgreementModal() {
  const {
    isAgreed,
    agreement,
    isLoadingAgreement,
    isAcceptAgreementLoading,
    acceptAgreementError,
    changeAgreedCheckboxHandler,
    clickButtonAcceptAgreementHandler,
  } = useAgreementModal();

  return (
    <Dialog.Root
      open
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className="z-10 fixed inset-0 blur-sm bg-black/40"
        />
        <Dialog.Content
          fancy
          className="z-20 h-full"
        >
          <Dialog.Title size="xl">{agreement.title}</Dialog.Title>
          <Caption>
            Version
            {' '}
            {agreement.version}
          </Caption>
          <Separator className="mt-4" />
          <Dialog.Description className="py-4 overflow-y-auto h-[calc(84vh-170px)]">
            {isLoadingAgreement
              ? (
                  <div className="h-full flex items-center justify-center">
                    <ButtonSpinner
                      className="animate-spin"
                      width="22"
                      height="22"
                    />
                  </div>
                )
              : <div className="htmlContainer" dangerouslySetInnerHTML={{ __html: agreement.textHTML }} />}
          </Dialog.Description>

          <Dialog.Actions className="-mx-[--card-padding] mt-0 border-t px-[--card-padding] pt-[--card-padding] flex justify-between items-center">
            <div role="presentation" onClick={changeAgreedCheckboxHandler}>
              <Checkbox label="Agree" checked={isAgreed} />
            </div>
            {acceptAgreementError?.message && (<div><FormElementErrorLabel error={acceptAgreementError?.message} /></div>)}
            <div>
              <ButtonLoading
                size="sm"
                loading={isAcceptAgreementLoading}
                disabled={!isAgreed}
                onClick={clickButtonAcceptAgreementHandler}
              >
                Accept
              </ButtonLoading>
            </div>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AgreementModal;
