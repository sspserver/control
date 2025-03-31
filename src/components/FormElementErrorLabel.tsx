import { Caption } from '@tailus-ui/typography';
import React from 'react';

type FormElementErrorLabelProps = {
  error?: React.ReactNode;
};

function FormElementErrorLabel({ error }: FormElementErrorLabelProps) {
  if (error) {
    return (<Caption size="xs" className=" pt-2 text-red-400">{error}</Caption>);
  }

  return null;
}

export default FormElementErrorLabel;
