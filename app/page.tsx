import Image from 'next/image';
import JourneyCarousel from './JourneyCarousel';
import { ArrowRight, BadgePercent, BarChart3, Camera, CircleCheckBig, ClipboardCheck, Clock3, Eye, Headphones, ListChecks, Menu, ShieldCheck, ShoppingCart, Store, Target, TrendingUp, Users } from 'lucide-react';

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
  return <a className="brand" href="#" aria-label="Naribo ana sayfa"><Image src="/naribo-logo.png" alt="Naribo" width={265} height={110} priority className="brandImage" /></a>;
}

export default function Home() {
  return (
    <main>
      <style>{`
        .mobilePlatformBand{display:none}
        @media(max-width:760px){
          .hero{padding-bottom:0!important}
          .heroGrid{width:100%!important;max-width:none!important;margin:0!important;padding-left:28px!important;padding-right:28px!important}
          .benefitStack{order:3!important;padding:28px 0 20px!important;gap:12px!important}
          .benefitCard{min-height:104px!important;padding:18px 16px!important;background:linear-gradient(145deg,#07395a,#062d47)!important;border:1px solid rgba(33,216,246,.28)!important;border-radius:22px!important}
          .benefitCard h3{font-size:14px!important}.benefitCard p{font-size:12px!important}
          .mobilePlatformBand{order:4;display:flex!important;width:calc(100% + 56px);height:92px;margin:0 -28px;background:#fff;align-items:center;justify-content:center;overflow:hidden;border-radius:0 0 26px 26px}
          .mobilePlatformBand img{display:block;width:100%;height:100%;object-fit:contain;padding:8px 18px}
          .platformWrap,.stats{display:none!important}
        }
      `}</style>
      <section className="hero">
        <div className="heroGlow" />
        <header className="nav shell">
          <Logo />
          <nav className="desktopNav" aria-label="Ana menü"><a href="#">Ana Sayfa</a><a href="#hizmetler">Hizmetler</a><a href="#nasil">Nasıl Çalışıyoruz?</a><a href="#basari">Başarı Hikayeleri</a><a href="#hakkimizda">Hakkımızda</a></nav>
          <a className="contactButton" href="#iletisim">İletişime Geç <ArrowRight size={18} /></a>
          <button className="mobileMenu" aria-label="Menüyü aç"><Menu /></button>
        </header>
        <div className="growthBand"><span />RESTORANLARIN BÜYÜME ORTAĞI<span /></div>

        <div className="heroGrid shell">
          <div className="heroVisual" aria-label="Naribo şef görseli"><div className="chefPlaceholder" style={{backgroundImage:"url('/chef-naribo.png')"}} /></div>
          <div className="heroCopy">
            <div className="eyebrow"><span /> RESTORANLARIN DİJİTAL BÜYÜME ORTAĞI</div>
            <h1><span>DAHA FAZLA</span><br /><strong>SİPARİŞ.</strong><br /><em>DAHA KÂRLI<br />BÜYÜME.</em></h1>
            <p>Yemek platformlarındaki satışınızı ve kârlılığınızı birlikte büyütüyoruz.</p>
            <div className="heroActionDock"><a className="primaryCta" href="#analiz">Ücretsiz Restoran Analizi <ArrowRight size={20} /></a><div className="microTrust"><span><TrendingUp size={16} /> Hızlı analiz</span><span><Clock3 size={16} /> Size özel strateji</span><span><ShieldCheck size={16} /> Ücretsiz danışmanlık</span></div></div>
          </div>
          <div className="benefitStack">{benefits.map(({icon:Icon,title,text})=><article className="benefitCard" key={title}><Icon size={32} strokeWidth={1.7}/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
          <div className="mobilePlatformBand" aria-label="Sipariş platformları"><Image src="/platforms/platform-strip.png" alt="Yemeksepeti, Trendyol Yemek, GetirYemek ve Migros Yemek" width={1320} height={104} priority /></div>
        </div>
      </section>

      <section className="platformWrap shell" aria-label="Sipariş platformları"><div className="platformImageBar"><Image src="/platforms/platform-strip.png" alt="Yemeksepeti, Trendyol Yemek, GetirYemek ve Migros Yemek" width={1320} height={104} priority className="platformStripImage" /></div></section>
      <section className="stats shell">{stats.map(({icon:Icon,title,text})=><article className="stat" key={title}><Icon size={34} strokeWidth={1.65}/><div><h3>{title}</h3><p>{text}</p></div></article>)}</section>

      <section className="setupSection" id="nasil">
        <div className="shell setupIntro"><div><div className="sectionKicker">SIFIRDAN SATIŞA</div><h2>RESTORANINIZI <span>DİJİTAL SATIŞA</span><br />6 ADIMDA HAZIRLIYORUZ.</h2></div><p>Menü, fiyat, kampanya, görseller ve platform başvurularını tek akışta yönetiyor; restoranınızı sipariş almaya hazır hale getiriyoruz.</p></div>
        <div className="shell setupFlow">{setupSteps.map(({no,icon:Icon,title,text},index)=><article className="setupCard" key={no}><div className="setupTop"><div className="setupIcon"><Icon size={28} strokeWidth={1.65}/></div><div className="setupNo">{no}</div></div><h3>{title}</h3><p>{text}</p>{index<setupSteps.length-1&&<div className="setupConnector" aria-hidden="true"><ArrowRight size={18}/></div>}</article>)}</div>
        <div className="shell setupFoot"><div className="setupPlatforms"><span>PLATFORM BAŞVURULARI</span><strong>Yemeksepeti</strong><i>•</i><strong>Trendyol Yemek</strong><i>•</i><strong>GetirYemek</strong><i>•</i><strong>Migros Yemek</strong></div><div className="setupResult"><CircleCheckBig size={22}/> Başvurudan yayına kadar tek ekip.</div></div>
      </section>

      <section className="approvedJourney" id="hizmetler">
        <style>{`
          .approvedJourney{background:#031722;padding:34px 0;overflow:hidden}.approvedJourneyDesktop{width:min(1320px,calc(100% - 64px));margin:0 auto;overflow:hidden;border-radius:30px}.approvedJourneyDesktop img{display:block;width:100%;height:auto}.approvedJourneyMobile{display:none}
          @media(max-width:760px){.approvedJourney{padding:0;background:#031722}.approvedJourneyDesktop{display:none}.approvedJourneyMobile{display:block}.journeyCarousel{background:#031722;width:100%;overflow:hidden;padding:24px 0 12px}.journeyCarouselFixedHead{padding:0 18px 18px;text-align:center;color:#fff}.journeyCarouselKicker{display:flex;align-items:center;justify-content:center;gap:10px;color:#8feaf8;font-size:10px;font-weight:800;letter-spacing:4px;margin-bottom:10px;white-space:nowrap}.journeyCarouselKicker span{width:38px;height:1px;background:#20cbe9}.journeyCarouselFixedHead h2{margin:0;font-size:29px;line-height:.98;letter-spacing:-1.2px;font-weight:900}.journeyCarouselFixedHead h2 em{font-style:normal;color:#21d8f6}.journeyCarouselFixedHead p{margin:10px auto 0;max-width:410px;color:#c4d7df;font-size:12px;line-height:1.4}.journeyCarouselViewport{position:relative;width:100%;height:auto;aspect-ratio:560/630;overflow:hidden;touch-action:pan-y;background:#031722}.journeyCarouselSlide{position:absolute;inset:0;opacity:0;transform:translateX(18px);transition:opacity .22s ease,transform .22s ease;pointer-events:none;overflow:hidden}.journeyCarouselSlide.isActive{opacity:1;transform:translateX(0);pointer-events:auto}.journeyCarouselArtwork{position:absolute;inset:0;background-image:url('/reklamdan-siparise.png');background-repeat:no-repeat;background-size:298.57% 149.37%;background-position-y:62.7%!important}.journeyCarouselSlide:nth-child(1) .journeyCarouselArtwork{background-position-x:0%!important}.journeyCarouselSlide:nth-child(2) .journeyCarouselArtwork{background-position-x:50%!important}.journeyCarouselSlide:nth-child(3) .journeyCarouselArtwork{background-position-x:100%!important}.journeyCarouselShade{display:none}.journeyCarouselLabel{display:none}.journeyCarouselNav{position:absolute;z-index:6;top:50%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(33,216,246,.58);background:rgba(3,23,34,.84);color:#21d8f6}.journeyCarouselNav.prev{left:10px}.journeyCarouselNav.next{right:10px}.journeyCarouselDots{height:34px;display:flex;align-items:center;justify-content:center;gap:8px}.journeyCarouselDots button{border:0;padding:0;width:7px;height:7px;border-radius:99px;background:#31566a}.journeyCarouselDots button.active{width:24px;background:#21d8f6}}
        `}</style>
        <div className="approvedJourneyDesktop"><Image src="/reklamdan-siparise.png" alt="Naribo reklamdan siparişe üç adım tasarımı" width={1672} height={941} className="approvedJourneyImage" /></div>
        <div className="approvedJourneyMobile"><JourneyCarousel /></div>
      </section>
    </main>
  );
}
