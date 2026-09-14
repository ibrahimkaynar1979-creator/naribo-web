import { QrMenuApp } from '../../../components/qr-menu/QrMenuApp';
import { saltRestaurant } from '../../../lib/qr-menu/salt';
import './salt-reference.css';

export default function SaltMenuPage() {
  return <QrMenuApp restaurant={saltRestaurant} />;
}
