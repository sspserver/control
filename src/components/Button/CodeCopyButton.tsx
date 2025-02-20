import type { ButtonProps } from '@tailus/themer';
import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import Button from '@tailus-ui/Button';
import Label from '@tailus-ui/Label';
import { form } from '@tailus/themer';
import { Copy } from 'lucide-react';
import React, { Fragment, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type CodeCopyButtonProps = {
  code: string;
  className?: string;
  size?: ButtonProps['size'];
} & React.HTMLAttributes<HTMLModElement>;

export const useCopyToClipboard = (text: string) => {
  const [copied, setCopied] = useState(false);

  const copy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return { copied, copy };
};

const CodeCopyButton: React.FC<CodeCopyButtonProps> = ({ code, className, size = 'xs' }) => {
  const { copied, copy } = useCopyToClipboard(code);

  return (
    <Button.Root variant="ghost" intent="gray" aria-label="Copy code" size={size} className={twMerge(className)} onClick={copy}>
      <Button.Icon type="only" size="xs">
        {copied ? <CheckIcon className="text-gray-950 dark:text-white" /> : <Copy />}
      </Button.Icon>
    </Button.Root>
  );
};

type LabelCopyCodeButtonProps = { label?: string; children: React.ReactNode; code: string; className?: string } & ButtonProps;

export const LabelCopyCodeButton = ({ label, children, code, className, ...props }: LabelCopyCodeButtonProps) => {
  const { label: labelForm } = form();
  const { copied, copy } = useCopyToClipboard(code);
  const buttonRootClassName = twMerge('gap-3 font-medium w-full flex', className);

  return (
    <Fragment>
      {label && (<Label size="sm" className={labelForm({})}>{label}</Label>)}
      <Button.Root className={buttonRootClassName} variant="ghost" intent="gray" onClick={copy} {...props}>
        <Button.Label className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
          <code className="overflow-hidden whitespace-nowrap text-ellipsis">{children}</code>
        </Button.Label>
        <Button.Icon type="trailing" onClick={copy} size="xs">
          {copied ? <CheckIcon className="text-gray-950 dark:text-white" /> : <Copy />}
        </Button.Icon>
      </Button.Root>
    </Fragment>

  );
};

export default CodeCopyButton;
