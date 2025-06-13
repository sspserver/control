import type { Metadata, Viewport } from 'next';

import authOptions from '@/app/api/auth/[...nextauth]/options';
import AppProviders from '@/components/AppProviders';
import LoadingNavigateBar from '@components/LoadingNavigateBar';
import { getServerSession } from 'next-auth';
import React from 'react';
import './globals.css';

export const metadata: Metadata
    = {
      title: 'SSP Control',
      description: 'SSP Control',
    };

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  drawer: React.ReactNode;
}>;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

async function RootLayout({
  children,
  drawer,
}: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" data-shade="glassy">
      <body>
        <LoadingNavigateBar />
        <AppProviders session={session}>
          {children}
          {drawer}
        </AppProviders>
      </body>
    </html>
  );
}

export default RootLayout;
