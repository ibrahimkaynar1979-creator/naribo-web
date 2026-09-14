import { MakarillaMenuView } from '../../../components/qr-menu/MakarillaMenuView';
import { SaltLanding } from '../../../components/qr-menu/SaltLanding';
import { makarillaRestaurant } from '../../../lib/qr-menu/makarilla';

export default async function MakarillaMenuPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const params = await searchParams;
  if (params.view === 'menu') return <MakarillaMenuView />;
  return <SaltLanding restaurant={makarillaRestaurant} />;
}
