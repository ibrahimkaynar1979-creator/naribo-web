import type { Metadata } from 'next';
import MobileNav from './MobileNav';
import './globals.css';
import './mobile-overrides.css';
import './hero-mobile.css';
import './typography-system.css';

export const metadata: Metadata = {
  title: 'Naribo | Restoran Büyüme Ortağı',
  description: 'Naribo; restoranların yemek platformlarındaki satışını, sipariş sayısını ve gerçek kârlılığını büyütmeye odaklanan restoran büyüme ortağıdır.',
  openGraph: {
    title: 'Naribo | Restoran Büyüme Ortağı',
    description: 'Daha fazla sipariş, daha kârlı büyüme. Restoranınızın dijital satışını Naribo ile büyütün.',
    type: 'website',
    locale: 'tr_TR'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}<MobileNav/></body>
    </html>
  );
}
