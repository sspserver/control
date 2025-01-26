import Link from '@/components/Link';
import Logo from '@/components/Logo';
import MainMenu from '@/components/MainMenu/MainMenu';
import UserDropdown from '@/components/UserDropdown';
import NextLink from 'next/link';
import React, { Fragment } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <header className="feedback-bg fixed top-0 z-10 w-full border-b">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-center justify-between py-4">
            <div className="flex h-7 items-center gap-4">
              <NextLink href="/" hidden className="sm:block">
                <Logo
                  width="28"
                  height="28"
                />
              </NextLink>
            </div>
            <div className="flex items-center gap-4">
              <Link link="#" label="Help" mainNav={false} />
              <div className="size-6 hidden sm:block">
                <UserDropdown />
              </div>
            </div>
          </div>
          <MainMenu />
        </div>
      </header>
      <main className="mx-auto mt-28 h-full max-w-6xl px-5 space-y-6 py-6">
        <div>{children}</div>
        {/* <StackedCards /> */}
        {/* <div className="grid gap-6 lg:grid-cols-2"> */}
        {/*  <TwoAreasChart /> */}
        {/*  <SimpleBarChart /> */}
        {/*  <Traffic /> */}
        {/*  <StackedAreaChart /> */}
        {/* </div> */}
        {/* <Orders /> */}
      </main>
    </Fragment>
  );
}
