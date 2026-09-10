'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['Ana Sayfa', '#'],
  ['Nasıl Çalışıyoruz?', '#nasil'],
  ['Hizmetler', '#hizmetler'],
  ['QR Menü', '#qr-menu'],
  ['Kârlılık', '#basari'],
  ['Naribo Modeli', '#naribo-modeli'],
  ['İletişim', '#iletisim'],
] as const;

export default function MobileNav(){
  const [open,setOpen]=useState(false);
  return <>
    <button className="mobileMenuLive" aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
    {open&&<div className="mobileNavPanel" role="dialog" aria-label="Mobil menü">
      <nav>{links.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
      <a className="mobileNavCta" href="#analiz" onClick={()=>setOpen(false)}>Ücretsiz Restoran Analizi</a>
    </div>}
    <style>{`
      .mobileMenuLive,.mobileNavPanel{display:none}
      @media(min-width:761px){
        .desktopNav a[href="#basari"]{font-size:0}
        .desktopNav a[href="#basari"]:after{content:'Kârlılık';font-size:inherit}
        .desktopNav a[href="#hakkimizda"]{display:none!important}
      }
      @media(max-width:760px){
        .nav .mobileMenu{display:none!important}
        .mobileMenuLive{position:fixed;z-index:102;top:12px;right:16px;display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.1);color:#fff}
        .mobileNavPanel{position:fixed;z-index:101;top:92px;left:12px;right:12px;display:block;padding:14px;border-radius:18px;background:rgba(3,23,34,.985);border:1px solid rgba(33,216,246,.18);box-shadow:0 20px 45px rgba(0,0,0,.34);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}
        .mobileNavPanel nav{display:grid;gap:5px}.mobileNavPanel nav a{display:block;padding:12px 14px;border-radius:12px;color:#e9f7fa;font-size:13px;font-weight:750;background:rgba(255,255,255,.035);text-decoration:none}
        .mobileNavCta{display:flex;align-items:center;justify-content:center;margin-top:10px;padding:13px 14px;border-radius:12px;background:#21d8f6;color:#03202d;font-size:12.5px;font-weight:900;text-decoration:none}
      }
    `}</style>
  </>;
}
