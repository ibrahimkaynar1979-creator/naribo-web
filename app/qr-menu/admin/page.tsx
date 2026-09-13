'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {LayoutDashboard,Utensils,Tags,QrCode,Store,MessageSquare,BellRing,Settings,ExternalLink,Plus,Search,Eye,MoreHorizontal,TrendingUp} from 'lucide-react';

type Tab='overview'|'products'|'categories'|'restaurant'|'waiter'|'feedback'|'qr'|'settings';
const products=[
 {name:'Bolonez Makarna',cat:'Makarnalar',price:299,active:true},
 {name:'Alfredo Makarna',cat:'Makarnalar',price:289,active:true},
 {name:'Tavuklu Pesto Penne',cat:'Tavuklu Makarnalar',price:319,active:true},
 {name:'Tavuklu Alfredo Penne',cat:'Tavuklu Makarnalar',price:329,active:true},
];
const nav=[['overview','Genel Bakış',LayoutDashboard],['products','Ürünler',Utensils],['categories','Kategoriler',Tags],['restaurant','Restoran Bilgileri',Store],['waiter','Garson Çağrıları',BellRing],['feedback','Geri Bildirimler',MessageSquare],['qr','QR Kod',QrCode],['settings','Ayarlar',Settings]] as const;

export default function Admin(){
 const [tab,setTab]=useState<Tab>('overview');
 const [q,setQ]=useState('');
 const filtered=useMemo(()=>products.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())),[q]);
 const title=nav.find(n=>n[0]===tab)?.[1]||'Genel Bakış';
 return <main className="ptAdmin"><style>{css}</style>
   <header className="ptTopbar">
     <div className="ptBrandWrap"><div className="ptBrand">panel<span>takip</span></div><small>QR MENÜ</small></div>
     <div className="ptRestaurant"><b>Makarilla</b><span>Karşıyaka · İzmir</span></div>
     <Link href="/menu/makarilla" target="_blank" className="ptPreview"><Eye size={16}/> Menüyü Gör <ExternalLink size={14}/></Link>
   </header>
   <div className="ptShell">
     <aside className="ptSidebar">
       <div className="ptAsideTitle">YÖNETİM</div>
       {nav.map(([id,label,Icon])=><button key={id} onClick={()=>setTab(id)} className={tab===id?'ptNavItem isActive':'ptNavItem'}><Icon size={18}/><span>{label}</span>{id==='waiter'&&<em>2</em>}</button>)}
     </aside>
     <section className="ptContent">
       <div className="ptPageHead"><div><p>MAKARILLA / QR MENÜ</p><h1>{title}</h1></div>{tab==='products'&&<button className="ptPrimary"><Plus size={17}/> Yeni Ürün</button>}</div>
       {tab==='overview'?<Overview setTab={setTab}/>:tab==='products'?<Products q={q} setQ={setQ} items={filtered}/>:<Placeholder tab={tab}/>} 
     </section>
   </div>
 </main>;
}

function Overview({setTab}:{setTab:(t:Tab)=>void}){
 return <>
   <div className="ptStats">
     <Card k="Toplam Ürün" v="24" s="22 aktif"/>
     <Card k="Kategori" v="6" s="Menüde yayında"/>
     <Card k="Bugünkü Görüntülenme" v="184" s="+18%"/>
     <Card k="Bekleyen Çağrı" v="2" s="Garson çağrısı" warn/>
   </div>
   <div className="ptOverviewGrid">
     <div className="ptPanel">
       <div className="ptPanelHead"><div><h2>Hızlı İşlemler</h2><p>Menünüzü buradan yönetin.</p></div></div>
       <div className="ptQuickGrid">
         <button onClick={()=>setTab('products')}><span className="ptQuickIcon"><Utensils size={20}/></span><div><b>Ürünleri Yönet</b><small>Fiyat, görsel ve durum</small></div></button>
         <button onClick={()=>setTab('categories')}><span className="ptQuickIcon"><Tags size={20}/></span><div><b>Kategoriler</b><small>Sıralama ve görünürlük</small></div></button>
         <button onClick={()=>setTab('qr')}><span className="ptQuickIcon"><QrCode size={20}/></span><div><b>QR Kod</b><small>Sabit menü QR kodu</small></div></button>
         <button onClick={()=>setTab('restaurant')}><span className="ptQuickIcon"><Store size={20}/></span><div><b>Restoran Bilgileri</b><small>Saat, telefon ve adres</small></div></button>
       </div>
     </div>
     <div className="ptPanel ptActivity">
       <div className="ptPanelHead"><div><h2>Son Hareketler</h2><p>QR menü etkinlikleri</p></div></div>
       <div className="ptEvent"><i className="green"/><div><b>Menü görüntülendi</b><span>2 dk önce</span></div></div>
       <div className="ptEvent"><i className="orange"/><div><b>Garson çağrısı · Masa 5</b><span>6 dk önce</span></div></div>
       <div className="ptEvent"><i/><div><b>Yeni geri bildirim · 5 yıldız</b><span>18 dk önce</span></div></div>
     </div>
   </div>
 </>;
}

function Card({k,v,s,warn}:{k:string,v:string,s:string,warn?:boolean}){
 return <div className={warn?'ptStat isWarn':'ptStat'}><span>{k}</span><strong>{v}</strong><small><TrendingUp size={13}/>{s}</small></div>
}

function Products({q,setQ,items}:{q:string,setQ:(v:string)=>void,items:typeof products}){
 return <>
   <div className="ptToolbar"><div className="ptSearch"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Ürün ara..."/></div><button>Filtrele</button></div>
   <div className="ptPanel ptTable"><div className="ptThead"><span>ÜRÜN</span><span>KATEGORİ</span><span>FİYAT</span><span>DURUM</span><span/></div>{items.map((p,i)=><div className="ptTr" key={p.name}><div className="ptProd"><div className={'ptThumb t'+i}/><div><b>{p.name}</b><small>Menü ürünü</small></div></div><span>{p.cat}</span><b>₺{p.price}</b><span className="ptStatus">Aktif</span><button className="ptDots"><MoreHorizontal/></button></div>)}</div>
 </>;
}

function Placeholder({tab}:{tab:Tab}){
 const text:Record<string,string>={categories:'Kategori ekleme, sıralama ve aktif/pasif yönetimi burada olacak.',restaurant:'Logo, restoran adı, şube, çalışma saatleri, telefon ve adres burada yönetilecek.',waiter:'QR menüden gelen masa bazlı garson çağrıları burada anlık listelenecek.',feedback:'Müşteri puanları ve geri bildirim notları burada görüntülenecek.',qr:'Restoranın değişmeyen kalıcı QR kodu burada oluşturulacak ve indirilecek.',settings:'QR menü görünürlüğü ve temel restoran ayarları burada olacak.'};
 return <div className="ptPanel ptEmpty"><div className="ptEmptyIcon">{tab==='qr'?<QrCode/>:<Settings/>}</div><h2>{nav.find(n=>n[0]===tab)?.[1]}</h2><p>{text[tab]}</p><span>İskelet hazır · fonksiyonları sonraki adımda bağlayacağız.</span></div>
}

const css=`
*{box-sizing:border-box}html,body{margin:0;background:#f4f7fb}.ptAdmin{--blue:#1684ff;--blue2:#0a6fd8;--ink:#10213a;--muted:#7c8ba1;--line:#e5ebf2;--surface:#fff;min-height:100vh;background:linear-gradient(180deg,#f8fbff 0,#f3f6fa 220px,#f4f7fb 100%);color:var(--ink);font-family:Inter,Manrope,Arial,sans-serif;font-size:14px;isolation:isolate}.ptAdmin button,.ptAdmin input{font:inherit}.ptTopbar{height:76px;background:rgba(255,255,255,.94);backdrop-filter:blur(16px);border-bottom:1px solid var(--line);display:flex;align-items:center;padding:0 28px;gap:28px;position:sticky;top:0;z-index:20;box-shadow:0 4px 18px rgba(32,54,86,.04)}.ptBrandWrap{display:flex;align-items:flex-end;gap:10px;min-width:190px}.ptBrand{font-size:24px!important;line-height:1!important;font-weight:900!important;letter-spacing:-1.2px!important;color:#10213a!important;text-shadow:none!important;background:none!important}.ptBrand span{color:var(--blue)!important}.ptBrandWrap small{font-size:9px;font-weight:900;letter-spacing:1.4px;color:#97a4b4;margin-bottom:2px}.ptRestaurant{display:flex;flex-direction:column;border-left:1px solid var(--line);padding-left:26px}.ptRestaurant b{font-size:13px;font-weight:800}.ptRestaurant span{font-size:10px;color:#8b98a9;margin-top:3px}.ptPreview{margin-left:auto;height:42px;padding:0 15px;display:flex;align-items:center;gap:8px;border:1px solid #dbe3ec;border-radius:12px;color:#1c2d43;text-decoration:none;font-size:11px;font-weight:800;background:#fff;box-shadow:0 4px 16px rgba(27,51,82,.04);transition:.2s}.ptPreview:hover{border-color:#c7d7e8;transform:translateY(-1px)}.ptShell{display:grid;grid-template-columns:232px minmax(0,1fr);min-height:calc(100vh - 76px)}.ptSidebar{background:rgba(255,255,255,.9);border-right:1px solid var(--line);padding:24px 14px;position:sticky;top:76px;height:calc(100vh - 76px)}.ptAsideTitle{font-size:9px;color:#9aa7b7;font-weight:900;letter-spacing:1.4px;padding:0 13px 10px}.ptNavItem{width:100%;height:44px;border:0;background:transparent;border-radius:12px;display:flex;align-items:center;gap:11px;padding:0 13px;color:#657489;font-size:12px;font-weight:750;margin:3px 0;cursor:pointer;transition:.18s}.ptNavItem:hover{background:#f5f8fc;color:#31506f}.ptNavItem.isActive{background:linear-gradient(135deg,#eaf5ff,#edf7ff);color:var(--blue2);box-shadow:inset 0 0 0 1px #d9ebff}.ptNavItem em{margin-left:auto;background:#ff5d57;color:#fff;width:20px;height:20px;border-radius:999px;display:grid;place-items:center;font-size:9px;font-style:normal;font-weight:900}.ptContent{padding:34px;max-width:1320px;width:100%;overflow:hidden}.ptPageHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}.ptPageHead p{margin:0 0 6px;color:#8c99aa;font-size:9px;font-weight:900;letter-spacing:1.3px}.ptPageHead h1{margin:0!important;font-size:28px!important;line-height:1.08!important;font-weight:850!important;letter-spacing:-.8px!important;color:#10213a!important}.ptPrimary{height:42px;border:0;border-radius:11px;background:linear-gradient(135deg,var(--blue),var(--blue2));color:#fff;font-weight:800;padding:0 16px;display:flex;align-items:center;gap:7px;box-shadow:0 8px 18px rgba(22,132,255,.18)}.ptStats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:18px}.ptStat{background:rgba(255,255,255,.96);border:1px solid var(--line);border-radius:16px;padding:18px 18px 16px;min-height:120px;box-shadow:0 8px 24px rgba(34,55,84,.035)}.ptStat>span{font-size:10px;color:#7d8ba0;font-weight:750}.ptStat strong{display:block;font-size:30px;line-height:1;margin:14px 0 10px;letter-spacing:-1px}.ptStat small{display:flex;gap:5px;align-items:center;color:#24a267;font-size:9px;font-weight:800}.ptStat.isWarn small{color:#f08737}.ptOverviewGrid{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(280px,.8fr);gap:16px}.ptPanel{background:rgba(255,255,255,.98);border:1px solid var(--line);border-radius:17px;overflow:hidden;box-shadow:0 10px 28px rgba(31,56,88,.04)}.ptPanelHead{padding:18px 20px;border-bottom:1px solid #edf1f5}.ptPanelHead h2{font-size:16px!important;line-height:1.2!important;margin:0 0 4px!important;font-weight:820!important;letter-spacing:-.25px!important;color:#10213a!important}.ptPanelHead p{font-size:10px!important;color:#8c99aa!important;margin:0!important}.ptQuickGrid{display:grid;grid-template-columns:1fr 1fr;gap:11px;padding:15px}.ptQuickGrid button{text-align:left;min-height:104px;background:linear-gradient(180deg,#fff,#fbfdff);border:1px solid #e5ebf1;border-radius:14px;padding:14px;display:flex;align-items:flex-start;gap:12px;cursor:pointer;color:#26364b;transition:.18s}.ptQuickGrid button:hover{border-color:#cfe2f6;box-shadow:0 8px 18px rgba(26,63,102,.055);transform:translateY(-1px)}.ptQuickIcon{width:36px;height:36px;border-radius:11px;background:#eaf5ff;color:var(--blue);display:grid;place-items:center;flex:0 0 auto}.ptQuickGrid button div{display:flex;flex-direction:column;padding-top:2px}.ptQuickGrid b{font-size:12px}.ptQuickGrid small{font-size:9px;color:#8c99aa;margin-top:5px}.ptActivity{padding-bottom:6px}.ptEvent{display:flex;gap:11px;padding:15px 18px;border-bottom:1px solid #f0f3f6}.ptEvent:last-child{border-bottom:0}.ptEvent i{width:9px;height:9px;background:var(--blue);border-radius:50%;margin-top:4px;box-shadow:0 0 0 4px #eef6ff}.ptEvent i.green{background:#22b36b;box-shadow:0 0 0 4px #edf9f3}.ptEvent i.orange{background:#f59e0b;box-shadow:0 0 0 4px #fff7e8}.ptEvent div{display:flex;flex-direction:column}.ptEvent b{font-size:10px}.ptEvent span{font-size:9px;color:#929dad;margin-top:4px}.ptToolbar{display:flex;justify-content:space-between;gap:10px;margin-bottom:12px}.ptSearch{height:43px;background:#fff;border:1px solid #e0e7ee;border-radius:12px;display:flex;align-items:center;gap:8px;padding:0 12px;max-width:410px;width:100%;box-shadow:0 5px 16px rgba(34,59,91,.03)}.ptSearch input{border:0;outline:0;width:100%;font-size:11px;color:#22364d;background:transparent}.ptToolbar>button{border:1px solid #e0e7ee;background:#fff;border-radius:11px;padding:0 16px;font-weight:750;color:#47566a}.ptThead,.ptTr{display:grid;grid-template-columns:2fr 1fr .65fr .65fr 40px;align-items:center;gap:12px;padding:12px 17px}.ptThead{background:#fafcff;color:#909cab;font-size:8px;font-weight:900;letter-spacing:.8px}.ptTr{border-top:1px solid #edf1f4;font-size:11px}.ptProd{display:flex;align-items:center;gap:10px}.ptThumb{width:46px;height:46px;border-radius:10px;background:linear-gradient(135deg,#f6b45f,#9b3f1e);box-shadow:0 5px 12px rgba(0,0,0,.07)}.ptThumb.t1{background:linear-gradient(135deg,#f3dfaa,#caa462)}.ptThumb.t2{background:linear-gradient(135deg,#9dc37a,#d9a646)}.ptThumb.t3{background:linear-gradient(135deg,#ead7b7,#967350)}.ptProd>div:last-child{display:flex;flex-direction:column}.ptProd small{font-size:8px;color:#929daa;margin-top:3px}.ptStatus{display:inline-flex!important;width:50px;justify-content:center;background:#eaf9f0;color:#238653;border-radius:999px;padding:5px 7px;font-size:8px;font-weight:850}.ptDots{border:0;background:transparent;color:#8b96a5}.ptEmpty{min-height:430px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px}.ptEmptyIcon{width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,#e9f5ff,#f4f9ff);color:var(--blue);display:grid;place-items:center;margin-bottom:16px}.ptEmpty h2{margin:0 0 8px!important;font-size:19px!important;color:#10213a!important}.ptEmpty p{max-width:480px;margin:0;color:#758397;font-size:11px;line-height:1.65}.ptEmpty>span{margin-top:18px;background:#f5f7fa;border-radius:20px;padding:8px 12px;font-size:9px;color:#8995a5}
@media(max-width:900px){.ptTopbar{padding:0 16px;height:66px}.ptRestaurant{display:none}.ptBrandWrap{min-width:0}.ptBrandWrap small{display:none}.ptPreview{padding:0 11px}.ptPreview svg:last-child{display:none}.ptShell{grid-template-columns:68px minmax(0,1fr);min-height:calc(100vh - 66px)}.ptSidebar{top:66px;height:calc(100vh - 66px);padding:14px 8px}.ptAsideTitle{display:none}.ptNavItem{justify-content:center;padding:0;position:relative}.ptNavItem span{display:none}.ptNavItem em{position:absolute;right:3px;top:3px;width:17px;height:17px;font-size:8px}.ptContent{padding:20px 14px}.ptPageHead{margin-bottom:18px}.ptPageHead h1{font-size:23px!important}.ptStats{grid-template-columns:1fr 1fr;gap:10px}.ptStat{min-height:108px;padding:14px}.ptStat strong{font-size:25px}.ptOverviewGrid{grid-template-columns:1fr}.ptQuickGrid{grid-template-columns:1fr 1fr}.ptThead{display:none}.ptTr{grid-template-columns:minmax(0,1.5fr) .7fr .55fr 32px;padding:11px 12px}.ptTr>span:nth-of-type(1){display:none}.ptProd small{display:none}}
@media(max-width:560px){.ptBrand{font-size:20px!important}.ptPreview{font-size:0;width:40px;justify-content:center;padding:0}.ptShell{grid-template-columns:58px minmax(0,1fr)}.ptSidebar{padding:12px 6px}.ptNavItem{height:42px}.ptContent{padding:16px 10px;overflow:hidden}.ptPageHead h1{font-size:21px!important}.ptPageHead p{font-size:8px}.ptStats{grid-template-columns:1fr 1fr;gap:8px}.ptStat{min-height:98px;padding:12px}.ptStat>span{font-size:9px}.ptStat strong{font-size:23px;margin:11px 0 8px}.ptOverviewGrid{gap:10px}.ptPanelHead{padding:15px}.ptPanelHead h2{font-size:14px!important}.ptQuickGrid{grid-template-columns:1fr;padding:10px}.ptQuickGrid button{min-height:82px;padding:12px}.ptActivity{display:none}.ptToolbar{align-items:stretch}.ptSearch{max-width:none}.ptToolbar>button{display:none}.ptTr{grid-template-columns:minmax(0,1fr) .55fr 30px;gap:8px}.ptTr>b{font-size:10px}.ptTr .ptStatus{display:none!important}.ptThumb{width:40px;height:40px}.ptProd b{font-size:10px}}
`;
