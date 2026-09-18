'use client';

import '../../qr-menu/admin/premium-v2.css';
import './typography.css';
import './sections.css';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import {Activity,AlertCircle,BarChart3,Bell,ChevronDown,ChevronLeft,Edit3,Eye,GripVertical,Home,ImageOff,LayoutGrid,Menu,MessageSquareText,MoreHorizontal,MoreVertical,Plus,QrCode,Search,Settings,Star,Store,Tags,Trash2,Utensils,Wifi,MapPin,Phone,Instagram,CheckCircle2,Clock,ExternalLink,Save} from 'lucide-react';

type Category={id:string;name:string;isActive:boolean;sortOrder:number};
type Product={id:string;categoryId:string;name:string;description:string;price:number;image:string;allergens?:string[];isActive:boolean;sortOrder:number};
type Restaurant={id:string;slug:string;name:string;logo:string;cover:string;description:string;phone:string;address:string;instagram:string;wifiName:string;wifiPassword:string;iban:string;directionsUrl:string;openingHours:Record<string,string>;themeColor:string};
type Call={id:string;tableNo:string;note:string;status:string;createdAt:string;resolvedAt?:string};
type Feedback={id:string;rating:number;comment:string;customerName:string;createdAt:string};
type Stats={todayViews:number;totalViews:number;averageRating:number;feedbackCount:number;pendingCalls:number;dailyViews:{day:string;count:number}[];topProducts:{id:string;name:string;image:string;price:number;views:number}[]};
type Data={restaurant:Restaurant;categories:Category[];products:Product[];calls:Call[];feedback:Feedback[];stats:Stats};
type Tab='overview'|'menu'|'categories'|'qr'|'restaurant'|'calls'|'feedback'|'stats'|'settings';
const PREVIEW_DATA:Data={restaurant:{id:'preview',slug:'makarilla',name:'Makarilla',logo:'',cover:'',description:'İyi malzeme. İyi tarif. İyi lezzet.',phone:'0532 429 02 90',address:'Karşıyaka, İzmir',instagram:'makarilla',wifiName:'Makarilla',wifiPassword:'',iban:'',directionsUrl:'',openingHours:{Pazartesi:'11:00 - 23:00',Salı:'11:00 - 23:00',Çarşamba:'11:00 - 23:00',Perşembe:'11:00 - 23:00',Cuma:'11:00 - 23:30',Cumartesi:'11:00 - 23:30',Pazar:'11:00 - 23:00'},themeColor:'#14b8c4'},categories:[{id:'c1',name:'Makarnalar',isActive:true,sortOrder:1},{id:'c2',name:'Wraplar',isActive:true,sortOrder:2},{id:'c3',name:'Salatalar',isActive:true,sortOrder:3},{id:'c4',name:'Tatlılar',isActive:true,sortOrder:4}],products:[{id:'p1',categoryId:'c1',name:'Bolonez Makarna',description:'Özel bolonez sos ile',price:299,image:'/makarilla_tabak.png',allergens:[],isActive:true,sortOrder:1},{id:'p2',categoryId:'c1',name:'Alfredo Makarna',description:'Kremalı alfredo sos',price:289,image:'/makarilla_tabak.png',allergens:[],isActive:true,sortOrder:2},{id:'p3',categoryId:'c2',name:'Tavuk Wrap',description:'Izgara tavuk ve özel sos',price:239,image:'/wrap_banner.png',allergens:[],isActive:true,sortOrder:3}],calls:[],feedback:[],stats:{todayViews:28,totalViews:468,averageRating:4.8,feedbackCount:12,pendingCalls:0,dailyViews:[{day:'Pzt',count:18},{day:'Sal',count:22},{day:'Çar',count:17},{day:'Per',count:28},{day:'Cum',count:25},{day:'Cmt',count:31},{day:'Paz',count:24}],topProducts:[{id:'p1',name:'Bolonez Makarna',image:'/makarilla_tabak.png',price:299,views:124},{id:'p2',name:'Alfredo Makarna',image:'/makarilla_tabak.png',price:289,views:98},{id:'p3',name:'Tavuk Wrap',image:'/wrap_banner.png',price:239,views:76}]}};


export default function Page(){
 const params=useParams<{restaurant:string}>(),slug=String(params.restaurant||'').toLowerCase();
 const[data,setData]=useState<Data|null>(PREVIEW_DATA),[loading,setLoading]=useState(false),[error,setError]=useState(''),[saving,setSaving]=useState(false),[tab,setTab]=useState<Tab>('overview'),[query,setQuery]=useState(''),[category,setCategory]=useState('all'),[editing,setEditing]=useState<Product|null>(null),[isNew,setIsNew]=useState(false);
 const load=async(silent=false)=>{setData(PREVIEW_DATA);setError('');setLoading(false)};
 useEffect(()=>{},[slug]);
 useEffect(()=>{},[slug]);
 const action=async(body:any)=>true;
 const products=data?.products||[],categories=data?.categories||[],filtered=useMemo(()=>products.filter(p=>(category==='all'||p.categoryId===category)&&(!query||`${p.name} ${p.description}`.toLocaleLowerCase('tr-TR').includes(query.toLocaleLowerCase('tr-TR')))),[products,category,query]);
 const persist=async(next:Product[])=>{if(data)setData({...data,products:next})};
 if(loading)return <main className="qrAdminPremium"><div style={{padding:40}}>Panel yükleniyor...</div></main>;
 if(error||!data)return <main className="qrAdminPremium"><div style={{padding:40}}><h1>{error}</h1></div></main>;
 const nav:[Tab,string,any][]=[['overview','Genel Bakış',Home],['menu','Menüm',Utensils],['categories','Kategoriler',Tags],['qr','QR Kod',QrCode],['restaurant','Restoran Bilgileri',Store],['calls','Garson Çağrıları',Bell],['feedback','Geri Bildirimler',Star],['stats','İstatistikler',BarChart3],['settings','Ayarlar',Settings]];
 const openNew=()=>{setEditing({id:`new-${Date.now()}`,categoryId:category==='all'?(categories[0]?.id||''):category,name:'',description:'',price:0,image:'',allergens:[],isActive:true,sortOrder:products.length+1});setIsNew(true)};
 return <main className="qrAdminPremium ptShell">
  <aside className="ptSidebar">
    <button className="ptBrand" onClick={()=>setTab('overview')}><span><b>Panel</b><strong>Takip</strong></span><small>Restoranların Büyüme Ortağı</small></button>
    <nav className="ptNav">{nav.map(([id,label,I])=><button key={id} className={tab===id?'active':''} onClick={()=>setTab(id)}><I size={18}/><span>{label}</span>{id==='calls'&&data.stats.pendingCalls>0&&<em>{data.stats.pendingCalls}</em>}</button>)}</nav>
    <div className="ptGrowCard"><div className="ptBars">▂ ▅ ▇</div><b>Menünüz dijitalde.<br/>Kontrol sizde.</b><i/></div>
    <div className="ptVersion"><b>PanelTakip.com</b><span>QR Menü</span></div>
  </aside>

  <section className="ptWorkspace">
    <header className="ptTopbar">
      <button className="ptMobileMenu"><Menu size={18}/></button>
      <label className="ptSearch"><Search size={18}/><input placeholder="Menü, ürün veya kategori ara..." value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></label>
      <div className="ptDateCard"><span>18 Eylül 2026</span><b>QR Menü Yönetimi</b></div>
      <button className="ptRestaurant"><Store size={18}/><span><b>{data.restaurant.name}</b><small>Karşıyaka, İzmir</small></span><ChevronDown size={15}/></button>
      <button className="ptIconBtn ptNotification" onClick={()=>setTab('calls')}><Bell size={18}/>{data.stats.pendingCalls>0&&<i>{data.stats.pendingCalls}</i>}</button>
      <button className="ptProfile"><span>MA</span><div><b>Makarilla</b><small>Yönetici</small></div><ChevronDown size={15}/></button>
    </header>

    <div className="ptUtilityRow">
      <div className="ptUtilityCard"><QrCode size={18}/><div><b>QR Menü</b><span><i/> Yayında</span></div></div>
      <div className="ptUtilityCard"><Utensils size={18}/><div><b>{products.length} Ürün</b><span><i/> {products.filter(p=>p.isActive).length} aktif</span></div></div>
      <div className="ptUtilityCard"><Tags size={18}/><div><b>{categories.length} Kategori</b><span><i/> Güncel</span></div></div>
      <button className="ptSoftButton" onClick={()=>setTab('menu')}><LayoutGrid size={16}/> Menüyü Yönet</button>
      <button className="ptSoftButton" onClick={()=>setTab('qr')}><QrCode size={16}/> QR Kod</button>
      <button className="ptSoftButton" onClick={()=>setTab('feedback')}><MessageSquareText size={16}/> Geri Bildirimler</button>
      <button className="ptIconBtn"><MoreHorizontal size={18}/></button>
    </div>

    <div className="ptContent">
      <section className="qaMain ptAdminSurface">
       {tab==='overview'&&<Overview data={data} setTab={setTab} resolve={id=>action({action:'resolveCall',id})}/>} 
       {tab==='menu'&&<div className="qaPage"><Title title="Menüm" sub="Ürünleri, fiyatları ve menü görünürlüğünü yönetin." action={<button className="qaAdd" onClick={openNew}><Plus size={15}/>Ürün Ekle</button>}/><label className="qaSearch"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ürün ara..."/></label><div className="qaCategoryChips"><button className={category==='all'?'active':''} onClick={()=>setCategory('all')}>Tümü</button>{categories.map(c=><button key={c.id} className={category===c.id?'active':''} onClick={()=>setCategory(c.id)}>{c.name}</button>)}</div><div className="qaProductList">{filtered.map(p=><div className="qaProductRow" key={p.id} onClick={()=>{setEditing(p);setIsNew(false)}}><img src={p.image||'/makarilla_tabak.png'} alt=""/><div><b>{p.name}</b><small>{categories.find(c=>c.id===p.categoryId)?.name}</small><strong>₺{p.price}</strong></div><button className={p.isActive?'qaToggle on':'qaToggle'} onClick={e=>{e.stopPropagation();void persist(products.map(x=>x.id===p.id?{...x,isActive:!x.isActive}:x))}}><i/></button><MoreVertical size={18}/></div>)}</div></div>}
       {tab==='categories'&&<Categories cats={categories} products={products} save={c=>action({action:'saveCategory',category:c})} del={id=>action({action:'deleteCategory',id})}/>} 
       {tab==='qr'&&<QrSection restaurant={data.restaurant}/>} 
       {tab==='restaurant'&&<RestaurantSection restaurant={data.restaurant} save={r=>action({action:'updateRestaurant',restaurant:r})}/>} 
       {tab==='calls'&&<CallsSection calls={data.calls} resolve={id=>action({action:'resolveCall',id})}/>} 
       {tab==='feedback'&&<FeedbackSection items={data.feedback} stats={data.stats}/>} 
       {tab==='stats'&&<StatsSection stats={data.stats}/>} 
       {tab==='settings'&&<SettingsSection restaurant={data.restaurant} save={r=>action({action:'updateRestaurant',restaurant:r})}/>} 
      </section>
    </div>
  </section>

  {editing&&<Editor p={editing} cats={categories} isNew={isNew} close={()=>{setEditing(null);setIsNew(false)}} save={async p=>{setEditing(null);setIsNew(false);await persist(isNew?[...products,p]:products.map(x=>x.id===p.id?p:x))}} del={async id=>{if(confirm('Bu ürünü silmek istiyor musunuz?')){setEditing(null);await persist(products.filter(x=>x.id!==id))}}}/>} 
 </main>
}

function Title({title,sub,action}:{title:string;sub:string;action?:React.ReactNode}){return <div className="qaTitleRow"><div><h1>{title}</h1><p>{sub}</p></div>{action}</div>}
function Overview({data,setTab,resolve}:{data:Data;setTab:(t:Tab)=>void;resolve:(id:string)=>void}){
 const{products,categories,stats}=data;
 const active=products.filter(p=>p.isActive).length;
 const missingImages=products.filter(p=>!p.image?.trim()).length;
 const missingDescriptions=products.filter(p=>!p.description?.trim()).length;
 const healthIssues=missingImages+missingDescriptions+products.filter(p=>!p.isActive).length;
 const healthScore=products.length?Math.max(0,100-Math.round((healthIssues/(products.length*3))*100)):0;
 const pending=data.calls.filter(c=>c.status==='pending').slice(0,3);
 const top=stats.topProducts.length?stats.topProducts:products.slice(0,4).map(p=>({id:p.id,name:p.name,image:p.image,price:p.price,views:0}));
 return <div className="qaPage qaOverviewDashboard qaOverviewRedesign">
  <div className="qaGreeting">
   <h1>Genel Bakış</h1>
   <p>{data.restaurant.name} QR menünüzün performansını ve yönetim durumunu tek ekrandan takip edin.</p>
  </div>

  <div className="qaMetricGrid qaOverviewMetrics">
   <Metric icon={<Eye size={18}/>} value={String(stats.todayViews)} label="Bugünkü Görüntülenme" note={`${stats.totalViews} toplam görüntülenme`}/>
   <Metric icon={<Utensils size={18}/>} value={String(products.length)} label="Menü Ürünleri" note={`${active} ürün yayında`}/>
   <Metric icon={<Star size={18}/>} value={stats.feedbackCount?stats.averageRating.toFixed(1):'—'} label="Müşteri Puanı" note={stats.feedbackCount?`${stats.feedbackCount} geri bildirim`:'Henüz geri bildirim yok'}/>
   <Metric icon={<Bell size={18}/>} value={String(stats.pendingCalls)} label="Bekleyen Çağrı" note={stats.pendingCalls?'Yanıt bekleyen masa var':'Bekleyen çağrı yok'}/>
  </div>

  <div className="qaOverviewPrimary">
   <section className="qaDashCard qaPerformanceCard">
    <div className="qaDashHead"><div><h2>Menü Performansı</h2><p>Son 7 günlük QR menü görüntülenmeleri.</p></div><span className="qaStatusPill">Son 7 gün</span></div>
    <MiniChart rows={stats.dailyViews}/>
   </section>
   <section className="qaDashCard qaHealthCard">
    <div className="qaDashHead"><div><h2>Menü Sağlığı</h2><p>Menünüzün yayın kalitesini kontrol edin.</p></div><Activity size={18}/></div>
    <div className="qaHealthHero"><strong>{healthScore}%</strong><span>Tamamlanma</span></div>
    <div className="qaHealthList">
     <div><Utensils/><span><b>{active}/{products.length}</b> ürün yayında</span></div>
     <div><ImageOff/><span>{missingImages?<><b>{missingImages}</b> üründe görsel eksik</>:<>Tüm ürünlerde görsel var</>}</span></div>
     <div><AlertCircle/><span>{missingDescriptions?<><b>{missingDescriptions}</b> üründe açıklama eksik</>:<>Tüm ürünlerde açıklama var</>}</span></div>
    </div>
   </section>
  </div>

  <section className="qaDashCard qaQuickSection">
   <div className="qaDashHead"><div><h2>Hızlı Yönetim</h2><p>Sık kullanılan işlemlere tek tıkla ulaşın.</p></div></div>
   <div className="qaQuickGrid qaQuickGridWide">
    <Quick icon={<Plus/>} title="Ürün Ekle / Düzenle" sub="Menü içeriklerini yönetin" on={()=>setTab('menu')}/>
    <Quick icon={<Tags/>} title="Kategorileri Yönet" sub={`${categories.length} kategori mevcut`} on={()=>setTab('categories')}/>
    <Quick icon={<QrCode/>} title="QR Kod" sub="Menü bağlantısını görüntüleyin" on={()=>setTab('qr')}/>
    <Quick icon={<Store/>} title="Restoran Bilgileri" sub="Profil ve iletişim bilgileri" on={()=>setTab('restaurant')}/>
   </div>
  </section>

  <div className="qaOverviewSecondary">
   <section className="qaDashCard">
    <div className="qaDashHead"><div><h2>Öne Çıkan Ürünler</h2><p>En çok görüntülenen ürünler.</p></div><button onClick={()=>setTab('menu')}>Tümünü Gör</button></div>
    <div className="qaPopularList qaPopularTable">{top.slice(0,4).map((p,i)=><div key={p.id}><span className="qaRank">{i+1}</span><img src={p.image||'/makarilla_tabak.png'} alt=""/><div><b>{p.name}</b><small>{p.views} görüntülenme</small></div><strong>₺{p.price}</strong></div>)}</div>
   </section>
   <section className="qaDashCard">
    <div className="qaDashHead"><div><h2>Son Geri Bildirimler</h2><p>Müşteri deneyiminin son durumu.</p></div><button onClick={()=>setTab('feedback')}>Tümünü Gör</button></div>
    {data.feedback.length?<div className="qaFeedbackMini">{data.feedback.slice(0,3).map(f=><div key={f.id}><b>{'★'.repeat(f.rating)}{'☆'.repeat(5-f.rating)}</b><span>{f.comment||'Yorum bırakılmadı.'}</span></div>)}</div>:<Empty icon={<MessageSquareText/>} title="Henüz geri bildirim yok" text="İlk müşteri geri bildirimi burada görünecek."/>}
   </section>
  </div>

  <section className="qaDashCard qaCallsStrip">
   <div className="qaDashHead"><div><h2>Canlı Çağrılar</h2><p>Bekleyen masa çağrılarını yönetin.</p></div><Bell size={18}/></div>
   {pending.length?<div className="qaCallMini">{pending.map(c=><div key={c.id}><b>Masa {c.tableNo}</b><small>{ago(c.createdAt)}</small><button onClick={()=>resolve(c.id)}>Tamamlandı</button></div>)}</div>:<div className="qaCallsEmpty"><Bell size={18}/><span>Şu anda bekleyen garson çağrısı yok.</span></div>}
  </section>
 </div>
}
function Metric({icon,value,label,note}:{icon:React.ReactNode;value:string;label:string;note:string}){return <div className="qaMetric qaDashboardMetric"><i>{icon}</i><strong>{value}</strong><span>{label}</span><small>{note}</small></div>}
function Quick({icon,title,sub,on}:{icon:React.ReactNode;title:string;sub:string;on:()=>void}){return <button onClick={on}>{icon}<span><b>{title}</b><small>{sub}</small></span></button>}
function Empty({icon,title,text}:{icon:React.ReactNode;title:string;text:string}){return <div className="qaEmptyState">{icon}<b>{title}</b><span>{text}</span></div>}
function MiniChart({rows}:{rows:{day:string;count:number}[]}){const days=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);const k=d.toISOString().slice(0,10);return{day:k,count:rows.find(x=>x.day===k)?.count||0}}),max=Math.max(1,...days.map(x=>x.count));return <div className="qaRealChart">{days.map(d=><div key={d.day}><span style={{height:`${Math.max(5,(d.count/max)*100)}%`}} title={`${d.count} görüntülenme`}></span><b>{d.count}</b><small>{new Date(`${d.day}T12:00:00`).toLocaleDateString('tr-TR',{weekday:'short'})}</small></div>)}</div>}
function Categories({cats,products,save,del}:{cats:Category[];products:Product[];save:(c:any)=>void;del:(id:string)=>void}){const[editing,setEditing]=useState<Category|null>(null);return <div className="qaPage"><Title title="Kategoriler" sub="Kategori ekleyin, adını değiştirin veya menüden kaldırın." action={<button className="qaAdd" onClick={()=>setEditing({id:'',name:'',isActive:true,sortOrder:cats.length+1})}><Plus/>Kategori Ekle</button>}/><div className="qaCategoryList">{cats.map(c=><div key={c.id}><GripVertical/><img src={products.find(p=>p.categoryId===c.id)?.image||'/makarilla_tabak.png'} alt=""/><div><b>{c.name}</b><small>{products.filter(p=>p.categoryId===c.id).length} ürün · {c.isActive?'Aktif':'Pasif'}</small></div><button onClick={()=>setEditing(c)}><Edit3/></button></div>)}</div>{editing&&<div className="qaInlineEditor"><h3>{editing.id?'Kategori Düzenle':'Yeni Kategori'}</h3><input value={editing.name} onChange={e=>setEditing({...editing,name:e.target.value})} placeholder="Kategori adı"/><label><input type="checkbox" checked={editing.isActive} onChange={e=>setEditing({...editing,isActive:e.target.checked})}/> Menüde aktif</label><div><button onClick={()=>setEditing(null)}>Vazgeç</button>{editing.id&&<button className="danger" onClick={()=>{void del(editing.id);setEditing(null)}}>Sil</button>}<button className="primary" onClick={()=>{void save(editing);setEditing(null)}}>Kaydet</button></div></div>}</div>}
function QrSection({restaurant}:{restaurant:Restaurant}){const url=`https://makarilla.menu.paneltakip.com/menu/${restaurant.slug}`;return <div className="qaPage"><Title title="QR Kod" sub="Müşterilerin menünüze ulaşacağı bağlantı ve QR kullanım alanı."/><div className="qaTwoCols"><section className="qaManageCard qaQrCard"><div className="qaQrVisual"><QrCode size={110}/></div><h2>{restaurant.name} QR Menü</h2><p>QR kod görseli uygulama/PWA aşamasında indirilebilir dosya olarak üretilecek.</p><a href={url} target="_blank" rel="noreferrer"><ExternalLink/>Menüyü Aç</a></section><section className="qaManageCard"><h2>Menü Bağlantısı</h2><label>Canlı adres<input readOnly value={url}/></label><button className="qaSecondary" onClick={()=>navigator.clipboard.writeText(url)}>Bağlantıyı Kopyala</button><div className="qaInfo"><b>Öneri</b><span>Masa üstü QR kartlarında bu adresi kullanacağız. Restorana özel alan adı yapısı korunuyor.</span></div></section></div></div>}
function RestaurantSection({restaurant,save}:{restaurant:Restaurant;save:(r:Restaurant)=>void}){const[d,setD]=useState(restaurant);return <div className="qaPage"><Title title="Restoran Bilgileri" sub="Müşteri menüsünde kullanılan işletme ve iletişim bilgileri." action={<button className="qaAdd" onClick={()=>save(d)}><Save/>Kaydet</button>}/><div className="qaFormCards"><section className="qaManageCard"><h2>Temel Bilgiler</h2><Field label="Restoran Adı" value={d.name} set={v=>setD({...d,name:v})}/><Field label="Kısa Açıklama" value={d.description} set={v=>setD({...d,description:v})}/><Field label="Telefon" value={d.phone} set={v=>setD({...d,phone:v})}/><Field label="Adres" value={d.address} set={v=>setD({...d,address:v})}/><Field label="Instagram" value={d.instagram} set={v=>setD({...d,instagram:v})}/><Field label="Yol Tarifi URL" value={d.directionsUrl} set={v=>setD({...d,directionsUrl:v})}/></section><section className="qaManageCard"><h2>Müşteri Kolaylıkları</h2><Field label="Wi-Fi Adı" value={d.wifiName} set={v=>setD({...d,wifiName:v})}/><Field label="Wi-Fi Şifresi" value={d.wifiPassword} set={v=>setD({...d,wifiPassword:v})}/><Field label="IBAN" value={d.iban} set={v=>setD({...d,iban:v})}/><Field label="Logo URL" value={d.logo} set={v=>setD({...d,logo:v})}/><Field label="Kapak Görseli URL" value={d.cover} set={v=>setD({...d,cover:v})}/><label>Tema Rengi<input type="color" value={d.themeColor||'#f46861'} onChange={e=>setD({...d,themeColor:e.target.value})}/></label></section></div></div>}
function Field({label,value,set}:{label:string;value:string;set:(v:string)=>void}){return <label>{label}<input value={value||''} onChange={e=>set(e.target.value)}/></label>}
function CallsSection({calls,resolve}:{calls:Call[];resolve:(id:string)=>void}){return <div className="qaPage"><Title title="Garson Çağrıları" sub="Müşteri çağrılarını canlı olarak takip edin ve tamamlayın."/><div className="qaManageCard"><div className="qaCallList">{calls.length?calls.map(c=><div key={c.id} className={c.status==='pending'?'pending':''}><i><Bell/></i><div><b>Masa {c.tableNo}</b><span>{c.note||'Garson çağrısı'}</span><small>{new Date(c.createdAt).toLocaleString('tr-TR')}</small></div><strong>{c.status==='pending'?'Bekliyor':'Tamamlandı'}</strong>{c.status==='pending'&&<button onClick={()=>resolve(c.id)}><CheckCircle2/>Tamamlandı</button>}</div>):<Empty icon={<Bell/>} title="Henüz çağrı yok" text="Müşteri menüsünden gelen çağrılar burada listelenecek."/>}</div></div></div>}
function FeedbackSection({items,stats}:{items:Feedback[];stats:Stats}){return <div className="qaPage"><Title title="Geri Bildirimler" sub="Müşteri puanlarını ve yorumlarını tek ekrandan takip edin."/><div className="qaMetricGrid"><Metric icon={<Star/>} value={stats.feedbackCount?stats.averageRating.toFixed(1):'—'} label="Ortalama Puan" note={`${stats.feedbackCount} değerlendirme`}/><Metric icon={<MessageSquareText/>} value={String(stats.feedbackCount)} label="Geri Bildirim" note="Toplam müşteri yanıtı"/></div><div className="qaFeedbackList">{items.length?items.map(f=><article key={f.id}><div><b>{f.customerName}</b><span>{'★'.repeat(f.rating)}{'☆'.repeat(5-f.rating)}</span></div><p>{f.comment||'Yorum bırakılmadı.'}</p><small>{new Date(f.createdAt).toLocaleString('tr-TR')}</small></article>):<Empty icon={<MessageSquareText/>} title="Henüz geri bildirim yok" text="Müşteriler değerlendirme yaptığında burada görünecek."/>}</div></div>}
function StatsSection({stats}:{stats:Stats}){return <div className="qaPage"><Title title="İstatistikler" sub="QR menünüzün kullanım ve ürün performansını takip edin."/><div className="qaMetricGrid"><Metric icon={<Eye/>} value={String(stats.todayViews)} label="Bugün" note="Menü görüntülenmesi"/><Metric icon={<BarChart3/>} value={String(stats.totalViews)} label="Toplam" note="Menü görüntülenmesi"/><Metric icon={<Star/>} value={stats.feedbackCount?stats.averageRating.toFixed(1):'—'} label="Puan" note={`${stats.feedbackCount} değerlendirme`}/><Metric icon={<Bell/>} value={String(stats.pendingCalls)} label="Bekleyen" note="Garson çağrısı"/></div><div className="qaTwoCols"><section className="qaManageCard"><h2>Son 7 Gün</h2><MiniChart rows={stats.dailyViews}/></section><section className="qaManageCard"><h2>En Çok İncelenen Ürünler</h2><div className="qaStatProducts">{stats.topProducts.map((p,i)=><div key={p.id}><b>{i+1}</b><img src={p.image||'/makarilla_tabak.png'} alt=""/><span>{p.name}</span><strong>{p.views}</strong></div>)}{!stats.topProducts.length&&<p>Henüz ürün görüntülenme verisi yok.</p>}</div></section></div></div>}
function SettingsSection({restaurant,save}:{restaurant:Restaurant;save:(r:Restaurant)=>void}){const[d,setD]=useState(restaurant);return <div className="qaPage"><Title title="Ayarlar" sub="QR menünün görünüm ve bağlantı ayarları." action={<button className="qaAdd" onClick={()=>save(d)}><Save/>Kaydet</button>}/><div className="qaFormCards"><section className="qaManageCard"><h2>Marka Görünümü</h2><Field label="Logo URL" value={d.logo} set={v=>setD({...d,logo:v})}/><label>Tema Rengi<input type="color" value={d.themeColor||'#f46861'} onChange={e=>setD({...d,themeColor:e.target.value})}/></label><div className="qaThemePreview" style={{background:d.themeColor||'#f46861'}}>{d.name}</div></section><section className="qaManageCard"><h2>Bağlantılar</h2><Field label="Instagram" value={d.instagram} set={v=>setD({...d,instagram:v})}/><Field label="Yol Tarifi URL" value={d.directionsUrl} set={v=>setD({...d,directionsUrl:v})}/><p className="qaNote">Giriş/şifre ve kullanıcı yetkilendirmesi güvenlik aşamasında ayrıca bağlanacak.</p></section></div></div>}
function ago(v:string){const m=Math.max(0,Math.round((Date.now()-new Date(v).getTime())/60000));return m<1?'Şimdi':m<60?`${m} dk önce`:`${Math.floor(m/60)} sa önce`}
function Editor({p,cats,isNew,close,save,del}:{p:Product;cats:Category[];isNew:boolean;close:()=>void;save:(p:Product)=>void;del:(id:string)=>void}){const[d,setD]=useState(p);return <div className="qaEditorBackdrop"><section className="qaEditor"><header><button onClick={close}><ChevronLeft/></button><h2>{isNew?'Ürün Ekle':'Ürün Düzenle'}</h2><button disabled={isNew} onClick={()=>del(d.id)}><Trash2/></button></header><div className="qaEditorPhoto"><img src={d.image||'/makarilla_tabak.png'} alt=""/></div><label>Ürün Adı<input value={d.name} onChange={e=>setD({...d,name:e.target.value})}/></label><label>Açıklama<textarea value={d.description} onChange={e=>setD({...d,description:e.target.value})}/></label><label>Görsel URL<input value={d.image} onChange={e=>setD({...d,image:e.target.value})}/></label><div className="qaFormGrid"><label>Kategori<select value={d.categoryId} onChange={e=>setD({...d,categoryId:e.target.value})}>{cats.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Fiyat<div className="qaPrice"><span>₺</span><input type="number" value={d.price} onChange={e=>setD({...d,price:Number(e.target.value)})}/></div></label></div><div className="qaVisibility"><span>Menüde Göster</span><button className={d.isActive?'qaToggle on':'qaToggle'} onClick={()=>setD({...d,isActive:!d.isActive})}><i/></button></div><button className="qaSave" disabled={!d.name.trim()} onClick={()=>save({...d,name:d.name.trim()})}>Değişiklikleri Kaydet</button></section></div>}
