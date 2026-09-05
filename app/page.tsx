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
            .approvedJourney{padding:36px 0 44px}
            .approvedJourneyDesktop{display:none}
            .approvedJourneyMobile{display:block;width:calc(100% - 28px);margin:0 auto;color:white}
            .mobileJourneyKicker{display:flex;align-items:center;justify-content:center;gap:10px;color:#8ee9f7;font-size:10px;font-weight:800;letter-spacing:4px;margin-bottom:10px}
            .mobileJourneyKicker:before,.mobileJourneyKicker:after{content:'';width:38px;height:1px;background:#20cbe9}
            .mobileJourneyTitle{text-align:center;font-size:30px;line-height:.98;letter-spacing:-1.4px;margin:0 0 10px;font-weight:900}
            .mobileJourneyTitle span{color:#21d8f6}
            .mobileJourneySub{text-align:center;color:#c7dbe3;font-size:13px;line-height:1.45;margin:0 auto 24px;max-width:360px}
            .mobileJourneyStack{display:grid;gap:18px}
            .mobileJourneyCard{position:relative;overflow:hidden;border-radius:22px;background:#061d2b;border:1px solid rgba(33,216,246,.18);box-shadow:0 18px 38px rgba(0,0,0,.28)}
            .mobileJourneyCrop{width:100%;aspect-ratio:.74;background-image:url('/reklamdan-siparise.png');background-repeat:no-repeat;background-size:300% auto;background-position-y:64%;}
            .mobileJourneyCard.step1 .mobileJourneyCrop{background-position-x:0%}
            .mobileJourneyCard.step2 .mobileJourneyCrop{background-position-x:50%}
            .mobileJourneyCard.step3 .mobileJourneyCrop{background-position-x:100%}
            .mobileJourneyMeta{display:grid;grid-template-columns:54px 1fr;gap:12px;align-items:center;padding:14px 16px 16px;background:linear-gradient(180deg,#082535,#061d2b)}
            .mobileJourneyNo{font-size:30px;line-height:1;font-weight:900;color:#20d4f2}
            .mobileJourneyMeta h3{margin:0 0 4px;font-size:15px;line-height:1.05}
            .mobileJourneyMeta p{margin:0;color:#9fbdc8;font-size:12px;line-height:1.45}
            .mobileJourneyArrow{display:grid;place-items:center;width:42px;height:42px;margin:-8px auto -8px;border-radius:50%;border:1px solid rgba(32,212,242,.45);color:#20d4f2;background:#082738;box-shadow:0 0 20px rgba(32,212,242,.12)}
            .mobileJourneyResult{margin-top:24px;padding:18px;border-top:1px solid rgba(32,212,242,.22);text-align:center}
            .mobileJourneyResult strong{display:block;font-size:17px;margin-bottom:5px}.mobileJourneyResult strong span{color:#21d8f6}.mobileJourneyResult p{margin:0;color:#9fbdc8;font-size:12px}
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

        <div className="approvedJourneyMobile">
          <div className="mobileJourneyKicker">REKLAMDAN SİPARİŞE</div>
          <h2 className="mobileJourneyTitle">REKLAMI GÖSTERMEK YETMEZ.<br /><span>SİPARİŞE</span> GÖTÜRMEK GEREKİR.</h2>
          <p className="mobileJourneySub">Instagram’da başlayan ilgiyi, müşterinin tercih ettiği sipariş kanalına taşıyoruz.</p>

          <div className="mobileJourneyStack">
            <article className="mobileJourneyCard step1">
              <div className="mobileJourneyCrop" />
              <div className="mobileJourneyMeta"><div className="mobileJourneyNo">01</div><div><h3>REKLAMI GÖRÜR</h3><p>Instagram’da sponsorlu reklam müşterinin karşısına çıkar.</p></div></div>
            </article>

            <div className="mobileJourneyArrow"><ArrowRight size={22} /></div>

            <article className="mobileJourneyCard step2">
              <div className="mobileJourneyCrop" />
              <div className="mobileJourneyMeta"><div className="mobileJourneyNo">02</div><div><h3>PLATFORMUNU SEÇER</h3><p>Restoranınıza özel yönlendirme sayfasından sipariş kanalını seçer.</p></div></div>
            </article>

            <div className="mobileJourneyArrow"><ArrowRight size={22} /></div>

            <article className="mobileJourneyCard step3">
              <div className="mobileJourneyCrop" />
              <div className="mobileJourneyMeta"><div className="mobileJourneyNo">03</div><div><h3>SİPARİŞİNİ VERİR</h3><p>Seçtiği platformda restoran sayfanıza gider ve siparişini tamamlar.</p></div></div>
            </article>
          </div>

          <div className="mobileJourneyResult"><strong>Reklamdan <span>siparişe</span> giden yolu kısaltıyoruz.</strong><p>Müşteri aramaz. Kaybolmaz. Platformunu seçer ve siparişe gider.</p></div>
        </div>
      </section>
    </main>
  );
}
