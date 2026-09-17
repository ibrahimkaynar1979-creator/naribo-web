'use client';

const versions = [
  { no: '1', title: 'İstatistikler tamamlandı', url: 'https://naribo-qv11ugkvz-ibos2.vercel.app/admin/makarilla' },
  { no: '2', title: 'Ayarlar tamamlandı', url: 'https://naribo-25v4s0z3e-ibos2.vercel.app/admin/makarilla' },
  { no: '3', title: 'Canlı QR menü bağlandı', url: 'https://naribo-d13pytr0a-ibos2.vercel.app/admin/makarilla' },
  { no: '4', title: 'Ürün sıralama tamamlandı', url: 'https://naribo-nt22ny576-ibos2.vercel.app/admin/makarilla' },
  { no: '5', title: '16 Eylül son çalışan sürüm', url: 'https://naribo-gxa70prol-ibos2.vercel.app/admin/makarilla' },
];

export default function DesignCheckPage() {
  return <main style={{fontFamily:'Arial,sans-serif',background:'#fffaf5',minHeight:'100vh',padding:'32px'}}>
    <div style={{maxWidth:1000,margin:'0 auto'}}>
      <h1 style={{fontSize:34,marginBottom:8}}>PanelTakip Tasarım Sürüm Kontrolü</h1>
      <p style={{color:'#687584',marginBottom:24}}>Canlı admin paneline dokunmadan 16 Eylül sürümlerini karşılaştırmak için kontrol listesi.</p>
      <div style={{display:'grid',gap:12}}>{versions.map(v=><div key={v.no} style={{background:'#fff',border:'1px solid #eee1d7',borderRadius:18,padding:18,display:'flex',alignItems:'center',gap:16}}><b style={{width:42,height:42,borderRadius:14,display:'grid',placeItems:'center',background:'#ff645d',color:'#fff',fontSize:20}}>{v.no}</b><div style={{flex:1}}><strong style={{fontSize:16}}>{v.title}</strong><div style={{fontSize:12,color:'#7a858d',marginTop:4}}>16 Eylül kayıtlı deployment</div></div><a href={v.url} target="_blank" rel="noreferrer" style={{textDecoration:'none',background:'#121923',color:'#fff',padding:'11px 16px',borderRadius:12,fontWeight:700}}>Sürümü Aç</a></div>)}</div>
      <div style={{marginTop:24,padding:18,borderRadius:18,background:'#fff0e6',color:'#3d312b',lineHeight:1.5}}><b>Not:</b> Eski deploymentlar eski kimlik doğrulama sistemine bağlı olduğu için giriş isteyebilir. Bu sayfa yalnız sürüm kayıtlarını güvenli biçimde ayırmak içindir; canlı paneli değiştirmez.</div>
    </div>
  </main>
}
