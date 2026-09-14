'use client';

import { useMemo, useState } from 'react';
import { ChevronRight, Globe2, Menu, Search, BellRing, Wifi, CreditCard, MapPin, Instagram, Star, X, MoreHorizontal } from 'lucide-react';
import type { QrMenuProduct, QrMenuRestaurant } from '../../lib/qr-menu/types';
import './makarilla-customer-premium.css';

const categoryEmoji: Record<string,string> = {pastas:'🍝','chicken-pastas':'🍗',salads:'🥗',wraps:'🌯',desserts:'🍰',drinks:'🥤'};

export function MakarillaCustomerPremium({ restaurant }: { restaurant: QrMenuRestaurant }) {
  const [query,setQuery] = useState('');
  const [cat,setCat] = useState('all');
  const [selected,setSelected] = useState<QrMenuProduct|null>(null);
  const [drawer,setDrawer] = useState(false);
  const activeProducts = useMemo(()=>restaurant.products.filter(p=>p.isActive),[restaurant.products]);
  const products = useMemo(()=>activeProducts.filter(p=>cat==='all'||p.categoryId===cat).filter(p=>`${p.name} ${p.description}`.toLocaleLowerCase('tr-TR').includes(query.toLocaleLowerCase('tr-TR'))),[activeProducts,cat,query]);
  const hero = activeProducts.find(p=>p.isFeatured) ?? activeProducts[0];
  const featured = activeProducts.filter(p=>p.isFeatured).slice(0,4);
  const activeCategories = restaurant.categories.filter(c=>c.isActive);
  const vars = {'--menu-accent':restaurant.theme.accent,'--menu-bg':'#071113','--menu-surface':'#0d181b','--menu-text':'#f7f4ee','--menu-muted':'#a7b0ad'} as React.CSSProperties;
  const ProductRow=({p,index}:{p:QrMenuProduct,index:number})=><button className="mkc-product" onClick={()=>setSelected(p)}><img src={p.image} alt={p.name}/><div><div className="mkc-name-line"><strong>{p.name}</strong>{index===0&&<em>★ Şefin Özeli</em>}{index===2&&<em className="new">Yeni</em>}</div><p>{p.description}</p></div><b>₺{p.price}</b></button>;

  return <main className="mkc-stage" style={vars}><section className="mkc-app">
    <header className="mkc-topbar"><img src={restaurant.logo} alt={restaurant.name} className="mkc-logo"/><div className="mkc-top-actions"><button className="mkc-lang"><Globe2 size={16}/> TR <span>⌄</span></button><button className="mkc-menu-btn" onClick={()=>setDrawer(true)}><Menu size={21}/></button></div></header>
    {hero&&<section className="mkc-hero"><img src={hero.image} alt={hero.name}/><div className="mkc-hero-shade"/><div className="mkc-hero-copy"><small>ŞEFİN ÖZELİ</small><h1>{hero.name}</h1><p>{hero.description}</p><button onClick={()=>document.getElementById('mkc-menu-start')?.scrollIntoView({behavior:'smooth'})}>Menüyü Keşfet <ChevronRight size={18}/></button></div><div className="mkc-hero-dots"><i className="is-active"/><i/><i/></div></section>}
    <section className="mkc-body" id="mkc-menu-start">
      <label className="mkc-search"><Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ürün, kategori veya içerik ara..."/></label>
      <div className="mkc-categories"><button className={cat==='all'?'is-active':''} onClick={()=>setCat('all')}><span>🍽️</span><small>Tümü</small></button>{activeCategories.map(c=><button key={c.id} className={cat===c.id?'is-active':''} onClick={()=>setCat(c.id)}><span>{categoryEmoji[c.id]||'🍴'}</span><small>{c.name}</small></button>)}</div>
      {!query&&cat==='all'&&<section className="mkc-promo"><div><small>TAZE MALZEME</small><strong>GERÇEK İTALYAN LEZZETİ</strong><span>🇮🇹 &nbsp; İTALYAN MUTFAĞI</span></div><img src={featured[1]?.image||hero?.image} alt="İtalyan mutfağı"/><button aria-label="Kampanyayı gör"><ChevronRight/></button></section>}
      {query||cat!=='all'?<><div className="mkc-section-head"><h2>{query?'Arama Sonuçları':activeCategories.find(c=>c.id===cat)?.name}</h2>{cat!=='all'&&<button onClick={()=>setCat('all')}>Tümü <ChevronRight size={16}/></button>}</div><div className="mkc-product-list">{products.map((p,i)=><ProductRow key={p.id} p={p} index={i}/>)}</div></>:
      <div className="mkc-category-sections">{activeCategories.map(category=>{const list=activeProducts.filter(p=>p.categoryId===category.id).slice(0,4);if(!list.length)return null;return <section className="mkc-category-block" key={category.id}><div className="mkc-section-head"><h2>{category.name}</h2><button onClick={()=>setCat(category.id)}>Tümünü Gör <ChevronRight size={16}/></button></div><div className="mkc-product-list">{list.map((p,i)=><ProductRow key={p.id} p={p} index={i}/>)}</div></section>})}</div>}
    </section>
    <nav className="mkc-quickbar"><button className="primary"><BellRing/><span>Garson</span></button><button><Wifi/><span>Wi‑Fi</span></button><button><MapPin/><span>Yol Tarifi</span></button><button onClick={()=>setDrawer(true)}><MoreHorizontal/><span>Daha Fazla</span></button></nav>
  </section>
  {selected&&<div className="mkc-modal-backdrop" onClick={()=>setSelected(null)}><article className="mkc-modal" onClick={e=>e.stopPropagation()}><button className="mkc-close" onClick={()=>setSelected(null)}><X/></button><img src={selected.image} alt={selected.name}/><div><small>MAKARILLA</small><h2>{selected.name}</h2><b>₺{selected.price}</b><p>{selected.description}</p>{selected.allergens?.length?<div className="mkc-tags">{selected.allergens.map(a=><span key={a}>{a}</span>)}</div>:null}</div></article></div>}
  {drawer&&<div className="mkc-drawer-backdrop" onClick={()=>setDrawer(false)}><aside className="mkc-drawer" onClick={e=>e.stopPropagation()}><button className="mkc-close" onClick={()=>setDrawer(false)}><X/></button><img src={restaurant.logo} alt={restaurant.name}/><button><BellRing/> Garson Çağır</button><button><Wifi/> Wi‑Fi Bilgileri</button><button><CreditCard/> IBAN</button><button><MapPin/> Yol Tarifi</button><button><Instagram/> Sosyal Medya</button><button><Star/> Yorum Yap</button></aside></div>}
  </main>;
}
