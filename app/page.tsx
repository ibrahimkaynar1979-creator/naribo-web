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
        .targetHero{
          position:relative;
          width:calc(100% - 16px);
          min-height:892px;
          margin:8px auto 0;
          overflow:hidden;
          color:#fff;
          border:1px solid rgba(255,255,255,.28);
          border-radius:30px;
          background:#03141e;
        }
        .targetHero::before{
          content:'';
          position:absolute;
          inset:0;
          background-image:url('/hero-final.png');
          background-size:118% auto;
          background-position:52% 48%;
          background-repeat:no-repeat;
          transform:scale(1.015);
        }
        .targetHero::after{
          content:'';
          position:absolute;
          inset:0;
          background:
            linear-gradient(180deg, rgba(3,20,30,.84) 0%, rgba(3,20,30,.20) 16%, rgba(3,20,30,.03) 38%, rgba(3,20,30,.18) 100%),
            linear-gradient(90deg, rgba(3,20,30,.99) 0%, rgba(3,20,30,.96) 27%, rgba(3,20,30,.36) 37%, rgba(3,20,30,.02) 47%, rgba(3,20,30,.04) 70%, rgba(3,20,30,.78) 78%, rgba(3,20,30,.97) 100%);
          pointer-events:none;
        }
        .targetHero .nav,
        .targetHero .heroGrid{position:relative;z-index:2}
        .targetHero .nav{padding-top:18px}
        .targetHero .heroGrid{
          grid-template-columns:36% 42% 22%;
          min-height:710px;
          padding-top:44px;
        }
        .targetHero .heroCopy{padding:20px 34px 82px 0;align-self:center}
        .targetHero .eyebrow{margin-bottom:26px;color:#e7f3f6}
        .targetHero .heroCopy h1{font-size:clamp(60px,4.65vw,78px);line-height:.90;letter-spacing:-3.5px}
        .targetHero .heroCopy > p{font-size:20px;line-height:1.48;max-width:470px;margin:26px 0 28px}
        .targetHero .primaryCta{padding:17px 26px;font-size:17px}
        .targetHero .microTrust{margin-top:27px;gap:23px}
        .targetHero .heroVisual{min-height:590px}
        .targetHero .benefitStack{padding:58px 0 74px 10px;gap:14px}
        .targetHero .benefitCard{
          min-height:104px;
          padding:19px 18px;
          border-radius:20px;
          background:rgba(4,38,65,.90);
          border-color:rgba(16,197,234,.34);
          box-shadow:0 14px 28px rgba(0,0,0,.18);
          backdrop-filter:blur(12px);
        }
        .targetHero .benefitCard h3{font-size:15px}
        .targetHero .benefitCard p{font-size:13px}
        .platformWrap.targetPlatform{margin-top:-84px;z-index:5}
        .targetPlatform .platformImageBar{height:128px;border-radius:28px;box-shadow:0 18px 38px rgba(10,36,51,.16)}
        .targetPlatform .platformStripImage{object-fit:cover;object-position:center}
        @media(max-width:1100px){
          .targetHero{min-height:auto}
          .targetHero::before{background-size:cover;background-position:58% center}
          .targetHero::after{background:linear-gradient(180deg,rgba(3,20,30,.92),rgba(3,20,30,.40))}
          .targetHero .heroGrid{grid-template-columns:1fr 1fr}
          .targetHero .benefitStack{grid-column:1/-1;padding:12px 0 92px}
          .platformWrap.targetPlatform{margin-top:-62px}
          .targetPlatform .platformImageBar{height:100px}
        }
        @media(max-width:760px){
          .targetHero{width:100%;margin:0;border:0;border-radius:0 0 26px 26px}
          .targetHero::before{background-size:auto 100%;background-position:58% center}
          .targetHero::after{background:linear-gradient(180deg,rgba(3,20,30,.97) 0%,rgba(3,20,30,.84) 48%,rgba(3,20,30,.48) 100%)}
          .targetHero .heroGrid{display:flex;flex-direction:column;padding-top:18px}
          .targetHero .heroCopy{padding:8px 0 18px}
          .targetHero .heroVisual{min-height:320px;order:2}
          .targetHero .benefitStack{order:3;padding:16px 0 82px}
          .targetHero .heroCopy h1{font-size:clamp(48px,14vw,66px)}
          .platformWrap.targetPlatform{margin-top:-42px}
          .targetPlatform .platformImageBar{height:76px;border-radius:18px}
        }
      `}</style>

      <section className="hero targetHero">
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

      <section className="platformWrap targetPlatform shell" aria-label="Sipariş platformları">
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
