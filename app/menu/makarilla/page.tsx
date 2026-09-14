import { SaltLanding } from '../../../components/qr-menu/SaltLanding';
import { makarillaRestaurant } from '../../../lib/qr-menu/makarilla';

export default function MakarillaMenuPage() {
  return <SaltLanding restaurant={makarillaRestaurant} />;
}
