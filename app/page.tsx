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
  { no: '05', icon: Store, title: 'PLATFORM BAŞVURULARI', text: 'Başvuru ve mağaza kurulum süreçlerini 3 ana kanal için hazırlıyoruz.' },
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
      <style>{`
        .codedHero{
          position:relative;
          min-height:760px;
          overflow:hidden;
          color:#fff;
          background-image:
            linear-gradient(90deg, rgba(3,20,30,.97) 0%, rgba(3,20,30,.92) 28%, rgba(3,20,30,.20) 46%, rgba(3,20,30,.08) 62%, rgba(3,20,30,.84) 76%, rgba(3,20,30,.96) 100%),
            url('/hero-final.png');
          background-size:cover;
          background-position:center 42%;
          border-radius:0 0 38px 38px;
        }
        .codedHero .nav{padding-top:18px}
        .codedHero .heroGrid{min-height:640px;padding-top:34px}
        .codedHero .heroVisual{min-height:540px}
        .codedHero .chefPlaceholder{display:none}
        .codedHero .heroCopy h1{font-size:clamp(54px,4.7vw,76px)}
        .codedHero .benefitCard{background:rgba(4,42,70,.86);backdrop-filter:blur(10px)}
        @media(max-width:760px){
          .codedHero{
            min-height:auto;
            background-image:linear-gradient(180deg,rgba(3,20,30,.94) 0%,rgba(3,20,30,.84) 44%,rgba(3,20,30,.58) 100%),url('/hero-final.png');
            background-position:58% center;
          }
          .codedHero .heroVisual{min-height:330px}
        }
      `}</style>

      <section className="hero codedHero">
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

          <div className="heroVisual" aria-hidden="true" />

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
            <strong>Yemeksepeti</strong><i>•</i><strong>Trendyol Yemek</strong><i>•</i><strong>Migros Yemek</strong>
          </div>
          <div className="setupResult"><CircleCheckBig size={22} /> Başvurudan yayına kadar tek ekip.</div>
        </div>
      </section>
    </main>
  );
}
