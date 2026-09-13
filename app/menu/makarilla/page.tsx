import { MakarillaReferenceHome } from '../../../components/qr-menu/MakarillaReferenceHome';
import { makarillaRestaurant } from '../../../lib/qr-menu/makarilla';

export default function MakarillaMenuPage() {
  return <MakarillaReferenceHome restaurant={makarillaRestaurant} />;
}
