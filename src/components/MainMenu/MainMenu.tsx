'use client';

import Link from '@/components/Link';
import { mainMenuItems } from '@/components/MainMenu/MainMenu.const';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

function MainMenu() {
  const { push } = useRouter();
  const pathname = usePathname();

  return (
    <nav className="flex min-h-full gap-2">
      {mainMenuItems.map(({ name, path }) => {
        const isActiveItem = pathname?.startsWith(path);

        return (
          <div key={path} className={twMerge('content-center text-lg h-full relative', isActiveItem && 'before:absolute before:inset-x-0 before:-bottom-0 before:h-0.5 before:rounded-t-full before:bg-primary-600 ')}>
            <Link
              mainNav
              onClick={() => push(path)}
              label={name}
              isActive={isActiveItem}
              className="font-medium cursor-pointer"
            />
          </div>
        );
      })}
    </nav>
  );
}

export default MainMenu;
