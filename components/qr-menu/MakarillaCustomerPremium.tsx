'use client';

import { useMemo, useState } from 'react';
import { ChevronRight, Globe2, Menu, Search, BellRing, Wifi, CreditCard, MapPin, Instagram, Star, X } from 'lucide-react';
import type { QrMenuProduct, QrMenuRestaurant } from '../../lib/qr-menu/types';
import './makarilla-customer-premium.css';

const categoryEmoji: Record<string,string> = {
  pastas:'🍝','chicken-pastas':'🍗',salads:'🥗',wraps:'🌯',desserts:'🍰',drinks:'🥤'
};

export function MakarillaCustomerPremium({ restaurant }: { restaurant: QrMenuRestaurant }) {
  const [query,setQuery] = useState('');
  const [cat,setCat] = useState('all');
  const [selected,setSelected] = useState<QrMenuProduct|null>(null);
  const [drawer,setDrawer] = useState(false);
  const products = useMemo(()=>restaurant.products.filter(p=>p.isActive).filter(p=>cat==='all'||p.categoryId===cat).filter(p=>`${p.name} ${p.description}`.toLocaleLowerCase('tr-TR').includes(query.toLocaleLowerCase('tr-TR'))),[restaurant.products,cat,query]);
  const hero = restaurant.products.find(p=>p.isFeatured&&p.isActive) ?? products[0];
  const featured = restaurant.products.filter(p=>p.isFeatured&&p.isActive).slice(0,4);
  const vars = {
    '--menu-accent': restaurant.theme.accent,
    '--menu-bg': '#071113',
    '--menu-surface': '#0d181b',
    '--menu-text': '#f7f4ee',
    '--menu-muted': '#a7b0ad'
  } as React.CSSProperties;

  return <main className="mkc-stage" style={vars}>
    <section className="mkc-app">
      <header className="mkc-topbar">
        <img src={restaurant.logo} alt={restaurant.name} className="mkc-logo"/>
        <div className="mkc-top-actions">
          <button className="mkc-lang"><Globe2 size={16}/> TR <span>⌄</span></button>
          <button className="mkc-menu-btn" onClick={()=>setDrawer(true)}><Menu size={21}/></button>
        </div>
      </header>

      {hero && <section className="mkc-hero">
        <img src={hero.image} alt={hero.name}/>
        <div className="mkc-hero-shade"/>
        <div className="mkc-hero-copy">
          <small>ŞEFİN ÖZELİ</small>
          <h1>{hero.name}</h1>
          <p>{hero.description}</p>
          <button onClick={()=>setSelected(hero)}>Menüyü Keşfet <ChevronRight size={18}/></button>
        </div>
        <div className="mkc-hero-dots"><i className="is-active"/><i/><i/></div>
      </section>}

      <section className="mkc-body">
        <label className="mkc-search"><Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ürün, kategori veya içerik ara..."/></label>

        <div className="mkc-categories">
          <button className={cat==='all'?'is-active':''} onClick={()=>setCat('all')}><span>🍽️</span><small>Tümü</small></button>
          {restaurant.categories.filter(c=>c.isActive).map(c=><button key={c.id} className={cat===c.id?'is-active':''} onClick={()=>setCat(c.id)}><span>{categoryEmoji[c.id]||'🍴'}</span><small>{c.name}</small></button>)}
        </div>

        <section className="mkc-promo"><div><small>TAZE MALZEME</small><strong>GERÇEK İTALYAN LEZZETİ</strong><span>🇮🇹 &nbsp; İTALYAN MUTFAĞI</span></div><img src={featured[1]?.image||hero?.image} alt="İtalyan mutfağı"/><button><ChevronRight/></button></section>

        <div className="mkc-section-head"><h2>{cat==='all'?'Makarnalar':restaurant.categories.find(c=>c.id===cat)?.name}</h2><button onClick={()=>setCat('all')}>Tümünü Gör <ChevronRight size={16}/></button></div>
        <div className="mkc-product-list">{products.slice(0,8).map((p,i)=><button className="mkc-product" key={p.id} onClick={()=>setSelected(p)}><img src={p.image} alt={p.name}/><div><div className="mkc-name-line"><strong>{p.name}</strong>{i===0&&<em>★ Şefin Özeli</em>}{i===2&&<em className="new">Yeni</em>}</div><p>{p.description}</p></div><b>₺{p.price}</b></button>)}</div>
      </section>

      <nav className="mkc-quickbar">
        <button><BellRing/><span>Garson Çağır</span></button>
        <button><Wifi/><span>Wi‑Fi</span></button>
        <button><CreditCard/><span>IBAN</span></button>
        <button><MapPin/><span>Yol Tarifi</span></button>
        <button><Instagram/><span>Sosyal Medya</span></button>
        <button><Star/><span>Yorum Yap</span></button>
      </nav>
    </section>

    {selected&&<div className="mkc-modal-backdrop" onClick={()=>setSelected(null)}><article className="mkc-modal" onClick={e=>e.stopPropagation()}><button className="mkc-close" onClick={()=>setSelected(null)}><X/></button><img src={selected.image} alt={selected.name}/><div><small>MAKARILLA</small><h2>{selected.name}</h2><b>₺{selected.price}</b><p>{selected.description}</p>{selected.allergens?.length?<div className="mkc-tags">{selected.allergens.map(a=><span key={a}>{a}</span>)}</div>:null}</div></article></div>}

    {drawer&&<div className="mkc-drawer-backdrop" onClick={()=>setDrawer(false)}><aside className="mkc-drawer" onClick={e=>e.stopPropagation()}><button className="mkc-close" onClick={()=>setDrawer(false)}><X/></button><img src={restaurant.logo} alt={restaurant.name}/><button><BellRing/> Garson Çağır</button><button><Wifi/> Wi‑Fi Bilgileri</button><button><CreditCard/> IBAN</button><button><MapPin/> Yol Tarifi</button><button><Instagram/> Sosyal Medya</button><button><Star/> Yorum Yap</button></aside></div>}
  </main>;
}
