'use client';

import { BellRing, ChevronDown, Clock3, CreditCard, Instagram, MapPin, MessageCircle, MoreHorizontal, Phone, Utensils, Wifi, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { QrMenuRestaurant } from '../../lib/qr-menu/types';
import './salt-landing.css';

type Modal = null | 'waiter' | 'feedback' | 'wifi' | 'iban' | 'more' | 'success';

type SaltThemeVars = React.CSSProperties & {
  '--salt-bg': string;
  '--salt-bg-soft': string;
  '--salt-ink': string;
  '--salt-accent': string;
  '--salt-peach-a': string;
  '--salt-peach-b': string;
  '--salt-sage-a': string;
  '--salt-sage-b': string;
  '--salt-primary-a': string;
  '--salt-primary-b': string;
  '--salt-primary-c': string;
  '--salt-warm-a': string;
  '--salt-warm-b': string;
  '--salt-warm-c': string;
  '--salt-cool-a': string;
  '--salt-cool-b': string;
  '--salt-cool-c': string;
};

const DESIGN_W = 430;
const DESIGN_H = 790;
const FOOTER_H = 78;
const FOOTER_GAP = 0;

const SALT_REFERENCE_THEME: SaltThemeVars = {
  '--salt-bg': '#FCF8F3', '--salt-bg-soft': '#F8F0E9', '--salt-ink': '#151A1E', '--salt-accent': '#EB3038',
  '--salt-peach-a': '#F8CBAE', '--salt-peach-b': '#F7E4D4', '--salt-sage-a': '#E4EAE5', '--salt-sage-b': '#EEE8DE',
  '--salt-primary-a': '#F98077', '--salt-primary-b': '#E95A5C', '--salt-primary-c': '#D88465',
  '--salt-warm-a': '#FFFDFB', '--salt-warm-b': '#F8ECE7', '--salt-warm-c': '#F4E3D5',
  '--salt-cool-a': '#FBFDFD', '--salt-cool-b': '#E0E8EA', '--salt-cool-c': '#BED8E1',
};

export function SaltLanding({ restaurant }: { restaurant: QrMenuRestaurant }) {
  const [modal, setModal] = useState<Modal>(null);
  const [table, setTable] = useState('');
  const [rating, setRating] = useState(0);
  const [scale, setScale] = useState(1);
  const hero = restaurant.coverImage || restaurant.products.find(p => p.isFeatured && p.isActive)?.image || restaurant.products.find(p => p.isActive)?.image;
  const isMakarilla = restaurant.slug === 'makarilla';
  const makarillaPlate = '/makarilla_tabak_v2.png';

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflowX = html.style.overflowX;
    const prevBodyOverflowX = body.style.overflowX;
    const prevBodyOverscrollX = body.style.overscrollBehaviorX;

    html.style.overflowX = 'hidden';
    body.style.overflowX = 'hidden';
    body.style.overscrollBehaviorX = 'none';

    const fit = () => {
      const layoutWidth = document.documentElement.clientWidth || window.innerWidth;
      const visualWidth = window.visualViewport?.width || layoutWidth;
      const viewportWidth = Math.min(layoutWidth, visualWidth, window.innerWidth);
      setScale(Math.min(viewportWidth / DESIGN_W, 1));
    };

    window.scrollTo(0, 0);
    fit();
    window.addEventListener('resize', fit);
    window.visualViewport?.addEventListener('resize', fit);

    return () => {
      window.removeEventListener('resize', fit);
      window.visualViewport?.removeEventListener('resize', fit);
      html.style.overflowX = prevHtmlOverflowX;
      body.style.overflowX = prevBodyOverflowX;
      body.style.overscrollBehaviorX = prevBodyOverscrollX;
    };
  }, []);

  const openMenu = () => { window.location.href = `/menu/${restaurant.slug}?view=menu`; };
  const openMap = () => {
    const q = encodeURIComponent(`${restaurant.branch.address} ${restaurant.branch.city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank', 'noopener,noreferrer');
  };

  return <main className="salt-landing-stage" style={{ ...SALT_REFERENCE_THEME, width: '100vw', maxWidth: '100vw', overflowX: 'hidden', touchAction: 'pan-y', overscrollBehaviorX: 'none' }}>
    <div className="salt-landing-frame" style={{ width: DESIGN_W * scale, height: DESIGN_H * scale }}>
      <section className="salt-landing" style={{ transform: `scale(${scale})` }}>
        <header className="salt-topbar">
          <div className="salt-wordmark salt-wordmark-logo" aria-label={`${restaurant.name} ${restaurant.tagline}`}>
            <img src={restaurant.logo || '/makarilla-logo.png'} alt={restaurant.name} />
          </div>
          <button className="salt-language" aria-label="Dil seçimi">TR <ChevronDown size={18}/></button>
        </header>

        <section className={`salt-hero${isMakarilla ? ' makarilla-hero' : ''}`}>
          <div className="salt-shape salt-shape-peach"/><div className="salt-shape salt-shape-sage"/>
          <div className="salt-copy">
            <div className="salt-eyebrow">GERÇEK İTALYAN<br/>LEZZETİ</div><div className="salt-red-line"/>
            <h1>Lezzet<br/>her zaman<br/>daha iyisini<br/>bir araya getirir.</h1><p>Taze malzemeler,<br/>keyifli anlar.</p>
          </div>
          <div className="salt-script">Good<br/>Food<br/>Good<br/>People</div>
          {!isMakarilla && hero && <img className="salt-burger salt-pasta" src={hero} alt={`${restaurant.name} yemek`} />}
          {isMakarilla && <img className="makarilla-pasta-overlay" src={makarillaPlate} alt={`${restaurant.name} makarna`} />}
          <div className="salt-dots"><b/><span/><span/></div>
        </section>

        <section className="salt-actions">
          <button className="salt-action salt-action-primary" onClick={openMenu}><span className="salt-action-icon"><Utensils/></span><span className="salt-action-copy"><b>Menüyü Gör</b><small>Tüm lezzetleri keşfedin</small></span><span className="salt-action-arrow">→</span></button>
          <button className="salt-action salt-action-warm" onClick={() => setModal('waiter')}><span className="salt-action-icon"><BellRing/></span><span className="salt-action-copy"><b>Garson Çağır</b><small>Masanıza servis desteği isteyin</small></span><span className="salt-action-arrow">→</span></button>
          <button className="salt-action salt-action-cool" onClick={() => setModal('feedback')}><span className="salt-action-icon"><MessageCircle/></span><span className="salt-action-copy"><b>Geri Bildirim</b><small>Deneyiminizi bizimle paylaşın</small></span><span className="salt-action-arrow">→</span></button>
          <div className="salt-powered">Powered by <b>paneltakip</b></div>
        </section>

        {modal && <div className="salt-modal-backdrop"><div className="salt-modal">
          <button className="salt-modal-close" onClick={() => setModal(null)}><X/></button>
          {modal === 'waiter' && <><BellRing className="salt-modal-main-icon"/><h2>Garson Çağır</h2><p>Masa numaranızı girin.</p><input value={table} onChange={e => setTable(e.target.value.replace(/\D/g,'').slice(0,3))} inputMode="numeric" placeholder="000"/><button className="salt-modal-submit" disabled={!table} onClick={() => setModal('success')}>Garson Çağır</button></>}
          {modal === 'feedback' && <><MessageCircle className="salt-modal-main-icon"/><h2>Geri Bildirim</h2><p>Deneyiminizi değerlendirir misiniz?</p><div className="salt-stars">{[1,2,3,4,5].map(n => <button key={n} className={rating >= n ? 'on' : ''} onClick={() => setRating(n)}>★</button>)}</div><button className="salt-modal-submit" disabled={!rating} onClick={() => setModal('success')}>Gönder</button></>}
          {modal === 'wifi' && <><Wifi className="salt-modal-main-icon"/><h2>Wi-Fi Bilgileri</h2><p>Wi-Fi adı ve şifresi restoran panelinden tanımlandığında burada tek dokunuşla gösterilecek.</p><button className="salt-modal-submit" onClick={() => setModal(null)}>Tamam</button></>}
          {modal === 'iban' && <><CreditCard className="salt-modal-main-icon"/><h2>IBAN</h2><p>İşletmenin IBAN bilgisi panelden tanımlanacak; müşteri buradan kolayca kopyalayabilecek.</p><button className="salt-modal-submit" onClick={() => setModal(null)}>Tamam</button></>}
          {modal === 'more' && <><MoreHorizontal className="salt-modal-main-icon"/><h2>Daha Fazla</h2><div className="salt-more-grid"><button onClick={() => setModal('feedback')}><MessageCircle/>Yorum Yap</button><button><Clock3/>Saatler</button>{restaurant.branch.instagram && <button onClick={() => window.open(restaurant.branch.instagram, '_blank', 'noopener,noreferrer')}><Instagram/>Instagram</button>}{restaurant.branch.phone && <button onClick={() => window.location.href = `tel:${restaurant.branch.phone}`}><Phone/>Telefon</button>}</div></>}
          {modal === 'success' && <><div className="salt-success">✓</div><h2>Teşekkür ederiz</h2><p>Talebiniz alındı.</p><button className="salt-modal-submit" onClick={() => setModal(null)}>Tamam</button></>}
        </div></div>}
      </section>
    </div>

    <div className="salt-footer-gap" style={{ height: FOOTER_GAP * scale }} />
    <div className="salt-footer-frame" style={{ width: DESIGN_W * scale, height: FOOTER_H * scale }}>
      <nav className="salt-bottom-nav" style={{ transform: `scale(${scale})` }} aria-label="Hızlı işlemler">
        <button onClick={() => setModal('wifi')}><Wifi/><span>Wi-Fi</span></button>
        <button onClick={() => setModal('iban')}><CreditCard/><span>IBAN</span></button>
        <button onClick={openMap}><MapPin/><span>Yol Tarifi</span></button>
        <button onClick={() => setModal('more')}><MoreHorizontal/><span>Daha Fazla</span></button>
      </nav>
    </div>
  </main>;
}
