'use client';

import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { makarillaRestaurant } from '../../lib/qr-menu/makarilla';
import type { QrMenuProduct } from '../../lib/qr-menu/types';
import { MakarillaBottomNav } from './MakarillaBottomNav';
import './makarilla-menu.css';

const categoryImages: Record<string, string> = {pastas:'/makarilla_tabak.png','chicken-pastas':'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=88',salads:'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=88',wraps:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=88',desserts:'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=88',drinks:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=88'};
const categoryHeroImages: Record<string,string>={pastas:'/makarilla_tabak_v2.png','chicken-pastas':'/tavuklar_banner.png',wraps:'/wrap_banner_2.png'};
const categoryOrder=['pastas','chicken-pastas','wraps','salads','desserts','drinks'];
const categoryLabels:Record<string,string>={pastas:'Makarnalar','chicken-pastas':'Tavuklar',wraps:'Wraplar',salads:'Salatalar',desserts:'Tatlılar',drinks:'İçecekler'};
const categorySlogans:Record<string,string>={pastas:'Her tabakta başka bir keyif.','chicken-pastas':'Dolu dolu lezzet.',wraps:'Sarıldıkça güzelleşir.',salads:'Tazeliğin en iyi hali.',desserts:'Finali tatlı yapalım.',drinks:'Lezzete eşlik eden ferahlık.'};

export function MakarillaMenuView({initialCategory}:{initialCategory?:string}){
  const safeInitialCategory=initialCategory&&categoryOrder.includes(initialCategory)?initialCategory:'pastas';
  const [active,setActive]=useState(safeInitialCategory);
  const [menuProducts,setMenuProducts]=useState<QrMenuProduct[]>(makarillaRestaurant.products);
  useEffect(()=>{let cancelled=false;fetch('/api/qr-menu/makarilla',{cache:'no-store'}).then(r=>r.ok?r.json():Promise.reject()).then(data=>{if(!cancelled&&Array.isArray(data.products))setMenuProducts(data.products)}).catch(()=>{});return()=>{cancelled=true}},[]);
  const categories=useMemo(()=>makarillaRestaurant.categories.filter(c=>c.isActive).sort((a,b)=>categoryOrder.indexOf(a.id)-categoryOrder.indexOf(b.id)),[]);
  const products=menuProducts.filter(p=>p.isActive&&p.categoryId===active).sort((a,b)=>a.sortOrder-b.sortOrder);
  const activeCategory=categories.find(c=>c.id===active);const heroImage=categoryHeroImages[active]||'/makarilla_tabak_v2.png';const activeLabel=categoryLabels[active]||activeCategory?.name;const activeSlogan=categorySlogans[active]||'İyi malzeme. İyi tarif. İyi lezzet.';
  return <main className="mk-menu-shell"><div className="mk-menu-page"><header className="mk-menu-header"><button className="mk-back" onClick={()=>window.location.href='/menu/makarilla'} aria-label="Geri"><ArrowLeft/></button><img src="/makarilla-menu-logo.png" alt="Makarilla"/><button className="mk-lang">TR <ChevronDown/></button></header><nav className="mk-category-strip" aria-label="Menü kategorileri">{categories.map(category=><button key={category.id} className={active===category.id?'active':''} onClick={()=>setActive(category.id)}><span className="mk-category-image"><img src={categoryImages[category.id]} alt=""/></span><span>{categoryLabels[category.id]||category.name}</span></button>)}</nav><section className={`mk-category-hero mk-landing-hero${active==='wraps'?' mk-hero-wraps':''}`}><div className="mk-hero-shape mk-hero-shape-peach"/><div className="mk-hero-shape mk-hero-shape-sage"/><div className="mk-hero-copy"><div className="mk-hero-eyebrow">{activeSlogan}</div><div className="mk-hero-red-line"/><h1>{activeLabel}</h1><p>Taze malzemeler,<br/>özel tarifler.</p></div><img className="mk-hero-plate" src={heroImage} alt={activeLabel||'Makarilla'}/></section><section className="mk-products"><div className="mk-products-heading"><h2>{activeLabel}</h2><span>{products.length} ürün</span></div>{products.length?products.map(product=><button className="mk-product" key={product.id} onClick={()=>window.location.href=`/menu/makarilla/urun/${product.id}?from=${active}`}><img src={product.image} alt={product.name}/><div><h3>{product.name}</h3><p>{product.description}</p><strong>₺{product.price}</strong></div></button>):<div className="mk-empty">Bu kategoride henüz ürün bulunmuyor.</div>}</section><div className="mk-powered">Powered By <b>paneltakip.com</b></div></div><MakarillaBottomNav/></main>;
}
