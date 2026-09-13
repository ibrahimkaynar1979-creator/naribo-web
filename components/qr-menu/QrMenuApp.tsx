'use client';

import { useMemo, useState } from 'react';
import { Building2, ChevronLeft, Heart, Home, Info, Mail, MapPin, MessageCircle, Phone, Search, Send, Star, X } from 'lucide-react';
import type { QrMenuProduct, QrMenuRestaurant } from '../../lib/qr-menu/types';
import { QrChip, QrInput, QrSheet } from './ui';
import './qr-menu.css';

type Tab = 'home' | 'menu' | 'branch' | 'reviews' | 'contact';

export function QrMenuApp({ restaurant }: { restaurant: QrMenuRestaurant }) {
  const [tab, setTab] = useState<Tab>('home');
  const [categoryId, setCategoryId] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<QrMenuProduct | null>(null);
  const categories = restaurant.categories.filter(c => c.isActive).sort((a,b)=>a.sortOrder-b.sortOrder);
  const products = useMemo(() => {
    const q=query.trim().toLocaleLowerCase('tr-TR');
    return restaurant.products.filter(p=>p.isActive).filter(p=>categoryId==='all'||p.categoryId===categoryId).filter(p=>!q||`${p.name} ${p.description}`.toLocaleLowerCase('tr-TR').includes(q)).sort((a,b)=>a.sortOrder-b.sortOrder);
  },[restaurant.products,categoryId,query]);
  const featured=restaurant.products.filter(p=>p.isActive&&p.isFeatured).slice(0,4);
  const go=(next:Tab)=>{setTab(next);setQuery('');if(next!=='menu')setCategoryId('all')};
  const themeVars={'--qr-accent':restaurant.theme.accent,'--qr-bg':restaurant.theme.background,'--qr-surface':restaurant.theme.surface,'--qr-text':restaurant.theme.text,'--qr-muted':restaurant.theme.muted} as React.CSSProperties;
  return <main className="qr-stage" style={themeVars}><section className="qr-app-shell">
    {tab==='home'&&<HomeScreen restaurant={restaurant} categories={categories} featured={featured} onMenu={()=>go('menu')} onProduct={setSelected}/>} 
    {tab==='menu'&&<MenuScreen restaurant={restaurant} categories={categories} products={products} categoryId={categoryId} query={query} onCategory={setCategoryId} onQuery={setQuery} onProduct={setSelected}/>} 
    {tab==='branch'&&<BranchScreen restaurant={restaurant}/>} {tab==='reviews'&&<ReviewsScreen restaurant={restaurant}/>} {tab==='contact'&&<ContactScreen restaurant={restaurant}/>} 
    <div className="qr-powered">Powered by <b>paneltakip</b></div><BottomNav tab={tab} onChange={go}/></section><ProductSheet product={selected} onClose={()=>setSelected(null)}/></main>;
}

function AppHeader({restaurant,title}:{restaurant:QrMenuRestaurant;title?:string}){return <header className="qr-title-row"><div><small>{restaurant.shortName}</small><h1>{title||restaurant.branch.name}</h1></div><div className="qr-logo-badge">{restaurant.shortName.slice(0,1)}</div></header>}

function HomeScreen({restaurant,categories,featured,onMenu,onProduct}:{restaurant:QrMenuRestaurant;categories:QrMenuRestaurant['categories'];featured:QrMenuProduct[];onMenu:()=>void;onProduct:(p:QrMenuProduct)=>void}){
  const promo=featured[0]??restaurant.products.find(p=>p.isActive);
  return <div className="qr-page qr-home"><AppHeader restaurant={restaurant} title="QR Menü"/>
    <label className="qr-search"><Search size={17}/><QrInput placeholder="Menüde ara..." onFocus={onMenu}/></label>
    <div className="qr-chip-row">{categories.slice(0,5).map(c=><QrChip key={c.id} onClick={onMenu}>{c.name}</QrChip>)}</div>
    {promo&&<article className="qr-promo-card" onClick={()=>onProduct(promo)}><img src={promo.image} alt={promo.name}/><div className="qr-promo-copy"><div><strong>{promo.name}</strong><small>{promo.description}</small></div><b>₺{promo.price}</b></div><button>Detayları Gör</button></article>}
    <div className="qr-section-head"><h2>Popüler Ürünler</h2><button onClick={onMenu}>Tümünü gör</button></div>
    <div className="qr-product-grid">{featured.map(p=><ProductCard key={p.id} product={p} onClick={()=>onProduct(p)}/>)}</div>
  </div>
}

function MenuScreen({restaurant,categories,products,categoryId,query,onCategory,onQuery,onProduct}:{restaurant:QrMenuRestaurant;categories:QrMenuRestaurant['categories'];products:QrMenuProduct[];categoryId:string;query:string;onCategory:(s:string)=>void;onQuery:(s:string)=>void;onProduct:(p:QrMenuProduct)=>void}){return <div className="qr-page"><AppHeader restaurant={restaurant} title="Menü"/><label className="qr-search"><Search size={17}/><QrInput value={query} onChange={e=>onQuery(e.target.value)} placeholder="Menüde ara..."/></label><div className="qr-chip-row"><QrChip active={categoryId==='all'} onClick={()=>onCategory('all')}>Tümü</QrChip>{categories.map(c=><QrChip key={c.id} active={categoryId===c.id} onClick={()=>onCategory(c.id)}>{c.name}</QrChip>)}</div><div className="qr-section-head"><h2>Menümüz</h2><span>{products.length} ürün</span></div><div className="qr-product-grid">{products.map(p=><ProductCard key={p.id} product={p} onClick={()=>onProduct(p)}/>)}</div></div>}

function ProductCard({product,onClick}:{product:QrMenuProduct;onClick:()=>void}){return <button className="qr-product-card" onClick={onClick}><div className="qr-product-image"><img src={product.image} alt={product.name}/><span className="qr-heart"><Heart size={14}/></span></div><div className="qr-product-body"><strong>{product.name}</strong><p>{product.description}</p><div><b>₺{product.price}</b><span>İncele</span></div></div></button>}

function BranchScreen({restaurant}:{restaurant:QrMenuRestaurant}){const b=restaurant.branch;return <div className="qr-page"><AppHeader restaurant={restaurant} title="Şube"/><div className="qr-branch-hero"><div className="qr-logo-badge large">{restaurant.shortName.slice(0,1)}</div><h2>{restaurant.name}</h2><div className="qr-rating"><Star size={15} fill="currentColor"/> {restaurant.reviewSummary?.rating??'—'} <span>({restaurant.reviewSummary?.count??0})</span></div></div><div className="qr-list-card"><InfoRow icon={<MapPin size={18}/>} label="Adres" value={`${b.address}, ${b.city}`}/><InfoRow icon={<Phone size={18}/>} label="Telefon" value={b.phone??'—'}/><InfoRow icon={<Info size={18}/>} label="Çalışma Saatleri" value={b.openingHours??'—'}/><InfoRow icon={<Mail size={18}/>} label="E-posta" value={b.email??'—'}/></div></div>}
function ReviewsScreen({restaurant}:{restaurant:QrMenuRestaurant}){const r=restaurant.reviewSummary;return <div className="qr-page"><AppHeader restaurant={restaurant} title="Yorumlar"/><div className="qr-review-summary"><strong>{r?.rating?.toFixed(1)??'—'}</strong><div><div className="qr-stars">★★★★★</div><span>{r?.count??0} değerlendirme</span></div></div><div className="qr-list-card"><div className="qr-review"><b>Ahmet Y. · 5 ★</b><p>Lezzetli, temiz ve hızlı. Tekrar geleceğim.</p><small>2 gün önce</small></div><div className="qr-review"><b>Zeynep K. · 5 ★</b><p>Çıtır tavuk ve soslar çok başarılı.</p><small>5 gün önce</small></div></div></div>}
function ContactScreen({restaurant}:{restaurant:QrMenuRestaurant}){return <div className="qr-page qr-contact"><div className="qr-contact-icon"><Send size={28}/></div><h1>Bize Ulaşın</h1><p>{restaurant.name} ile iletişim kurmak için aşağıdaki kanalları kullanabilirsiniz.</p><div className="qr-list-card"><InfoRow icon={<Phone size={18}/>} label="Telefon" value={restaurant.branch.phone??'—'}/><InfoRow icon={<Mail size={18}/>} label="E-posta" value={restaurant.branch.email??'—'}/><InfoRow icon={<MapPin size={18}/>} label="Adres" value={`${restaurant.branch.address}, ${restaurant.branch.city}`}/></div></div>}
function InfoRow({icon,label,value}:{icon:React.ReactNode;label:string;value:string}){return <div className="qr-info-row"><span>{icon}</span><div><small>{label}</small><strong>{value}</strong></div></div>}
function BottomNav({tab,onChange}:{tab:Tab;onChange:(t:Tab)=>void}){const items:[Tab,string,React.ReactNode][]=[['home','Ana Sayfa',<Home key="h" size={18}/>],['menu','Menü',<Search key="m" size={18}/>],['branch','Şube',<Building2 key="b" size={18}/>],['reviews','Yorumlar',<MessageCircle key="r" size={18}/>],['contact','İletişim',<Send key="c" size={18}/>]];return <nav className="qr-bottom-nav">{items.map(([id,label,icon])=><button key={id} className={tab===id?'is-active':''} onClick={()=>onChange(id)}>{icon}<span>{label}</span></button>)}</nav>}
function ProductSheet({product,onClose}:{product:QrMenuProduct|null;onClose:()=>void}){return <QrSheet open={!!product} onClose={onClose}>{product&&<div className="qr-detail"><div className="qr-detail-media"><img src={product.image} alt={product.name}/><button onClick={onClose}><X size={18}/></button></div><div className="qr-detail-body"><h2>{product.name}</h2><b className="qr-detail-price">₺{product.price}</b><p>{product.description}</p>{product.allergens?.length?<div className="qr-allergens">{product.allergens.map(a=><span key={a}>{a}</span>)}</div>:null}{product.options?.length?<div className="qr-options"><small>Menü / Porsiyon Seçenekleri</small>{product.options.map(o=><div key={o.id}><span>{o.name}</span><b>₺{o.price}</b></div>)}</div>:null}<button className="qr-primary" onClick={onClose}><ChevronLeft size={16}/> Menüye Dön</button></div></div>}</QrSheet>}
