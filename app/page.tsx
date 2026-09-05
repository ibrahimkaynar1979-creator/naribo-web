import Image from 'next/image';
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
  return (
    <a className="brand" href="#" aria-label="Naribo ana sayfa">
      <Image src="/naribo-logo.png" alt="Naribo Restaurant Growth Partner" width={265} height={110} priority className="brandImage" />
    </a>
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
            <a href="#">Ana Sayfa</a>
            <a href="#hizmetler">Hizmetler</a>
            <a href="#nasil">Nasıl Çalışıyoruz?</a>
            <a href="#basari">Başarı Hikayeleri</a>
            <a href="#hakkimizda">Hakkımızda</a>
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
            <div className="microTrust">
              <span><TrendingUp size={16} /> Hızlı analiz</span>
              <span><Clock3 size={16} /> Size özel strateji</span>
              <span><ShieldCheck size={16} /> Ücretsiz danışmanlık</span>
            </div>
          </div>

          <div className="heroVisual" aria-label="Naribo şef görseli">
            <div
              className="chefPlaceholder"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(2,12,18,.02), rgba(2,12,18,.18)), url('/chef-naribo.png')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          </div>

          <div className="benefitStack">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article className="benefitCard" key={title}>
                <Icon size={32} strokeWidth={1.7} />
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="platformWrap shell" aria-label="Sipariş platformları">
        <div className="platformImageBar">
          <Image src="/platforms/platform-strip.png" alt="Yemeksepeti, Trendyol Yemek, GetirYemek ve Migros Yemek" width={1320} height={104} priority className="platformStripImage" />
        </div>
      </section>

      <section className="stats shell">
        {stats.map(({ icon: Icon, title, text }) => (
          <article className="stat" key={title}>
            <Icon size={34} strokeWidth={1.65} />
            <div><h3>{title}</h3><p>{text}</p></div>
          </article>
        ))}
      </section>

      <section className="setupSection" id="nasil">
        <div className="shell setupIntro">
          <div>
            <div className="sectionKicker">SIFIRDAN SATIŞA</div>
            <h2>RESTORANINIZI <span>DİJİTAL SATIŞA</span><br />6 ADIMDA HAZIRLIYORUZ.</h2>
          </div>
          <p>Menü, fiyat, kampanya, görseller ve platform başvurularını tek akışta yönetiyor; restoranınızı sipariş almaya hazır hale getiriyoruz.</p>
        </div>

        <div className="shell setupFlow">
          {setupSteps.map(({ no, icon: Icon, title, text }, index) => (
            <article className="setupCard" key={no}>
              <div className="setupTop">
                <div className="setupIcon"><Icon size={28} strokeWidth={1.65} /></div>
                <div className="setupNo">{no}</div>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              {index < setupSteps.length - 1 && <div className="setupConnector" aria-hidden="true"><ArrowRight size={18} /></div>}
            </article>
          ))}
        </div>

        <div className="shell setupFoot">
          <div className="setupPlatforms">
            <span>PLATFORM BAŞVURULARI</span>
            <strong>Yemeksepeti</strong><i>•</i><strong>Trendyol Yemek</strong><i>•</i><strong>GetirYemek</strong><i>•</i><strong>Migros Yemek</strong>
          </div>
          <div className="setupResult"><CircleCheckBig size={22} /> Başvurudan yayına kadar tek ekip.</div>
        </div>
      </section>

      <section className="approvedJourney" id="hizmetler">
        <style>{`
          .approvedJourney{background:#031722;padding:34px 0;overflow:hidden}
          .approvedJourneyDesktop{width:min(1320px,calc(100% - 64px));margin:0 auto;overflow:hidden;border-radius:30px}
          .approvedJourneyDesktop img{display:block;width:100%;height:auto}
          .approvedJourneyMobile{display:none}

          @media(max-width:760px){
            .approvedJourney{padding:0;background:#031722}
            .approvedJourneyDesktop{display:none}
            .approvedJourneyMobile{display:block;position:relative}
            .journeySwipe{display:flex;width:100%;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none}
            .journeySwipe::-webkit-scrollbar{display:none}
            .journeySlide{position:relative;flex:0 0 100vw;height:78vh;min-height:560px;max-height:760px;scroll-snap-align:start;scroll-snap-stop:always;overflow:hidden;background:#031722}
            .journeyCrop{position:absolute;inset:0;background-image:url('/reklamdan-siparise.png');background-repeat:no-repeat;background-size:auto 100%;background-position-y:center}
            .journeySlide.slide1 .journeyCrop{background-position-x:left}
            .journeySlide.slide2 .journeyCrop{background-position-x:center}
            .journeySlide.slide3 .journeyCrop{background-position-x:right}
            .journeySlide:after{content:'';position:absolute;left:0;right:0;bottom:0;height:24%;background:linear-gradient(180deg,transparent,rgba(3,23,34,.88));pointer-events:none}
            .journeySlideLabel{position:absolute;z-index:2;left:18px;right:18px;bottom:22px;display:flex;align-items:flex-end;justify-content:space-between;gap:16px;color:white}
            .journeySlideLabel strong{font-size:34px;line-height:.9;color:#21d8f6}
            .journeySlideLabel span{display:block;margin-top:4px;font-size:16px;font-weight:800;letter-spacing:.2px}
            .journeySwipeHint{position:absolute;z-index:5;right:14px;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;display:grid;place-items:center;color:#21d8f6;background:rgba(3,23,34,.78);border:1px solid rgba(33,216,246,.5);box-shadow:0 0 22px rgba(33,216,246,.15);pointer-events:none}
            .journeyDots{display:flex;justify-content:center;gap:7px;padding:12px 0 14px;background:#031722}
            .journeyDots i{display:block;width:7px;height:7px;border-radius:50%;background:#285165}
            .journeyDots i:first-child{background:#21d8f6}
          }
        `}</style>

        <div className="approvedJourneyDesktop">
          <Image
            src="/reklamdan-siparise.png"
            alt="Naribo reklamdan siparişe üç adım tasarımı"
            width={1672}
            height={941}
            className="approvedJourneyImage"
          />
        </div>

        <div className="approvedJourneyMobile" aria-label="Reklamdan siparişe mobil kaydırmalı akış">
          <div className="journeySwipe">
            <article className="journeySlide slide1">
              <div className="journeyCrop" />
              <div className="journeySlideLabel"><div><strong>01</strong><span>REKLAMI GÖRÜR</span></div></div>
            </article>
            <article className="journeySlide slide2">
              <div className="journeyCrop" />
              <div className="journeySlideLabel"><div><strong>02</strong><span>PLATFORMUNU SEÇER</span></div></div>
            </article>
            <article className="journeySlide slide3">
              <div className="journeyCrop" />
              <div className="journeySlideLabel"><div><strong>03</strong><span>SİPARİŞİNİ VERİR</span></div></div>
            </article>
          </div>
          <div className="journeySwipeHint"><ArrowRight size={22} /></div>
          <div className="journeyDots"><i/><i/><i/></div>
        </div>
      </section>
    </main>
  );
}
