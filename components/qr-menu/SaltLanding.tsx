'use client';

import { BellRing, ChevronDown, Clock3, Home, Info, MessageCircle, Utensils, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { QrMenuRestaurant } from '../../lib/qr-menu/types';
import './salt-landing.css';

type Modal = null | 'waiter' | 'feedback' | 'success';

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
const DESIGN_H = 932;

const SALT_REFERENCE_THEME: SaltThemeVars = {
  '--salt-bg': '#FCF7F1',
  '--salt-bg-soft': '#F8F1EB',
  '--salt-ink': '#141A1F',
  '--salt-accent': '#EA3038',
  '--salt-peach-a': '#FFD1B5',
  '--salt-peach-b': '#FCE6D7',
  '--salt-sage-a': '#E6ECE7',
  '--salt-sage-b': '#EFE9DE',
  '--salt-primary-a': '#FA7B73',
  '--salt-primary-b': '#E95A5B',
  '--salt-primary-c': '#D68163',
  '--salt-warm-a': '#FFFDFC',
  '--salt-warm-b': '#F7EBE6',
  '--salt-warm-c': '#F5E2D4',
  '--salt-cool-a': '#FDFEFE',
  '--salt-cool-b': '#DDE5E7',
  '--salt-cool-c': '#BCD6DF',
};

export function SaltLanding({ restaurant }: { restaurant: QrMenuRestaurant }) {
  const [modal, setModal] = useState<Modal>(null);
  const [table, setTable] = useState('');
  const [rating, setRating] = useState(0);
  const [scale, setScale] = useState(1);
  const hero = restaurant.coverImage || restaurant.products.find(p => p.isFeatured && p.isActive)?.image || restaurant.products.find(p => p.isActive)?.image;

  useEffect(() => {
    const fit = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setScale(Math.min(vw / DESIGN_W, vh / DESIGN_H, 1));
    };
    fit();
    window.addEventListener('resize', fit);
    window.visualViewport?.addEventListener('resize', fit);
    return () => {
      window.removeEventListener('resize', fit);
      window.visualViewport?.removeEventListener('resize', fit);
    };
  }, []);

  const openMenu = () => {
    window.location.href = '/menu/salt?view=menu';
  };

  return <main className="salt-landing-stage" style={SALT_REFERENCE_THEME}>
    <div className="salt-landing-frame" style={{ width: DESIGN_W * scale, height: DESIGN_H * scale }}>
      <section className="salt-landing" style={{ transform: `scale(${scale})` }}>
        <header className="salt-topbar">
          <div className="salt-wordmark" aria-label="SALT Fried Chicken">
            <strong>SALT</strong>
            <small>FRIED CHICKEN</small>
          </div>
          <button className="salt-language" aria-label="Dil seçimi">TR <ChevronDown size={18}/></button>
        </header>

        <section className="salt-hero">
          <div className="salt-shape salt-shape-peach"/>
          <div className="salt-shape salt-shape-sage"/>
          <div className="salt-copy">
            <div className="salt-eyebrow">İYİ TAVUK<br/>İYİ İNSANLAR</div>
            <div className="salt-red-line"/>
            <h1>Lezzet<br/>her zaman<br/>daha iyisini<br/>bir araya getirir.</h1>
            <p>Taze malzemeler,<br/>keyifli anlar.</p>
          </div>
          <div className="salt-script">Good<br/>Food<br/>Good<br/>People</div>
          {hero && <img className="salt-burger" src={hero} alt="SALT burger"/>}
          <div className="salt-dots"><b/><span/><span/></div>
        </section>

        <section className="salt-actions">
          <button className="salt-action salt-action-primary" onClick={openMenu}>
            <span className="salt-action-icon"><Utensils/></span>
            <span className="salt-action-copy"><b>Menüyü Gör</b><small>Tüm lezzetleri keşfedin</small></span>
            <span className="salt-action-arrow">→</span>
          </button>
          <button className="salt-action salt-action-warm" onClick={() => setModal('waiter')}>
            <span className="salt-action-icon"><BellRing/></span>
            <span className="salt-action-copy"><b>Garson Çağır</b><small>Masanıza servis desteği isteyin</small></span>
            <span className="salt-action-arrow">→</span>
          </button>
          <button className="salt-action salt-action-cool" onClick={() => setModal('feedback')}>
            <span className="salt-action-icon"><MessageCircle/></span>
            <span className="salt-action-copy"><b>Geri Bildirim</b><small>Deneyiminizi bizimle paylaşın</small></span>
            <span className="salt-action-arrow">→</span>
          </button>
          <div className="salt-powered">Powered by <b>paneltakip</b></div>
        </section>

        <nav className="salt-bottom-nav">
          <button className="active"><Home/><span>Ana Sayfa</span></button>
          <button><Info/><span>Bilgi</span></button>
          <button onClick={() => setModal('feedback')}><MessageCircle/><span>Yorum Yap</span></button>
          <button><Clock3/><span>Saatler</span></button>
        </nav>

        {modal && <div className="salt-modal-backdrop"><div className="salt-modal">
          <button className="salt-modal-close" onClick={() => setModal(null)}><X/></button>
          {modal === 'waiter' && <><BellRing className="salt-modal-main-icon"/><h2>Garson Çağır</h2><p>Masa numaranızı girin.</p><input value={table} onChange={e => setTable(e.target.value.replace(/\D/g,'').slice(0,3))} inputMode="numeric" placeholder="000"/><button className="salt-modal-submit" disabled={!table} onClick={() => setModal('success')}>Garson Çağır</button></>}
          {modal === 'feedback' && <><MessageCircle className="salt-modal-main-icon"/><h2>Geri Bildirim</h2><p>Deneyiminizi değerlendirir misiniz?</p><div className="salt-stars">{[1,2,3,4,5].map(n => <button key={n} className={rating >= n ? 'on' : ''} onClick={() => setRating(n)}>★</button>)}</div><button className="salt-modal-submit" disabled={!rating} onClick={() => setModal('success')}>Gönder</button></>}
          {modal === 'success' && <><div className="salt-success">✓</div><h2>Teşekkür ederiz</h2><p>Talebiniz alındı.</p><button className="salt-modal-submit" onClick={() => setModal(null)}>Tamam</button></>}
        </div></div>}
      </section>
    </div>
  </main>;
}
