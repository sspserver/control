import type { Metadata, Viewport } from 'next';

import authOptions from '@/app/api/auth/[...nextauth]/options';
import AppProviders from '@/components/AppProviders';
import LoadingNavigateBar from '@components/LoadingNavigateBar';
import { getServerSession } from 'next-auth';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
