'use client';
import {useMemo,useState} from 'react';
import {Search,BellRing,Wifi,MapPin,MoreHorizontal,X,CreditCard,Instagram,Star,ChevronLeft,SlidersHorizontal,ChevronRight} from 'lucide-react';
import type {QrMenuProduct,QrMenuRestaurant} from '../../lib/qr-menu/types';
import './makarilla-customer-premium.css';

const categoryEmoji:Record<string,string>={pastas:'🍝','chicken-pastas':'🍗',salads:'🥗',wraps:'🌯',desserts:'🍰',drinks:'🥤'};

export function MakarillaCustomerPremium({restaurant}:{restaurant:QrMenuRestaurant}){
 const[query,setQuery]=useState('');
 const[cat,setCat]=useState('all');
 const[selected,setSelected]=useState<QrMenuProduct|null>(null);
 const[drawer,setDrawer]=useState(false);
 const active=useMemo(()=>restaurant.products.filter(p=>p.isActive),[restaurant.products]);
 const cats=restaurant.categories.filter(c=>c.isActive);
 const products=useMemo(()=>active.filter(p=>(cat==='all'||p.categoryId===cat)&&`${p.name} ${p.description}`.toLocaleLowerCase('tr-TR').includes(query.toLocaleLowerCase('tr-TR'))),[active,cat,query]);
 const featured=active.filter(p=>p.isFeatured);
 const popular=featured.length?featured:active;
 const promo=featured[1]||active[1]||active[0];
 const ingredientSet=(p:QrMenuProduct)=>p.name.toLocaleLowerCase('tr-TR').includes('bolonez')?['Dana Kıyma','Domates','Soğan','Sarımsak','Fesleğen']:['Özel Sos','Parmesan','Taze Otlar','Baharat','Zeytinyağı'];
 const ProductCard=({p}:{p:QrMenuProduct})=><button className="mkc-product" onClick={()=>setSelected(p)}><div className="mkc-product-image"><img src={p.image} alt={p.name}/>{p.isFeatured&&<span>Popüler</span>}</div><div className="mkc-product-info"><strong>{p.name}</strong><p>{p.description}</p><div><b>₺{p.price}</b></div></div></button>;

 return <main className="mkc-stage"><section className="mkc-app">
  <header className="mkc-topbar"><div className="mkc-brand-card"><img src={restaurant.logo} alt={restaurant.name}/><div><b>{restaurant.name}</b><small>EVDE İTALYAN MAKARNASI</small></div></div><button className="mkc-bell" aria-label="Bildirimler"><BellRing size={19}/></button></header>
  <section className="mkc-welcome"><h1>Bugün ne yemek istersiniz?</h1><p>Gerçek İtalyan lezzetleri, tam size göre.</p></section>
  <section className="mkc-tools"><label><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Menüde ara..."/></label><button aria-label="Filtre"><SlidersHorizontal size={20}/></button></section>
  <nav className="mkc-categories"><button className={cat==='all'?'is-active':''} onClick={()=>setCat('all')}><span>🍽️</span><small>Tümü</small></button>{cats.map(c=><button key={c.id} className={cat===c.id?'is-active':''} onClick={()=>setCat(c.id)}><span>{categoryEmoji[c.id]||'🍴'}</span><small>{c.name}</small></button>)}</nav>
  {!query&&cat==='all'&&promo&&<section className="mkc-promo"><img src={promo.image} alt={promo.name}/><div className="mkc-promo-overlay"/><div className="mkc-promo-copy"><small>TAZE MALZEME</small><strong>GERÇEK İTALYAN LEZZETİ</strong><p>Her tabakta İtalya’dan ilham, sizin için.</p><button onClick={()=>setCat('pastas')}>Menüyü Keşfet <ChevronRight size={16}/></button></div><div className="mkc-seal">ITALIAN<br/>🇮🇹<br/>FOOD</div></section>}
  <section className="mkc-body">{query||cat!=='all'?<><div className="mkc-section-head"><h2>{query?'Arama Sonuçları':cats.find(c=>c.id===cat)?.name}</h2><span>{products.length} ürün</span></div><div className="mkc-grid">{products.map(p=><ProductCard key={p.id} p={p}/>)}</div></>:<>{cats.map((c,ci)=>{const list=(ci===0?popular:active.filter(p=>p.categoryId===c.id)).slice(0,4);if(!list.length)return null;return <section className="mkc-category-block" key={c.id}><div className="mkc-section-head"><h2>{ci===0?'Popüler '+c.name:c.name}</h2><button onClick={()=>setCat(c.id)}>Tümünü Gör <ChevronRight size={14}/></button></div><div className="mkc-grid">{list.map(p=><ProductCard key={p.id} p={p}/>)}</div></section>})}</>}</section>
  <nav className="mkc-quickbar"><button className="primary"><BellRing/><span>Garson</span></button><button><Wifi/><span>Wi‑Fi</span></button><button><MapPin/><span>Yol Tarifi</span></button><button onClick={()=>setDrawer(true)}><MoreHorizontal/><span>Daha Fazla</span></button></nav>
 </section>
 {selected&&<div className="mkc-detail"><section><header><button onClick={()=>setSelected(null)}><ChevronLeft/></button><span></span><button className="mkc-heart">♡</button></header><div className="mkc-detail-image"><img src={selected.image} alt={selected.name}/></div><article><div className="mkc-detail-badge">🔥 Popüler</div><div className="mkc-detail-title"><h2>{selected.name}</h2><b>₺{selected.price}</b></div><p className="mkc-detail-desc">{selected.description}</p><h3>İçindekiler</h3><div className="mkc-ingredients">{ingredientSet(selected).map((i,idx)=><span key={i}><i>{['🥩','🍅','🧅','🧄','🌿'][idx]}</i>{i}</span>)}</div><div className="mkc-nutrition"><span><small>Kalori</small><b>520 kcal</b></span><span><small>Protein</small><b>24 g</b></span><span><small>Karbonhidrat</small><b>68 g</b></span><span><small>Yağ</small><b>18 g</b></span></div><div className="mkc-allergen"><b>Alerjen Uyarısı</b><span>Gluten, süt ve süt ürünleri içerebilir.</span></div><div className="mkc-story"><div>🍴</div><p><b>Gerçek İtalyan Lezzeti</b><span>Taze malzemeler, özel tarifler, unutulmaz lezzetler.</span></p></div><button className="mkc-back-menu" onClick={()=>setSelected(null)}>← Menüye Dön</button></article></section></div>}
 {drawer&&<div className="mkc-drawer-backdrop" onClick={()=>setDrawer(false)}><aside className="mkc-drawer" onClick={e=>e.stopPropagation()}><button className="mkc-close" onClick={()=>setDrawer(false)}><X/></button><img src={restaurant.logo} alt={restaurant.name}/><button><BellRing/>Garson Çağır</button><button><Wifi/>Wi‑Fi Bilgileri</button><button><CreditCard/>IBAN</button><button><MapPin/>Yol Tarifi</button><button><Instagram/>Sosyal Medya</button><button><Star/>Yorum Yap</button></aside></div>}
 </main>
}