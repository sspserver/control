import Logo from '@/components/Logo';
import MainMenu from '@/components/MainMenu/MainMenu';
import MobileBottomNavigation from '@components/MobileBottomNavigation/MobileBottomNavigation';
import MobileHeader from '@components/MobileHeader';
import UserDropdown from '@components/UserDropdown/UserDropdown';
import NextLink from 'next/link';

import React, { Fragment } from 'react';

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <Fragment>
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <header className="feedback-bg fixed top-0 z-10 w-full border-b backdrop-blur fancy-border max-md:hidden">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex justify-between items-stretchs max-sm:h-16">
            <div className="flex items-center gap-4 py-3">
              <NextLink href="/" hidden className="sm:block accent-primary-50">
                <Logo
                  title="SSP Server"
                  className="drum size-10"
                />
              </NextLink>
            </div>
            <MainMenu />
            <div className="flex items-center gap-4">
              <div className="size-6 hidden sm:block">
                <UserDropdown />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto mt-20 h-full max-w-6xl px-5 py-4 max-md:mt-12 max-md:pb-16">
        {children}
      </main>
      <div className="md:hidden">
        <MobileBottomNavigation />
      </div>
    </Fragment>
  );
}

export default RootLayout;
