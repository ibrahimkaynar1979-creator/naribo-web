'use client';

import './premium-v2.css';
import { useEffect, useMemo, useState } from 'react';
import { Bell, ChevronLeft, Home, MoreVertical, Plus, QrCode, Search, Settings, Store, Tags, Trash2, Utensils } from 'lucide-react';
import { makarillaRestaurant } from '../../../lib/qr-menu/makarilla';
import type { QrMenuProduct } from '../../../lib/qr-menu/types';
import { readMakarillaMenuDraft, saveMakarillaMenuDraft } from '../../../lib/qr-menu/client-store';

type Tab = 'overview'|'menu'|'categories'|'qr'|'restaurant';

type ProductEditorState = QrMenuProduct | null;

export default function AdminPage(){
  const [tab,setTab]=useState<Tab>('overview');
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('all');
  const [products,setProducts]=useState<QrMenuProduct[]>(makarillaRestaurant.products);
  const [editing,setEditing]=useState<ProductEditorState>(null);
  const [isNew,setIsNew]=useState(false);

  useEffect(()=>{
    const draft=readMakarillaMenuDraft();
    if(draft) setProducts(draft.products);
  },[]);

  const persist=(next:QrMenuProduct[])=>{
    setProducts(next);
    saveMakarillaMenuDraft({categories:makarillaRestaurant.categories,products:next});
  };

  const filtered=useMemo(()=>products.filter(p=>{
    const q=query.toLocaleLowerCase('tr-TR');
    return (category==='all'||p.categoryId===category) && (!q||`${p.name} ${p.description}`.toLocaleLowerCase('tr-TR').includes(q));
  }),[products,query,category]);

  const openNew=()=>{
    const categoryId=category==='all'?'pastas':category;
    setEditing({id:`urun-${Date.now()}`,categoryId,name:'',description:'',price:0,image:'/makarilla_tabak.png',allergens:[],isActive:true,sortOrder:products.length+1});
    setIsNew(true);
  };

  const saveProduct=(product:QrMenuProduct)=>{
    const next=isNew?[...products,product]:products.map(p=>p.id===product.id?product:p);
    persist(next);
    setEditing(null);
    setIsNew(false);
  };

  const deleteProduct=(id:string)=>{
    if(!window.confirm('Bu ürünü silmek istiyor musunuz?')) return;
    persist(products.filter(p=>p.id!==id));
    setEditing(null);
    setIsNew(false);
  };

  const toggleProduct=(id:string)=>persist(products.map(p=>p.id===id?{...p,isActive:!p.isActive}:p));

  return <main className="qrAdminPremium">
    <header className="qaTop"><button className="qaBrand" onClick={()=>setTab('overview')}><span>panel</span>takip<small>QR MENÜ</small></button><div className="qaTopRestaurant"><div className="qaRestaurantThumb">M</div><div><b>Makarilla</b><small>Karşıyaka · İzmir</small></div></div><div className="qaTopActions"><button className="qaBell"><Bell size={18}/></button><div className="qaAvatar">MK</div></div></header>
    <aside className="qaSide"><DesktopNav tab={tab} setTab={setTab}/></aside>
    <section className="qaMain">
      {tab==='overview'&&<Overview products={products} setTab={setTab}/>} 
      {tab==='menu'&&<MenuScreen query={query} setQuery={setQuery} category={category} setCategory={setCategory} products={products} items={filtered} setEditing={(p)=>{setEditing(p);setIsNew(false)}} toggleProduct={toggleProduct} openNew={openNew}/>} 
      {tab==='categories'&&<Categories products={products}/>} 
      {tab==='qr'&&<QrScreen/>}
      {tab==='restaurant'&&<RestaurantScreen/>}
    </section>
    <MobileNav tab={tab} setTab={setTab}/>
    {editing&&<ProductEditor product={editing} isNew={isNew} onClose={()=>{setEditing(null);setIsNew(false)}} onSave={saveProduct} onDelete={deleteProduct}/>} 
  </main>;
}

function DesktopNav({tab,setTab}:{tab:Tab;setTab:(t:Tab)=>void}){const items:[Tab,string,React.ComponentType<{size?:number}>][]=[['overview','Genel Bakış',Home],['menu','Menüm',Utensils],['categories','Kategoriler',Tags],['qr','QR Kod',QrCode],['restaurant','Restoran Bilgileri',Store]];return <>{items.map(([id,label,Icon])=><button key={id} className={tab===id?'active':''} onClick={()=>setTab(id)}><Icon size={17}/><span>{label}</span></button>)}<button><Settings size={17}/><span>Ayarlar</span></button></>}
function MobileNav({tab,setTab}:{tab:Tab;setTab:(t:Tab)=>void}){return <nav className="qaMobileNav"><button className={tab==='overview'?'active':''} onClick={()=>setTab('overview')}><Home/><span>Ana Sayfa</span></button><button className={tab==='menu'?'active':''} onClick={()=>setTab('menu')}><Utensils/><span>Menüm</span></button><button className={tab==='qr'?'active':''} onClick={()=>setTab('qr')}><QrCode/><span>QR Kod</span></button><button className={tab==='categories'||tab==='restaurant'?'active':''} onClick={()=>setTab('categories')}><MoreVertical/><span>Diğer</span></button></nav>}

function Overview({products,setTab}:{products:QrMenuProduct[];setTab:(t:Tab)=>void}){return <div className="qaPage qaOverview"><div className="qaWelcomeCard"><div className="qaRestaurantThumb large">M</div><div><b>Makarilla</b><small>Karşıyaka · İzmir</small></div><span>›</span></div><div className="qaGreeting"><h1>Günaydın 👋</h1><p>Menünüz yayında. Her şey yolunda.</p></div><div className="qaMetricGrid"><Metric value="1.248" label="Görüntülenme"/><Metric value={String(products.filter(p=>p.isActive).length)} label="Yayındaki Ürün"/><Metric value={String(products.length)} label="Toplam Ürün"/><Metric value={String(products.filter(p=>!p.isActive).length)} label="Pasif Ürün"/></div><div className="qaPromo"><div><b>Lezzet dijitalde daha yakın.</b><span>QR menünüz her zaman açık, her zaman sizinle.</span></div><button onClick={()=>setTab('menu')}>Menümü Yönet</button></div></div>}
function Metric({value,label}:{value:string;label:string}){return <div className="qaMetric"><i>◉</i><strong>{value}</strong><span>{label}</span></div>}

function MenuScreen({query,setQuery,category,setCategory,products,items,setEditing,toggleProduct,openNew}:{query:string;setQuery:(v:string)=>void;category:string;setCategory:(v:string)=>void;products:QrMenuProduct[];items:QrMenuProduct[];setEditing:(p:QrMenuProduct)=>void;toggleProduct:(id:string)=>void;openNew:()=>void}){return <div className="qaPage"><div className="qaTitleRow"><div><h1>Menüm</h1><p>QR menünüzdeki ürünleri yönetin.</p></div><button className="qaAdd" onClick={openNew}><Plus/> Ürün Ekle</button></div><label className="qaSearch"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ürün ara..."/></label><div className="qaCategoryChips"><button className={category==='all'?'active':''} onClick={()=>setCategory('all')}>Tümü <b>{products.length}</b></button>{makarillaRestaurant.categories.map(c=><button key={c.id} className={category===c.id?'active':''} onClick={()=>setCategory(c.id)}>{c.name} <b>{products.filter(p=>p.categoryId===c.id).length}</b></button>)}</div><div className="qaProductList">{items.map(p=><div key={p.id} className="qaProductRow" onClick={()=>setEditing(p)}><img src={p.image} alt={p.name}/><div><b>{p.name}</b><small>{makarillaRestaurant.categories.find(c=>c.id===p.categoryId)?.name}</small><strong>₺{p.price}</strong></div><button className={p.isActive?'qaToggle on':'qaToggle'} onClick={e=>{e.stopPropagation();toggleProduct(p.id)}} aria-label="Yayın durumunu değiştir"><i/></button><MoreVertical size={18}/></div>)}</div><button className="qaFloatingAdd" onClick={openNew}><Plus/> Ürün Ekle</button></div>}

function ProductEditor({product,isNew,onClose,onSave,onDelete}:{product:QrMenuProduct;isNew:boolean;onClose:()=>void;onSave:(p:QrMenuProduct)=>void;onDelete:(id:string)=>void}){const [draft,setDraft]=useState(product);return <div className="qaEditorBackdrop"><section className="qaEditor"><header><button onClick={onClose}><ChevronLeft/></button><h2>{isNew?'Ürün Ekle':'Ürün Düzenle'}</h2><button onClick={()=>!isNew&&onDelete(draft.id)} disabled={isNew}><Trash2/></button></header><div className="qaEditorPhoto"><img src={draft.image||'/makarilla_tabak.png'} alt={draft.name||'Ürün'}/></div><label>Ürün Adı <b>*</b><input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/></label><label>Açıklama<textarea value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value.slice(0,200)})}/><small>{draft.description.length}/200</small></label><label>Görsel URL<input value={draft.image} onChange={e=>setDraft({...draft,image:e.target.value})}/></label><div className="qaFormGrid"><label>Kategori <b>*</b><select value={draft.categoryId} onChange={e=>setDraft({...draft,categoryId:e.target.value})}>{makarillaRestaurant.categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Fiyat <b>*</b><div className="qaPrice"><span>₺</span><input type="number" min="0" value={draft.price} onChange={e=>setDraft({...draft,price:Number(e.target.value)})}/></div></label></div><label>Alerjenler<input value={(draft.allergens||[]).join(', ')} onChange={e=>setDraft({...draft,allergens:e.target.value.split(',').map(v=>v.trim()).filter(Boolean)})} placeholder="Gluten, Süt"/></label><div className="qaVisibility"><span>Menüde Göster</span><button className={draft.isActive?'qaToggle on':'qaToggle'} onClick={()=>setDraft({...draft,isActive:!draft.isActive})}><i/></button><b>{draft.isActive?'Açık (Yayında)':'Pasif'}</b></div><button className="qaSave" disabled={!draft.name.trim()} onClick={()=>onSave({...draft,name:draft.name.trim(),description:draft.description.trim()})}>Değişiklikleri Kaydet</button></section></div>}

function Categories({products}:{products:QrMenuProduct[]}){return <div className="qaPage"><div className="qaTitleRow"><div><h1>Kategoriler</h1><p>Menü kategorilerinizi görüntüleyin.</p></div></div><div className="qaCategoryList">{makarillaRestaurant.categories.map(c=><div key={c.id}><span>☰</span><img src={products.find(p=>p.categoryId===c.id)?.image||'/makarilla_tabak.png'} alt=""/><div><b>{c.name}</b><small>{products.filter(p=>p.categoryId===c.id).length} ürün</small></div></div>)}</div></div>}
function QrScreen(){return <div className="qaPage"><h1>QR Kod</h1><p>Restoranınıza özel QR kod ekranı.</p><section className="qaQrCard"><div className="qaFakeQr">▦</div><h2>Makarilla</h2><code>/menu/makarilla</code></section></div>}
function RestaurantScreen(){return <div className="qaPage"><h1>Restoran Bilgileri</h1><p>İşletme bilgileri sonraki adımda gerçek veri kaydına bağlanacak.</p><div className="qaFormStack"><label>Restoran Adı<input defaultValue="Makarilla"/></label><label>Adres<input defaultValue="Karşıyaka, İzmir"/></label><label>Çalışma Saatleri<input defaultValue="11:00 - 23:30"/></label></div></div>}
