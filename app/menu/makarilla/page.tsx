import { MakarillaCustomerPremium } from '../../../components/qr-menu/MakarillaCustomerPremium';
import { makarillaRestaurant } from '../../../lib/qr-menu/makarilla';

export default function MakarillaMenuPage() {
  return <MakarillaCustomerPremium restaurant={makarillaRestaurant} />;
}
