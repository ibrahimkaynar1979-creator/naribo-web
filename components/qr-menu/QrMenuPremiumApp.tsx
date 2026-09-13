'use client';

import { useMemo, useState } from 'react';
import {
  CakeSlice,
  ChevronRight,
  CircleUserRound,
  CupSoda,
  Drumstick,
  Home,
  Leaf,
  List,
  MessageCircle,
  Phone,
  Search,
  Sandwich,
  Soup,
  Star,
  Utensils,
  X,
} from 'lucide-react';
import type { QrMenuCategory, QrMenuProduct, QrMenuRestaurant } from '../../lib/qr-menu/types';
import './qr-menu-premium.css';

type PremiumTab = 'home' | 'menu' | 'reviews' | 'contact';
type ModalType = null | 'waiter' | 'waiter-success' | 'feedback' | 'feedback-success';

const categoryIcons = [Soup, Utensils, Drumstick, Leaf, Sandwich, CakeSlice, CupSoda];

export function QrMenuPremiumApp({ restaurant }: { restaurant: QrMenuRestaurant }) {
  const [tab, setTab] = useState<PremiumTab>('home');
  const [categoryId, setCategoryId] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<QrMenuProduct | null>(null);
  const [modal, setModal] = useState<ModalType>(null);
  const [tableNo, setTableNo] = useState('');
  const [score, setScore] = useState(0);
  const [note, setNote] = useState('');

  const categories = restaurant.categories.filter(c => c.isActive).sort((a,b)=>a.sortOrder-b.sortOrder);
  const featured = restaurant.products.filter(p => p.isActive && p.isFeatured).sort((a,b)=>a.sortOrder-b.sortOrder);
  const activeProducts = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr-TR');
    return restaurant.products
      .filter(p => p.isActive)
      .filter(p => categoryId === 'all' || p.categoryId === categoryId)
      .filter(p => !q || `${p.name} ${p.description}`.toLocaleLowerCase('tr-TR').includes(q))
      .sort((a,b)=>a.sortOrder-b.sortOrder);
  }, [restaurant.products, categoryId, query]);

  const goMenu = (cat='all') => { setCategoryId(cat); setQuery(''); setTab('menu'); };
  const vars = {
    '--premium-accent': restaurant.theme.accent,
    '--premium-bg': restaurant.theme.background,
    '--premium-surface': restaurant.theme.surface,
    '--premium-text': restaurant.theme.text,
    '--premium-muted': restaurant.theme.muted,
  } as React.CSSProperties;

  return <main className="premium-stage" style={vars}>
    <section className="premium-shell">
      {tab === 'home' && <PremiumHome restaurant={restaurant} categories={categories} featured={featured} onMenu={goMenu} onProduct={setSelected} onQuery={(value)=>{setQuery(value);setTab('menu')}} />}
      {tab === 'menu' && <PremiumMenu restaurant={restaurant} categories={categories} products={activeProducts} categoryId={categoryId} query={query} onQuery={setQuery} onCategory={setCategoryId} onProduct={setSelected} />}
      {tab === 'reviews' && <PremiumReviews restaurant={restaurant} onFeedback={()=>setModal('feedback')} />}
      {tab === 'contact' && <PremiumContact restaurant={restaurant} />}
      <PremiumBottomNav tab={tab} onTab={setTab} onWaiter={()=>setModal('waiter')} />
    </section>

    {selected && <PremiumProductDetail product={selected} onClose={()=>setSelected(null)} />}
    <PremiumModal type={modal} tableNo={tableNo} onTableNo={setTableNo} score={score} onScore={setScore} note={note} onNote={setNote} onClose={()=>setModal(null)} onWaiterSend={()=>setModal('waiter-success')} onFeedbackSend={()=>setModal('feedback-success')} />
  </main>;
}

function BrandLogo({restaurant}:{restaurant:QrMenuRestaurant}) {
  if (restaurant.logo) return <img className="premium-logo-img" src={restaurant.logo} alt={`${restaurant.name} logo`} />;
  return <div className="premium-logo-fallback"><strong>{restaurant.shortName}</strong><span>{restaurant.tagline}</span></div>;
}

function PremiumHome({restaurant,categories,featured,onMenu,onProduct,onQuery}:{restaurant:QrMenuRestaurant;categories:QrMenuCategory[];featured:QrMenuProduct[];onMenu:(cat?:string)=>void;onProduct:(p:QrMenuProduct)=>void;onQuery:(v:string)=>void}) {
  const hero = featured[0] ?? restaurant.products.find(p=>p.isActive);
  const popular = restaurant.products.filter(p=>p.isActive).slice(0,4);
  return <div className="premium-page premium-home-page">
    <header className="premium-brand-header"><BrandLogo restaurant={restaurant}/></header>

    <label className="premium-search"><Search size={24}/><input placeholder="Menüde ara..." onKeyDown={e=>{if(e.key==='Enter') onQuery((e.target as HTMLInputElement).value)}} /></label>

    <PremiumCategories categories={categories} active="all" onSelect={onMenu}/>

    {hero && <section className="premium-hero-card" onClick={()=>onProduct(hero)}>
      <div className="premium-hero-copy">
        <small>{restaurant.name.toLocaleUpperCase('tr-TR')}’NIN<br/>ÖZEL TARİFİ</small>
        <h1>{hero.name}</h1>
        <p>{hero.description}</p>
        <button>Detayları İncele <span><ChevronRight size={20}/></span></button>
        <em>Gerçek<br/>İtalyan Lezzeti</em>
      </div>
      <img src={hero.image} alt={hero.name}/>
      <div className="premium-dots"><i/><i/><i/></div>
    </section>}

    <ProductStrip title="Öne Çıkan Lezzetler" products={featured.slice(0,3)} onAll={()=>onMenu('all')} onProduct={onProduct}/>
    <ProductStrip title="En Çok Tercih Edilenler" products={popular} onAll={()=>onMenu('all')} onProduct={onProduct} compact/>
  </div>;
}

function PremiumCategories({categories,active,onSelect}:{categories:QrMenuCategory[];active:string;onSelect:(cat:string)=>void}) {
  const all = [{id:'all',name:'Tümü',isActive:true,sortOrder:0}, ...categories] as QrMenuCategory[];
  return <div className="premium-categories">{all.map((cat,index)=>{
    const Icon = categoryIcons[index] ?? Utensils;
    const isActive = active === cat.id;
    return <button key={cat.id} className={isActive?'is-active':''} onClick={()=>onSelect(cat.id)}><span><Icon size={24}/></span><small>{cat.name}</small></button>;
  })}</div>;
}

function ProductStrip({title,products,onAll,onProduct,compact=false}:{title:string;products:QrMenuProduct[];onAll:()=>void;onProduct:(p:QrMenuProduct)=>void;compact?:boolean}) {
  return <section className={`premium-strip ${compact?'is-compact':''}`}>
    <div className="premium-section-title"><h2>{title}</h2><button onClick={onAll}>Tümünü Gör <ChevronRight size={18}/></button></div>
    <div className="premium-strip-scroll">{products.map(p=><button className="premium-mini-card" key={p.id} onClick={()=>onProduct(p)}><img src={p.image} alt={p.name}/>{!compact&&<div><strong>{p.name}</strong><small>{p.description}</small><span><ChevronRight size={17}/></span></div>}</button>)}</div>
  </section>;
}

function PremiumMenu({restaurant,categories,products,categoryId,query,onQuery,onCategory,onProduct}:{restaurant:QrMenuRestaurant;categories:QrMenuCategory[];products:QrMenuProduct[];categoryId:string;query:string;onQuery:(v:string)=>void;onCategory:(v:string)=>void;onProduct:(p:QrMenuProduct)=>void}) {
  return <div className="premium-page premium-menu-page">
    <header className="premium-brand-header compact"><BrandLogo restaurant={restaurant}/></header>
    <label className="premium-search"><Search size={23}/><input value={query} onChange={e=>onQuery(e.target.value)} placeholder="Menüde ara..." /></label>
    <PremiumCategories categories={categories} active={categoryId} onSelect={onCategory}/>
    <div className="premium-section-title menu-title"><h2>Menümüz</h2><span>{products.length} ürün</span></div>
    <div className="premium-menu-grid">{products.map(p=><button key={p.id} className="premium-product-card" onClick={()=>onProduct(p)}><img src={p.image} alt={p.name}/><div><strong>{p.name}</strong><p>{p.description}</p><footer><b>₺{p.price}</b><span>İncele <ChevronRight size={15}/></span></footer></div></button>)}</div>
  </div>;
}

function PremiumReviews({restaurant,onFeedback}:{restaurant:QrMenuRestaurant;onFeedback:()=>void}) {
  const rating = restaurant.reviewSummary?.rating ?? 4.8;
  const count = restaurant.reviewSummary?.count ?? 312;
  return <div className="premium-page"><div className="premium-simple-head"><small>{restaurant.name}</small><h1>Yorumlar</h1></div><section className="premium-rating-card"><strong>{rating.toFixed(1)}</strong><div><div>★★★★★</div><span>{count} değerlendirme</span></div></section><section className="premium-review-list"><article><b>Ahmet Y. · 5 ★</b><p>Lezzetli, temiz ve hızlı. Tekrar geleceğim.</p><small>2 gün önce</small></article><article><b>Zeynep K. · 5 ★</b><p>Ürünler çok başarılı ve sıcak geldi.</p><small>5 gün önce</small></article></section><button className="premium-feedback-btn" onClick={onFeedback}>Geri Bildirim Bırak</button></div>;
}

function PremiumContact({restaurant}:{restaurant:QrMenuRestaurant}) {
  return <div className="premium-page"><div className="premium-simple-head"><small>{restaurant.name}</small><h1>İletişim</h1></div><section className="premium-contact-card"><a href={restaurant.branch.phone?`tel:${restaurant.branch.phone}`:'#'}><Phone/><span><small>Telefon</small><b>{restaurant.branch.phone ?? 'Bilgi eklenecek'}</b></span></a><div><CircleUserRound/><span><small>Şube</small><b>{restaurant.branch.name}, {restaurant.branch.city}</b></span></div><div><Utensils/><span><small>Çalışma Saatleri</small><b>{restaurant.branch.openingHours ?? 'Bilgi eklenecek'}</b></span></div></section></div>;
}

function PremiumBottomNav({tab,onTab,onWaiter}:{tab:PremiumTab;onTab:(t:PremiumTab)=>void;onWaiter:()=>void}) {
  const items = [
    {id:'home',label:'Ana Sayfa',icon:Home,on:()=>onTab('home')},
    {id:'menu',label:'Menü',icon:List,on:()=>onTab('menu')},
    {id:'waiter',label:'Garson Çağır',icon:Utensils,on:onWaiter},
    {id:'reviews',label:'Yorumlar',icon:Star,on:()=>onTab('reviews')},
    {id:'contact',label:'İletişim',icon:Phone,on:()=>onTab('contact')},
  ];
  return <nav className="premium-bottom-nav"><div className="premium-nav-inner">{items.map(item=>{const Icon=item.icon;const active = item.id===tab;return <button key={item.id} onClick={item.on} className={active?'is-active':''}><span><Icon size={24}/></span><small>{item.label}</small></button>})}</div></nav>;
}

function PremiumProductDetail({product,onClose}:{product:QrMenuProduct;onClose:()=>void}) {
  return <div className="premium-detail-backdrop"><article className="premium-detail"><div className="premium-detail-photo"><img src={product.image} alt={product.name}/><button onClick={onClose}><X/></button></div><div className="premium-detail-copy"><h2>{product.name}</h2><b>₺{product.price}</b><p>{product.description}</p>{product.allergens?.length?<div className="premium-allergens">{product.allergens.map(a=><span key={a}>{a}</span>)}</div>:null}<button onClick={onClose}>Menüye Dön</button></div></article></div>;
}

function PremiumModal({type,tableNo,onTableNo,score,onScore,note,onNote,onClose,onWaiterSend,onFeedbackSend}:{type:ModalType;tableNo:string;onTableNo:(v:string)=>void;score:number;onScore:(v:number)=>void;note:string;onNote:(v:string)=>void;onClose:()=>void;onWaiterSend:()=>void;onFeedbackSend:()=>void}) {
  if(!type) return null;
  return <div className="premium-modal-backdrop"><section className="premium-modal"><button className="premium-modal-close" onClick={onClose}><X size={22}/></button>{type==='waiter'&&<><div className="premium-modal-icon"><Utensils size={31}/></div><h2>Garson Çağır</h2><p>Masa numaranızı girin.</p><input inputMode="numeric" value={tableNo} onChange={e=>onTableNo(e.target.value.replace(/\D/g,'').slice(0,3))} placeholder="000"/><button className="premium-modal-primary" disabled={!tableNo} onClick={onWaiterSend}>Garson Çağır</button></>}{type==='waiter-success'&&<><div className="premium-modal-icon success">✓</div><h2>Talebiniz iletildi</h2><p>Garson birazdan sizinle ilgilenecek.</p><button className="premium-modal-primary" onClick={onClose}>Tamam</button></>}{type==='feedback'&&<><div className="premium-modal-icon"><MessageCircle size={31}/></div><h2>Geri Bildirim</h2><p>Deneyiminizi değerlendirir misiniz?</p><div className="premium-stars">{[1,2,3,4,5].map(n=><button key={n} className={score>=n?'is-active':''} onClick={()=>onScore(n)}>★</button>)}</div><textarea value={note} onChange={e=>onNote(e.target.value)} placeholder="İsterseniz kısa bir not yazın..."/><button className="premium-modal-primary" disabled={!score} onClick={onFeedbackSend}>Gönder</button></>}{type==='feedback-success'&&<><div className="premium-modal-icon success">✓</div><h2>Teşekkür ederiz</h2><p>Geri bildiriminiz alındı.</p><button className="premium-modal-primary" onClick={onClose}>Tamam</button></>}</section></div>;
}
