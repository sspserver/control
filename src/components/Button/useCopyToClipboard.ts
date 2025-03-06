import type React from 'react';
import { useState } from 'react';

function useCopyToClipboard(text: string) {
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
}

export default useCopyToClipboard;
