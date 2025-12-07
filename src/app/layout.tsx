import type { Metadata, Viewport } from 'next';

import LoadingNavigateBar from '@components/LoadingNavigateBar';

import { getServerSession } from 'next-auth';
import localFont from 'next/font/local';
import React from 'react';
import authOptions from '@/app/api/auth/[...nextauth]/options';
import AppProviders from '@/components/AppProviders';
import './globals.css';

// Load Geist font
const geist = localFont({
  variable: '--font-geist',
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/Geist/Geist-Thin.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist/Geist-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist/Geist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist/Geist-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist/Geist-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist/Geist-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist/Geist-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
});

// Load Geist Mono font
const geistMono = localFont({
  variable: '--font-geist-mono',
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/Geist_Mono/GeistMono-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist_Mono/GeistMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist_Mono/GeistMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist_Mono/GeistMono-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist_Mono/GeistMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
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

function pickPublicEnv() {
  const keys = ['NEXT_PUBLIC_API_URL', 'API_URL'] as const;
  const obj: Record<string, string | undefined> = {};
  for (const k of keys) {
    obj[k] = process.env[k];
  }
  return obj;
}

async function RootLayout({ children, drawer }: RootLayoutProps) {
  const session = await getServerSession(authOptions);
  const runtimeEnv = pickPublicEnv();

  return (
    <html lang="en" data-shade="glassy" className={`${geist.variable} ${geistMono.variable}`}>
      <body className={geist.className}>
        {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
        <script dangerouslySetInnerHTML={{ __html: `window.__ENV__=${JSON.stringify(runtimeEnv)};` }} />
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
