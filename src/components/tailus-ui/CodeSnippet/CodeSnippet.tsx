import ScrollArea from '@tailus-ui/ScrollArea';
import Prism from 'prismjs';
import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import CodeCopyButton from '../../Button/CodeCopyButton';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import '@styles/code-line-highlight.css';
import '@styles/code-theme.css';

export type CodeSnippetProps = {
  code: string;
  lang?: string;
  filename?: string;
  highlightedLines?: string;
  highlightStart?: string;
  asUIBlock?: boolean;
} & React.HTMLAttributes<HTMLModElement>;

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  lang,
  className,
  highlightedLines,
  highlightStart,
  asUIBlock,
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, lang]);

  return (
    <div
      data-pagefind-ignore
      className={twMerge('group/snippet relative w-full rounded-[--card-radius] border backdrop-blur-xl dark:bg-gray-950/50', className)}
    >
      {!asUIBlock && <CodeCopyButton code={code} className="group invisible absolute right-1 top-1 z-10 ml-auto scale-75 rounded-lg opacity-0 transition-all duration-200 group-hover/snippet:visible group-hover/snippet:scale-100 group-hover/snippet:opacity-100" />}
      <ScrollArea.Root className={twMerge('max-h-[20rem]', asUIBlock && 'max-h-[45rem]')} type="scroll">
        <ScrollArea.Viewport className="w-full">
          <pre data-line={highlightedLines} data-start={highlightStart} className="h-max w-full p-4 text-sm">
            <code className={`language-${lang} font-mono text-sm`}>{code}</code>
          </pre>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="horizontal" />
        <ScrollArea.Scrollbar orientation="vertical" />
      </ScrollArea.Root>
    </div>
  );
};

export default CodeSnippet;
