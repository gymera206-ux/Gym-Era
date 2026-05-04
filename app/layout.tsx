import type { Metadata } from 'next';
import { Josefin_Sans, Inter } from 'next/font/google';
import './globals.css';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-josefin',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gymera.com'),
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${josefin.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="has-hero">
        {children}
      </body>
    </html>
  );
}
