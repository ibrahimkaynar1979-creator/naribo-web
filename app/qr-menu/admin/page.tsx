'use client';

import './premium-v2.css';
import { useMemo, useState } from 'react';
import {
  BarChart3, Bell, ChevronLeft, Edit3, GripVertical, Home, MoreVertical,
  Plus, QrCode, Search, Settings, Star, Store, Tags, Trash2, Upload,
  Utensils, X
} from 'lucide-react';
import { makarillaRestaurant } from '../../../lib/qr-menu/makarilla';

type Tab = 'overview'|'menu'|'categories'|'qr'|'restaurant'|'feedback'|'stats';

type Product = typeof makarillaRestaurant.products[number];

const categories = makarillaRestaurant.categories;
const products = makarillaRestaurant.products;

export default function AdminPage(){
  const [tab,setTab]=useState<Tab>('overview');
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('all');
  const [editing,setEditing]=useState<Product|null>(null);

  const filtered=useMemo(()=>products.filter(p=>{
    const q=query.toLocaleLowerCase('tr-TR');
    return (category==='all'||p.categoryId===category) && (!q||`${p.name} ${p.description}`.toLocaleLowerCase('tr-TR').includes(q));
  }),[query,category]);

  return <main className="qrAdminPremium">
    <header className="qaTop">
      <button className="qaBrand" onClick={()=>setTab('overview')}><span>panel</span>takip<small>QR MENÜ</small></button>
      <div className="qaTopRestaurant"><div className="qaRestaurantThumb">M</div><div><b>Makarilla</b><small>Karşıyaka · İzmir</small></div></div>
      <div className="qaTopActions"><button className="qaBell"><Bell size={18}/><i>2</i></button><div className="qaAvatar">MK</div></div>
    </header>

    <aside className="qaSide">
      <DesktopNav tab={tab} setTab={setTab}/>
    </aside>

    <section className="qaMain">
      {tab==='overview'&&<Overview setTab={setTab}/>} 
      {tab==='menu'&&<MenuScreen query={query} setQuery={setQuery} category={category} setCategory={setCategory} items={filtered} setEditing={setEditing}/>} 
      {tab==='categories'&&<Categories/>}
      {tab==='qr'&&<QrScreen/>}
      {tab==='restaurant'&&<RestaurantScreen/>}
      {tab==='feedback'&&<Feedback/>}
      {tab==='stats'&&<Stats/>}
    </section>

    <MobileNav tab={tab} setTab={setTab}/>
    {editing&&<ProductEditor product={editing} onClose={()=>setEditing(null)}/>} 
  </main>
}

function DesktopNav({tab,setTab}:{tab:Tab;setTab:(t:Tab)=>void}){
  const items:[Tab,string,React.ComponentType<{size?:number}>][]=[
    ['overview','Genel Bakış',Home],['menu','Menüm',Utensils],['categories','Kategoriler',Tags],['qr','QR Kod',QrCode],['restaurant','Restoran Bilgileri',Store],['feedback','Geri Bildirimler',Star],['stats','İstatistikler',BarChart3],
  ];
  return <>{items.map(([id,label,Icon])=><button key={id} className={tab===id?'active':''} onClick={()=>setTab(id)}><Icon size={17}/><span>{label}</span></button>)}<button><Settings size={17}/><span>Ayarlar</span></button></>
}

function MobileNav({tab,setTab}:{tab:Tab;setTab:(t:Tab)=>void}){
  const moreActive=['categories','restaurant','feedback','stats'].includes(tab);
  return <nav className="qaMobileNav">
    <button className={tab==='overview'?'active':''} onClick={()=>setTab('overview')}><Home/><span>Ana Sayfa</span></button>
    <button className={tab==='menu'?'active':''} onClick={()=>setTab('menu')}><Utensils/><span>Menüm</span></button>
    <button className={tab==='qr'?'active':''} onClick={()=>setTab('qr')}><QrCode/><span>QR Kod</span></button>
    <button className={moreActive?'active':''} onClick={()=>setTab('categories')}><MoreVertical/><span>Diğer</span></button>
  </nav>
}

function Overview({setTab}:{setTab:(t:Tab)=>void}){
  return <div className="qaPage qaOverview">
    <div className="qaWelcomeCard"><div className="qaRestaurantThumb large">M</div><div><b>Makarilla</b><small>Karşıyaka · İzmir</small></div><span>›</span></div>
    <div className="qaGreeting"><h1>Günaydın <span>👋</span></h1><p>Menünüz yayında. Her şey yolunda.</p></div>
    <div className="qaMetricGrid">
      <Metric icon="eye" value="1.248" label="Görüntülenme" trend="↗ %14"/>
      <Metric icon="fork" value="24" label="Toplam Ürün" trend="↗ %8"/>
      <Metric icon="star" value="4.8" label="Müşteri Puanı"/>
      <Metric icon="bell" value="2" label="Bekleyen Çağrı"/>
    </div>
    <div className="qaPromo"><div><b>Lezzet dijitalde daha yakın.</b><span>QR menünüz her zaman açık, her zaman sizinle.</span></div><button onClick={()=>setTab('menu')}>Menümü Yönet</button></div>
    <section className="qaCard qaChartCard"><div className="qaCardHead"><h2>Son 7 Günlük Görüntülenme</h2><span>310</span></div><Bars/></section>
  </div>
}

function Metric({value,label,trend,icon}:{value:string;label:string;trend?:string;icon:string}){return <div className="qaMetric"><i>{icon==='eye'?'◉':icon==='fork'?'🍴':icon==='star'?'★':'♢'}</i><strong>{value}</strong><span>{label}</span>{trend&&<small>{trend}</small>}</div>}

function Bars(){return <div className="qaBars">{[36,52,43,60,67,86,64].map((h,i)=><div key={i}><i style={{height:`${h}%`}}/><span>{['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'][i]}</span></div>)}</div>}

function MenuScreen({query,setQuery,category,setCategory,items,setEditing}:{query:string;setQuery:(v:string)=>void;category:string;setCategory:(v:string)=>void;items:Product[];setEditing:(p:Product)=>void}){
  return <div className="qaPage">
    <div className="qaTitleRow"><div><h1>Menüm</h1><p>QR menünüzdeki ürünleri yönetin.</p></div><button className="qaAdd"><Plus/> Ürün Ekle</button></div>
    <label className="qaSearch"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ürün ara..."/></label>
    <div className="qaCategoryChips"><button className={category==='all'?'active':''} onClick={()=>setCategory('all')}>Tümü <b>{products.length}</b></button>{categories.map(c=><button key={c.id} className={category===c.id?'active':''} onClick={()=>setCategory(c.id)}>{c.name} <b>{products.filter(p=>p.categoryId===c.id).length}</b></button>)}</div>
    <div className="qaProductList">{items.map(p=><button key={p.id} className="qaProductRow" onClick={()=>setEditing(p)}><img src={p.image} alt={p.name}/><div><b>{p.name}</b><small>{categories.find(c=>c.id===p.categoryId)?.name}</small><strong>₺{p.price}</strong></div><span className={p.isActive?'qaToggle on':'qaToggle'}><i/></span><MoreVertical size={18}/></button>)}</div>
    <button className="qaFloatingAdd"><Plus/> Ürün Ekle</button>
  </div>
}

function ProductEditor({product,onClose}:{product:Product;onClose:()=>void}){
  const [active,setActive]=useState(product.isActive);
  return <div className="qaEditorBackdrop"><section className="qaEditor">
    <header><button onClick={onClose}><ChevronLeft/></button><h2>Ürün Düzenle</h2><button><Trash2/></button></header>
    <div className="qaEditorPhoto"><img src={product.image} alt={product.name}/><button><Upload/> Görseli Değiştir</button></div>
    <label>Ürün Adı <b>*</b><input defaultValue={product.name}/></label>
    <label>Açıklama<textarea defaultValue={product.description}/><small>{product.description.length}/200</small></label>
    <div className="qaFormGrid"><label>Kategori <b>*</b><select defaultValue={product.categoryId}>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Fiyat <b>*</b><div className="qaPrice"><span>₺</span><input defaultValue={product.price}/></div></label></div>
    <div className="qaVisibility"><span>Menüde Göster</span><button className={active?'qaToggle on':'qaToggle'} onClick={()=>setActive(!active)}><i/></button><b>{active?'Açık (Yayında)':'Pasif'}</b></div>
    <button className="qaSave" onClick={onClose}>Değişiklikleri Kaydet</button>
  </section></div>
}

function Categories(){return <div className="qaPage"><div className="qaTitleRow"><div><h1>Kategoriler</h1><p>Menü kategorilerinizi yönetin.</p></div><button className="qaAdd"><Plus/> Kategori Ekle</button></div><div className="qaCategoryList">{categories.map((c,i)=><div key={c.id}><GripVertical/><img src={products.find(p=>p.categoryId===c.id)?.image||products[0].image}/><div><b>{c.name}</b><small>{products.filter(p=>p.categoryId===c.id).length} ürün</small></div><button><Edit3/></button><button className="danger"><Trash2/></button></div>)}</div></div>}

function QrScreen(){return <div className="qaPage"><h1>QR Kod</h1><p>Restoranınıza özel QR kodu indirin ve dilediğiniz yerde kullanın.</p><section className="qaQrCard"><div className="qaFakeQr">▦</div><h2>Makarilla</h2><code>paneltakip.com/makarilla</code></section><div className="qaActionStack"><button>QR Kodu İndir</button><button>QR Kod Tasarla</button><button>Masaüstü Etiketi</button><button>Masa PDF’i İndir</button></div></div>}

function RestaurantScreen(){return <div className="qaPage"><h1>Restoran Bilgileri</h1><p>Restoranınıza ait temel bilgileri güncelleyin.</p><div className="qaRestaurantCover"><div className="qaRestaurantHero">M</div><button><Upload/> Logoyu Değiştir</button></div><div className="qaFormStack"><label>Restoran Adı<input defaultValue="Makarilla"/></label><label>Mutfak Türü<select defaultValue="italyan"><option value="italyan">İtalyan Mutfağı</option></select></label><label>Telefon<input defaultValue="0 532 123 45 67"/></label><label>Adres<input defaultValue="Karşıyaka, İzmir"/></label><label>Çalışma Saatleri<input defaultValue="11:00 - 23:00"/></label></div><button className="qaSave">Kaydet</button></div>}

function Feedback(){const rows=[['A','Ayşe K.','Makarnalar çok güzeldi, servis de hızlıydı.'],['M','Mehmet T.','Lezzet harika, porsiyon biraz daha büyük olabilir.'],['E','Elif S.','Kesinlikle tekrar geleceğiz. Teşekkürler!'],['C','Can D.','Menü sade ve anlaşılır.']];return <div className="qaPage"><h1>Geri Bildirimler</h1><p>Misafirlerinizin görüşlerini takip edin.</p><div className="qaFeedbackTabs"><button className="active">Tümü <b>12</b></button><button>Olumlu <b>10</b></button><button>Olumsuz <b>2</b></button></div><div className="qaFeedbackList">{rows.map(([a,n,t])=><article key={n}><div>{a}</div><section><b>{n}</b><span>★★★★★</span><p>{t}</p></section><MoreVertical/></article>)}</div></div>}

function Stats(){return <div className="qaPage"><div className="qaTitleRow"><div><h1>İstatistikler</h1><p>QR menünüzün performansını inceleyin.</p></div><button className="qaPeriod">Son 7 gün</button></div><div className="qaMetricGrid"><Metric icon="eye" value="1.248" label="Görüntülenme" trend="↗ %14"/><Metric icon="fork" value="462" label="Ürün Tıklaması" trend="↗ %13"/><Metric icon="qr" value="318" label="QR Tarama" trend="↗ %18"/><Metric icon="bell" value="24" label="Garson Çağrısı" trend="↗ %33"/></div><section className="qaCard qaChartCard"><h2>Görüntülenme</h2><Bars/></section><section className="qaCard qaPopular"><div><h2>En Çok Görüntülenen Ürünler</h2><button>Tümü</button></div><article><img src={products[0].image}/><b>Bolonez Makarna</b><span>428</span></article></section></div>}
