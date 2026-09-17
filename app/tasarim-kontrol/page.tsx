'use client';

const versions = [
  { no: '1', title: 'İstatistikler tamamlandı', url: '/tasarim-kontrol/1' },
  { no: '2', title: 'Ayarlar tamamlandı', url: '/tasarim-kontrol/2' },
  { no: '3', title: 'Canlı QR menü bağlandı', url: '/tasarim-kontrol/3' },
  { no: '4', title: 'Ürün sıralama tamamlandı', url: '/tasarim-kontrol/4' },
  { no: '5', title: '16 Eylül son çalışan sürüm', url: '/tasarim-kontrol/5' },
];

export default function DesignCheckPage() {
  return <main style={{fontFamily:'Arial,sans-serif',background:'#fffaf5',minHeight:'100vh',padding:'32px'}}>
    <div style={{maxWidth:1000,margin:'0 auto'}}>
      <h1 style={{fontSize:34,marginBottom:8}}>PanelTakip Tasarım Sürüm Kontrolü</h1>
      <p style={{color:'#687584',marginBottom:24}}>Eski giriş sistemine takılmadan yönetim paneli görünümünü karşılaştırın.</p>
      <div style={{display:'grid',gap:12}}>{versions.map(v=><div key={v.no} style={{background:'#fff',border:'1px solid #eee1d7',borderRadius:18,padding:18,display:'flex',alignItems:'center',gap:16}}><b style={{width:42,height:42,borderRadius:14,display:'grid',placeItems:'center',background:'#ff645d',color:'#fff',fontSize:20}}>{v.no}</b><div style={{flex:1}}><strong style={{fontSize:16}}>{v.title}</strong><div style={{fontSize:12,color:'#7a858d',marginTop:4}}>Giriş gerektirmeyen tasarım önizlemesi</div></div><a href={v.url} target="_blank" rel="noreferrer" style={{textDecoration:'none',background:'#121923',color:'#fff',padding:'11px 16px',borderRadius:12,fontWeight:700}}>Sürümü Aç</a></div>)}</div>
      <div style={{marginTop:24,padding:18,borderRadius:18,background:'#fff0e6',color:'#3d312b',lineHeight:1.5}}><b>Not:</b> Bu ekranlar yalnız tasarım kontrolü içindir. Giriş yapmaz, veri değiştirmez ve canlı admin paneline müdahale etmez.</div>
    </div>
  </main>
}
