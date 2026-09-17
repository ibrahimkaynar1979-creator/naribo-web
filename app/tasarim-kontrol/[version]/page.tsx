'use client';

import '../../qr-menu/admin/premium-v2.css';
import '../../admin/[restaurant]/typography.css';
import '../../admin/[restaurant]/sections.css';
import {useParams} from 'next/navigation';
import {Activity,BarChart3,Bell,Eye,Home,MessageSquareText,QrCode,Settings,Star,Store,Tags,Utensils} from 'lucide-react';

const labels:Record<string,string>={
  '1':'İstatistikler tamamlandı',
  '2':'Ayarlar tamamlandı',
  '3':'Canlı QR menü bağlandı',
  '4':'Ürün sıralama tamamlandı',
  '5':'16 Eylül son çalışan sürüm',
};

export default function VersionPreview(){
 const params=useParams<{version:string}>();
 const version=String(params.version||'5');
 const nav=[['Genel Bakış',Home],['Menüm',Utensils],['Kategoriler',Tags],['QR Kod',QrCode],['Restoran Bilgileri',Store],['Garson Çağrıları',Bell],['Geri Bildirimler',Star],['İstatistikler',BarChart3],['Ayarlar',Settings]] as const;
 return <main className="qrAdminPremium">
   <header className="qaTop">
     <button className="qaBrand"><span>panel</span>takip<small>QR MENÜ</small></button>
     <div className="qaTopRestaurant"><div className="qaRestaurantThumb">M</div><div><b>Makarilla</b><small>Yönetim Paneli · Sürüm {version}</small></div></div>
     <div className="qaTopActions"><button className="qaBell"><Bell size={18}/></button><div className="qaAvatar">MA</div></div>
   </header>
   <aside className="qaSide">{nav.map(([label,I],i)=><button key={label} className={i===0?'active':''}><I size={17}/>{label}</button>)}</aside>
   <section className="qaMain">
    <div className="qaPage qaOverviewDashboard">
      <div className="qaGreeting"><h1>Genel Bakış</h1><p>Makarilla menünüzün güncel durumu ve hızlı yönetim alanları.</p></div>
      <div className="qaMetricGrid qaOverviewMetrics">
        <Metric icon={<Eye size={17}/>} value="0" label="Bugünkü Görüntülenme" note="0 toplam görüntülenme"/>
        <Metric icon={<Utensils size={17}/>} value="8" label="Menü Ürünleri" note="8 ürün yayında"/>
        <Metric icon={<Star size={17}/>} value="—" label="Müşteri Puanı" note="Henüz geri bildirim yok"/>
        <Metric icon={<Bell size={17}/>} value="0" label="Bekleyen Çağrı" note="Bekleyen çağrı yok"/>
      </div>
      <div className="qaOverviewSplit">
        <section className="qaDashCard"><div className="qaDashHead"><div><h2>Menü Performansı</h2><p>Son 7 günlük QR menü görüntülenmeleri.</p></div></div><div className="qaRealChart">{['Cum','Cmt','Paz','Pzt','Sal','Çar','Per'].map(d=><div key={d}><span style={{height:'5px'}}/><b>0</b><small>{d}</small></div>)}</div></section>
        <section className="qaDashCard"><div className="qaDashHead"><div><h2>Canlı Çağrılar</h2><p>Bekleyen masa çağrıları.</p></div><Bell size={18}/></div><div className="qaEmptyState"><Bell/><b>Bekleyen çağrı yok</b><span>Yeni çağrılar burada görünecek.</span></div></section>
      </div>
      <div className="qaOverviewSplit qaOverviewBottom">
        <section className="qaDashCard"><div className="qaDashHead"><div><h2>Hızlı Yönetim</h2><p>En sık kullanılan işlemlere tek tıkla geçin.</p></div></div><div className="qaQuickGrid"><Quick icon={<Utensils/>} title="Ürün Ekle / Düzenle"/><Quick icon={<Tags/>} title="Kategorileri Yönet"/><Quick icon={<QrCode/>} title="QR Kod"/><Quick icon={<Store/>} title="Restoran Bilgileri"/></div></section>
        <section className="qaDashCard qaHealthCard"><div className="qaDashHead"><div><h2>Menü Sağlığı</h2><p>Menünüzün eksik ve güçlü yönleri.</p></div><Activity size={18}/></div><div className="qaHealthScore"><strong>100%</strong><span>tamamlanma</span></div><div className="qaHealthList"><div><Utensils/><span>8/8 ürün yayında</span></div><div><span>✓ Tüm ürünlerde görsel var</span></div><div><span>✓ Tüm ürünlerde açıklama var</span></div></div></section>
      </div>
      <div className="qaOverviewSplit qaOverviewBottom">
        <section className="qaDashCard"><div className="qaDashHead"><div><h2>Öne Çıkan Ürünler</h2><p>Ürün görüntülenmeleri arttıkça sıralama otomatik güncellenir.</p></div></div><div className="qaPopularList">{['Bolonez Makarna','Alfredo Makarna','Tavuklu Pesto Penne','Tavuklu Alfredo Penne'].map((n,i)=><div key={n}><span>{i+1}</span><img src="/makarilla_tabak.png" alt=""/><div><b>{n}</b><small>0 görüntülenme</small></div><strong>₺{[299,289,319,319][i]}</strong></div>)}</div></section>
        <section className="qaDashCard"><div className="qaDashHead"><div><h2>Son Geri Bildirimler</h2><p>Müşteri deneyiminin son durumu.</p></div><MessageSquareText/></div><div className="qaEmptyState"><MessageSquareText/><b>Henüz geri bildirim yok</b><span>İlk müşteri geri bildirimi burada görünecek.</span></div></section>
      </div>
      <div style={{position:'fixed',right:18,bottom:18,zIndex:100,background:'#111923',color:'#fff',borderRadius:999,padding:'9px 13px',font:'700 11px Arial'}}>Önizleme · {labels[version]||labels['5']}</div>
    </div>
   </section>
 </main>
}

function Metric({icon,value,label,note}:{icon:React.ReactNode;value:string;label:string;note:string}){return <div className="qaMetric qaDashboardMetric"><i>{icon}</i><strong>{value}</strong><span>{label}</span><small>{note}</small></div>}
function Quick({icon,title}:{icon:React.ReactNode;title:string}){return <button>{icon}<span><b>{title}</b><small>Önizleme</small></span></button>}
