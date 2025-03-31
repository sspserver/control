import type { ReactNode } from 'react';
import Separator from '@tailus-ui/Separator';
import { Caption } from '@tailus-ui/typography';
import React from 'react';

type FormSeparatorProps = {
  children: ReactNode;
};

function FormSeparator({ children }: FormSeparatorProps) {
  return (
    <div className="relative grid items-center gap-3 [grid-template-columns:1fr_auto_1fr]">
      <Separator className="h-px border-b" />
      <Caption as="span" className="block" size="sm">
        {children}
      </Caption>
      <Separator className="h-px border-b" />
    </div>
  );
}

export default FormSeparator;
