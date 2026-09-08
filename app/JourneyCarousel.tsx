'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Instagram, ShoppingBag } from 'lucide-react';

const slides = [
  {
    no: '01',
    title: 'INSTAGRAM REKLAMI',
    desc: 'Müşteri reklamı görür, ilgilenir ve siparişe geçer.',
    type: 'instagram',
  },
  {
    no: '02',
    title: 'WEB LİNK',
    desc: 'WrapUp sipariş ekranında tercih ettiği platformu seçer.',
    type: 'link',
  },
  {
    no: '03',
    title: 'SİPARİŞ SAYFASI',
    desc: 'Seçtiği platformda restoran sayfasına gider ve siparişini tamamlar.',
    type: 'order',
  },
] as const;

type SlideType = (typeof slides)[number]['type'];

function InstagramScreen() {
  return (
    <div className="jcScreen jcInstagram">
      <div className="jcTopbar"><Instagram size={16} /><strong>Instagram</strong><span>♡  ⤴</span></div>
      <div className="jcStories"><i/><i/><i/><i/></div>
      <div className="jcProfile"><div className="jcAvatar">W</div><div><strong>wrapupchicken</strong><small>Sponsored</small></div><b>•••</b></div>
      <div className="jcAdWhite">
        <div className="jcWrapLogo"><span>WRAP</span><em>UP</em><small>CHICKEN WRAPS</small></div>
        <div className="jcAdTitle">Bol Cheddarlı <strong>WRAP</strong></div>
        <div className="jcWrapFood"><span>WRAP</span></div>
        <div className="jcAdFacts"><span>140 g<br/><b>SOTE TAVUK</b></span><span>BOL<br/><b>CHEDDAR</b></span><span>TAZE<br/><b>MARUL</b></span></div>
        <div className="jcPrice"><small>BU HAFTAYA ÖZEL</small><strong>299<sup>TL</sup></strong></div>
        <button>HEMEN SİPARİŞ VER <ArrowRight size={13}/></button>
      </div>
      <div className="jcInstagramNav">⌂　⌕　⊕　▣　♡</div>
    </div>
  );
}

function LinkScreen() {
  return (
    <div className="jcScreen jcWrapLanding">
      <div className="jcLandingTop"><span>☰</span><div className="jcWrapLogo dark"><span>WRAP</span><em>UP</em><small>CHICKEN WRAPS</small></div><span>♧</span></div>
      <div className="jcLandingFood"><div className="jcWrapPair"><span/><span/></div><b>%100<br/><small>GERÇEK TAVUK</small></b></div>
      <h3>LEZZETİ SAR,<br/><em>AÇLIĞINA SON VER!</em></h3>
      <p>İZMİR'İN EN LEZZETLİ CHICKEN WRAP'LERİ</p>
      <button className="jcPlatformButton">SİPARİŞ PLATFORMUNU SEÇ⌄</button>
      <div className="jcPlatformTitle">—　SİPARİŞ VER　—</div>
      <div className="jcPlatformGrid">
        <div className="go"><b>🚚</b><span>Trendyol GO<small>Hızlı teslimat</small></span></div>
        <div className="ys"><b>◉</b><span>Yemeksepeti<small>En sevdiğin lezzetler</small></span></div>
        <div className="mg"><b>M</b><span>Migros Yemek<small>Migros güvencesiyle</small></span></div>
        <div className="wa"><b>◉</b><span>WhatsApp'tan Sipariş<small>Doğrudan bizimle</small></span></div>
      </div>
      <div className="jcLandingBadges"><span>🔥<small>ATEŞİN LEZZETİ</small></span><span>⏱<small>HIZLI TESLİMAT</small></span><span>🍃<small>TAZE MALZEME</small></span><span>★<small>4.9 PUAN</small></span></div>
    </div>
  );
}

function OrderScreen() {
  return (
    <div className="jcScreen jcOrderPage">
      <div className="jcOrderHead">Yemeksepeti <span>⌕　♙</span></div>
      <div className="jcRestaurantCover"><div className="jcOrderWrap"><span>WRAP</span><em>UP</em></div></div>
      <div className="jcRestaurantTitle"><strong>WrapUp Chicken Wraps</strong><small>⭐ 4.7 (500+)</small></div>
      <div className="jcOrderInfo"><span>◷<small>20–30 dk</small></span><span>▣<small>Min. 150 TL</small></span><span>♧<small>Ücretsiz teslimat</small></span></div>
      <div className="jcTabs"><b>Menü</b><span>Yorumlar</span><span>Bilgiler</span></div>
      <div className="jcMenuTitle">En Çok Tercih Edilenler</div>
      <div className="jcMenuItem"><div className="jcThumb">W</div><div><strong>Bol Cheddarlı Wrap</strong><small>Sote tavuk, cheddar sos, karamelize soğan, taze marul</small></div><b>299 TL</b></div>
      <button className="jcBasket">Sepete Git <ShoppingBag size={15}/></button>
    </div>
  );
}

function PhoneContent({ type }: { type: SlideType }) {
  if (type === 'instagram') return <InstagramScreen />;
  if (type === 'link') return <LinkScreen />;
  return <OrderScreen />;
}

function HandPhone({ type }: { type: SlideType }) {
  return (
    <div className="jcHandScene">
      <div className="jcSleeve" />
      <div className="jcPalm" />
      <div className="jcFinger jcFingerOne" />
      <div className="jcFinger jcFingerTwo" />
      <div className="jcFinger jcFingerThree" />
      <div className="jcPhone"><PhoneContent type={type} /></div>
      <div className="jcThumbFinger" />
    </div>
  );
}

export default function JourneyCarousel() {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);
  const go = (next: number) => setActive(Math.max(0, Math.min(slides.length - 1, next)));

  return (
    <div className="journeyCarousel jcNew">
      <style jsx global>{`
        .jcNew{background:#031722;color:#fff;padding:28px 0 18px;overflow:hidden}
        .jcNew .journeyCarouselFixedHead{padding:0 20px 18px;text-align:center}
        .jcNew .journeyCarouselKicker{display:flex;align-items:center;justify-content:center;gap:10px;color:#8feaf8;font-size:10px;font-weight:800;letter-spacing:4px;margin-bottom:12px;white-space:nowrap}
        .jcNew .journeyCarouselKicker span{width:34px;height:1px;background:#20cbe9}
        .jcNew .journeyCarouselFixedHead h2{margin:0;font-size:31px;line-height:.98;letter-spacing:-1.3px;font-weight:900}
        .jcNew .journeyCarouselFixedHead h2 em{font-style:normal;color:#21d8f6}
        .jcNew .journeyCarouselFixedHead p{margin:12px auto 0;max-width:390px;color:#b7c9d1;font-size:13px;line-height:1.45}
        .jcNew .journeyCarouselViewport{position:relative;height:625px;overflow:hidden;touch-action:pan-y}
        .jcNew .journeyCarouselSlide{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;opacity:0;transform:translateX(34px) scale(.985);transition:opacity .28s ease,transform .28s ease;pointer-events:none;padding-top:10px}
        .jcNew .journeyCarouselSlide.isActive{opacity:1;transform:translateX(0) scale(1);pointer-events:auto}

        .jcHandScene{position:relative;width:340px;height:510px;margin:0 auto}
        .jcPhone{position:absolute;z-index:5;left:50%;top:6px;transform:translateX(-50%);width:252px;height:470px;border-radius:36px;padding:8px;background:linear-gradient(145deg,#58666d,#080f13 44%,#2b3a42);box-shadow:0 28px 60px rgba(0,0,0,.48),inset 0 0 0 1px rgba(255,255,255,.2)}
        .jcPhone:before{content:'';position:absolute;z-index:8;top:11px;left:50%;transform:translateX(-50%);width:74px;height:19px;border-radius:0 0 13px 13px;background:#05090b}
        .jcScreen{height:100%;border-radius:29px;overflow:hidden;background:#fff;color:#102b39;position:relative}

        .jcPalm{position:absolute;z-index:2;right:2px;bottom:22px;width:150px;height:252px;border-radius:78px 70px 90px 100px;transform:rotate(-13deg);background:linear-gradient(115deg,#efc6ae 0%,#d99f7e 58%,#b97858 100%);box-shadow:inset 18px 0 30px rgba(255,255,255,.18),0 20px 36px rgba(0,0,0,.25)}
        .jcSleeve{position:absolute;z-index:1;left:-8px;right:72px;bottom:-8px;height:128px;border-radius:70px 80px 10px 10px;transform:rotate(8deg);background:linear-gradient(145deg,#f5f0e8,#d9d0c6 65%,#bcb2aa);box-shadow:0 18px 35px rgba(0,0,0,.18)}
        .jcFinger{position:absolute;z-index:4;width:38px;height:176px;border-radius:24px;background:linear-gradient(95deg,#ecc1a8,#c98e70);box-shadow:inset 8px 0 13px rgba(255,255,255,.13),0 10px 16px rgba(0,0,0,.12)}
        .jcFingerOne{right:23px;top:92px;transform:rotate(-9deg)}.jcFingerTwo{right:7px;top:126px;height:165px;transform:rotate(-14deg)}.jcFingerThree{right:33px;top:200px;height:138px;transform:rotate(-22deg)}
        .jcThumbFinger{position:absolute;z-index:7;right:31px;top:224px;width:50px;height:162px;border-radius:28px;transform:rotate(-42deg);transform-origin:50% 90%;background:linear-gradient(100deg,#f1c7ad,#cb8e6d 72%);box-shadow:inset 9px 0 14px rgba(255,255,255,.16),0 8px 13px rgba(0,0,0,.14)}

        .jcTopbar{height:38px;padding:12px 12px 0;display:flex;align-items:center;gap:6px;border-bottom:1px solid #edf0f2}.jcTopbar span{margin-left:auto}.jcTopbar strong{font-family:Georgia,serif;font-size:12px}
        .jcStories{display:flex;gap:10px;padding:9px 12px 5px}.jcStories i{width:28px;height:28px;border-radius:50%;border:2px solid #ef774c;background:#ddd}.jcStories i:first-child{background:#232323}
        .jcProfile{display:flex;gap:7px;align-items:center;padding:7px 12px}.jcProfile b{margin-left:auto}.jcAvatar{width:27px;height:27px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:800;background:#111}.jcProfile strong,.jcProfile small{display:block;font-size:8px}.jcProfile small{color:#8b9aa1;margin-top:1px}
        .jcAdWhite{margin:0 8px 6px;padding:10px 9px 8px;background:#fff;color:#111;border:1px solid #eee;position:relative}.jcWrapLogo{display:flex;align-items:flex-end;gap:2px;justify-content:center;font-weight:1000}.jcWrapLogo span{font-size:19px}.jcWrapLogo em{font-size:22px;color:#ff5b00;font-style:italic}.jcWrapLogo small{font-size:7px;line-height:1}.jcAdTitle{font-family:Georgia,serif;color:#ff5b00;font-size:12px;margin:5px 0}.jcAdTitle strong{display:block;color:#111;font-family:Impact,Arial Black,sans-serif;font-size:26px;line-height:.9}.jcWrapFood{height:126px;border-radius:4px;background:radial-gradient(circle at 65% 44%,#ffc024 0 8%,#9b4d1f 9% 18%,#69a449 19% 26%,#ddbb75 27% 43%,#f6eee5 44%);display:flex;align-items:flex-end;justify-content:flex-end;padding:8px}.jcWrapFood span{font-weight:1000;color:#ff5b00;font-size:11px;transform:rotate(-8deg)}.jcAdFacts{display:flex;justify-content:space-between;font-size:6.5px;margin-top:6px}.jcAdFacts span{line-height:1.15}.jcPrice{display:flex;align-items:end;justify-content:space-between;border-top:1px solid #eee;margin-top:5px;padding-top:5px}.jcPrice small{font-size:6px}.jcPrice strong{font-size:28px;color:#ff5b00;line-height:.9}.jcPrice sup{font-size:9px}.jcAdWhite button{width:100%;height:28px;margin-top:6px;border:0;border-radius:7px;color:#fff;background:#ff5b00;font-size:9px;font-weight:900;display:flex;align-items:center;justify-content:center;gap:5px}.jcInstagramNav{text-align:center;padding-top:2px;font-size:15px;color:#111}

        .jcWrapLanding{padding:38px 12px 10px;background:radial-gradient(circle at 50% 34%,#31180b 0,#100b09 38%,#050505 70%);color:#fff}.jcLandingTop{display:flex;align-items:center;justify-content:space-between}.jcLandingTop>span{width:27px;height:27px;border:1px solid #a75a13;border-radius:50%;display:grid;place-items:center;color:#ffa53d}.jcWrapLogo.dark span{font-size:24px;color:#fff}.jcWrapLogo.dark em{font-size:28px}.jcWrapLogo.dark small{color:#fff}.jcLandingFood{height:158px;margin-top:18px;position:relative;display:flex;align-items:center;justify-content:center}.jcWrapPair span{display:block;width:142px;height:62px;border-radius:32px;background:linear-gradient(15deg,#d6b777,#fff0c1 46%,#c59556);box-shadow:inset 0 0 0 10px rgba(88,39,16,.25),0 18px 28px rgba(0,0,0,.34);transform:rotate(-13deg)}.jcWrapPair span+span{margin-top:-16px;margin-left:28px;transform:rotate(7deg)}.jcLandingFood>b{position:absolute;right:5px;top:56px;border:1px solid #f28b22;border-radius:50%;width:54px;height:54px;display:grid;place-items:center;text-align:center;color:#ff9b28;font-size:12px}.jcLandingFood small{font-size:5px}.jcWrapLanding h3{text-align:center;margin:3px 0 4px;font-size:18px;line-height:1}.jcWrapLanding h3 em{color:#ff6a00;font-style:italic;font-size:20px}.jcWrapLanding>p{text-align:center;font-size:6.5px;margin:0 0 9px}.jcPlatformButton{display:block;margin:auto;border:0;border-radius:18px;padding:9px 13px;color:#fff;background:linear-gradient(180deg,#ff8c24,#ef4b00);font-size:7.5px;font-weight:900;box-shadow:0 0 20px rgba(255,103,0,.45)}.jcPlatformTitle{text-align:center;font-size:7px;color:#eee;margin:10px 0 6px}.jcPlatformGrid{display:grid;grid-template-columns:1fr 1fr;gap:5px}.jcPlatformGrid>div{min-height:45px;border-radius:9px;padding:6px;display:flex;gap:5px;align-items:center;background:#1c120f;border:1px solid currentColor;box-shadow:0 0 13px currentColor}.jcPlatformGrid b{width:25px;height:25px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.13)}.jcPlatformGrid span{font-size:7px;font-weight:900}.jcPlatformGrid small{display:block;font-size:5px;font-weight:400;color:#eee;margin-top:2px}.jcPlatformGrid .go,.jcPlatformGrid .mg{color:#ff791f}.jcPlatformGrid .ys{color:#ff2b75}.jcPlatformGrid .wa{color:#20d86a}.jcLandingBadges{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:8px;border-top:1px solid #422}.jcLandingBadges span{padding:5px 2px;text-align:center;font-size:13px}.jcLandingBadges small{display:block;font-size:4.8px;color:#ddd}

        .jcOrderHead{height:51px;padding:20px 13px 0;font-size:14px;font-weight:900;color:#ee1456;display:flex;justify-content:space-between}.jcOrderHead span{color:#111;font-size:12px}.jcRestaurantCover{height:132px;background:radial-gradient(circle at 55% 45%,#f3a431 0 8%,#8a411c 9% 19%,#558638 20% 29%,#d5b16a 30% 44%,#2d1c13 45%);display:flex;align-items:flex-end;padding:12px}.jcOrderWrap{font-weight:1000;color:#fff}.jcOrderWrap span{font-size:17px}.jcOrderWrap em{font-size:20px;color:#ff6200;font-style:italic}.jcRestaurantTitle{padding:9px 12px}.jcRestaurantTitle strong,.jcRestaurantTitle small{display:block}.jcRestaurantTitle strong{font-size:13px}.jcRestaurantTitle small{font-size:8px;margin-top:3px;color:#777}.jcOrderInfo{display:grid;grid-template-columns:repeat(3,1fr);padding:7px 8px;border-top:1px solid #eee;border-bottom:1px solid #eee}.jcOrderInfo span{text-align:center;font-size:12px}.jcOrderInfo small{display:block;font-size:6px;margin-top:2px}.jcTabs{display:flex;gap:22px;padding:9px 11px;font-size:8px}.jcTabs b{color:#e91850;border-bottom:2px solid #e91850;padding-bottom:5px}.jcMenuTitle{padding:3px 11px;font-size:10px;font-weight:800}.jcMenuItem{margin:7px 8px 0;padding:7px;display:grid;grid-template-columns:38px 1fr auto;align-items:center;gap:6px;border-radius:10px;background:#f7f8f9}.jcThumb{width:38px;height:38px;border-radius:8px;display:grid;place-items:center;color:#fff;background:#3c7635;font-weight:900}.jcMenuItem strong,.jcMenuItem small{display:block}.jcMenuItem strong{font-size:7px}.jcMenuItem small{font-size:5.8px;color:#87959b;margin-top:2px}.jcMenuItem b{font-size:7px;color:#e91850}.jcBasket{position:absolute;left:10px;right:10px;bottom:11px;height:36px;border:0;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:6px;color:#fff;background:#ee1456;font-size:9px;font-weight:800}

        .jcSlideMeta{text-align:center;width:300px;margin-top:4px}.jcSlideMeta strong{display:block;color:#26d6f2;font-size:12px;letter-spacing:1.5px}.jcSlideMeta h3{margin:3px 0 4px;font-size:15px}.jcSlideMeta p{margin:0;color:#8fa7b2;font-size:10px;line-height:1.35}
        .jcNew .journeyCarouselNav{position:absolute;z-index:12;top:48%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(33,216,246,.5);background:rgba(3,23,34,.9);color:#21d8f6}.jcNew .journeyCarouselNav.prev{left:10px}.jcNew .journeyCarouselNav.next{right:10px}
        .jcNew .journeyCarouselDots{height:28px;display:flex;align-items:center;justify-content:center;gap:8px}.jcNew .journeyCarouselDots button{border:0;padding:0;width:7px;height:7px;border-radius:99px;background:#31566a}.jcNew .journeyCarouselDots button.active{width:24px;background:#21d8f6}
      `}</style>

      <div className="journeyCarouselFixedHead">
        <div className="journeyCarouselKicker"><span /> REKLAMDAN SİPARİŞE <span /></div>
        <h2>REKLAMI GÖSTERMEK YETMEZ.<br /><em>SİPARİŞE</em> GÖTÜRMEK GEREKİR.</h2>
        <p>Instagram’da başlayan ilgiyi, müşterinin tercih ettiği sipariş kanalına taşıyoruz.</p>
      </div>

      <div className="journeyCarouselViewport" onTouchStart={(e)=>{startX.current=e.touches[0].clientX}} onTouchEnd={(e)=>{if(startX.current===null)return;const diff=e.changedTouches[0].clientX-startX.current;if(diff<-45)go(active+1);if(diff>45)go(active-1);startX.current=null}}>
        {slides.map((slide,index)=><article key={slide.no} className={`journeyCarouselSlide ${index===active?'isActive':''}`} aria-hidden={index!==active}><HandPhone type={slide.type}/><div className="jcSlideMeta"><strong>{slide.no}</strong><h3>{slide.title}</h3><p>{slide.desc}</p></div></article>)}
        {active>0&&<button className="journeyCarouselNav prev" onClick={()=>go(active-1)} aria-label="Önceki adım"><ArrowLeft size={20}/></button>}
        {active<slides.length-1&&<button className="journeyCarouselNav next" onClick={()=>go(active+1)} aria-label="Sonraki adım"><ArrowRight size={20}/></button>}
      </div>
      <div className="journeyCarouselDots" aria-label={`${active+1}. adım / 3`}>{slides.map((slide,index)=><button key={slide.no} className={index===active?'active':''} onClick={()=>go(index)} aria-label={`${slide.no}. adıma git`}/>)}</div>
    </div>
  );
}
