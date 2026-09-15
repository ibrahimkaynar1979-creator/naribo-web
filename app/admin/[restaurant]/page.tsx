'use client';

import '../../qr-menu/admin/premium-v2.css';
import './typography.css';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Activity, AlertCircle, BarChart3, Bell, ChevronLeft, Edit3, Eye, GripVertical,
  Home, ImageOff, MessageSquareText, MoreVertical, Plus, QrCode, Search, Settings,
  Star, Store, Tags, Trash2, Utensils
} from 'lucide-react';

type Category={id:string;name:string;isActive:boolean;sortOrder:number};
type Product={id:string;categoryId:string;name:string;description:string;price:number;image:string;allergens?:string[];isActive:boolean;sortOrder:number};
type Data={restaurant:{id:string;slug:string;name:string};categories:Category[];products:Product[]};
type Tab='overview'|'menu'|'categories'|'qr'|'restaurant'|'feedback'|'stats';

export default function Page(){
  const params=useParams<{restaurant:string}>(),slug=String(params.restaurant||'').toLowerCase();
  const[data,setData]=useState<Data|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState(''),[saving,setSaving]=useState(false),[tab,setTab]=useState<Tab>('overview'),[query,setQuery]=useState(''),[category,setCategory]=useState('all'),[editing,setEditing]=useState<Product|null>(null),[isNew,setIsNew]=useState(false);
  const load=async()=>{setLoading(true);try{const r=await fetch(`/api/qr-menu/${slug}`,{cache:'no-store'});if(!r.ok)throw new Error(r.status===404?'Restoran bulunamadı':'Panel yüklenemedi');setData(await r.json());setError('')}catch(e){setError(e instanceof Error?e.message:'Panel yüklenemedi')}finally{setLoading(false)}};
  useEffect(()=>{if(slug)void load()},[slug]);
  const products=data?.products||[],categories=data?.categories||[],filtered=useMemo(()=>products.filter(p=>(category==='all'||p.categoryId===category)&&(!query||`${p.name} ${p.description}`.toLocaleLowerCase('tr-TR').includes(query.toLocaleLowerCase('tr-TR')))),[products,category,query]);
  const persist=async(next:Product[])=>{if(!data)return;const prev=data;setData({...data,products:next});setSaving(true);try{const r=await fetch(`/api/qr-menu/${slug}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({products:next})});if(!r.ok)throw new Error();await load()}catch{setData(prev);alert('Değişiklik kaydedilemedi.')}finally{setSaving(false)}};
  if(loading)return <main className="qrAdminPremium"><div style={{padding:40}}>Panel yükleniyor...</div></main>;
  if(error||!data)return <main className="qrAdminPremium"><div style={{padding:40}}><h1>{error}</h1></div></main>;
  const nav:[Tab,string,any][]=[['overview','Genel Bakış',Home],['menu','Menüm',Utensils],['categories','Kategoriler',Tags],['qr','QR Kod',QrCode],['restaurant','Restoran Bilgileri',Store],['feedback','Geri Bildirimler',Star],['stats','İstatistikler',BarChart3]];
  const openNew=()=>{setEditing({id:`new-${Date.now()}`,categoryId:category==='all'?(categories[0]?.id||''):category,name:'',description:'',price:0,image:'',allergens:[],isActive:true,sortOrder:products.length+1});setIsNew(true)};
  return <main className="qrAdminPremium">
    <header className="qaTop"><button className="qaBrand" onClick={()=>setTab('overview')}><span>panel</span>takip<small>QR MENÜ</small></button><div className="qaTopRestaurant"><div className="qaRestaurantThumb">{data.restaurant.name[0]}</div><div><b>{data.restaurant.name}</b><small>{saving?'Kaydediliyor...':'Yönetim Paneli'}</small></div></div><div className="qaTopActions"><button className="qaBell"><Bell size={18}/></button><div className="qaAvatar">{data.restaurant.name.slice(0,2).toUpperCase()}</div></div></header>
    <aside className="qaSide">{nav.map(([id,label,I])=><button key={id} className={tab===id?'active':''} onClick={()=>setTab(id)}><I size={17}/>{label}</button>)}<button><Settings size={17}/>Ayarlar</button></aside>
    <section className="qaMain">
      {tab==='overview'&&<Overview name={data.restaurant.name} products={products} categories={categories} setTab={setTab}/>} 
      {tab==='menu'&&<div className="qaPage"><div className="qaTitleRow"><div><h1>Menüm</h1><p>Ürünleri yönetin.</p></div><button className="qaAdd" onClick={openNew}><Plus size={15}/>Ürün Ekle</button></div><label className="qaSearch"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ürün ara..."/></label><div className="qaCategoryChips"><button className={category==='all'?'active':''} onClick={()=>setCategory('all')}>Tümü</button>{categories.map(c=><button key={c.id} className={category===c.id?'active':''} onClick={()=>setCategory(c.id)}>{c.name}</button>)}</div><div className="qaProductList">{filtered.map(p=><div className="qaProductRow" key={p.id} onClick={()=>{setEditing(p);setIsNew(false)}}><img src={p.image||'/makarilla_tabak.png'} alt=""/><div><b>{p.name}</b><small>{categories.find(c=>c.id===p.categoryId)?.name}</small><strong>₺{p.price}</strong></div><button className={p.isActive?'qaToggle on':'qaToggle'} onClick={e=>{e.stopPropagation();void persist(products.map(x=>x.id===p.id?{...x,isActive:!x.isActive}:x))}}><i/></button><MoreVertical size={18}/></div>)}</div></div>}
      {tab==='categories'&&<div className="qaPage"><h1>Kategoriler</h1><p>Menü kategorileriniz.</p><div className="qaCategoryList">{categories.map(c=><div key={c.id}><GripVertical/><img src={products.find(p=>p.categoryId===c.id)?.image||'/makarilla_tabak.png'} alt=""/><div><b>{c.name}</b><small>{products.filter(p=>p.categoryId===c.id).length} ürün</small></div><button><Edit3 size={14}/></button></div>)}</div></div>}
      {!['overview','menu','categories'].includes(tab)&&<div className="qaPage"><h1>{nav.find(x=>x[0]===tab)?.[1]}</h1><p>Bu bölüm sonraki aşamada etkinleştirilecek.</p></div>}
    </section>
    {editing&&<Editor p={editing} cats={categories} isNew={isNew} close={()=>{setEditing(null);setIsNew(false)}} save={async p=>{setEditing(null);setIsNew(false);await persist(isNew?[...products,p]:products.map(x=>x.id===p.id?p:x))}} del={async id=>{if(confirm('Bu ürünü silmek istiyor musunuz?')){setEditing(null);await persist(products.filter(x=>x.id!==id))}}}/>} 
  </main>
}

function Overview({name,products,categories,setTab}:{name:string;products:Product[];categories:Category[];setTab:(t:Tab)=>void}){
  const active=products.filter(p=>p.isActive).length;
  const missingImages=products.filter(p=>!p.image?.trim()).length;
  const missingDescriptions=products.filter(p=>!p.description?.trim()).length;
  const healthIssues=missingImages+missingDescriptions+products.filter(p=>!p.isActive).length;
  const healthScore=products.length?Math.max(0,100-Math.round((healthIssues/(products.length*3))*100)):0;
  const topProducts=products.slice(0,4);
  return <div className="qaPage qaOverviewDashboard">
    <div className="qaGreeting"><h1>Genel Bakış</h1><p>{name} menünüzün güncel durumu ve hızlı yönetim alanları.</p></div>

    <div className="qaMetricGrid qaOverviewMetrics">
      <DashboardMetric icon={<Eye size={17}/>} value="—" label="Bugünkü Görüntülenme" note="Takip verisi henüz bağlanmadı"/>
      <DashboardMetric icon={<Utensils size={17}/>} value={String(products.length)} label="Menü Ürünleri" note={`${active} ürün yayında`}/>
      <DashboardMetric icon={<Star size={17}/>} value="—" label="Müşteri Puanı" note="Geri bildirim modülü bekleniyor"/>
      <DashboardMetric icon={<Bell size={17}/>} value="—" label="Bekleyen Çağrı" note="Garson çağrı sistemi bekleniyor"/>
    </div>

    <div className="qaOverviewSplit">
      <section className="qaDashCard qaPerformanceCard">
        <div className="qaDashHead"><div><h2>Menü Performansı</h2><p>Görüntülenme verileri oluştuğunda burada günlük grafik gösterilecek.</p></div><span className="qaStatusPill">Yakında</span></div>
        <div className="qaEmptyChart"><BarChart3 size={34}/><b>Henüz yeterli görüntülenme verisi yok</b><span>QR tarama ve ürün görüntülenmeleri toplanınca bu alan otomatik dolacak.</span></div>
      </section>
      <section className="qaDashCard qaCallsCard">
        <div className="qaDashHead"><div><h2>Canlı Çağrılar</h2><p>Masa çağrıları burada görünecek.</p></div><Bell size={18}/></div>
        <div className="qaEmptyState"><Bell size={26}/><b>Bekleyen çağrı yok</b><span>Garson çağrı özelliği etkinleştiğinde masa numarası ve süre burada görünecek.</span></div>
      </section>
    </div>

    <div className="qaOverviewSplit qaOverviewBottom">
      <section className="qaDashCard">
        <div className="qaDashHead"><div><h2>Hızlı Yönetim</h2><p>En sık kullanılan işlemlere tek tıkla geçin.</p></div></div>
        <div className="qaQuickGrid">
          <button onClick={()=>setTab('menu')}><Plus size={18}/><span><b>Ürün Ekle / Düzenle</b><small>Menü içeriklerini yönet</small></span></button>
          <button onClick={()=>setTab('categories')}><Tags size={18}/><span><b>Kategorileri Yönet</b><small>{categories.length} kategori mevcut</small></span></button>
          <button onClick={()=>setTab('qr')}><QrCode size={18}/><span><b>QR Kod</b><small>Menü QR kodunu görüntüle</small></span></button>
          <button onClick={()=>setTab('restaurant')}><Store size={18}/><span><b>Restoran Bilgileri</b><small>Profil ve çalışma bilgileri</small></span></button>
        </div>
      </section>
      <section className="qaDashCard qaHealthCard">
        <div className="qaDashHead"><div><h2>Menü Sağlığı</h2><p>Menünüzün eksik ve güçlü yönleri.</p></div><Activity size={18}/></div>
        <div className="qaHealthScore"><strong>{healthScore}%</strong><span>tamamlanma</span></div>
        <div className="qaHealthList">
          <div><Utensils size={15}/><span>{active}/{products.length} ürün yayında</span></div>
          <div><ImageOff size={15}/><span>{missingImages?`${missingImages} üründe görsel eksik`:'Tüm ürünlerde görsel var'}</span></div>
          <div><AlertCircle size={15}/><span>{missingDescriptions?`${missingDescriptions} üründe açıklama eksik`:'Tüm ürünlerde açıklama var'}</span></div>
        </div>
      </section>
    </div>

    <div className="qaOverviewSplit qaOverviewBottom">
      <section className="qaDashCard qaPopularCard">
        <div className="qaDashHead"><div><h2>Öne Çıkan Ürünler</h2><p>Görüntülenme sıralaması bağlanana kadar menüdeki ilk ürünler gösterilir.</p></div><button onClick={()=>setTab('menu')}>Tümünü Gör</button></div>
        <div className="qaPopularList">{topProducts.length?topProducts.map((p,i)=><div key={p.id}><span className="qaRank">{i+1}</span><img src={p.image||'/makarilla_tabak.png'} alt=""/><div><b>{p.name}</b><small>{categories.find(c=>c.id===p.categoryId)?.name||'Kategori'}</small></div><strong>₺{p.price}</strong></div>):<div className="qaEmptyInline">Henüz ürün yok.</div>}</div>
      </section>
      <section className="qaDashCard qaFeedbackPreview">
        <div className="qaDashHead"><div><h2>Son Geri Bildirimler</h2><p>Müşteri yorumları bağlandığında burada listelenecek.</p></div><MessageSquareText size={18}/></div>
        <div className="qaEmptyState"><MessageSquareText size={26}/><b>Henüz geri bildirim yok</b><span>İlk müşteri geri bildirimi geldiğinde burada görünecek.</span></div>
      </section>
    </div>
  </div>
}

function DashboardMetric({icon,value,label,note}:{icon:React.ReactNode;value:string;label:string;note:string}){return <div className="qaMetric qaDashboardMetric"><i>{icon}</i><strong>{value}</strong><span>{label}</span><small>{note}</small></div>}

function Editor({p,cats,isNew,close,save,del}:{p:Product;cats:Category[];isNew:boolean;close:()=>void;save:(p:Product)=>void;del:(id:string)=>void}){const[d,setD]=useState(p);return <div className="qaEditorBackdrop"><section className="qaEditor"><header><button onClick={close}><ChevronLeft/></button><h2>{isNew?'Ürün Ekle':'Ürün Düzenle'}</h2><button disabled={isNew} onClick={()=>del(d.id)}><Trash2/></button></header><div className="qaEditorPhoto"><img src={d.image||'/makarilla_tabak.png'} alt=""/></div><label>Ürün Adı<input value={d.name} onChange={e=>setD({...d,name:e.target.value})}/></label><label>Açıklama<textarea value={d.description} onChange={e=>setD({...d,description:e.target.value})}/></label><label>Görsel URL<input value={d.image} onChange={e=>setD({...d,image:e.target.value})}/></label><div className="qaFormGrid"><label>Kategori<select value={d.categoryId} onChange={e=>setD({...d,categoryId:e.target.value})}>{cats.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Fiyat<div className="qaPrice"><span>₺</span><input type="number" value={d.price} onChange={e=>setD({...d,price:Number(e.target.value)})}/></div></label></div><div className="qaVisibility"><span>Menüde Göster</span><button className={d.isActive?'qaToggle on':'qaToggle'} onClick={()=>setD({...d,isActive:!d.isActive})}><i/></button></div><button className="qaSave" disabled={!d.name.trim()} onClick={()=>save({...d,name:d.name.trim()})}>Değişiklikleri Kaydet</button></section></div>}
