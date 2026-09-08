'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  { no:'01', short:'Instagram’da Görür', title:'INSTAGRAM REKLAMI', desc:'Müşteri reklamı görür, ilgilenir ve siparişe geçer.', src:'/journey-instagram.png', alt:'WrapUp Instagram reklamı telefon görünümü' },
  { no:'02', short:'Sipariş Linkine Gelir', title:'WEB LİNK', desc:'Naribo linki ile platform seçim ekranına gelir.', src:'/journey-weblink.png', alt:'WrapUp platform seçim web linki telefon görünümü' },
  { no:'03', short:'Sipariş Verir', title:'SİPARİŞ SAYFASI', desc:'Tercih ettiği platformda siparişini tamamlar.', src:'/journey-yemeksepeti.png', alt:'Yemeksepeti Wrap Up Chicken sipariş sayfası telefon görünümü' },
] as const;

export default function JourneyCarousel(){
  const [active,setActive]=useState(0);
  const startX=useRef<number|null>(null);
  const go=(n:number)=>setActive((n+slides.length)%slides.length);

  return <div className="journeyCarousel jcApproved">
    <style jsx global>{`
      .jcApproved{background:#031722;color:#fff;padding:28px 0 16px;overflow:hidden}
      .jcApproved .journeyCarouselFixedHead{padding:0 20px 12px;text-align:center}
      .jcApproved .journeyCarouselKicker{display:flex;align-items:center;justify-content:center;gap:10px;color:#8feaf8;font-size:10px;font-weight:800;letter-spacing:4px;margin-bottom:12px;white-space:nowrap}
      .jcApproved .journeyCarouselKicker span{width:34px;height:1px;background:#20cbe9}
      .jcApproved .journeyCarouselFixedHead h2{margin:0;font-size:30px;line-height:.98;letter-spacing:-1.2px;font-weight:900}
      .jcApproved .journeyCarouselFixedHead h2 em{font-style:normal;color:#21d8f6}
      .jcApproved .journeyCarouselFixedHead p{margin:11px auto 0;max-width:390px;color:#b7c9d1;font-size:13px;line-height:1.45}
      .jcApproved .journeyMiniFlow{display:flex;align-items:center;justify-content:center;margin:14px auto 8px;padding:0 14px;max-width:620px}
      .jcApproved .journeyMiniStep{border:0;background:transparent;color:#78939f;padding:0;font:inherit;display:flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;transition:color .2s ease,opacity .2s ease;opacity:.82}
      .jcApproved .journeyMiniStep b{font-size:11px;letter-spacing:.4px;color:inherit;font-weight:900}
      .jcApproved .journeyMiniStep span{font-size:13px;font-weight:800;color:inherit}
      .jcApproved .journeyMiniStep.active{color:#21d8f6;opacity:1}
      .jcApproved .journeyMiniArrow{color:#5a7b89;margin:0 10px;flex:0 0 auto}
      .jcApproved .journeyCarouselViewport{position:relative;height:610px;overflow:hidden;touch-action:pan-y}
      .jcApproved .journeyCarouselSlide{position:absolute;inset:0;opacity:0;transform:translateX(34px);transition:opacity .28s ease,transform .28s ease;pointer-events:none;display:flex;flex-direction:column;align-items:center;padding-top:4px}
      .jcApproved .journeyCarouselSlide.isActive{opacity:1;transform:translateX(0);pointer-events:auto}
      .jcApproved .journeyPhoneAsset{position:relative;width:min(88vw,410px);height:500px;display:flex;align-items:flex-start;justify-content:center}
      .jcApproved .journeyPhoneAsset img{width:100%;height:100%;object-fit:contain;object-position:center top;filter:drop-shadow(0 25px 34px rgba(0,0,0,.28))}
      .jcApproved .journeyCarouselLabel{text-align:center;margin-top:-3px;padding:0 50px;min-height:72px}
      .jcApproved .journeyCarouselLabel b{display:block;color:#21d8f6;font-size:12px;letter-spacing:1px;margin-bottom:3px}
      .jcApproved .journeyCarouselLabel strong{display:block;font-size:16px;margin-bottom:5px}
      .jcApproved .journeyCarouselLabel p{margin:0;color:#b7c9d1;font-size:12px;line-height:1.35}
      .jcApproved .journeyCarouselNav{position:absolute;z-index:10;top:48%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(33,216,246,.58);background:rgba(3,23,34,.86);color:#21d8f6}
      .jcApproved .journeyCarouselNav.prev{left:10px}.jcApproved .journeyCarouselNav.next{right:10px}
      .jcApproved .journeyCarouselDots{height:30px;display:flex;align-items:center;justify-content:center;gap:8px}
      .jcApproved .journeyCarouselDots button{border:0;padding:0;width:7px;height:7px;border-radius:99px;background:#31566a}
      .jcApproved .journeyCarouselDots button.active{width:24px;background:#21d8f6}

      @media(max-width:760px){
        .jcApproved{padding:18px 0 0}
        .jcApproved .journeyCarouselFixedHead{padding:0 14px 4px}
        .jcApproved .journeyCarouselKicker{font-size:9px;letter-spacing:3.2px;margin-bottom:9px;gap:8px}
        .jcApproved .journeyCarouselKicker span{width:28px}
        .jcApproved .journeyCarouselFixedHead h2{font-size:clamp(21px,5.8vw,28px);line-height:1.02;letter-spacing:-.8px;white-space:nowrap}
        .jcApproved .journeyCarouselFixedHead p{margin-top:9px;max-width:360px;font-size:12px;line-height:1.4}
        .jcApproved .journeyMiniFlow{margin:15px auto 8px;padding:0 12px;width:100%;max-width:430px;justify-content:space-between}
        .jcApproved .journeyMiniStep{gap:4px;min-width:0;flex-direction:column;line-height:1.05}
        .jcApproved .journeyMiniStep b{font-size:12px;line-height:1;font-weight:900}
        .jcApproved .journeyMiniStep span{font-size:12px;line-height:1.12;font-weight:850;white-space:normal;max-width:104px;text-align:center}
        .jcApproved .journeyMiniArrow{margin:0 2px;width:18px;height:18px;color:#5f8391}
        .jcApproved .journeyCarouselViewport{height:540px;margin-top:-2px}
        .jcApproved .journeyCarouselSlide{padding-top:0;justify-content:flex-start;align-items:center}
        .jcApproved .journeyPhoneAsset{width:min(112vw,500px);height:540px;transform:translate(0,-8px);align-items:flex-start;justify-content:center}
        .jcApproved .journeyPhoneAsset img{object-position:center top;filter:drop-shadow(0 18px 28px rgba(0,0,0,.25))}
        .jcApproved .journeyCarouselLabel{display:none}
        .jcApproved .journeyCarouselNav{top:52%;width:40px;height:40px}
        .jcApproved .journeyCarouselNav.prev{left:8px}.jcApproved .journeyCarouselNav.next{right:8px}
        .jcApproved .journeyCarouselDots{height:22px;margin-top:-8px;padding-bottom:6px}
      }

      @media(max-width:390px){
        .jcApproved .journeyCarouselFixedHead h2{font-size:20px;letter-spacing:-.65px}
        .jcApproved .journeyCarouselFixedHead p{font-size:11.5px}
        .jcApproved .journeyMiniFlow{padding:0 8px}
        .jcApproved .journeyMiniStep b{font-size:11px}
        .jcApproved .journeyMiniStep span{font-size:10.8px;max-width:92px}
        .jcApproved .journeyMiniArrow{width:16px;height:16px}
        .jcApproved .journeyCarouselViewport{height:520px}
        .jcApproved .journeyPhoneAsset{width:116vw;height:520px;transform:translate(0,-8px)}
      }
    `}</style>

    <div className="journeyCarouselFixedHead">
      <div className="journeyCarouselKicker"><span/>REKLAMDAN SİPARİŞE<span/></div>
      <h2>REKLAMI GÖSTERMEK YETMEZ.<br/><em>SİPARİŞE</em> GÖTÜRMEK GEREKİR.</h2>
      <p>Instagram’da başlayan ilgiyi, müşterinin tercih ettiği sipariş kanalına taşıyoruz.</p>
    </div>

    <div className="journeyMiniFlow" aria-label="Reklamdan siparişe üç adım">
      {slides.map((s,i)=><div key={s.no} style={{display:'contents'}}>
        <button className={`journeyMiniStep ${i===active?'active':''}`} onClick={()=>setActive(i)} aria-label={`${s.no} ${s.short}`}><b>{s.no}</b><span>{s.short}</span></button>
        {i<slides.length-1&&<ArrowRight className="journeyMiniArrow" size={18} strokeWidth={2.2}/>} 
      </div>)}
    </div>

    <div className="journeyCarouselViewport"
      onTouchStart={e=>startX.current=e.touches[0].clientX}
      onTouchEnd={e=>{if(startX.current===null)return;const dx=e.changedTouches[0].clientX-startX.current;if(Math.abs(dx)>45)go(active+(dx<0?1:-1));startX.current=null}}>
      {slides.map((s,i)=><div className={`journeyCarouselSlide ${i===active?'isActive':''}`} key={s.no}>
        <div className="journeyPhoneAsset"><Image src={s.src} alt={s.alt} width={1024} height={1536} priority={i===0}/></div>
        <div className="journeyCarouselLabel"><b>{s.no}</b><strong>{s.title}</strong><p>{s.desc}</p></div>
      </div>)}
      <button className="journeyCarouselNav prev" onClick={()=>go(active-1)} aria-label="Önceki"><ArrowLeft size={20}/></button>
      <button className="journeyCarouselNav next" onClick={()=>go(active+1)} aria-label="Sonraki"><ArrowRight size={20}/></button>
    </div>

    <div className="journeyCarouselDots">{slides.map((s,i)=><button key={s.no} className={i===active?'active':''} onClick={()=>setActive(i)} aria-label={`${s.no}. adım`}/>)}</div>
  </div>
}
