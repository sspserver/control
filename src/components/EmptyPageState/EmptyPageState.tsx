import { Text, Title } from '@tailus-ui/typography';

import React from 'react';
import EmptyPageStateIllustration from './EmptyPageStateIllustration';

type EmptyPageStateProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

function EmptyPageState({ title, description, children }: EmptyPageStateProps) {
  return (
    <div className="max-w-sm mx-auto space-y-6 h-[calc(100vh-220px)] flex flex-col items-center justify-center">
      <EmptyPageStateIllustration />
      <div className="space-y-2 text-center">
        {title && (<Title size="lg">{title}</Title>)}
        {description && (<Text>{description}</Text>)}
      </div>
      {children}
    </div>
  );
}

export default EmptyPageState;
