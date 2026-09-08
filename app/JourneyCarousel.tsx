'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  { no:'01', title:'INSTAGRAM REKLAMI', desc:'Müşteri reklamı görür, ilgilenir ve siparişe geçer.', src:'/journey-instagram.png', alt:'WrapUp Instagram reklamı telefon görünümü' },
  { no:'02', title:'WEB LİNK', desc:'Naribo linki ile platform seçim ekranına gelir.', src:'/journey-weblink.png', alt:'WrapUp platform seçim web linki telefon görünümü' },
  { no:'03', title:'SİPARİŞ SAYFASI', desc:'Tercih ettiği platformda siparişini tamamlar.', src:'/journey-yemeksepeti.png', alt:'Yemeksepeti Wrap Up Chicken sipariş sayfası telefon görünümü' },
] as const;

export default function JourneyCarousel(){
  const [active,setActive]=useState(0); const startX=useRef<number|null>(null);
  const go=(n:number)=>setActive((n+slides.length)%slides.length);
  return <div className="journeyCarousel jcApproved">
    <style jsx global>{`
      .jcApproved{background:#031722;color:#fff;padding:28px 0 16px;overflow:hidden}.jcApproved .journeyCarouselFixedHead{padding:0 20px 12px;text-align:center}.jcApproved .journeyCarouselKicker{display:flex;align-items:center;justify-content:center;gap:10px;color:#8feaf8;font-size:10px;font-weight:800;letter-spacing:4px;margin-bottom:12px;white-space:nowrap}.jcApproved .journeyCarouselKicker span{width:34px;height:1px;background:#20cbe9}.jcApproved .journeyCarouselFixedHead h2{margin:0;font-size:30px;line-height:.98;letter-spacing:-1.2px;font-weight:900}.jcApproved .journeyCarouselFixedHead h2 em{font-style:normal;color:#21d8f6}.jcApproved .journeyCarouselFixedHead p{margin:11px auto 0;max-width:390px;color:#b7c9d1;font-size:13px;line-height:1.45}.jcApproved .journeyCarouselViewport{position:relative;height:610px;overflow:hidden;touch-action:pan-y}.jcApproved .journeyCarouselSlide{position:absolute;inset:0;opacity:0;transform:translateX(34px);transition:opacity .28s ease,transform .28s ease;pointer-events:none;display:flex;flex-direction:column;align-items:center;padding-top:4px}.jcApproved .journeyCarouselSlide.isActive{opacity:1;transform:translateX(0);pointer-events:auto}.jcApproved .journeyPhoneAsset{position:relative;width:min(88vw,410px);height:500px;display:flex;align-items:flex-start;justify-content:center}.jcApproved .journeyPhoneAsset img{width:100%;height:100%;object-fit:contain;object-position:center top;filter:drop-shadow(0 25px 34px rgba(0,0,0,.28))}.jcApproved .journeyCarouselLabel{text-align:center;margin-top:-3px;padding:0 50px;min-height:72px}.jcApproved .journeyCarouselLabel b{display:block;color:#21d8f6;font-size:12px;letter-spacing:1px;margin-bottom:3px}.jcApproved .journeyCarouselLabel strong{display:block;font-size:16px;margin-bottom:5px}.jcApproved .journeyCarouselLabel p{margin:0;color:#b7c9d1;font-size:12px;line-height:1.35}.jcApproved .journeyCarouselNav{position:absolute;z-index:10;top:48%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(33,216,246,.58);background:rgba(3,23,34,.86);color:#21d8f6}.jcApproved .journeyCarouselNav.prev{left:10px}.jcApproved .journeyCarouselNav.next{right:10px}.jcApproved .journeyCarouselDots{height:30px;display:flex;align-items:center;justify-content:center;gap:8px}.jcApproved .journeyCarouselDots button{border:0;padding:0;width:7px;height:7px;border-radius:99px;background:#31566a}.jcApproved .journeyCarouselDots button.active{width:24px;background:#21d8f6}
    `}</style>
    <div className="journeyCarouselFixedHead"><div className="journeyCarouselKicker"><span/>REKLAMDAN SİPARİŞE<span/></div><h2>REKLAMI GÖSTERMEK YETMEZ.<br/><em>SİPARİŞE</em> GÖTÜRMEK GEREKİR.</h2><p>Instagram’da başlayan ilgiyi, müşterinin tercih ettiği sipariş kanalına taşıyoruz.</p></div>
    <div className="journeyCarouselViewport" onTouchStart={e=>startX.current=e.touches[0].clientX} onTouchEnd={e=>{if(startX.current===null)return;const dx=e.changedTouches[0].clientX-startX.current;if(Math.abs(dx)>45)go(active+(dx<0?1:-1));startX.current=null}}>
      {slides.map((s,i)=><div className={`journeyCarouselSlide ${i===active?'isActive':''}`} key={s.no}><div className="journeyPhoneAsset"><Image src={s.src} alt={s.alt} width={1024} height={1536} priority={i===0}/></div><div className="journeyCarouselLabel"><b>{s.no}</b><strong>{s.title}</strong><p>{s.desc}</p></div></div>)}
      <button className="journeyCarouselNav prev" onClick={()=>go(active-1)} aria-label="Önceki"><ArrowLeft size={20}/></button><button className="journeyCarouselNav next" onClick={()=>go(active+1)} aria-label="Sonraki"><ArrowRight size={20}/></button>
    </div><div className="journeyCarouselDots">{slides.map((s,i)=><button key={s.no} className={i===active?'active':''} onClick={()=>setActive(i)} aria-label={`${s.no}. adım`}/>)}</div>
  </div>
}
