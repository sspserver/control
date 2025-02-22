'use client';

import Link from '@/components/Link';
import { mainMenuItems } from '@/components/MainMenu/MainMenu.const';
import { usePathname } from 'next/navigation';
import React from 'react';

function MainMenu() {
  const pathname = usePathname();

  return (
    <div className="flex gap-1">
      <nav className="relative flex h-10 gap-2 pb-2">
        {mainMenuItems.map(({ name, path }) => {
          const isActiveItem = pathname?.startsWith(path);

          return (
            <Link
              mainNav
              key={path}
              link={path}
              label={name}
              isActive={isActiveItem}
            />
          );
        })}
      </nav>
    </div>
  );
}

export default MainMenu;
