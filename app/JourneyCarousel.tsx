'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Instagram, Link2, ShoppingBag } from 'lucide-react';

const slides = [
  {
    no: '01',
    title: 'INSTAGRAM REKLAMI',
    desc: 'Müşteri reklamı görür ve siparişe geçmek için bağlantıya dokunur.',
    type: 'instagram',
  },
  {
    no: '02',
    title: 'WEB SİPARİŞ LİNKİ',
    desc: 'Tek sayfada sipariş kanalını seçer: Yemeksepeti, Trendyol Yemek, GetirYemek veya Migros Yemek.',
    type: 'link',
  },
  {
    no: '03',
    title: 'SİPARİŞ SAYFASI',
    desc: 'Seçtiği platformda restoran sayfasına gider ve siparişini tamamlar.',
    type: 'order',
  },
] as const;

function PhoneContent({ type }: { type: (typeof slides)[number]['type'] }) {
  if (type === 'instagram') {
    return (
      <div className="jcScreen jcInstagram">
        <div className="jcTopbar"><Instagram size={16} /><strong>Instagram</strong><span>•••</span></div>
        <div className="jcProfile"><div className="jcAvatar">N</div><div><strong>naribo</strong><small>Sponsored</small></div></div>
        <div className="jcAdCreative">
          <span>DAHA FAZLA</span>
          <strong>SİPARİŞ.</strong>
          <em>DAHA KÂRLI<br/>BÜYÜME.</em>
          <div className="jcFoodOrb">WRAP</div>
        </div>
        <button className="jcAction">Şimdi Sipariş Ver <ArrowRight size={15}/></button>
      </div>
    );
  }

  if (type === 'link') {
    return (
      <div className="jcScreen jcLinkPage">
        <div className="jcMiniBrand">naribo</div>
        <div className="jcLinkIcon"><Link2 size={22}/></div>
        <h3>Sipariş platformunu seç</h3>
        <p>Tek bağlantı, dört sipariş kanalı.</p>
        <div className="jcChoice pink">Yemeksepeti <ArrowRight size={15}/></div>
        <div className="jcChoice red">Trendyol Yemek <ArrowRight size={15}/></div>
        <div className="jcChoice purple">GetirYemek <ArrowRight size={15}/></div>
        <div className="jcChoice orange">Migros Yemek <ArrowRight size={15}/></div>
      </div>
    );
  }

  return (
    <div className="jcScreen jcOrderPage">
      <div className="jcOrderHead">Yemeksepeti</div>
      <div className="jcRestaurantCover"><div><small>Restoranınız</small><strong>WrapUp Chicken Wraps</strong></div></div>
      <div className="jcRating"><strong>4.8 ★</strong><span>20–30 dk</span></div>
      <div className="jcMenuTitle">Öne Çıkanlar</div>
      <div className="jcMenuItem"><div className="jcThumb">W</div><div><strong>Bol Cheddarlı Wrap</strong><small>Sote tavuk, cheddar, özel sos</small></div><b>299 TL</b></div>
      <div className="jcMenuItem"><div className="jcThumb alt">W</div><div><strong>Signature Wrap</strong><small>Günün seçimi</small></div><b>289 TL</b></div>
      <button className="jcBasket">Sepete Git <ShoppingBag size={15}/></button>
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
        .jcNew .journeyCarouselFixedHead{padding:0 20px 20px;text-align:center}
        .jcNew .journeyCarouselKicker{display:flex;align-items:center;justify-content:center;gap:10px;color:#8feaf8;font-size:10px;font-weight:800;letter-spacing:4px;margin-bottom:12px;white-space:nowrap}
        .jcNew .journeyCarouselKicker span{width:34px;height:1px;background:#20cbe9}
        .jcNew .journeyCarouselFixedHead h2{margin:0;font-size:31px;line-height:.98;letter-spacing:-1.3px;font-weight:900}
        .jcNew .journeyCarouselFixedHead h2 em{font-style:normal;color:#21d8f6}
        .jcNew .journeyCarouselFixedHead p{margin:12px auto 0;max-width:390px;color:#b7c9d1;font-size:13px;line-height:1.45}
        .jcNew .journeyCarouselViewport{position:relative;height:590px;overflow:hidden;touch-action:pan-y}
        .jcNew .journeyCarouselSlide{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;opacity:0;transform:translateX(28px);transition:opacity .24s ease,transform .24s ease;pointer-events:none;padding-top:18px}
        .jcNew .journeyCarouselSlide.isActive{opacity:1;transform:translateX(0);pointer-events:auto}
        .jcPhone{position:relative;width:272px;height:485px;border-radius:38px;padding:9px;background:linear-gradient(145deg,#405560,#07131a 46%,#263e49);box-shadow:0 26px 60px rgba(0,0,0,.38),inset 0 0 0 1px rgba(255,255,255,.18)}
        .jcPhone:before{content:'';position:absolute;z-index:4;top:13px;left:50%;transform:translateX(-50%);width:78px;height:20px;border-radius:0 0 13px 13px;background:#071016}
        .jcScreen{height:100%;border-radius:30px;overflow:hidden;background:#fff;color:#102b39;position:relative}
        .jcTopbar{height:42px;padding:13px 14px 0;display:flex;align-items:center;gap:7px;border-bottom:1px solid #edf0f2}.jcTopbar span{margin-left:auto}.jcTopbar strong{font-size:12px}
        .jcProfile{display:flex;gap:8px;align-items:center;padding:12px 14px}.jcAvatar{width:31px;height:31px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:800;background:linear-gradient(145deg,#14c9e7,#073149)}.jcProfile strong,.jcProfile small{display:block;font-size:9px}.jcProfile small{color:#8b9aa1;margin-top:2px}
        .jcAdCreative{margin:0 12px;height:275px;border-radius:16px;padding:24px 16px;display:flex;flex-direction:column;justify-content:flex-end;color:#fff;background:radial-gradient(circle at 72% 28%,#176070,#071e2b 55%,#03131d)}.jcAdCreative span{font-size:18px;font-weight:900}.jcAdCreative strong{font-size:29px;line-height:.95}.jcAdCreative em{font-style:normal;color:#1ed5f2;font-size:21px;font-weight:900;line-height:1;margin-top:5px}.jcFoodOrb{margin-top:18px;width:86px;height:86px;border-radius:50%;align-self:center;display:grid;place-items:center;background:radial-gradient(circle,#ff9c27 0 30%,#6d2d10 31% 53%,#0d1a20 54%);font-weight:900;color:#fff}
        .jcAction{margin:12px;width:calc(100% - 24px);height:38px;border:0;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:8px;background:#13c9e9;color:#052231;font-size:10px;font-weight:800}
        .jcLinkPage{padding:48px 17px 18px;background:linear-gradient(180deg,#f8fcfd,#eef5f7)}.jcMiniBrand{font-size:20px;font-weight:900;color:#0b96b5}.jcLinkIcon{width:42px;height:42px;margin:18px 0 10px;border-radius:13px;display:grid;place-items:center;background:#e0f8fc;color:#0ba8c8}.jcLinkPage h3{font-size:20px;line-height:1.05;margin:0 0 5px}.jcLinkPage p{margin:0 0 20px;color:#7b8f98;font-size:11px}.jcChoice{height:50px;margin-bottom:10px;border-radius:13px;background:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 14px;font-size:11px;font-weight:800;box-shadow:0 8px 18px rgba(8,43,58,.06)}.jcChoice.pink{color:#ef1456}.jcChoice.red{color:#df291a}.jcChoice.purple{color:#563b9d}.jcChoice.orange{color:#f16400}
        .jcOrderHead{height:54px;padding:21px 15px 0;font-size:15px;font-weight:900;color:#ee1456}.jcRestaurantCover{height:140px;display:flex;align-items:flex-end;padding:16px;color:#fff;background:linear-gradient(180deg,rgba(4,28,39,.05),rgba(4,28,39,.84)),radial-gradient(circle at 60% 30%,#b67c3b,#143d43 62%,#08232e)}.jcRestaurantCover small,.jcRestaurantCover strong{display:block}.jcRestaurantCover small{font-size:9px}.jcRestaurantCover strong{font-size:16px;margin-top:3px}.jcRating{display:flex;justify-content:space-between;padding:10px 14px;font-size:9px}.jcRating strong{color:#e89300}.jcMenuTitle{padding:7px 12px;font-size:11px;font-weight:800}.jcMenuItem{margin:8px 10px 0;padding:8px;display:grid;grid-template-columns:40px 1fr auto;align-items:center;gap:7px;border-radius:11px;background:#f7f8f9}.jcThumb{width:40px;height:40px;border-radius:8px;display:grid;place-items:center;color:#fff;background:#3c7635;font-weight:900}.jcThumb.alt{background:#a45732}.jcMenuItem strong,.jcMenuItem small{display:block}.jcMenuItem strong{font-size:8px}.jcMenuItem small{font-size:6.8px;color:#87959b;margin-top:3px}.jcMenuItem b{font-size:8px}.jcBasket{position:absolute;left:12px;right:12px;bottom:14px;height:40px;border:0;border-radius:11px;display:flex;align-items:center;justify-content:center;gap:7px;color:#fff;background:#ee1456;font-size:10px;font-weight:800}
        .jcSlideMeta{text-align:center;width:300px;margin-top:14px}.jcSlideMeta strong{display:block;color:#26d6f2;font-size:12px;letter-spacing:1.5px}.jcSlideMeta h3{margin:4px 0 5px;font-size:16px}.jcSlideMeta p{margin:0;color:#8fa7b2;font-size:11px;line-height:1.4}
        .jcNew .journeyCarouselNav{position:absolute;z-index:8;top:48%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(33,216,246,.5);background:rgba(3,23,34,.88);color:#21d8f6}.jcNew .journeyCarouselNav.prev{left:12px}.jcNew .journeyCarouselNav.next{right:12px}
        .jcNew .journeyCarouselDots{height:30px;display:flex;align-items:center;justify-content:center;gap:8px}.jcNew .journeyCarouselDots button{border:0;padding:0;width:7px;height:7px;border-radius:99px;background:#31566a}.jcNew .journeyCarouselDots button.active{width:24px;background:#21d8f6}
      `}</style>

      <div className="journeyCarouselFixedHead">
        <div className="journeyCarouselKicker"><span /> REKLAMDAN SİPARİŞE <span /></div>
        <h2>REKLAMI GÖSTERMEK YETMEZ.<br /><em>SİPARİŞE</em> GÖTÜRMEK GEREKİR.</h2>
        <p>Instagram’da başlayan ilgiyi, müşterinin tercih ettiği sipariş kanalına taşıyoruz.</p>
      </div>

      <div
        className="journeyCarouselViewport"
        onTouchStart={(e) => { startX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (startX.current === null) return;
          const diff = e.changedTouches[0].clientX - startX.current;
          if (diff < -45) go(active + 1);
          if (diff > 45) go(active - 1);
          startX.current = null;
        }}
      >
        {slides.map((slide, index) => (
          <article key={slide.no} className={`journeyCarouselSlide ${index === active ? 'isActive' : ''}`} aria-hidden={index !== active}>
            <div className="jcPhone"><PhoneContent type={slide.type} /></div>
            <div className="jcSlideMeta"><strong>{slide.no}</strong><h3>{slide.title}</h3><p>{slide.desc}</p></div>
          </article>
        ))}

        {active > 0 && <button className="journeyCarouselNav prev" onClick={() => go(active - 1)} aria-label="Önceki adım"><ArrowLeft size={20}/></button>}
        {active < slides.length - 1 && <button className="journeyCarouselNav next" onClick={() => go(active + 1)} aria-label="Sonraki adım"><ArrowRight size={20}/></button>}
      </div>

      <div className="journeyCarouselDots" aria-label={`${active + 1}. adım / 3`}>
        {slides.map((slide, index) => <button key={slide.no} className={index === active ? 'active' : ''} onClick={() => go(index)} aria-label={`${slide.no}. adıma git`} />)}
      </div>
    </div>
  );
}
