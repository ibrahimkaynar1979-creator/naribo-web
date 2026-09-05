import type { Metadata } from 'next';
import './globals.css';
import './mobile-overrides.css';

export const metadata: Metadata = {
  title: 'Naribo | Restaurant Growth Partner',
  description: 'Restoranların dijital satış ve kârlılık büyüme ortağı.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
