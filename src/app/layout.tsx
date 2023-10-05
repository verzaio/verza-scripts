'use client';

import '../styles/globals.scss';

import {Nunito_Sans} from 'next/font/google';

const nunito = Nunito_Sans({
  weight: ['300', '400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <head>
        <meta charSet="utf-8" />

        <link rel="icon" href="/favicon.png" />

        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, user-scalable=no"
        />

        <base href="/" />
      </head>

      <body>{children}</body>
    </html>
  );
}
