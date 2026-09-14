'use client';

import { ArrowLeft, ChevronDown, CreditCard, MapPin, MoreHorizontal, Wifi } from 'lucide-react';
import { useState } from 'react';
import { makarillaRestaurant } from '../../lib/qr-menu/makarilla';
import './makarilla-menu.css';

const categoryImages: Record<string, string> = {
  pastas: '/makarilla_tabak.png',
  'chicken-pastas': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=88',
  salads: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=88',
  wraps: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=88',
  desserts: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=88',
  drinks: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=88',
};

const categoryHeroImages: Record<string, string> = {
  pastas: '/makarilla_tabak_v2.png',
  'chicken-pastas': '/tavuklar_banner.png',
  wraps: '/wrap_banner.png',
};

const categoryOrder = ['pastas', 'chicken-pastas', 'wraps', 'salads', 'desserts', 'drinks'];
const categoryLabels: Record<string, string> = {
  pastas: 'Makarnalar',
  'chicken-pastas': 'Tavuklar',
  wraps: 'Wraplar',
  salads: 'Salatalar',
  desserts: 'Tatlılar',
  drinks: 'İçecekler',
};

export function MakarillaMenuView() {
  const [active, setActive] = useState('pastas');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const categories = makarillaRestaurant.categories
    .filter(c => c.isActive)
    .sort((a, b) => categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id));
  const products = makarillaRestaurant.products.filter(p => p.isActive && p.categoryId === active);
  const activeCategory = categories.find(c => c.id === active);
  const heroImage = categoryHeroImages[active] || '/makarilla_tabak_v2.png';
  const activeLabel = categoryLabels[active] || activeCategory?.name;
  const selectedProduct = makarillaRestaurant.products.find(p => p.id === selectedProductId);
  const selectedCategoryLabel = selectedProduct ? (categoryLabels[selectedProduct.categoryId] || categories.find(c => c.id === selectedProduct.categoryId)?.name) : '';

  const handleBack = () => {
    if (selectedProduct) {
      setSelectedProductId(null);
      return;
    }
    window.location.href = '/menu/makarilla';
  };

  return <main className="mk-menu-shell">
    <div className="mk-menu-page">
      <header className="mk-menu-header">
        <button className="mk-back" onClick={handleBack} aria-label="Geri"><ArrowLeft/></button>
        <img src="/makarilla-menu-logo.png" alt="Makarilla" />
        <button className="mk-lang">TR <ChevronDown/></button>
      </header>

      {selectedProduct ? <section className="mk-product-detail">
        <div className="mk-product-detail-image-wrap">
          <img className="mk-product-detail-image" src={selectedProduct.image} alt={selectedProduct.name} />
          <div className="mk-product-detail-shape mk-product-detail-shape-peach" />
          <div className="mk-product-detail-shape mk-product-detail-shape-sage" />
        </div>
        <div className="mk-product-detail-content">
          <span className="mk-product-detail-kicker">{selectedCategoryLabel}</span>
          <h1>{selectedProduct.name}</h1>
          <div className="mk-product-detail-line" />
          <p className="mk-product-detail-description">{selectedProduct.description}</p>
          {selectedProduct.allergens?.length ? <div className="mk-product-detail-allergens">
            <span className="mk-product-detail-meta-title">Alerjenler</span>
            <div>{selectedProduct.allergens.map(allergen => <span key={allergen}>{allergen}</span>)}</div>
          </div> : null}
          <div className="mk-product-detail-price">₺{selectedProduct.price}</div>
          <div className="mk-product-detail-note">Sipariş alınmamaktadır · Menü bilgilendirme amaçlıdır.</div>
        </div>
        <div className="mk-powered">Powered By <b>paneltakip.com</b></div>
      </section> : <>
        <nav className="mk-category-strip" aria-label="Menü kategorileri">
          {categories.map(category => <button key={category.id} className={active===category.id ? 'active' : ''} onClick={()=>setActive(category.id)}>
            <span className="mk-category-image"><img src={categoryImages[category.id]} alt="" /></span>
            <span>{categoryLabels[category.id] || category.name}</span>
          </button>)}
        </nav>

        <section className="mk-category-hero mk-landing-hero">
          <div className="mk-hero-shape mk-hero-shape-peach" />
          <div className="mk-hero-shape mk-hero-shape-sage" />
          <div className="mk-hero-copy">
            <div className="mk-hero-eyebrow">GERÇEK İTALYAN LEZZETİ</div>
            <div className="mk-hero-red-line" />
            <h1>{activeLabel}</h1>
            <p>Taze malzemeler,<br/>özel tarifler.</p>
          </div>
          <img className="mk-hero-plate" src={heroImage} alt={activeLabel || 'Makarilla'} />
        </section>

        <section className="mk-products">
          <div className="mk-products-heading"><h2>{activeLabel}</h2><span>{products.length} ürün</span></div>
          {products.length ? products.map(product => <button className="mk-product" key={product.id} onClick={() => setSelectedProductId(product.id)}>
            <img src={product.image} alt={product.name}/>
            <div><h3>{product.name}</h3><p>{product.description}</p><strong>₺{product.price}</strong></div>
          </button>) : <div className="mk-empty">Bu kategoride henüz ürün bulunmuyor.</div>}
        </section>

        <div className="mk-powered">Powered By <b>paneltakip.com</b></div>
      </>}
    </div>

    <nav className="mk-bottom-nav">
      <button><Wifi/><span>Wi-Fi</span></button><button><CreditCard/><span>IBAN</span></button><button onClick={()=>window.open('https://www.google.com/maps/search/?api=1&query=Karşıyaka%20İzmir','_blank')}><MapPin/><span>Yol Tarifi</span></button><button><MoreHorizontal/><span>Daha Fazla</span></button>
    </nav>
  </main>;
}
