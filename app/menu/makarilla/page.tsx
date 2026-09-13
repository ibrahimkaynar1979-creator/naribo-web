import { QrMenuApp } from '../../../components/qr-menu/QrMenuApp';
import { makarillaRestaurant } from '../../../lib/qr-menu/makarilla';

export default function MakarillaMenuPage() {
  return <QrMenuApp restaurant={makarillaRestaurant} />;
}
