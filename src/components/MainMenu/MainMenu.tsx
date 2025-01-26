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
        {mainMenuItems.map(({ name, path }) => (
          <Link
            key={path}
            link={path}
            label={name}
            isActive={`/${path}`.startsWith(pathname)}
          />
        ))}
      </nav>
    </div>
  );
}

export default MainMenu;
