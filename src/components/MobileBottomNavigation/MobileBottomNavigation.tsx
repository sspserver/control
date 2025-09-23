'use client';

import Link from '@components/Link';
import { mainMenuItems } from '@components/MainMenu/MainMenu.const';
import { configPathRoutes } from '@configs/routes';
import { popover } from '@tailus/themer';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const { content } = popover();

function MobileBottomNavigation() {
  const { push } = useRouter();
  const pathname = usePathname();
  const baseClassNames = 'flex h-12 fixed p-0 pb-1 bottom-0 left-0 z-10 w-full rounded-bl-none rounded-br-none rounded-none';
  const className = content({
    fancy: true,
    className: baseClassNames,
  });

  return (
    <div
      className={className}
    >
      {mainMenuItems.filter(({ path }) => path !== configPathRoutes.settings).map(({ name, Icon, path }) => {
        const isActiveItem = pathname?.startsWith(path);
        const strokeWidth = isActiveItem ? 1.4 : 1;
        const activeTextClassName = isActiveItem ? 'text-white' : 'text-gray-500 dark:text-gray-400';

        return (
          <div key={path} className={twMerge('grow basis-0 text-center content-center text-lg h-full relative', isActiveItem && 'before:absolute before:inset-x-0 before:-top-0 before:h-0.5 before:rounded-t-full before:bg-primary-600 ')}>
            <Link
              mainNav
              onClick={() => push(path)}
              label={(
                <span className={`flex flex-col pt-1.5 align-center items-center gap-0.5 ${activeTextClassName}`}>
                  <Icon size={22} strokeWidth={strokeWidth} />
                  <span className=" overflow-hidden h-4 text-center">{name}</span>
                </span>
              )}
              isActive={isActiveItem}
              className="px-0 font-medium text-xs cursor-pointer dark:hover:bg-transparent dark:active:bg-transparent"
            />
          </div>
        );
      })}
    </div>
  );
}

export default MobileBottomNavigation;
