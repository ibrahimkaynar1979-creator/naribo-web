'use client';

import { ArrowLeft, ChevronDown, CreditCard, MapPin, MoreHorizontal, Search, Wifi } from 'lucide-react';
import { useMemo, useState } from 'react';
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

export function MakarillaMenuView() {
  const [active, setActive] = useState('pastas');
  const [query, setQuery] = useState('');
  const categories = makarillaRestaurant.categories.filter(c => c.isActive);
  const products = useMemo(() => makarillaRestaurant.products.filter(p => p.isActive && (!query ? p.categoryId === active : `${p.name} ${p.description}`.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr')))), [active, query]);
  const activeCategory = categories.find(c => c.id === active);

  return <main className="mk-menu-shell">
    <div className="mk-menu-page">
      <header className="mk-menu-header">
        <button className="mk-back" onClick={() => window.location.href='/menu/makarilla'} aria-label="Geri"><ArrowLeft/></button>
        <img src="/makarilla-menu-logo.png" alt="Makarilla" />
        <button className="mk-lang">TR <ChevronDown/></button>
      </header>

      <div className="mk-search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ürünler içinde arama yapın" /></div>

      <nav className="mk-category-strip" aria-label="Menü kategorileri">
        {categories.map(category => <button key={category.id} className={active===category.id ? 'active' : ''} onClick={()=>{setActive(category.id);setQuery('')}}>
          <span className="mk-category-image"><img src={categoryImages[category.id]} alt="" /></span>
          <span>{category.name}</span>
        </button>)}
      </nav>

      <section className="mk-category-hero">
        <img src={categoryImages[active]} alt={activeCategory?.name || 'Makarilla'} />
        <div className="mk-category-shade"/>
        <div className="mk-category-title"><small>GERÇEK İTALYAN LEZZETİ</small><h1>{query ? 'Arama Sonuçları' : activeCategory?.name}</h1><p>{query ? `“${query}” için bulunan lezzetler` : 'Taze malzemeler, özel tarifler, keyifli anlar.'}</p></div>
      </section>

      <section className="mk-products">
        <div className="mk-products-heading"><h2>{query ? 'Bulunan Ürünler' : activeCategory?.name}</h2><span>{products.length} ürün</span></div>
        {products.length ? products.map(product => <article className="mk-product" key={product.id}>
          <img src={product.image} alt={product.name}/>
          <div><h3>{product.name}</h3><p>{product.description}</p><strong>₺{product.price}</strong></div>
        </article>) : <div className="mk-empty">Aramanızla eşleşen ürün bulunamadı.</div>}
      </section>

      <div className="mk-powered">Powered By <b>paneltakip.com</b></div>
    </div>

    <nav className="mk-bottom-nav">
      <button><Wifi/><span>Wi-Fi</span></button><button><CreditCard/><span>IBAN</span></button><button onClick={()=>window.open('https://www.google.com/maps/search/?api=1&query=Karşıyaka%20İzmir','_blank')}><MapPin/><span>Yol Tarifi</span></button><button><MoreHorizontal/><span>Daha Fazla</span></button>
    </nav>
  </main>;
}
