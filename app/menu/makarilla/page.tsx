import { QrMenuPremiumApp } from '../../../components/qr-menu/QrMenuPremiumApp';
import { makarillaRestaurant } from '../../../lib/qr-menu/makarilla';

export default function MakarillaMenuPage() {
  return <QrMenuPremiumApp restaurant={makarillaRestaurant} />;
}
