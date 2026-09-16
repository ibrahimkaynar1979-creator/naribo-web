import type { Metadata } from 'next';
import MobileNav from './MobileNav';
import HeroPlatformDrop from './HeroPlatformDrop';
import AdminImageUploadEnhancer from './AdminImageUploadEnhancer';
import AdminFeedbackEnhancer from './AdminFeedbackEnhancer';
import AdminStatsEnhancer from './AdminStatsEnhancer';
import './globals.css';
import './mobile-overrides.css';
import './hero-mobile.css';
import './typography-system.css';
import './paneltakip-brand.css';
import './hero-platform-drop.css';

export const metadata: Metadata = {
  title: 'PanelTakip | Restoran Büyüme & Yönetim Hizmeti',
  description: 'PanelTakip; restoranların yemek platformlarındaki satışını, panel yönetimini, sipariş sayısını ve gerçek kârlılığını büyütmeye odaklanan restoran büyüme ve yönetim hizmetidir.',
  openGraph: {
    title: 'PanelTakip | Restoran Büyüme & Yönetim Hizmeti',
    description: 'Daha fazla sipariş, daha kârlı büyüme. Yemek platformlarındaki satışınızı ve panellerinizi PanelTakip ile yönetin.',
    type: 'website',
    locale: 'tr_TR'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}<AdminImageUploadEnhancer/><AdminFeedbackEnhancer/><AdminStatsEnhancer/><HeroPlatformDrop/><MobileNav/></body>
    </html>
  );
}
