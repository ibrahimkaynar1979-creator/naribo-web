import Image from 'next/image';
import { ArrowRight, BadgePercent, BarChart3, Camera, CircleCheckBig, ClipboardCheck, Clock3, Eye, Headphones, Instagram, ListChecks, Menu, MousePointerClick, ShieldCheck, ShoppingCart, Smartphone, Store, Target, TrendingUp, Users } from 'lucide-react';

const benefits = [
  { icon: Eye, title: 'GÖRÜNÜRLÜK', text: 'Daha çok müşteriye ulaşın.' },
  { icon: Target, title: 'DÖNÜŞÜM', text: 'Görüntülenmeyi siparişe çevirin.' },
  { icon: ShoppingCart, title: 'SEPET', text: 'Sepet tutarını artırın.' },
  { icon: BarChart3, title: 'KÂRLILIK', text: 'Sipariş başı kazancı artırın.' },
];

const stats = [
  { icon: Target, title: '4 PLATFORM', text: 'Tek büyüme stratejisi' },
  { icon: TrendingUp, title: '360° ANALİZ', text: 'Menüden kârlılığa' },
  { icon: BarChart3, title: 'KÂR ODAKLI', text: 'Ciro değil, kazanç' },
  { icon: Users, title: 'RESTORANA ÖZEL', text: 'Size özel strateji' },
  { icon: Headphones, title: 'SÜREKLİ DESTEK', text: 'Yayın sonrası da yanınızda' },
];

const setupSteps = [
  { no: '01', icon: ClipboardCheck, title: 'BAŞVURU', text: 'Restoranınızı tanıyor, ihtiyaç ve hedeflerinizi netleştiriyoruz.' },
  { no: '02', icon: ListChecks, title: 'MENÜ', text: 'Ürünlerinizi satışa uygun, anlaşılır bir menü yapısına dönüştürüyoruz.' },
  { no: '03', icon: BadgePercent, title: 'FİYAT & KAMPANYA', text: 'Fiyat ve kampanya yapısını kârlılığı gözeterek planlıyoruz.' },
  { no: '04', icon: Camera, title: 'GÖRSELLER', text: 'Ürünlerinizi iştah açıcı ve platforma uygun görsellerle hazırlıyoruz.' },
  { no: '05', icon: Store, title: 'PLATFORM BAŞVURULARI', text: 'Başvuru ve mağaza kurulum süreçlerini platformlara göre hazırlıyoruz.' },
  { no: '06', icon: CircleCheckBig, title: 'SATIŞA HAZIR', text: 'Menünüz, fiyatınız ve platform yapınız sipariş almaya hazır hale geliyor.' },
];

function Logo() {
  return (
    <a className="brand" href="#" aria-label="Naribo ana sayfa">
      <Image src="/naribo-logo.png" alt="Naribo Restaurant Growth Partner" width={265} height={110} priority className="brandImage" />
    </a>
  );
}

function PremiumPhone({ type }: { type: 'instagram' | 'hub' | 'order' }) {
  if (type === 'instagram') {
    return (
      <div className="premiumPhone smallPhone">
        <div className="premiumNotch" />
        <div className="premiumScreen whiteScreen">
          <div className="statusRow"><span>9:41</span><span>•••</span></div>
          <div className="instaBar"><Instagram size={18} /><strong>Instagram</strong><span>♡</span></div>
          <div className="profileRow"><div className="profileDot">W</div><div><strong>wrapup</strong><small>Sponsored</small></div></div>
          <div className="wrapAd">
            <div className="wrapLogo">WRAP<span>UP</span></div>
            <b>Bol Cheddarlı</b>
            <div className="wrapHeroFood">WRAP</div>
            <div className="priceLine"><span>399 TL</span><strong>299 TL</strong></div>
          </div>
          <div className="orderNow">HEMEN SİPARİŞ VER <ArrowRight size={13} /></div>
          <div className="miniPlatforms"><i>go</i><i>ty</i><i>ys</i><i>wa</i></div>
        </div>
      </div>
    );
  }

  if (type === 'hub') {
    return (
      <div className="premiumPhone centerPhone">
        <div className="premiumNotch" />
        <div className="premiumScreen darkScreen">
          <div className="statusRow light"><span>9:41</span><span>•••</span></div>
          <div className="hubLogo">WRAP<span>UP</span><small>CHICKEN WRAPS</small></div>
          <div className="hubFood">🌯</div>
          <h4>LEZZETİ SAR.<br /><span>AÇLIĞINA SON VER!</span></h4>
          <button>SİPARİŞ PLATFORMUNU SEÇ</button>
          <div className="hubDivider">SİPARİŞ VER</div>
          <div className="hubGrid">
            <div className="hubChoice orange">Trendyol GO</div>
            <div className="hubChoice pink">Yemeksepeti</div>
            <div className="hubChoice migros">Migros Yemek</div>
            <div className="hubChoice whatsapp">WhatsApp'tan Sipariş</div>
          </div>
          <div className="hubBenefits"><span>🔥 Taze</span><span>⏱ Hızlı</span><span>★ 4.9</span></div>
          <div className="nariboMini">naribo <small>creative agency</small></div>
        </div>
      </div>
    );
  }

  return (
    <div className="premiumPhone smallPhone">
      <div className="premiumNotch" />
      <div className="premiumScreen whiteScreen">
        <div className="statusRow"><span>9:41</span><span>•••</span></div>
        <div className="ysBar">Yemeksepeti</div>
        <div className="restaurantVisual"><div className="wrapHeroFood small">WRAP</div></div>
        <div className="restaurantTitle"><strong>WrapUp Chicken Wraps</strong><span>★ 4.7 (500+)</span></div>
        <div className="restaurantMeta"><span>20–30 dk</span><span>Min. 150 TL</span><span>Ücretsiz</span></div>
        <div className="menuTabs">Menü <span>Yorumlar</span><span>Bilgiler</span></div>
        <div className="menuProduct"><div className="productThumb">🌯</div><div><strong>Bol Cheddarlı Wrap</strong><small>tavuk, cheddar, özel sos</small><b>299 TL</b></div><button>+</button></div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="heroGlow" />
        <header className="nav shell">
          <Logo />
          <nav className="desktopNav" aria-label="Ana menü">
            <a href="#">Ana Sayfa</a><a href="#hizmetler">Hizmetler</a><a href="#nasil">Nasıl Çalışıyoruz?</a><a href="#basari">Başarı Hikayeleri</a><a href="#hakkimizda">Hakkımızda</a>
          </nav>
          <a className="contactButton" href="#iletisim">İletişime Geç <ArrowRight size={18} /></a>
          <button className="mobileMenu" aria-label="Menüyü aç"><Menu /></button>
        </header>
        <div className="heroGrid shell">
          <div className="heroCopy">
            <div className="eyebrow"><span /> RESTORANLARIN DİJİTAL BÜYÜME ORTAĞI</div>
            <h1><span>DAHA FAZLA</span><br /><strong>SİPARİŞ.</strong><br /><em>DAHA KÂRLI<br />BÜYÜME.</em></h1>
            <p>Yemek platformlarındaki satışınızı ve kârlılığınızı birlikte büyütüyoruz.</p>
            <a className="primaryCta" href="#analiz">Ücretsiz Restoran Analizi <ArrowRight size={20} /></a>
            <div className="microTrust"><span><TrendingUp size={16} /> Hızlı analiz</span><span><Clock3 size={16} /> Size özel strateji</span><span><ShieldCheck size={16} /> Ücretsiz danışmanlık</span></div>
          </div>
          <div className="heroVisual" aria-label="Naribo şef görseli"><div className="chefPlaceholder" style={{backgroundImage:"linear-gradient(180deg, rgba(2,12,18,.02), rgba(2,12,18,.18)), url('/chef-naribo.png')",backgroundPosition:'center',backgroundSize:'cover'}} /></div>
          <div className="benefitStack">{benefits.map(({icon:Icon,title,text})=><article className="benefitCard" key={title}><Icon size={32} strokeWidth={1.7}/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="platformWrap shell" aria-label="Sipariş platformları"><div className="platformImageBar"><Image src="/platforms/platform-strip.png" alt="Yemeksepeti, Trendyol Yemek, GetirYemek ve Migros Yemek" width={1320} height={104} priority className="platformStripImage" /></div></section>
      <section className="stats shell">{stats.map(({icon:Icon,title,text})=><article className="stat" key={title}><Icon size={34} strokeWidth={1.65}/><div><h3>{title}</h3><p>{text}</p></div></article>)}</section>

      <section className="setupSection" id="nasil">
        <div className="shell setupIntro"><div><div className="sectionKicker">SIFIRDAN SATIŞA</div><h2>RESTORANINIZI <span>DİJİTAL SATIŞA</span><br />6 ADIMDA HAZIRLIYORUZ.</h2></div><p>Menü, fiyat, kampanya, görseller ve platform başvurularını tek akışta yönetiyor; restoranınızı sipariş almaya hazır hale getiriyoruz.</p></div>
        <div className="shell setupFlow">{setupSteps.map(({no,icon:Icon,title,text},index)=><article className="setupCard" key={no}><div className="setupTop"><div className="setupIcon"><Icon size={28} strokeWidth={1.65}/></div><div className="setupNo">{no}</div></div><h3>{title}</h3><p>{text}</p>{index<setupSteps.length-1&&<div className="setupConnector" aria-hidden="true"><ArrowRight size={18}/></div>}</article>)}</div>
        <div className="shell setupFoot"><div className="setupPlatforms"><span>PLATFORM BAŞVURULARI</span><strong>Yemeksepeti</strong><i>•</i><strong>Trendyol Yemek</strong><i>•</i><strong>GetirYemek</strong><i>•</i><strong>Migros Yemek</strong></div><div className="setupResult"><CircleCheckBig size={22}/> Başvurudan yayına kadar tek ekip.</div></div>
      </section>

      <section className="premiumJourney" id="hizmetler">
        <style>{`
          .premiumJourney{position:relative;overflow:hidden;background:linear-gradient(180deg,rgba(2,18,29,.96),rgba(3,22,33,.98)),url('/chef-naribo.png');background-size:cover;background-position:center;padding:54px 0 0;color:white}
          .premiumJourney:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 36%,rgba(17,185,221,.13),transparent 28%),linear-gradient(90deg,rgba(0,0,0,.35),transparent 24%,transparent 76%,rgba(0,0,0,.35));pointer-events:none}
          .journeyHead{position:relative;z-index:2;text-align:center;max-width:980px;margin:0 auto 16px}
          .journeyKicker{display:flex;align-items:center;justify-content:center;gap:16px;color:#8feeff;font-size:13px;font-weight:800;letter-spacing:8px;margin-bottom:12px}.journeyKicker:before,.journeyKicker:after{content:'';width:210px;height:1px;background:#2bcce9}
          .journeyHead h2{font-size:clamp(40px,4.5vw,68px);line-height:.96;letter-spacing:-2.8px;margin:0;font-weight:900}.journeyHead h2 span{color:#17c5e8}.journeyHead p{font-size:17px;color:#e5eef3;margin:16px 0 0}
          .journeyStage{position:relative;z-index:2;display:grid;grid-template-columns:220px 1fr 210px 1.2fr 210px 1fr 220px;align-items:center;gap:8px;min-height:600px;padding-top:8px}
          .journeyLabel{align-self:center}.journeyLabel .n{display:block;color:#1dd2f2;font-size:50px;font-weight:900;line-height:1}.journeyLabel h3{font-size:20px;line-height:1.05;margin:8px 0 10px}.journeyLabel p{font-size:13px;line-height:1.5;color:#d4e0e6;margin:0}.journeyLabel.left{text-align:right}.journeyLabel.right{text-align:left}
          .journeyPhoneWrap{display:flex;justify-content:center;align-items:center}.journeyPhoneWrap.center{transform:translateY(-4px)}
          .premiumPhone{position:relative;background:#111922;border:2px solid #6c7680;border-radius:42px;padding:9px;box-shadow:0 22px 55px rgba(0,0,0,.45)}.smallPhone{width:275px;height:555px}.centerPhone{width:320px;height:620px;border-color:#19cdea;box-shadow:0 0 0 2px rgba(25,205,234,.18),0 26px 60px rgba(0,0,0,.48)}.premiumScreen{width:100%;height:100%;border-radius:32px;overflow:hidden;position:relative}.whiteScreen{background:#fff;color:#101820}.darkScreen{background:linear-gradient(180deg,#0d0d0e,#141414);color:#fff}.premiumNotch{position:absolute;z-index:5;left:50%;top:9px;transform:translateX(-50%);width:88px;height:22px;background:#0b1117;border-radius:0 0 14px 14px}.statusRow{display:flex;justify-content:space-between;padding:11px 14px 5px;font-size:9px;font-weight:700}.statusRow.light{color:white}.instaBar{display:flex;align-items:center;gap:7px;padding:10px 12px;border-bottom:1px solid #eee}.instaBar span{margin-left:auto}.profileRow{display:flex;gap:8px;align-items:center;padding:9px 12px}.profileDot{width:27px;height:27px;border-radius:50%;display:grid;place-items:center;background:#159ebc;color:#fff;font-weight:800}.profileRow small{display:block;font-size:8px;color:#777}.wrapAd{margin:0 10px;background:linear-gradient(145deg,#fff7ef,#fff);border:1px solid #eee;border-radius:8px;padding:14px 12px;text-align:center;height:355px;display:flex;flex-direction:column;justify-content:center}.wrapLogo{font-weight:1000;font-size:30px;letter-spacing:-2px}.wrapLogo span{color:#ff6a00}.wrapAd>b{font-size:17px;color:#ff6a00;margin:6px 0}.wrapHeroFood{height:170px;border-radius:18px;background:radial-gradient(circle at 40% 40%,#ffc15c 0 12%,#ff6b00 13% 28%,#1b120b 29% 38%,transparent 39%),linear-gradient(135deg,#121212,#2b1608);display:grid;place-items:center;color:white;font-weight:900;font-size:24px}.priceLine{display:flex;justify-content:space-between;align-items:end;margin-top:10px}.priceLine span{text-decoration:line-through;color:#666}.priceLine strong{font-size:28px;color:#ff4b00}.orderNow{margin:10px;background:#ff5a14;color:#fff;border-radius:8px;padding:10px;text-align:center;font-size:11px;font-weight:800;display:flex;justify-content:center;gap:7px}.miniPlatforms{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:0 10px 10px}.miniPlatforms i{font-style:normal;border-radius:4px;padding:5px 0;text-align:center;font-size:8px;color:white}.miniPlatforms i:nth-child(1){background:#ff5c00}.miniPlatforms i:nth-child(2){background:#ef5623}.miniPlatforms i:nth-child(3){background:#ff1551}.miniPlatforms i:nth-child(4){background:#1ebe5d}
          .hubLogo{text-align:center;font-size:38px;font-weight:1000;letter-spacing:-3px;margin-top:24px}.hubLogo span{color:#ff7600}.hubLogo small{display:block;font-size:10px;letter-spacing:0}.hubFood{height:185px;margin:14px 12px 0;border-radius:22px;background:radial-gradient(circle,#ff9a2d 0 8%,#d95500 9% 18%,#2b1308 19% 32%,transparent 33%),linear-gradient(145deg,#201109,#090909);display:grid;place-items:center;font-size:70px}.darkScreen h4{text-align:center;margin:10px 0 12px;font-size:25px;line-height:1}.darkScreen h4 span{color:#ff7600}.darkScreen button{display:block;margin:0 auto;background:#ff7621;color:white;border:0;border-radius:999px;padding:11px 18px;font-size:10px;font-weight:800}.hubDivider{text-align:center;font-size:9px;margin:11px 0;color:#f1f1f1}.hubGrid{display:grid;grid-template-columns:1fr 1fr;gap:7px;padding:0 12px}.hubChoice{border-radius:10px;padding:12px 9px;font-size:10px;font-weight:800}.hubChoice.orange{background:#612905}.hubChoice.pink{background:#5b0b22}.hubChoice.migros{background:#5f2d08}.hubChoice.whatsapp{background:#075928}.hubBenefits{display:flex;justify-content:space-around;padding:13px 9px;font-size:8px;color:#efefef}.nariboMini{text-align:center;color:#20c6e6;font-weight:800}.nariboMini small{color:#ccc;font-weight:400;font-style:italic}
          .ysBar{padding:18px 14px 10px;color:#ff164f;font-weight:900;font-size:18px}.restaurantVisual{height:180px;background:linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.45)),linear-gradient(135deg,#ff8b20,#1f1309);padding:12px}.wrapHeroFood.small{height:100%;font-size:18px}.restaurantTitle{padding:10px 12px}.restaurantTitle strong{display:block;font-size:17px}.restaurantTitle span{display:block;color:#ff9a00;font-size:11px;margin-top:4px}.restaurantMeta{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #eee;border-bottom:1px solid #eee;padding:9px 4px;font-size:8px;text-align:center}.menuTabs{padding:10px 12px;font-size:10px;font-weight:800}.menuTabs span{margin-left:18px;color:#777;font-weight:500}.menuProduct{display:grid;grid-template-columns:48px 1fr 28px;gap:8px;padding:10px 12px;align-items:center}.productThumb{width:48px;height:48px;border-radius:8px;background:#f2a23a;display:grid;place-items:center}.menuProduct strong,.menuProduct small,.menuProduct b{display:block}.menuProduct strong{font-size:10px}.menuProduct small{font-size:8px;color:#777}.menuProduct b{font-size:10px;color:#ff164f;margin-top:4px}.menuProduct button{border:0;background:#ff164f;color:white;width:24px;height:24px;border-radius:6px}
          .journeyArrow{display:flex;align-items:center;justify-content:center;flex-direction:column;color:#aeeeff;font-size:12px;font-weight:800;text-align:center}.journeyArrow .circle{margin-top:12px;width:56px;height:56px;border:1px solid #1fd4f1;border-radius:50%;display:grid;place-items:center;box-shadow:0 0 22px rgba(31,212,241,.25)}
          .journeyFooter{position:relative;z-index:2;margin-top:4px;background:rgba(0,15,25,.88);border-top:1px solid rgba(57,211,238,.28);padding:20px 0}.journeyFooterInner{display:grid;grid-template-columns:230px 1px 1fr;align-items:center;gap:26px}.journeyFooterInner img{width:190px;height:auto}.journeyFooterInner .line{height:44px;background:#6c7c85}.journeyFooterText{display:flex;align-items:center;gap:18px}.journeyFooterText svg{color:#19cbea}.journeyFooterText strong{font-size:21px}.journeyFooterText strong span{color:#19cbea}.journeyFooterText p{margin:3px 0 0;color:#d4e1e6}
          @media(max-width:1100px){.journeyStage{grid-template-columns:1fr 1fr 1fr;gap:18px}.journeyLabel,.journeyArrow{display:none}.smallPhone,.centerPhone{width:100%;max-width:300px;height:560px}.centerPhone{transform:none}.journeyFooterInner{grid-template-columns:180px 1px 1fr}}
          @media(max-width:760px){.premiumJourney{padding-top:42px}.journeyKicker{letter-spacing:4px}.journeyKicker:before,.journeyKicker:after{width:50px}.journeyHead h2{font-size:38px}.journeyHead p{font-size:15px;padding:0 18px}.journeyStage{grid-template-columns:1fr;gap:28px;padding:30px 0 42px}.smallPhone,.centerPhone{width:290px;height:560px}.journeyFooterInner{grid-template-columns:1fr;text-align:center}.journeyFooterInner .line{display:none}.journeyFooterText{justify-content:center;align-items:flex-start}.journeyFooterInner img{margin:auto}.journeyFooterText strong{font-size:18px}}
        `}</style>
        <div className="shell journeyHead"><div className="journeyKicker">REKLAMDAN SİPARİŞE</div><h2>REKLAMI GÖSTERMEK YETMEZ.<br /><span>SİPARİŞE</span> GÖTÜRMEK GEREKİR.</h2><p>Instagram’da başlayan ilgiyi, müşterinin tercih ettiği sipariş kanalına taşıyoruz.</p></div>
        <div className="shell journeyStage">
          <div className="journeyLabel left"><span className="n">01</span><h3>REKLAMI<br />GÖRÜR</h3><p>Instagram reklamı müşterinin karşısına çıkar.</p></div>
          <div className="journeyPhoneWrap"><PremiumPhone type="instagram" /></div>
          <div className="journeyArrow"><span>PLATFORMUNU<br />SEÇER</span><div className="circle"><ArrowRight size={26}/></div></div>
          <div className="journeyPhoneWrap center"><PremiumPhone type="hub" /></div>
          <div className="journeyArrow"><span>PLATFORMUNU<br />SEÇ</span><div className="circle"><ArrowRight size={26}/></div></div>
          <div className="journeyPhoneWrap"><PremiumPhone type="order" /></div>
          <div className="journeyLabel right"><span className="n">03</span><h3>SİPARİŞİNİ<br />VERİR</h3><p>Seçtiği platformda restoranın sayfasına gider ve siparişini tamamlar.</p></div>
        </div>
        <div className="journeyFooter"><div className="shell journeyFooterInner"><Image src="/naribo-logo.png" alt="Naribo" width={220} height={90}/><div className="line"/><div className="journeyFooterText"><ArrowRight size={34}/><div><strong>Reklamdan <span>siparişe</span> giden yolu kısaltıyoruz.</strong><p>Müşteri aramaz. Kaybolmaz. Tercih ettiği platformu seçer ve siparişe gider.</p></div></div></div></div>
      </section>
    </main>
  );
}
