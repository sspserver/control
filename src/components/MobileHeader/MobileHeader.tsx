import Logo from '@components/Logo';
import UserDropdown from '@components/UserDropdown';
import { popover } from '@tailus/themer';
import NextLink from 'next/link';
import React from 'react';

const { content } = popover();

function MobileHeader() {
  const baseClassNames = 'flex h-12 p-0 pl-5 pr-5 items-center fixed top-0 left-0 z-10 w-full justify-between rounded-bl-none rounded-br-none rounded-none';
  const className = content({
    fancy: true,
    className: baseClassNames,
  });

  return (
    <div className={className}>
      <NextLink href="/">
        <Logo
          width="32"
          height="32"
          className="drum"
        />
      </NextLink>

      <UserDropdown />
    </div>
  );
}

export default MobileHeader;
