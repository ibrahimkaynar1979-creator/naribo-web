'use client';

import { ChevronDown, X } from 'lucide-react';
import { makarillaRestaurant } from '../../lib/qr-menu/makarilla';
import { MakarillaBottomNav } from './MakarillaBottomNav';
import './makarilla-menu.css';
import './makarilla-product-detail.css';

const categoryLabels: Record<string, string> = { pastas:'Makarnalar','chicken-pastas':'Tavuklar',wraps:'Wraplar',salads:'Salatalar',desserts:'Tatlılar',drinks:'İçecekler' };
const validCategories = Object.keys(categoryLabels);

export function MakarillaProductDetail({ productId, fromCategory }: { productId: string; fromCategory?: string }) {
  const product = makarillaRestaurant.products.find(p => p.id === productId && p.isActive);
  if (!product) return <main className="mk-menu-shell"><div className="mk-menu-page"><div className="mk-product-not-found">Ürün bulunamadı.</div></div></main>;

  const categoryLabel = categoryLabels[product.categoryId] || 'Menü';
  const returnCategory = fromCategory && validCategories.includes(fromCategory) ? fromCategory : product.categoryId;
  const closeDetail = () => { window.location.href = `/menu/makarilla?view=menu&category=${encodeURIComponent(returnCategory)}`; };

  return <main className="mk-menu-shell mk-detail-shell"><div className="mk-menu-page mk-detail-page-wrap">
    <header className="mk-menu-header"><button className="mk-back mk-detail-close" onClick={closeDetail} aria-label="Ürün detayını kapat"><X/></button><img src="/makarilla-menu-logo.png" alt="Makarilla"/><button className="mk-lang">TR <ChevronDown/></button></header>
    <section className="mk-detail-page"><div className="mk-detail-visual"><div className="mk-detail-orb mk-detail-orb-peach"/><div className="mk-detail-orb mk-detail-orb-sage"/><img src={product.image} alt={product.name}/></div>
      <div className="mk-detail-body"><div className="mk-detail-topline"><span className="mk-detail-category">{categoryLabel}</span><div className="mk-detail-price">₺{product.price}</div></div><h1>{product.name}</h1><div className="mk-detail-accent"/><p className="mk-detail-copy">{product.description}</p>{product.allergens?.length ? <div className="mk-detail-info"><span>Alerjenler</span><div className="mk-detail-chips">{product.allergens.map(item=><b key={item}>{item}</b>)}</div></div>:null}<div className="mk-detail-footnote"><span>Menü bilgilendirme amaçlıdır · Sipariş alınmamaktadır.</span><span>Powered By <b>paneltakip.com</b></span></div></div>
    </section></div><MakarillaBottomNav/></main>;
}
