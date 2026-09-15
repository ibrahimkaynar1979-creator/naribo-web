import { MakarillaProductDetail } from '../../../../../components/qr-menu/MakarillaProductDetail';

export default async function MakarillaProductPage({ params, searchParams }: { params: Promise<{ productId: string }>; searchParams: Promise<{ from?: string }> }) {
  const { productId } = await params;
  const { from } = await searchParams;
  return <MakarillaProductDetail productId={productId} fromCategory={from} />;
}
