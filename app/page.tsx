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

const orderFlow = [
  { no: '01', icon: Instagram, title: 'REKLAMI GÖRÜR', text: 'Müşteri Instagram’da restoranınızın sponsorlu içeriğiyle karşılaşır.', screen: 'instagram' },
  { no: '02', icon: MousePointerClick, title: 'PLATFORMUNU SEÇER', text: 'Tek bağlantı üzerinden tercih ettiği sipariş kanalına yönlenir.', screen: 'chooser' },
  { no: '03', icon: ShoppingCart, title: 'SİPARİŞİNİ VERİR', text: 'Seçtiği platformda menünüzü görür ve siparişini tamamlar.', screen: 'order' },
];

function Logo() {
  return (
    <a className="brand" href="#" aria-label="Naribo ana sayfa">
      <Image src="/naribo-logo.png" alt="Naribo Restaurant Growth Partner" width={265} height={110} priority className="brandImage" />
    </a>
  );
}

function PhoneScreen({ type }: { type: string }) {
  if (type === 'instagram') {
    return (
      <div className="phoneScreen instagramScreen">
        <div className="phoneStatus"><span>9:41</span><span>● ● ●</span></div>
        <div className="igTop"><Instagram size={18} /><strong>Instagram</strong></div>
        <div className="igProfile"><div className="avatar">N</div><div><strong>naribo</strong><small>Sponsored</small></div></div>
        <div className="igCreative">
          <span>DAHA FAZLA</span>
          <strong>SİPARİŞ.</strong>
          <em>DAHA KÂRLI BÜYÜME.</em>
        </div>
        <div className="igAction">Şimdi Sipariş Ver <ArrowRight size={14} /></div>
      </div>
    );
  }

  if (type === 'chooser') {
    return (
      <div className="phoneScreen chooserScreen">
        <div className="phoneStatus"><span>9:41</span><span>● ● ●</span></div>
        <div className="miniBrand">naribo</div>
        <h4>Sipariş platformunu seç</h4>
        <p>Tek bağlantı, dört sipariş kanalı.</p>
        <div className="platformChoice pink">Yemeksepeti <ArrowRight size={14} /></div>
        <div className="platformChoice orange">trendyol yemek <ArrowRight size={14} /></div>
        <div className="platformChoice purple">getir yemek <ArrowRight size={14} /></div>
        <div className="platformChoice migros">MİGROS yemek <ArrowRight size={14} /></div>
      </div>
    );
  }

  return (
    <div className="phoneScreen orderScreen">
      <div className="phoneStatus"><span>9:41</span><span>● ● ●</span></div>
      <div className="orderHeader">Yemeksepeti</div>
      <div className="restaurantCover"><span>Restoranınız</span></div>
      <div className="ratingRow"><strong>4.8 ★</strong><span>20–30 dk</span></div>
      <div className="menuItem"><div className="foodThumb" /><div><strong>Chef Special</strong><small>Özel sos, taze garnitür</small></div><b>₺349</b></div>
      <div className="menuItem"><div className="foodThumb second" /><div><strong>Signature Bowl</strong><small>Günün seçimi</small></div><b>₺289</b></div>
      <div className="basketButton">Sepete Git <ShoppingCart size={15} /></div>
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

      <section className="orderJourney" id="hizmetler">
        <div className="orderGlow orderGlowOne" />
        <div className="orderGlow orderGlowTwo" />
        <div className="shell orderIntro">
          <div>
            <div className="orderKicker">INSTAGRAM'DAN SİPARİŞE</div>
            <h2>BİR REKLAM.<br /><span>DÖRT PLATFORM.</span><br />TEK SATIŞ AKIŞI.</h2>
          </div>
          <div className="orderIntroText">
            <Smartphone size={28} />
            <p>Müşterinin reklamı gördüğü andan siparişini tamamladığı ana kadar tüm akışı tek sistemde kurguluyoruz.</p>
          </div>
        </div>

        <div className="shell phoneFlow">
          {orderFlow.map(({ no, icon: Icon, title, text, screen }, index) => (
            <article className={`phoneStep phoneStep${index + 1}`} key={no}>
              <div className="phoneStepHead">
                <span className="flowNo">{no}</span>
                <div className="flowIcon"><Icon size={21} /></div>
              </div>
              <div className="phoneFrame">
                <div className="phoneSpeaker" />
                <PhoneScreen type={screen} />
              </div>
              <div className="phoneCaption">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              {index < orderFlow.length - 1 && <div className="flowArrow"><ArrowRight size={22} /></div>}
            </article>
          ))}
        </div>

        <div className="shell orderResultBar">
          <span>REKLAM</span><i>→</i><span>TEK LİNK</span><i>→</i><span>PLATFORM SEÇİMİ</span><i>→</i><strong>SİPARİŞ</strong>
          <div>Her adım ölçülebilir. Her temas satışa hizmet eder.</div>
        </div>
      </section>
    </main>
  );
}
