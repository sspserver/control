import { LabelCopyCodeButton } from '@components/Button';
import { CodeBracketIcon } from '@heroicons/react/20/solid';
import Button from '@tailus-ui/Button/Button';
import React from 'react';
import AdUnitCodeDialog from '../AdUnitCodeDialog';

type AdUnitCardSubTitleCodeProps = {
  code?: string;
  name?: string;
};

function AdUnitCardSubTitleCode({
  code,
  name,
}: AdUnitCardSubTitleCodeProps) {
  const [isOpenCodeDialog, setOpenCodeDialog] = React.useState(false);
  const clickCodeButtonHandler = () => setOpenCodeDialog(true);
  const clickCloseDialogHandler = () => setOpenCodeDialog(false);

  return (
    <div className="flex w-full gap-x-2">
      <div className="-ml-1 truncate">
        <LabelCopyCodeButton
          code={code ?? ''}
          size="xs"
          className="pl-2 text-left text-xs truncate"
        >
          {code}
        </LabelCopyCodeButton>
      </div>
      <div>
        <Button.Root variant="soft" size="xs" intent="primary" onClick={clickCodeButtonHandler}>
          <Button.Icon size="xs" type="only">
            <CodeBracketIcon />
          </Button.Icon>
        </Button.Root>
      </div>
      {isOpenCodeDialog && (<AdUnitCodeDialog code={code} name={name} onClose={clickCloseDialogHandler} />)}
    </div>
  );
}

export default AdUnitCardSubTitleCode;
