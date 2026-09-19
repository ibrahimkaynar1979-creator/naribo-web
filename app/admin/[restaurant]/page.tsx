'use client';

import '../../qr-menu/admin/premium-v2.css';
import './typography.css';
import './sections.css';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import {Activity,AlertCircle,BarChart3,Bell,ChevronDown,ChevronLeft,ChevronRight,Edit3,Eye,GripVertical,Home,ImageOff,LayoutGrid,Menu,MessageSquareText,MoreHorizontal,MoreVertical,Plus,QrCode,Search,Settings,Star,Store,Tags,Trash2,Utensils,Wifi,MapPin,Phone,Instagram,CheckCircle2,Clock,ExternalLink,Save} from 'lucide-react';

type Category={id:string;name:string;isActive:boolean;sortOrder:number};
type Product={id:string;categoryId:string;name:string;description:string;price:number;image:string;allergens?:string[];calories?:number;isActive:boolean;sortOrder:number};
type Restaurant={id:string;slug:string;name:string;logo:string;cover:string;description:string;phone:string;address:string;instagram:string;wifiName:string;wifiPassword:string;iban:string;directionsUrl:string;openingHours:Record<string,string>;themeColor:string};
type Call={id:string;tableNo:string;note:string;status:string;createdAt:string;resolvedAt?:string};
type Feedback={id:string;rating:number;comment:string;customerName:string;createdAt:string};
type Stats={todayViews:number;totalViews:number;averageRating:number;feedbackCount:number;pendingCalls:number;dailyViews:{day:string;count:number}[];topProducts:{id:string;name:string;image:string;price:number;views:number}[]};
type Data={restaurant:Restaurant;categories:Category[];products:Product[];calls:Call[];feedback:Feedback[];stats:Stats};
type Tab='overview'|'menu'|'categories'|'qr'|'restaurant'|'calls'|'feedback'|'stats'|'settings';
const PREVIEW_DATA:Data={restaurant:{id:'preview',slug:'makarilla',name:'Makarilla',logo:'',cover:'',description:'İyi malzeme. İyi tarif. İyi lezzet.',phone:'0532 429 02 90',address:'Karşıyaka, İzmir',instagram:'makarilla',wifiName:'Makarilla',wifiPassword:'',iban:'',directionsUrl:'',openingHours:{Pazartesi:'11:00 - 23:00',Salı:'11:00 - 23:00',Çarşamba:'11:00 - 23:00',Perşembe:'11:00 - 23:00',Cuma:'11:00 - 23:30',Cumartesi:'11:00 - 23:30',Pazar:'11:00 - 23:00'},themeColor:'#14b8c4'},categories:[{id:'c1',name:'Makarnalar',isActive:true,sortOrder:1},{id:'c2',name:'Wraplar',isActive:true,sortOrder:2},{id:'c3',name:'Salatalar',isActive:true,sortOrder:3},{id:'c4',name:'Tatlılar',isActive:true,sortOrder:4}],products:[{id:'p1',categoryId:'c1',name:'Bolonez Makarna',description:'Özel bolonez sos ile',price:299,image:'/makarilla_tabak.png',allergens:[],isActive:true,sortOrder:1},{id:'p2',categoryId:'c1',name:'Alfredo Makarna',description:'Kremalı alfredo sos',price:289,image:'/makarilla_tabak.png',allergens:[],isActive:true,sortOrder:2},{id:'p3',categoryId:'c2',name:'Tavuk Wrap',description:'Izgara tavuk ve özel sos',price:239,image:'/wrap_banner.png',allergens:[],isActive:true,sortOrder:3}],calls:[],feedback:[{id:'f1',rating:5,comment:'Lezzet harikaydı, tekrar geleceğim.',customerName:'Misafir',createdAt:'2026-09-16T19:20:00.000Z'},{id:'f2',rating:5,comment:'Servis çok hızlıydı.',customerName:'Misafir',createdAt:'2026-09-14T18:10:00.000Z'},{id:'f3',rating:4,comment:'Makarna biraz daha sıcak olabilirdi.',customerName:'Misafir',createdAt:'2026-09-12T20:05:00.000Z'}],stats:{todayViews:28,totalViews:468,averageRating:4.8,feedbackCount:12,pendingCalls:0,dailyViews:[{day:'Pzt',count:18},{day:'Sal',count:22},{day:'Çar',count:17},{day:'Per',count:28},{day:'Cum',count:25},{day:'Cmt',count:31},{day:'Paz',count:24}],topProducts:[{id:'p1',name:'Bolonez Makarna',image:'/makarilla_tabak.png',price:299,views:124},{id:'p2',name:'Alfredo Makarna',image:'/makarilla_tabak.png',price:289,views:98},{id:'p3',name:'Tavuk Wrap',image:'/wrap_banner.png',price:239,views:76}]}};


export default function Page(){
 const params=useParams<{restaurant:string}>(),slug=String(params.restaurant||'').toLowerCase();
 const[data,setData]=useState<Data|null>(PREVIEW_DATA),[loading,setLoading]=useState(false),[error,setError]=useState(''),[saving,setSaving]=useState(false),[tab,setTab]=useState<Tab>('overview'),[query,setQuery]=useState(''),[category,setCategory]=useState('all'),[editing,setEditing]=useState<Product|null>(null),[isNew,setIsNew]=useState(false),[catDraft,setCatDraft]=useState<Category|null>(null),[dragCat,setDragCat]=useState<string|null>(null);
 const load=async(silent=false)=>{setData(PREVIEW_DATA);setError('');setLoading(false)};
 useEffect(()=>{},[slug]);
 useEffect(()=>{},[slug]);
 const action=async(body:any)=>true;
 const products=data?.products||[],categories=data?.categories||[],filtered=useMemo(()=>products.filter(p=>(category==='all'||p.categoryId===category)&&(!query||`${p.name} ${p.description}`.toLocaleLowerCase('tr-TR').includes(query.toLocaleLowerCase('tr-TR')))),[products,category,query]);
 const persist=async(next:Product[])=>{if(data)setData({...data,products:next})};
 const addCategory=()=>setCatDraft({id:'',name:'',isActive:true,sortOrder:categories.length+1});
 const saveCategoryLocal=(draft:Category)=>{if(!data||!draft.name.trim())return;const item={...draft,id:draft.id||`c-${Date.now()}`,name:draft.name.trim()};const next=draft.id?categories.map(x=>x.id===draft.id?item:x):[...categories,item];setData({...data,categories:next});setCategory(item.id);setCatDraft(null)};
 const reorderCategory=(fromId:string,toId:string)=>{if(!data||fromId===toId)return;const list=[...categories].sort((a,b)=>a.sortOrder-b.sortOrder),from=list.findIndex(x=>x.id===fromId),to=list.findIndex(x=>x.id===toId);if(from<0||to<0)return;const [moved]=list.splice(from,1);list.splice(to,0,moved);const next=list.map((x,i)=>({...x,sortOrder:i+1}));setData({...data,categories:next});setDragCat(null)};
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

  <section className={`ptWorkspace ${tab==="overview"?"ptWorkspaceOverview":tab==="menu"?"ptWorkspaceMenu":""}`}>
    <header className="ptTopbar">
      <button className="ptMobileMenu"><Menu size={18}/></button>
      <label className="ptSearch"><Search size={18}/><input placeholder="Menü, ürün veya kategori ara..." value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></label>
      <div className="ptDateCard"><span>18 Eylül 2026</span><b>QR Menü Yönetimi</b></div>
      <button className="ptRestaurant"><Store size={18}/><span><b>{data.restaurant.name}</b><small>Karşıyaka, İzmir</small></span><ChevronDown size={15}/></button>
      <button className="ptIconBtn ptNotification" onClick={()=>setTab('calls')}><Bell size={18}/>{data.stats.pendingCalls>0&&<i>{data.stats.pendingCalls}</i>}</button>
      <button className="ptProfile"><span>MA</span><div><b>Makarilla</b><small>Yönetici</small></div><ChevronDown size={15}/></button>
    </header>
<div className="ptContent">
      <section className="qaMain ptAdminSurface">
       {tab==='overview'&&<Overview data={data} setTab={setTab} resolve={id=>action({action:'resolveCall',id})}/>} 
       {tab==='menu'&&<div className="qaMenuWorkbench">
  <section className="qaCategoryRail">
   <div className="qaPanelHead"><div><h2>Kategoriler</h2><p>Menü gruplarını yönetin.</p></div><button onClick={addCategory}><Plus size={14}/></button></div>
   <div className="qaCategoryList">
    <button type="button" className={category==='all'?'qaCategoryLine qaCategoryAll active':'qaCategoryLine qaCategoryAll'} onClick={()=>setCategory('all')}>
      <span className="qaCategoryLineMain"><LayoutGrid size={15}/><b>Tümü</b></span>
      <span className="qaCategoryLineCount">{products.length}</span>
    </button>
    {[...categories].sort((a,b)=>a.sortOrder-b.sortOrder).map(cat=><div key={cat.id} className={category===cat.id?'qaCategoryLine active':'qaCategoryLine'} draggable onDragStart={()=>setDragCat(cat.id)} onDragEnd={()=>setDragCat(null)} onDragOver={e=>{e.preventDefault();e.dataTransfer.dropEffect='move'}} onDrop={e=>{e.preventDefault();if(dragCat)reorderCategory(dragCat,cat.id)}}>
      <span className="qaCatGrip" title="Sürükleyerek sırala"><GripVertical size={15}/></span>
      <button type="button" className="qaCategoryLineSelect" onClick={()=>setCategory(cat.id)}><b>{cat.name}</b></button>
      <span className="qaCategoryLineCount">{products.filter(p=>p.categoryId===cat.id).length}</span>
      <button type="button" className="qaCatEdit" title="Kategoriyi düzenle" onClick={()=>setCatDraft(cat)}><Edit3 size={13}/></button>
    </div>)}
   </div>
   {catDraft&&<div className="qaCategoryPopover">
    <div className="qaCategoryPopoverHead"><div><b>{catDraft.id?'Kategori Düzenle':'Yeni Kategori'}</b><small>Menünüzde görünecek kategori adını girin.</small></div><button onClick={()=>setCatDraft(null)}>×</button></div>
    <label>Kategori Adı<input autoFocus value={catDraft.name} onChange={e=>setCatDraft({...catDraft,name:e.target.value})} onKeyDown={e=>{if(e.key==='Enter')saveCategoryLocal(catDraft);if(e.key==='Escape')setCatDraft(null)}} placeholder="Örn. İçecekler"/></label>
    <div className="qaCategoryPopoverActions"><button onClick={()=>setCatDraft(null)}>İptal</button><button className="primary" disabled={!catDraft.name.trim()} onClick={()=>saveCategoryLocal(catDraft)}>{catDraft.id?'Kaydet':'Kategori Ekle'}</button></div>
   </div>}
  </section>
  <section className="qaMenuRail">
   <div className="qaPanelHead"><div><h2>Menüm</h2><p>Ürünleri seçin ve düzenleyin.</p></div><button onClick={openNew}><Plus size={14}/></button></div>
   <label className="qaSearch qaWorkbenchSearch"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ürün ara..."/></label>
   <div className="qaWorkbenchProducts">{filtered.map(p=><button className={editing?.id===p.id?'active':''} key={p.id} onClick={()=>{setEditing(p);setIsNew(false)}}><img src={p.image||'/makarilla_tabak.png'} alt=""/><span><b>{p.name}</b><small>{categories.find(c=>c.id===p.categoryId)?.name||'Kategori'}</small></span><strong>₺{p.price}</strong><i className={p.isActive?'on':''}><em/></i><MoreVertical size={16}/></button>)}</div>
  </section>
  <Editor key={(editing||products[0])?.id||'new'} p={editing||products[0]||{id:'new',categoryId:categories[0]?.id||'',name:'',description:'',price:0,image:'',allergens:[],isActive:true,sortOrder:1}} cats={categories} isNew={isNew||!products.length} close={()=>{setEditing(products[0]||null);setIsNew(false)}} save={async p=>{await persist((isNew||!products.some(x=>x.id===p.id))?[...products,p]:products.map(x=>x.id===p.id?p:x));setEditing(p);setIsNew(false)}} del={async id=>{if(confirm('Bu ürünü silmek istiyor musunuz?')){const next=products.filter(x=>x.id!==id);await persist(next);setEditing(next[0]||null);setIsNew(false)}}}/>
 </div>}
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
 </main>
}

function Title({title,sub,action}:{title:string;sub:string;action?:React.ReactNode}){return <div className="qaTitleRow"><div><h1>{title}</h1><p>{sub}</p></div>{action}</div>}
function Overview({data,setTab,resolve}:{data:Data;setTab:(t:Tab)=>void;resolve:(id:string)=>void}){
 const{restaurant,products,categories,stats}=data;
 const active=products.filter(p=>p.isActive).length;
 const activeCats=categories.filter(c=>c.isActive).length;
 const missingImages=products.filter(p=>!p.image?.trim()).length;
 const missingDescriptions=products.filter(p=>!p.description?.trim()).length;
 const top=stats.topProducts.length?stats.topProducts:products.slice(0,3).map(p=>({id:p.id,name:p.name,image:p.image,price:p.price,views:0}));
 const recent=data.feedback.slice(0,3);
 const healthOk=active===products.length&&missingImages===0&&missingDescriptions===0&&Boolean(restaurant.name&&restaurant.phone&&restaurant.address);
 const menuUrl=`https://makarilla.menu.paneltakip.com/menu/${restaurant.slug}`;
 return <div className="qaPage qaOverviewHome">
  <section className="qaOverviewHero">
   <div className="qaOverviewHello">
    <span>Merhaba, {restaurant.name}</span>
    <div className="qaOverviewTitleLine">
     <h1>{restaurant.name} QR Menü</h1>
     <span className="qaLiveBadge"><i/>Yayında</span>
     <button className="qaQrInlineCard" onClick={()=>setTab("qr")}>
      <span className="qaQrInlineIcon"><QrCode size={28}/></span>
      <span><b>QR Menü</b><small>Kodu görüntüle</small></span>
      <ChevronRight size={14}/>
     </button>
    </div>
    <p>Menünüz yayında! İşte hızlı yönetim alanınız.</p>
   </div>
   <div className="qaOverviewHeroActions">
    <a href={menuUrl} target="_blank" rel="noreferrer" className="qaGhostAction"><ExternalLink size={15}/>Menüyü Görüntüle</a>
    <button className="qaHeroAdd" onClick={()=>setTab("menu")}><Plus size={16}/>Ürün Ekle</button>
   </div>
  </section>

  <section className="qaOverviewSummary">
   <div><i><Utensils/></i><span><strong>{products.length}</strong><b>Ürün</b><small>{active}’ü yayında</small></span></div>
   <div><i><Tags/></i><span><strong>{activeCats}</strong><b>Kategori</b><small>Aktif</small></span></div>
   <div><i><QrCode/></i><span><strong>QR Menü</strong><b>Aktif</b><small>Müşteriler erişebiliyor</small></span></div>
   <div><i><BarChart3/></i><span><strong>{stats.todayViews}</strong><b>Menü Görüntülenme</b><small>Bugün</small></span></div>
  </section>

  <section className="qaOverviewQuick">
   <div className="qaOverviewSectionHead"><div><h2>Hızlı Yönetim</h2><p>Menünüzü kolayca yönetin, müşterilerinize en iyi deneyimi sunun.</p></div></div>
   <div className="qaOverviewQuickGrid">
    <button onClick={()=>setTab("menu")}><i><Utensils/></i><span><b>Ürünler</b><small>Ürün ekleyin, düzenleyin, fiyat ve açıklamaları yönetin.</small></span><em><ChevronRight/></em></button>
    <button onClick={()=>setTab("categories")}><i><Tags/></i><span><b>Kategoriler</b><small>Kategorilerinizi oluşturun, sıralayın, düzenleyin.</small></span><em><ChevronRight/></em></button>
    <button onClick={()=>setTab("qr")}><i><QrCode/></i><span><b>QR Kod</b><small>QR kodunuzu indirin, masalarda ve görsellerde kullanın.</small></span><em><ChevronRight/></em></button>
    <button onClick={()=>setTab("restaurant")}><i><Store/></i><span><b>Restoran Bilgileri</b><small>İşletme adı, adres, telefon ve çalışma bilgileri.</small></span><em><ChevronRight/></em></button>
    <button onClick={()=>setTab("calls")}><i><Bell/></i><span><b>Garson Çağrıları</b><small>Masa çağrılarını yönetin, anlık bildirimleri takip edin.</small></span><em><ChevronRight/></em></button>
    <button onClick={()=>setTab("feedback")}><i><MessageSquareText/></i><span><b>Geri Bildirimler</b><small>Müşteri yorumlarını görün, memnuniyeti takip edin.</small></span><em><ChevronRight/></em></button>
   </div>
  </section>

  <section className="qaOverviewHealth">
   <div className="qaHealthLead"><i><CheckCircle2/></i><span><b>Menü Sağlığı</b><small>QR menünüz yayında ve her şey hazır.</small></span></div>
   <div className="qaHealthChecks">
    <span><CheckCircle2/><b>{active}/{products.length}</b> ürün yayında</span>
    <span><CheckCircle2/>Ürün görselleri {missingImages?"eksik":"tamam"}</span>
    <span><CheckCircle2/>Kategoriler {activeCats?"aktif":"eksik"}</span>
    <span><CheckCircle2/>İşletme bilgileri {restaurant.phone&&restaurant.address?"tamam":"eksik"}</span>
   </div>
   <div className={healthOk?"qaHealthMessage success":"qaHealthMessage"}><b>{healthOk?"Harika!":"Kontrol gerekli"}</b><small>{healthOk?"Menünüz sorunsuz şekilde yayında.":"Eksik alanları tamamlayın."}</small></div>
  </section>

  <section className="qaOverviewFooterGrid">
   <div className="qaOverviewListCard">
    <div className="qaOverviewCardHead"><div><h2>Öne Çıkan Ürünler</h2><p>Müşterilerinizin en çok ilgisini çeken lezzetler.</p></div><button onClick={()=>setTab("menu")}>Tümünü Gör <ChevronRight/></button></div>
    <div className="qaOverviewProducts">{top.slice(0,3).map((p,i)=><div key={p.id}><span>{i+1}</span><img src={p.image||"/makarilla_tabak.png"} alt=""/><div><b>{p.name}</b><small>{p.views} görüntülenme</small></div><strong>₺{p.price}</strong></div>)}</div>
   </div>
   <div className="qaOverviewListCard">
    <div className="qaOverviewCardHead"><div><h2>Son Geri Bildirimler</h2><p>Müşterilerinizin menünüz hakkındaki yorumları.</p></div><button onClick={()=>setTab("feedback")}>Tümünü Gör <ChevronRight/></button></div>
    <div className="qaOverviewFeedback">{recent.length?recent.map(f=><div key={f.id}><span className="qaStars">{"★".repeat(f.rating)}{"☆".repeat(5-f.rating)}</span><b>{f.comment||"Yorum bırakılmadı."}</b><small>{new Date(f.createdAt).toLocaleDateString("tr-TR")}</small></div>):<div className="qaFeedbackEmpty"><MessageSquareText/><span>Henüz geri bildirim yok.</span></div>}</div>
   </div>
  </section>
 </div>
}
function Metric({icon,value,label,note}:{icon:React.ReactNode;value:string;label:string;note:string}){return <div className="qaMetric qaDashboardMetric"><i>{icon}</i><strong>{value}</strong><span>{label}</span><small>{note}</small></div>}
function Quick({icon,title,sub,on}:{icon:React.ReactNode;title:string;sub:string;on:()=>void}){return <button onClick={on}>{icon}<span><b>{title}</b><small>{sub}</small></span></button>}
function Empty({icon,title,text}:{icon:React.ReactNode;title:string;text:string}){return <div className="qaEmptyState">{icon}<b>{title}</b><span>{text}</span></div>}
function MiniChart({rows}:{rows:{day:string;count:number}[]}){const labels=["Cmt","Paz","Pzt","Sal","Çar","Per","Cum"];const days=labels.map((day,i)=>({day,count:rows.find(x=>x.day===day)?.count||rows[i]?.count||0})),max=Math.max(1,...days.map(x=>x.count));return <div className="qaRealChart">{days.map(d=><div key={d.day}><span style={{height:`${Math.max(8,(d.count/max)*100)}%`}} title={`${d.count} görüntülenme`}></span><b>{d.count}</b><small>{d.day}</small></div>)}</div>}
function Categories({cats,products,save,del}:{cats:Category[];products:Product[];save:(c:any)=>void;del:(id:string)=>void}){const[editing,setEditing]=useState<Category|null>(null);return <div className="qaPage qaCategoriesPage"><Title title="Kategoriler" sub="Kategorileri düzenleyin ve menü sırasını yönetin." action={<button className="qaAdd" onClick={()=>setEditing({id:'',name:'',isActive:true,sortOrder:cats.length+1})}><Plus/>Kategori Ekle</button>}/><div className="qaCategoryCards">{cats.map(x=>{const sample=products.find(p=>p.categoryId===x.id),count=products.filter(p=>p.categoryId===x.id).length;return <article key={x.id}><div className="qaCategoryDrag"><GripVertical/></div><img src={sample?.image||'/makarilla_tabak.png'} alt=""/><div><b>{x.name}</b><small>{count} ürün · {x.isActive?'Aktif':'Pasif'}</small></div><button onClick={()=>setEditing(x)}><Edit3/></button></article>})}</div>{editing&&<div className="qaInlineEditor"><h3>{editing.id?'Kategori Düzenle':'Yeni Kategori'}</h3><input value={editing.name} onChange={e=>setEditing({...editing,name:e.target.value})} placeholder="Kategori adı"/><label><input type="checkbox" checked={editing.isActive} onChange={e=>setEditing({...editing,isActive:e.target.checked})}/> Menüde aktif</label><div><button onClick={()=>setEditing(null)}>Vazgeç</button>{editing.id&&<button className="danger" onClick={()=>{void del(editing.id);setEditing(null)}}>Sil</button>}<button className="primary" onClick={()=>{void save(editing);setEditing(null)}}>Kaydet</button></div></div>}</div>}
function QrSection({restaurant}:{restaurant:Restaurant}){const url=`https://makarilla.menu.paneltakip.com/menu/${restaurant.slug}`;return <div className="qaPage qaQrPage"><Title title="QR Kod" sub="Müşterilerin menünüze ulaşacağı QR kodu ve canlı bağlantı."/><div className="qaQrLayout"><section className="qaManageCard qaQrCard"><div className="qaQrVisual"><QrCode size={100}/></div><div><h2>{restaurant.name} QR Menü</h2><p>Masa üstü kartlar ve basılı materyaller için hazır.</p></div></section><section className="qaManageCard qaQrActions"><h2>Menü Bağlantısı</h2><label>Canlı adres<input readOnly value={url}/></label><div className="qaQrButtons"><button className="qaSecondary" onClick={()=>navigator.clipboard.writeText(url)}>Bağlantıyı Kopyala</button><a href={url} target="_blank" rel="noreferrer"><ExternalLink/>Menüyü Aç</a><button className="qaSecondary"><QrCode/>QR İndir</button></div><div className="qaInfo"><b>Öneri</b><span>Masa üstü QR kartlarında restorana özel bu adresi kullanın.</span></div></section></div></div>}
function RestaurantSection({restaurant,save}:{restaurant:Restaurant;save:(r:Restaurant)=>void}){const[d,setD]=useState(restaurant);return <div className="qaPage qaRestaurantPage"><Title title="Restoran Bilgileri" sub="İşletme, iletişim ve menü görünüm bilgilerini yönetin." action={<button className="qaAdd" onClick={()=>save(d)}><Save/>Kaydet</button>}/><div className="qaRestaurantGrid"><section className="qaManageCard"><h2>Restoran Profili</h2><Field label="Restoran Adı" value={d.name} set={v=>setD({...d,name:v})}/><Field label="Kısa Açıklama" value={d.description} set={v=>setD({...d,description:v})}/><div className="qaUploadGrid"><div className="qaUploadBox"><b>Restoran Logosu</b><span>JPG, PNG veya WEBP</span><button>Fotoğraf Yükle</button></div><div className="qaUploadBox"><b>Kapak Görseli</b><span>JPG, PNG veya WEBP</span><button>Fotoğraf Yükle</button></div></div></section><section className="qaManageCard"><h2>İletişim & Konum</h2><Field label="Telefon" value={d.phone} set={v=>setD({...d,phone:v})}/><Field label="Adres" value={d.address} set={v=>setD({...d,address:v})}/><Field label="Instagram" value={d.instagram} set={v=>setD({...d,instagram:v})}/><Field label="Yol Tarifi URL" value={d.directionsUrl} set={v=>setD({...d,directionsUrl:v})}/></section><section className="qaManageCard"><h2>Müşteri Kolaylıkları</h2><Field label="Wi-Fi Adı" value={d.wifiName} set={v=>setD({...d,wifiName:v})}/><Field label="Wi-Fi Şifresi" value={d.wifiPassword} set={v=>setD({...d,wifiPassword:v})}/><Field label="IBAN" value={d.iban} set={v=>setD({...d,iban:v})}/><label>Tema Rengi<div className="qaColorRow"><input type="color" value={d.themeColor||'#14b8c4'} onChange={e=>setD({...d,themeColor:e.target.value})}/><span>{d.themeColor||'#14b8c4'}</span></div></label></section></div></div>}
function Field({label,value,set}:{label:string;value:string;set:(v:string)=>void}){return <label>{label}<input value={value||''} onChange={e=>set(e.target.value)}/></label>}
function CallsSection({calls,resolve}:{calls:Call[];resolve:(id:string)=>void}){const pending=calls.filter(c=>c.status==='pending').length,done=calls.length-pending;return <div className="qaPage qaCallsPage"><Title title="Garson Çağrıları" sub="Müşteri çağrılarını canlı takip edin ve tamamlayın."/><div className="qaCallMetrics"><Metric icon={<Bell/>} value={String(pending)} label="Bekleyen" note="Aktif çağrı"/><Metric icon={<CheckCircle2/>} value={String(done)} label="Bugün Tamamlanan" note="Çözülen çağrı"/><Metric icon={<Clock/>} value={pending?'2 dk':'—'} label="Ortalama Yanıt" note="Bugünkü süre"/></div><section className="qaManageCard qaCallsCard"><div className="qaDashHead"><div><h2>Çağrı Akışı</h2><p>Yeni çağrılar en üstte görünür.</p></div></div><div className="qaCallList">{calls.length?calls.map(x=><div key={x.id} className={x.status==='pending'?'pending':''}><i><Bell/></i><div><b>Masa {x.tableNo}</b><span>{x.note||'Garson çağrısı'}</span><small>{new Date(x.createdAt).toLocaleString('tr-TR')}</small></div><strong>{x.status==='pending'?'Bekliyor':'Tamamlandı'}</strong>{x.status==='pending'&&<button onClick={()=>resolve(x.id)}><CheckCircle2/>Tamamlandı</button>}</div>):<div className="qaLargeEmpty"><Bell/><b>Şu anda bekleyen çağrı yok</b><span>Müşteri çağrı yaptığında burada görünecek.</span></div>}</div></section></div>}
function FeedbackSection({items,stats}:{items:Feedback[];stats:Stats}){const positive=items.length?Math.round(items.filter(x=>x.rating>=4).length/items.length*100):0,dist=[5,4,3,2,1].map(r=>({rating:r,count:items.filter(x=>x.rating===r).length})),max=Math.max(1,...dist.map(x=>x.count));return <div className="qaPage qaFeedbackPage"><Title title="Geri Bildirimler" sub="Müşteri puanlarını ve yorumlarını tek ekrandan takip edin."/><div className="qaFeedbackMetrics"><Metric icon={<Star/>} value={stats.feedbackCount?stats.averageRating.toFixed(1):'—'} label="Ortalama Puan" note={`${stats.feedbackCount} değerlendirme`}/><Metric icon={<MessageSquareText/>} value={String(stats.feedbackCount)} label="Toplam Yorum" note="Müşteri geri bildirimi"/><Metric icon={<CheckCircle2/>} value={`${positive}%`} label="Olumlu" note="4 ve 5 yıldız"/></div><div className="qaFeedbackGrid"><section className="qaManageCard"><div className="qaDashHead"><div><h2>Puan Dağılımı</h2><p>Son değerlendirmelerin dağılımı.</p></div></div><div className="qaRatingBars">{dist.map(x=><div key={x.rating}><span>{x.rating} yıldız</span><i><b style={{width:`${(x.count/max)*100}%`}}/></i><strong>{x.count}</strong></div>)}</div></section><section className="qaManageCard"><div className="qaDashHead"><div><h2>Son Yorumlar</h2><p>En yeni müşteri deneyimleri.</p></div></div><div className="qaFeedbackList">{items.length?items.slice(0,5).map(f=><article key={f.id}><div><b>{f.customerName}</b><span>{'★'.repeat(f.rating)}{'☆'.repeat(5-f.rating)}</span></div><p>{f.comment||'Yorum bırakılmadı.'}</p><small>{new Date(f.createdAt).toLocaleDateString('tr-TR')}</small></article>):<Empty icon={<MessageSquareText/>} title="Henüz geri bildirim yok" text="Müşteriler değerlendirme yaptığında burada görünecek."/>}</div></section></div></div>}
function StatsSection({stats}:{stats:Stats}){const peak=stats.dailyViews.length?Math.max(...stats.dailyViews.map(x=>x.count)):0;return <div className="qaPage qaStatsPage"><Title title="İstatistikler" sub="QR menünüzün kullanım ve ürün performansını takip edin."/><div className="qaStatsMetrics"><Metric icon={<Eye/>} value={String(stats.todayViews)} label="Bugün" note="Menü görüntülenmesi"/><Metric icon={<BarChart3/>} value={String(stats.totalViews)} label="Toplam" note="Menü görüntülenmesi"/><Metric icon={<Star/>} value={stats.feedbackCount?stats.averageRating.toFixed(1):'—'} label="Müşteri Puanı" note={`${stats.feedbackCount} değerlendirme`}/><Metric icon={<Activity/>} value={String(peak)} label="En Yoğun Gün" note="Görüntülenme"/></div><div className="qaStatsGrid"><section className="qaManageCard qaStatsChart"><div className="qaDashHead"><div><h2>Son 7 Gün</h2><p>QR menü görüntülenmeleri.</p></div><span className="qaStatusPill">7 gün</span></div><MiniChart rows={stats.dailyViews}/></section><section className="qaManageCard"><div className="qaDashHead"><div><h2>En Çok İncelenen Ürünler</h2><p>Ürün ilgisine göre sıralama.</p></div></div><div className="qaStatProducts">{stats.topProducts.map((p,i)=><div key={p.id}><b>{i+1}</b><img src={p.image||'/makarilla_tabak.png'} alt=""/><span>{p.name}</span><strong>{p.views}</strong></div>)}</div></section><section className="qaManageCard qaInsightCard"><h2>Hızlı İçgörü</h2><div><span>Toplam görüntülenme</span><b>{stats.totalViews}</b></div><div><span>Bugünkü pay</span><b>{stats.totalViews?Math.round(stats.todayViews/stats.totalViews*100):0}%</b></div><div><span>Bekleyen çağrı</span><b>{stats.pendingCalls}</b></div></section></div></div>}
function SettingsSection({restaurant,save}:{restaurant:Restaurant;save:(r:Restaurant)=>void}){const[d,setD]=useState(restaurant),[notifications,setNotifications]=useState(true),[calls,setCalls]=useState(true),[feedback,setFeedback]=useState(true);return <div className="qaPage qaSettingsPage"><Title title="Ayarlar" sub="QR menü, bildirim ve hesap tercihlerini yönetin." action={<button className="qaAdd" onClick={()=>save(d)}><Save/>Kaydet</button>}/><div className="qaSettingsGrid"><section className="qaManageCard"><h2>Menü Ayarları</h2><div className="qaSettingRow"><div><b>Menü yayında</b><span>Müşteriler QR menüyü görüntüleyebilir.</span></div><button className="qaSwitch on"><i/></button></div><div className="qaSettingRow"><div><b>Tema rengi</b><span>Menüde kullanılan ana vurgu rengi.</span></div><div className="qaColorRow"><input type="color" value={d.themeColor||'#14b8c4'} onChange={e=>setD({...d,themeColor:e.target.value})}/></div></div></section><section className="qaManageCard"><h2>Bildirimler</h2><div className="qaSettingRow"><div><b>Garson çağrıları</b><span>Yeni çağrılarda bildirim göster.</span></div><button className={calls?'qaSwitch on':'qaSwitch'} onClick={()=>setCalls(!calls)}><i/></button></div><div className="qaSettingRow"><div><b>Geri bildirimler</b><span>Yeni yorumlarda bildirim göster.</span></div><button className={feedback?'qaSwitch on':'qaSwitch'} onClick={()=>setFeedback(!feedback)}><i/></button></div><div className="qaSettingRow"><div><b>Genel bildirimler</b><span>Panel bildirimlerini açık tut.</span></div><button className={notifications?'qaSwitch on':'qaSwitch'} onClick={()=>setNotifications(!notifications)}><i/></button></div></section><section className="qaManageCard"><h2>Hesap & Güvenlik</h2><div className="qaSettingRow"><div><b>Yönetici hesabı</b><span>Makarilla · Yönetici</span></div><button className="qaSecondary">Hesabı Yönet</button></div><div className="qaSettingRow"><div><b>Şifre</b><span>Giriş güvenliğinizi güncelleyin.</span></div><button className="qaSecondary">Şifreyi Değiştir</button></div></section></div></div>}
function ago(v:string){const m=Math.max(0,Math.round((Date.now()-new Date(v).getTime())/60000));return m<1?'Şimdi':m<60?`${m} dk önce`:`${Math.floor(m/60)} sa önce`}
function Editor({p,cats,isNew,close,save,del}:{p:Product;cats:Category[];isNew:boolean;close:()=>void;save:(p:Product)=>void;del:(id:string)=>void}){
 const[d,setD]=useState(p);
 const ALLERGENS=['Gluten','Süt','Yumurta','Yer Fıstığı','Kuruyemiş','Soya','Balık','Kabuklu Deniz Ürünü','Susam'];
 const toggleAllergen=(name:string)=>setD(v=>({...v,allergens:(v.allergens||[]).includes(name)?(v.allergens||[]).filter(x=>x!==name):[...(v.allergens||[]),name]}));
 const pickPhoto=(file?:File)=>{if(!file)return;if(file.size>5*1024*1024){alert('Fotoğraf en fazla 5 MB olabilir.');return}const reader=new FileReader();reader.onload=()=>setD(v=>({...v,image:String(reader.result||'')}));reader.readAsDataURL(file)};
 return <>
  <section className="qaWorkbenchEditor">
   <div className="qaWorkbenchTitle"><h2>Ürün Ekle / Düzenle</h2><p>Bilgileri düzenleyin; değişiklikleri sağdaki QR menü önizlemesinde anında görün.</p></div>
   <div className="qaWorkbenchForm">
    <div className="qaEditorTwo"><label>Ürün Adı *<input value={d.name} maxLength={100} onChange={e=>setD({...d,name:e.target.value})}/><small>{d.name.length}/100</small></label><label>Kategori *<select value={d.categoryId} onChange={e=>setD({...d,categoryId:e.target.value})}>{cats.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label></div>
    <label>Açıklama<textarea maxLength={300} value={d.description} onChange={e=>setD({...d,description:e.target.value})}/><small>{d.description.length}/300</small></label>
    <div className="qaPhotoCard">
     <div className="qaPhotoTitle"><b>Ürün Fotoğrafı</b><small>JPG, PNG veya WEBP · Maksimum 5 MB</small></div>
     <div className="qaPhotoRow">
      <label className="qaPhotoThumb"><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>pickPhoto(e.target.files?.[0])}/>{d.image?<img src={d.image} alt="Ürün fotoğrafı"/>:<ImageOff size={28}/>}</label>
      <div className="qaPhotoControls"><label className="qaPhotoChange"><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>pickPhoto(e.target.files?.[0])}/><ImageOff size={15}/>{d.image?'Fotoğrafı Değiştir':'Fotoğraf Yükle'}</label><span>Fotoğraf sağdaki QR menü önizlemesine anında yansır.</span></div>
      {d.image&&<button type="button" className="qaPhotoRemove" onClick={()=>setD({...d,image:''})}><Trash2 size={15}/></button>}
     </div>
    </div>
    <div className="qaEditorSplit"><label>Fiyat *<div className="qaPrice"><span>₺</span><input type="number" min="0" value={d.price} onChange={e=>setD({...d,price:Number(e.target.value)})}/></div></label><div className="qaToggleField"><span><b>Menüde Göster</b><small>QR menüde yayınlansın.</small></span><button type="button" className={d.isActive?'qaToggle on':'qaToggle'} onClick={()=>setD({...d,isActive:!d.isActive})}><i/></button></div></div>
    <div className="qaEditorSplit qaSecondaryRow"><div className="qaToggleField"><span><b>Öne Çıkan Ürün</b><small>Üst sıralarda göster.</small></span><button type="button" className="qaToggle"><i/></button></div><label>Stok Durumu<select defaultValue="var"><option value="var">Stokta Var</option><option value="yok">Stokta Yok</option></select></label></div>
    <div className="qaNutritionBox">
      <div className="qaNutritionHead"><div><b>Beslenme & Alerjen</b><small>Müşterinin menüde göreceği ek bilgiler.</small></div><label>Kalori (kcal)<input type="number" min="0" step="1" value={d.calories??''} placeholder="Örn. 620" onChange={e=>setD({...d,calories:e.target.value===''?undefined:Number(e.target.value)})}/></label></div>
      <div className="qaAllergenChips">{ALLERGENS.map(a=><button type="button" key={a} className={(d.allergens||[]).includes(a)?'active':''} onClick={()=>toggleAllergen(a)}>{a}</button>)}</div>
    </div>
    <div className="qaWorkbenchActions">{!isNew&&<button className="qaDelete" type="button" onClick={()=>del(d.id)}><Trash2 size={15}/>Ürünü Sil</button>}<button className="qaSaveProduct" disabled={!d.name.trim()} onClick={()=>save({...d,name:d.name.trim()})}><CheckCircle2 size={16}/>{isNew?'Ürünü Kaydet':'Değişiklikleri Kaydet'}</button></div>
   </div>
  </section>
  <aside className="qaWorkbenchPreview"><header><div><Eye size={20}/><span><b>QR Menü Önizleme</b><small>Müşterinin telefonunda görünecek görünüm.</small></span></div><span className="qaMobileBadge">Mobil</span></header><div className="qaPhone qaPhoneCompact"><div className="qaPhoneNotch"/><div className="qaPhoneScreen"><div className="qaPreviewBrand">Makarilla<small>PASTA & MORE</small></div><div className="qaPreviewCats"><span className="active">Makarna</span><span>Wraplar</span><span>Salatalar</span><span>Tatlılar</span></div><img src={d.image||'/makarilla_tabak.png'} alt="Ürün önizleme"/><div className="qaPreviewNameRow"><h4>{d.name||'Ürün Adı'}</h4><strong>₺{Number(d.price||0).toLocaleString('tr-TR')}</strong></div><p>{d.description||'Ürün açıklaması burada görünecek.'}</p><div className="qaPreviewBadges"><span>TAZE<br/>İÇERİK</span><span>ÖZEL<br/>SOS</span><span>BOL<br/>LEZZET</span></div>{(d.calories||((d.allergens||[]).length>0))&&<div className="qaPreviewNutrition">{d.calories?<span>{d.calories} kcal</span>:null}{(d.allergens||[]).length>0?<span>Alerjen: {(d.allergens||[]).join(', ')}</span>:null}</div>}<button>Sepete Ekle</button><footer>Makarilla<small>İyi yemek, iyi hisset.</small></footer></div></div></aside>
 </>;
}
