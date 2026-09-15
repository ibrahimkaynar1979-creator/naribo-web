import { SaltLanding } from '../../../components/qr-menu/SaltLanding';
import { saltRestaurant } from '../../../lib/qr-menu/salt';

export default function SaltMenuPage() {
  return <SaltLanding restaurant={saltRestaurant} />;
}
