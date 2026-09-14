import { MakarillaProductDetail } from '../../../../../components/qr-menu/MakarillaProductDetail';

export default async function MakarillaProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  return <MakarillaProductDetail productId={productId} />;
}
