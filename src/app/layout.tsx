import '../styles/globals.scss';

import {Metadata} from 'next';
import {Nunito_Sans} from 'next/font/google';

const nunito = Nunito_Sans({
  weight: ['300', '400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Scripts',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />

        <meta charSet="utf-8" />

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
