import { QrMenuApp } from '../../../components/qr-menu/QrMenuApp';
import { saltRestaurant } from '../../../lib/qr-menu/salt';

export default function SaltMenuPage() {
  return <QrMenuApp restaurant={saltRestaurant} />;
}
